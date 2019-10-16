import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SongStore } from 'src/app/stores/song.store';
import { SongModel } from 'src/app/models/song.model';

import * as quill from 'quill';
import { NgForm } from '@angular/forms';

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

				<button class="btn btn-danger btn-block" (click)="onDelete()">
					Elimina
				</button>
			</div>

			<a
				(click)="location.back()"
				class="btn btn-block btn-link text-muted"
			>
				Annulla
			</a>
		</div>
	`
})
export class CrudSongComponent implements OnInit {
	constructor(
		public location: Location,
		private route: ActivatedRoute,
		private store: SongStore
	) {}

	@ViewChild('lyricRef')
	lyricElement: ElementRef;
	lyricInput;
	id: string;
	title: string;
	song: SongModel;
	editor: any;

	editorConfig = {
		theme: 'snow',
		modules: {
			toolbar: ['bold']
		}
	};

	ngOnInit() {
		this.editor = new quill(
			this.lyricElement.nativeElement,
			this.editorConfig
		);

		this.route.params.subscribe(params => {
			if (!params.id) {
				return;
			}

			this.id = params.id;
			this.store.get(this.id).subscribe((res: SongModel) => {
				this.song = new SongModel();
				this.song.title = res.title;
				this.song.lyric = res.lyric;
				this.title = this.song.title;
				this.editor.pasteHTML(this.song.lyricHtml);
			});
		});
	}

	onSaveOrUpdate(form: NgForm) {
		const data = new SongModel();
		data.lyric = form.value.title;
		const lyricHTML = this.editor.root.innerHTML;
		data.setHTML(lyricHTML);

		if (this.id) {
			this.store
				.update(this.id, Object.assign({}, data))
				.then(() => alert('Canzone modificata con successo'))
				.catch(err => console.error(err));
			return;
		}

		this.store
			.add(Object.assign({}, data))
			.then(() => alert('Canzone aggiunto con successo'))
			.catch(err => console.error(err));
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
}
