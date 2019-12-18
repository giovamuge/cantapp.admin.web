import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { UserStore } from '../stores/user.store';
import { AuthStore } from '../services/auth.store';
import { UserModel } from '../models/user.model';
import { SweetalertService } from '../services/sweetalert.service';

@Component({
	selector: 'app-login',
	template: `
		<div
			class="d-flex align-items-center bg-auth border-top border-top-2 border-primary"
			style="display: block; height:100vh;"
		>
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-12 col-md-5 col-xl-4 my-5">
						<!-- Heading -->
						<h1 class="display-4 text-center mb-3">Cantapp</h1>

						<!-- Subheading -->
						<p class="text-muted text-center mb-5">
							portale dedicato alla gestione dei dati presenti
							nell'app cantapp.
						</p>

						<!-- Form -->
						<form #loginForm="ngForm" (ngSubmit)="login(loginForm)">
							<!-- Email address -->
							<div class="form-group">
								<!-- Label -->
								<label>Username</label>

								<!-- Input -->
								<input
									type="email"
									class="form-control"
									placeholder="name@address.com"
									required
									autofocus
									name="email"
									ngModel
									#email="ngModel"
								/>
							</div>

							<!-- Password -->
							<div class="form-group">
								<div class="row">
									<div class="col">
										<!-- Label -->
										<label>Password</label>
									</div>
								</div>
								<!-- / .row -->

								<!-- Input -->
								<input
									type="password"
									class="form-control"
									placeholder="Enter your password"
									required=""
									name="password"
									ngModel
									#password="ngModel"
								/>

								<div class="row">
									<div class="col-auto">
										<!-- Help text -->
										<a
											href="mailto:info.generali@simeyoung.it"
											class="form-text small text-muted"
										>
											invia email per password dimenticata
										</a>
									</div>
								</div>
							</div>

							<!-- Submit -->
							<button
								class="btn btn-lg btn-block btn-primary mb-3"
							>
								Entra
							</button>

							<!-- Link -->
							<!--<div class="text-center">
              <small class="text-muted text-center">
                Don't have an account yet? <a href="sign-up.html">Sign up</a>.
              </small>
            </div>-->
						</form>

						<div class="mt-3" *ngIf="isInvalid">
							<div class="alert alert-danger" role="alert">
								Email o password non sono corretti
							</div>
						</div>
						<div class="text-center">
							<small class="text-muted text-center">
								© Mugelli Software's 2019
							</small>
						</div>
					</div>
				</div>
			</div>
			<!-- / .row -->
		</div>
	`
})
export class LoginComponent {
	constructor(
		private auth: AuthService,
		private route: Router,
		private userStore: UserStore,
		private store: AuthStore,
		private alert: SweetalertService
	) {}

	isInvalid: boolean;

	login(form: NgForm) {
		if (form.invalid) {
			this.isInvalid = true;
			return;
		}

		this.isInvalid = false;
		this.auth
			.login(form.value.email, form.value.password)
			.then(
				succ => {
					this.route.navigateByUrl('home/songs');
				}
				// 	this.userStore
				// 		// uid == userId
				// 		.get(succ.uid)
				// 		.subscribe(
				// 			(res: UserModel) => {
				// 				this.isInvalid = false;
				// 				// if (res.roles && res.roles.indexOf('admin') > -1) {
				// 				// 	this.route.navigateByUrl(
				// 				// 		'home/meeting/calendar'
				// 				// 	);
				// 				// 	return;
				// 				// }

				// 				// const error =
				// 				// 	'Non hai permessi necessari per accedere';
				// 				// this.alert.error(error);
				// 			},
				// 			() => (this.isInvalid = true)
				// 		),
				// () => (this.isInvalid = true)
			)
			.catch(() => (this.isInvalid = true));
	}
}
