import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

@Injectable()
export class AuthStore {
	constructor() {}

	// Returns current user
	get currentUser(): User {
		return JSON.parse(localStorage.getItem('currentUser'));
	}

	set currentUser(user: User) {
		localStorage.setItem('currentUser', JSON.stringify(user));
	}

	// Returns current user UID
	get currentUserId(): string {
		return this.currentUser ? this.currentUser.uid : null;
	}

	// Returns true if user is logged in
	get authenticated(): boolean {
		return !!this.currentUserId;
	}
}
