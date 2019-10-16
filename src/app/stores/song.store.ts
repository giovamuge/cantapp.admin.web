import { BaseStore } from './base.store';
import { SongModel } from '../models/song.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class SongStore extends BaseStore<SongModel> {
	constructor(db: AngularFirestore) {
		super(db, 'songs');
	}
}
