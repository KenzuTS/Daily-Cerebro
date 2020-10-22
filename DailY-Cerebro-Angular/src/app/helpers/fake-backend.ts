import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { Role } from '../models/Role';

// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const { url, method, headers, body } = request;

		// wrap in delayed observable to simulate server api call
		return of(null)
			.pipe(mergeMap(handleRoute))
			.pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
			.pipe(delay(500))
			.pipe(dematerialize());

		function handleRoute() {
			switch (true) {
				case url.endsWith('/user/register') && method === 'POST':
					return register();
				case url.endsWith('/user/auth') && method === 'POST':
					return authenticate();
				case url.endsWith('/user/getAll') && method === 'GET':
					return getUsers();
				case url.match(/\/get\/\d+$/) && method === 'GET':
					return getUserById();
				case url.match(/\/delete\/\d+$/) && method === 'DELETE':
					return deleteUser();
				case url.match(/\/update\/\d+$/) && method === 'PUT':
					return updateUser();
				default:
					// pass through any requests not handled above
					return next.handle(request);
			}
		}

		// route functions

		function register() {
			const user = body

			if (users.find(x => x.email === user.email)) {
				return error('Email "' + user.email + '" is already used');
			}

			user.iD = users.length ? Math.max(...users.map(x => x.iD)) + 1 : 1;
			user.role = new Role("ADMIN", 10);
			users.push(user);
			localStorage.setItem('users', JSON.stringify(users));

			return ok();
		}

		function authenticate() {
			const { email, password } = body;
			const user = users.find(x => x.email === email && x.password === password);

			if (!user) return error('email or password is incorrect');

			return ok({
				user:{
					iD: user.iD,
					username: user.username,
					email: user.email,
					role: user.role
				},
				token:'fake-jwt-token'
			})
		}

		function getUsers() {
			if (!isLoggedIn()) return unauthorized();
			return ok(users);
		}

		function getUserById() {
			if (!isLoggedIn()) return unauthorized();

			const user = users.find(x => x.iD == idFromUrl());
			return ok(user);
		}

		function deleteUser() {
			if (!isLoggedIn()) return unauthorized();

			users = users.filter(x => x.iD !== idFromUrl());
			localStorage.setItem('users', JSON.stringify(users));
			return ok();
		}

		function updateUser() {
			if (!isLoggedIn()) return unauthorized();

			const user = body

			let userToUpdate = users.filter(x => x.iD === idFromUrl());
			userToUpdate.username = user.username;
			userToUpdate.email = user.email;
			localStorage.setItem('users', JSON.stringify(users));

			return ok();
		}

		// helper functions

		function ok(body?) {
			return of(new HttpResponse({ status: 200, body }))
		}

		function unauthorized() {
			return throwError({ status: 401, error: { message: 'Unauthorised' } });
		}

		function error(message) {
			return throwError({ error: { message } });
		}

		function isLoggedIn() {
			return headers.get('Authorization') === 'Bearer fake-jwt-token';
		}

		function idFromUrl() {
			const urlParts = url.split('/');
			return parseInt(urlParts[urlParts.length - 1]);
		}
	}
}

export const fakeBackendProvider = {
	// use fake backend in place of Http service for backend-less development
	provide: HTTP_INTERCEPTORS,
	useClass: FakeBackendInterceptor,
	multi: true
};
