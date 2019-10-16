import { CanActivate, Router, ActivatedRoute, Route } from '@angular/router';
import { Injectable, Type } from '@angular/core';
import { AuthStore } from './auth.store';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private store: AuthStore, private router: Router) {}

	// is possible return different type 'boolean | Observable<boolean> | Promise<boolean>
	canActivate() {
		const isAuth = this.store.authenticated;
		if (!isAuth) {
			this.router.navigateByUrl('login');
		}

		return isAuth;
	}
}
