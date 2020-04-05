import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-not-found-component',
	template: `
		<div
			class="d-flex align-items-center bg-auth border-top border-top-2 border-primary"
			style="display: block; height:100vh;"
		>
			<!-- CONTENT
  ================================================== -->
			<div class="container">
				<div class="row justify-content-center">
					<div class="col-12 col-md-5 col-xl-4 my-5">
						<div class="text-center">
							<!-- Preheading -->
							<h6 class="text-uppercase text-muted mb-4">
								404 error
							</h6>

							<!-- Heading -->
							<h1 class="display-4 mb-3">Pagina non trovata</h1>

							<!-- Subheading -->
							<p class="text-muted mb-4">
								Mi dispiace stai cercando una pagina
								inesistente. Torna alla pagina di login.
							</p>

							<!-- Button -->
							<a
								[routerLink]="'/login'"
								class="btn btn-lg btn-primary"
							>
								Login
							</a>
						</div>
					</div>
				</div>
				<!-- / .row -->
			</div>
			<!-- / .container -->
		</div>
	`,
})
export class NotFoundComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
