import { BaseStore } from './base.store';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
@Injectable({
	providedIn: 'root'
})
export class UserStore extends BaseStore<UserModel> {
	constructor(db: AngularFirestore) {
		super(db, 'users');
	}
}
