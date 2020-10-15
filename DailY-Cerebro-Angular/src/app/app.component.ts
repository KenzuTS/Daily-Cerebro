import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	currentUser: User;

	constructor(
		private router: Router,
		private authentificationService: AuthenticationService
	){
		this.authentificationService.currentUser.subscribe(user => this.currentUser = user);
	}

	logout(){
		this.authentificationService.logout();
		this.router.navigate(['/']);
	}
}
