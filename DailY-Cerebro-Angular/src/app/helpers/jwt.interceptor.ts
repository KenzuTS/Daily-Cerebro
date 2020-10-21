import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

	constructor(private authService: AuthenticationService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		let currentUser = this.authService.currentUserValue;
		if (localStorage.getItem("id_token")) {
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${localStorage.getItem("id_token")}`
				}
			});
		}

		return next.handle(req);
	}

}
