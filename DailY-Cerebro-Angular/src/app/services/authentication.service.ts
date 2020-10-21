import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Role } from '../models/Role';
import { User } from '../models/user';
import * as jQuery from '../../../node_modules/jquery';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Injectable()
export class AuthenticationService {

	private currentUserSubject: BehaviorSubject<User>;
	public currentUser: Observable<User>;

	constructor(private http: HttpClient, private router: Router) {
		this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
		this.currentUser = this.currentUserSubject.asObservable();
	}

	// get currentUser without notification
	public get currentUserValue(): User {
		return this.currentUserSubject.value;
	}

	login(email: string, password: string) {

		return this.http.post<any>(`http://localhost:8080/MAVEN_HIBJPA_V1/rest/user/auth`, { email, password })
			.pipe(map(data => {

				// login successful if there's a jwt token in the response
				// TODO format token
				if (data) {
					//const expiresAt = moment().add(token.expiresIn, 'second');

					// store user details and jwt token in local storage to keep user logged in between page refreshes
					//localStorage.setItem('currentUser', JSON.stringify(user));
					localStorage.setItem('id_token', data.token);
        			localStorage.setItem("user", JSON.stringify(data.user.valueOf()) );
					this.currentUserSubject.next(data.user);
				}

				return data;
			}));
	}

	logout() {
		// remove user from local storage to log user out
		localStorage.removeItem('currentUser');
		this.currentUserSubject.next(null);
	}
}
