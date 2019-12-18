import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgSelect2Module } from 'ng-select2';

import { routes } from './app.route';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './views/login.view';
import { NotFoundComponent } from './views/notFound.view';
import { AuthService } from './services/auth.service';
import { SweetalertService } from './services/sweetalert.service';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth.guard';
import { AuthStore } from './services/auth.store';
import { UserStore } from './stores/user.store';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { CrudSongComponent } from './views/songs/crudSong.component';
import { ListSongComponent } from './views/songs/listSong.component';
import { RootComponent } from './views/root.view';
import { SongStore } from './stores/song.store';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		NotFoundComponent,
		CrudSongComponent,
		ListSongComponent,
		RootComponent
	],
	imports: [
		BrowserModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireAuthModule,
		AngularFirestoreModule,
		RouterModule.forRoot(routes),
		FormsModule,
		HttpClientModule,
		NgSelect2Module
	],
	providers: [
		// Services
		AuthService,
		SweetalertService,

		// Guards
		AuthGuard,

		// Stores
		AuthStore,
		UserStore,
		SongStore
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
