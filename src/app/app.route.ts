import { Routes } from '@angular/router';
import { NotFoundComponent } from './views/notFound.view';
import { LoginComponent } from './views/login.view';
import { ListSongComponent } from './views/songs/listSong.component';
import { AuthGuard } from './services/auth.guard';
import { CrudSongComponent } from './views/songs/crudSong.component';
import { RootComponent } from './views/root.view';

export const routes: Routes = [
	{ path: '', redirectTo: 'it/songs', pathMatch: 'full' },
	{
		path: 'login',
		// canActivate: [AuthGuard],
		component: LoginComponent,
	},
	{
		path: 'it',
		component: RootComponent,
		children: [
			{
				path: 'songs',
				canActivate: [AuthGuard],
				children: [
					{
						path: '',
						component: ListSongComponent,
					},
					{
						path: 'crud',
						component: CrudSongComponent,
					},
					{
						path: 'crud/:id',
						component: CrudSongComponent,
					},
				],
			},
		],
	},
	{ path: '404', component: NotFoundComponent },
	{ path: '**', redirectTo: '/404' },
];
