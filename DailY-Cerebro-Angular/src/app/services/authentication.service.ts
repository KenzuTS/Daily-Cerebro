import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable()
export class AuthenticationService {

	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(private http: HttpClient) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	// get currentUser without notification
	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	login(username: string, password: string) {

		//TODO set url to call login service from server
		return this.http.post<User>('url', { username, password })
			.pipe(map(

				user => {

					// if login successful
					if (user) {
						// store user details in local storage to keep user logged in between page refreshes
						localStorage.setItem('currentUser', JSON.stringify(user));
						this.currentUserSubject.next(user);
					}

					return user;
				}
			));
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}
}
