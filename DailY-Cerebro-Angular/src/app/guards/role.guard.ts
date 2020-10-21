import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class RoleGuard implements CanActivate{

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

		const currentUser = this.authenticationService.currentUserValue;

		if (currentUser && currentUser.role.name === 'admin') {
			// authorised so return true
			return true;
		}

		// not logged in or not admin so redirect to login page with the return url
		this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
		return false;
	}

}
