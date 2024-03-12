import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';

@Injectable({
  	providedIn: 'root'
})
class AuthGuardService {

  	constructor(private router: Router, private auth: AngularFireAuth) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
		return this.auth.authState.pipe(take(1), map(user => {

			if (user && (next.component == LoginComponent || next.component == RegisterComponent)) {
				return this.router.createUrlTree(["../account"]);
			}
			else if (!user && next.component != LoginComponent && next.component != RegisterComponent) {
				return this.router.createUrlTree(["../login"]);
			}

			return true;
		}));
	}
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
	return inject(AuthGuardService).canActivate(next, state);
}