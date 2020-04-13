import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SongStore } from 'src/app/stores/song.store';
import { SongModel } from 'src/app/models/song.model';
import { NgForm } from '@angular/forms';
import { categories, Category } from 'src/app/models/category.model';
import { Select2OptionData } from 'ng-select2';

import * as quill from 'quill';

@Component({
	selector: 'app-crud-song',
	template: `
		<div class="container">
			<!--<sy-header
			[title]="'Meeting'"
			[preTitle]="'aggiungi o rimuovi meeting'"
		></sy-header>-->
			<form #songForm="ngForm">
				<div class="form-group mt-5">
					<label> Titolo</label>
					<input
						[(ngModel)]="title"
						name="title"
						type="text"
						class="form-control col-sm-6"
					/>
				</div>
				<div class="form-group mt-5">
					<label> Categorie</label>
					<div class="row">
						<div class="col-md-5">
							<ng-select2
								[options]="{
									multiple: true,
									width: 350
								}"
								[(ngModel)]="categories"
								[data]="categoriesArray"
								name="categories"
								[placeholder]="'Seleziona categorie'"
							>
							</ng-select2>
						</div>
					</div>
				</div>
				<div class="form-group mt-5">
					<label> Testo</label>
					<!--<small class="form-text text-muted">
						il nome utente sarà generato in automatico</small
					>-->
					<!--<input
						#usernameEl
						[(ngModel)]="username"
						name="username"
						type="text"
						class="form-control col-sm-6"
                    />-->
					<!--<textarea class="col"  #lyricRef></textarea>-->
					<div #lyricRef data-toggle="quill" id="lyricRef"></div>
					<!--<quill-editor></quill-editor>-->
				</div>
				<div class="form-group mt-5">
					<label> Accordi</label>
					<!--<small class="form-text text-muted">
						il nome utente sarà generato in automatico</small
					>-->

					<div #chordRef data-toggle="quill" id="chordRef"></div>
				</div>
			</form>

			<hr class="mt-5 mb-4" />

			<button
				class="btn btn-primary btn-block"
				(click)="onSaveOrUpdate(songForm)"
				*ngIf="!id"
			>
				Aggiungi
			</button>

			<div class="mt-5" *ngIf="id">
				<button
					class="btn btn-primary btn-block"
					(click)="onSaveOrUpdate(songForm)"
				>
					Modifica
				</button>

				<!--<button class="btn btn-outlink-danger btn-block" (click)="onDelete()">
					Elimina
				</button>-->
			</div>

			<a
				(click)="location.back()"
				class="btn btn-block btn-link text-muted"
			>
				Annulla
			</a>
		</div>
	`,
})
export class CrudSongComponent implements OnInit {
	constructor(
		public location: Location,
		private route: ActivatedRoute,
		private store: SongStore
	) {}

	@ViewChild('lyricRef')
	lyricElement: ElementRef;
	@ViewChild('chordRef')
	chordElement: ElementRef;
	lyricInput;
	id: string;
	title: string;
	song: SongModel;
	lyricEditor: any;
	chordEditor: any;
	categoriesArray: Array<Select2OptionData>;
	categories;

	editorConfig = {
		theme: 'snow',
		modules: {
			toolbar: ['bold'],
		},
	};

	ngOnInit() {
		this.categoriesLoad();

		this.lyricEditor = new quill(
			this.lyricElement.nativeElement,
			this.editorConfig
		);

		this.chordEditor = new quill(
			this.chordElement.nativeElement,
			this.editorConfig
		);

		this.route.params.subscribe((params) => {
			if (!params.id) {
				return;
			}

			this.id = params.id;
			this.store.get(this.id).subscribe((res: SongModel) => {
				this.song = new SongModel();
				this.song.title = res.title;
				this.song.lyric = res.lyric;
				this.song.chord = res.chord;
				this.title = this.song.title;
				this.lyricEditor.pasteHTML(this.song.lyricHtml);
				this.chordEditor.pasteHTML(this.song.chordHtml);
				this.categories = res.categories;

				console.log(this.song);
			});
		});
	}

	onSaveOrUpdate(form: NgForm) {
		const data = new SongModel();
		data.title = form.value.title;
		const lyricHTML = this.lyricEditor.root.innerHTML;
		data.setHTML(lyricHTML);
		const chordHTML = this.chordEditor.root.innerHTML;
		data.setChordHTML(chordHTML);
		data.categories = this.categories;

		// console.log(data);
		// return;

		if (this.id) {
			this.store
				.update(this.id, Object.assign({}, data))
				.then(() => alert('Canzone modificata con successo'))
				.catch((err) => console.error(err));
			return;
		}

		this.store
			.add(Object.assign({}, data))
			.then(() => alert('Canzone aggiunto con successo'))
			.catch((err) => console.error(err));
	}

	onDelete() {
		const message = 'Inserisci il titolo della canzone da eliminare';
		const titleToDelete = prompt(message, '');
		if (titleToDelete === this.song.title) {
			this.store
				.delete(this.id)
				.then(() => alert(`${this.song.title} eliminato!`));
		}
	}

	categoriesLoad() {
		this.categoriesArray = categories.map((y: Category) =>
			Object.create({
				id: y.value,
				text: y.title,
			} as Select2OptionData)
		) as [Select2OptionData];
	}
}
