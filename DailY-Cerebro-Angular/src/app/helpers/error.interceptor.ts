import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

	constructor(private authService: AuthenticationService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		return next.handle(req).pipe(catchError(err => {
			if (err.status === 401) {
				// auto logout if 401 response returned from api
				this.authService.logout();
				//location.reload(true);
			}

			if (err.status === 403) {
				console.log("Il y a eu une erreur 403");
			}

			const error = err.error.message || err.statusText;
			return throwError(error);
		}))
	}

}
