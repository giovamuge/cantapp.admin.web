import { Injectable } from '@angular/core';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { firestore } from 'firebase';
import { IQueryModel } from '../models/query.model';

export class BaseStore<T> {
	constructor(private db: AngularFirestore, rootCollection: string = null) {
		this.rootCollection = rootCollection;
	}

	readonly rootCollection: string;

	collection(): Observable<[T]> {
		return this.db
			.collection(this.rootCollection)
			.valueChanges() as Observable<[T]>;
	}

	collections(): Observable<[{}]> {
		return new Observable<[{}]>(x =>
			this.db
				.collection(this.rootCollection)
				.get()
				.subscribe(y => {
					const datas: [{}] = [{}];
					y.forEach(k => datas.push({ id: k.id, ...k.data() }));
					datas.splice(0, 1);
					x.next(datas);
				})
		);
	}

	query(array: Array<IQueryModel>): Observable<[{}]> {
		const collection = this.db
			// @ts-ignore
			.collection<T>(this.rootCollection, ref => {
				// tslint:disable-next-line:prefer-for-of
				for (let index = 0; index < array.length; index++) {
					const element = array[index];
					// @ts-ignore
					ref = ref.where(
						element.property,
						element.opertator,
						element.value
					);
				}

				return ref;
			});

		// return collection.valueChanges() as Observable<[T]>;
		return new Observable<[{}]>(x => {
			collection.get().subscribe(y => {
				const datas: [{}] = [{}];
				y.forEach(k => datas.push({ id: k.id, ...k.data() }));
				datas.splice(0, 1);
				x.next(datas);
			});
		});
	}

	// query(condition: [Query]) {
	// 	const collection = this.db
	// 		// @ts-ignore
	// 		.collection<T>(this.rootCollection, ref => {
	// 			ref.
	// 		});
	// }

	get(id: string): Observable<{}> {
		return new Observable(observe =>
			this.db
				.collection(this.rootCollection)
				.doc(id)
				.get()
				.subscribe(res => {
					if (!res.exists) {
						observe.error('Non esiste il dato richiesto');
					}

					observe.next(res.data());
					return;
				})
		);
	}

	add(data: T): Promise<{}> {
		return this.db.collection(this.rootCollection).add(data);
	}

	update(id: string, data: T): Promise<void> {
		return this.db.doc(`${this.rootCollection}/${id}`).update(data);
	}

	ref(id: string): firestore.DocumentReference {
		return this.db.doc(`/${this.rootCollection}/${id}`).ref;
	}

	pathRef(path: string): firestore.DocumentReference {
		return this.db.doc(`/${this.rootCollection}/${path}`).ref;
	}

	delete(id: string): Promise<void> {
		return this.db.doc(`/${this.rootCollection}/${id}`).delete();
	}
}
