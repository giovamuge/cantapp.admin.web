import { Component, OnInit } from '@angular/core';
import { SongStore } from 'src/app/stores/song.store';
import { SongModel } from 'src/app/models/song.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-list-song',
	template: `
		<div class="card mt-5">
			<div class="card-header">
				<!--<ul class="navbar-nav mr-auto">
					<li>Lista canzoni</li>
				</ul>-->
				<div class="row align-items-center">
					<div class="col">
						<h5 class="card-title">Lista canzoni</h5>
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
	`
})
export class ListSongComponent implements OnInit {
	constructor(private store: SongStore) {}

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
		this.songs = this.songsData.filter(
			value => value.title.toLowerCase().indexOf(searchName) > -1
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
	}
}
