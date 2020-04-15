import { Component, OnInit } from '@angular/core';
import { SongStore } from 'src/app/stores/song.store';
import { SongModel } from 'src/app/models/song.model';
import { NgForm } from '@angular/forms';
import { QueryModel } from 'src/app/models/query.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
	selector: 'app-list-song',
	template: `
		<div class="card mt-5">
			<div class="card-header">
				<div class="row align-items-center">
					<div class="col">
						<h5 class="card-title mb-0">Lista canzoni</h5>
						<small>Inserisci una <a routerLink="/it/songs/crud">nuova canzone </a></small>
					</div>
					<div class="col">
						<form
							class="form-inline my-2 my-lg-0 justify-content-end"
							#searchForm="ngForm"
							(ngSubmit)="onSearch(searchForm)"
						>
							<input
								[(ngModel)]="searchSong"
								name="searchName"
								class="form-control mr-sm-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
							/>
							<button
								class="btn btn-outline-primary my-2 my-sm-0"
								type="submit"
							>
								Search
							</button>
						</form>
					</div>
				</div>
			</div>
			<div class="card-body">
				<ul class="list-group list-group-flush list my-n3">
					<li
						class="list-group-item align-items-center"
						*ngFor="let song of songs"
					>
						{{ song.title }}
						<a
							class="btn btn-sm btn-outline-secondary float-right"
							[routerLink]="'/it/songs/crud/' + song.id"
						>
							Modifica
						</a>
					</li>
				</ul>
			</div>
		</div>
	`,
})
export class ListSongComponent implements OnInit {
	constructor(private store: SongStore, private db: AngularFirestore) {}

	searchSong: string;
	songs: Array<SongModel>;
	songsData: Array<SongModel>;

	ngOnInit() {
		this.store
			.collections()
			.subscribe(
				(res: [SongModel]) =>
					(this.songs = this.songsData = res.sort(this.onSortSong))
			);
	}

	onSearch(form: NgForm) {
		const searchName = form.value.searchName.toLowerCase();
		const query = new Array<QueryModel>();
		query.push(new QueryModel('keywords', 'array-contains', searchName));
		this.store
			.query(query)
			.subscribe(
				(res: [SongModel]) =>
					(this.songs = this.songsData = res.sort(this.onSortSong))
			);
	}

	onSortSong = (a: SongModel, b: SongModel) => {
		const nameA = a.title.toUpperCase(); // ignora maiuscole e minuscole
		const nameB = b.title.toUpperCase(); // ignora maiuscole e minuscole
		if (nameA < nameB) {
			return -1;
		}
		if (nameA > nameB) {
			return 1;
		}

		// i nomi devono essere uguali
		return 0;
	};
}
