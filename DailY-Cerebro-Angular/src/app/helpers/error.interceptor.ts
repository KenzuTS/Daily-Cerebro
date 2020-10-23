import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { NgbdModalContent } from '../login/login.component';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	currentUser: User;

	constructor(
		private authService: AuthenticationService
		) {
			this.authService.currentUser.subscribe(user => this.currentUser = user);
		}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(req).pipe(catchError(err => {
			if (err.status === 401) {
				// auto logout if 401 response returned from api
				//this.authService.logout();

				//renew token if logged in
				if (localStorage.getItem("currentUser")) {
					localStorage.removeItem('currentUser');
					localStorage.removeItem('id_token');

					this.authService.login(this.currentUser.email, this.currentUser.password).pipe(first()).subscribe(
						data => {
							window.location.reload();
						}
					)
				}
			}

			if (err.status === 403) {
				console.log("Il y a eu une erreur 403");
			}

			const error = err.error.message || err.statusText;
			return throwError(error);
		}))
	}

}
