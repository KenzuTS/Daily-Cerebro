import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AlertService } from '../services/alert.service';
import { AuthenticationService } from '../services/authentication.service';

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
	loginSubscription: Subscription;

	constructor(
		private formBuilder: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private authenticationService: AuthenticationService,
		private alertService: AlertService
	) {
		// redirect to home if already logged in
		if (this.authenticationService.currentUserValue) {
			this.router.navigate(['/']);
		}
	}

	ngOnInit(): void {

		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
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

		// TODO remove this
		this.authenticationService.testLogin(this.f.username.value, this.f.password.value);
		return;

		this.authenticationService.login(this.f.username.value, this.f.password.value)
		.pipe(first())
		.subscribe(

			data => {
				this.router.navigate([this.returnUrl]);
			},

			error => {
				if (typeof error != "string") { //TODO remove
					error = "Error " + error.status + " Server " + error.statusText;
				}
				this.alertService.error(error);
				console.log(error);
				this.loading = false;
			}
		);
	}

}
