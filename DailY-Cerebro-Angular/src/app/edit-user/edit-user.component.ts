import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

	user: User;

	constructor(
		private userService: UserService,
		private route: ActivatedRoute
	) { }

	ngOnInit(): void {
		const id = this.route.snapshot.params['id'];
		this.userService.getById(id).pipe(first()).subscribe(
			user => {
				this.user = user;
			}
		)
	}

	onSubmit(form: NgForm){

		this.user.username = form.value['username'];
		this.user.email = form.value['mail'];
		this.userService.update(this.user);
	}

}
