import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	template: `
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
			<a class="navbar-brand" href="#">Navbar</a>
			<button
				class="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item active">
						<a class="nav-link" href="#"
							>Canzoni <span class="sr-only">(current)</span></a
						>
					</li>
					<!--<li class="nav-item">
						<a class="nav-link" href="#">Features</a>
					</li>-->
				</ul>
			</div>
		</nav>
		<div class="container">
			<router-outlet></router-outlet>
		</div>
	`
})
export class RootComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
