import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user';

@Component({
	selector: 'ngbd-modal-content',
	template: `
	<div class="col-lg-12 text-center">
        <div class="modal-header">
        	<h4 class="modal-title">Login successfully</h4>
        	<button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        		<span aria-hidden="true">&times;</span>
        	</button>
        </div>
        <div class="modal-body">
        	<p>You are log as {{currentUser.role.name}} role</p>
        </div>
        <div class="modal-footer">
        	<button type="button" ngbAutofocus class="btn btn-success" (click)="closeModal()">OK</button>
		</div>
	</div>
	`
})
export class NgbdModalContent {

	@Input() currentUser: User;
	returnUrl: String;

	constructor(
		public activeModal: NgbActiveModal,
		private authentificationService: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute) {

		this.authentificationService.currentUser.subscribe(user => this.currentUser = user);

		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	closeModal() {
		this.activeModal.close();
		this.router.navigate([this.returnUrl]);
	}
}






@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService,
		private alertService: AlertService,
		private modalService: NgbModal
	) {
		// redirect to home if already logged in
		if (this.authenticationService.currentUserValue) {
			this.router.navigate(['/']);
		}
	}

	ngOnInit(): void {

		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});

		// get return url from route parameters or default to '/'
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	// convenience getter for easy access to form fields
	get f() { return this.loginForm.controls; }

	onSubmit() {
		this.submitted = true;

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return;
		}

		this.loading = true;

		this.authenticationService.login(this.f.email.value, this.f.password.value).pipe(first()).subscribe(
			data => {
				const modalRef = this.modalService.open(NgbdModalContent);
				//this.router.navigate([this.returnUrl]);
			},

			error => {
				this.alertService.error(error);
				this.loading = false;
			}
		)
	}
}
