import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthStore } from './auth.store';
import { User, auth } from 'firebase';

@Injectable()
export class AuthService {
	constructor(private af: AngularFireAuth, private store: AuthStore) {}

	login(username: string, password: string): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.af.auth
				.signInWithEmailAndPassword(username, password)
				.catch(err => reject(err))
				.then(cred => {
					resolve(
						(this.store.currentUser = (cred as auth.UserCredential)
							.user as User)
					);
				});
		});
	}

	logout(): Promise<void> {
		return new Promise<void>((resolve, reject) =>
			this.af.auth
				.signOut()
				.then(() => {
					this.store.currentUser = null;
					resolve();
				})
				.catch(reject)
		);
	}
}
