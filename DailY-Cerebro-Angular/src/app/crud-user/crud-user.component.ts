import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

@Component({
	selector: 'app-crud-user',
	templateUrl: './crud-user.component.html',
	styleUrls: ['./crud-user.component.css']
})
export class CrudUserComponent implements OnInit, OnDestroy {

	currentUser: User;
	currentUserSubscription: Subscription;
	users: User[] = [];

	constructor(
		private authenticationService: AuthenticationService,
		private userService: UserService
	) {
		this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
			this.currentUser = user;
		});
	}

	ngOnInit(): void {
		this.loadAllUsers();
	}

	ngOnDestroy(): void {
		// unsubscribe to ensure no memory leaks
		this.currentUserSubscription.unsubscribe();
	}

	deleteUser(id: number) {
		this.userService.delete(id).pipe(first()).subscribe(() => {
			this.loadAllUsers()
		});
	}

	private loadAllUsers() {
		this.userService.getAll().pipe(first()).subscribe(users => {
			this.users = users;
		});
	}

}
