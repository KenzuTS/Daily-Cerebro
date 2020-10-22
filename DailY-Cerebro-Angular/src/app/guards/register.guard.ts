import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class RegisterGuard implements CanActivate{

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	){}
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

		const currentUser = this.authenticationService.currentUserValue;

		if (!currentUser) { // access if not already logged
			return true;
		}

		this.router.navigate(['/']);
		return false;
	}

}
