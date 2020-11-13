import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { SongStore } from "src/app/stores/song.store";
import { SongModel, ILinkModel } from "src/app/models/song.model";
import { NgForm } from "@angular/forms";
import { categories, Category } from "src/app/models/category.model";
import { Select2OptionData } from "ng-select2";

import * as quill from "quill";
import { SongUtil } from "src/app/utils/song.util";
import * as firebase from "firebase";
import { DocumentReference } from "@angular/fire/firestore";
import algoliasearch from "algoliasearch/dist/algoliasearch";

@Component({
  selector: "app-crud-song",
  template: `
    <div class="container">
      <!--<sy-header
			[title]="'Meeting'"
			[preTitle]="'aggiungi o rimuovi meeting'"
		></sy-header>-->
      <form #songForm="ngForm">
        <div class="form-group mt-5">
          <label>Titolo</label>
          <input
            [(ngModel)]="title"
            name="title"
            type="text"
            class="form-control col-sm-6"
          />
        </div>
        <div class="form-group mt-5">
          <label>Categorie</label>
          <div class="row">
            <div class="col-md-5">
              <ng-select2
                [options]="{
                  multiple: true,
                  width: 315
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
          <label>Link</label>
          <div class="row col">
            <select
              class="form-control col-sm-2 mr-2"
              name="typeModel"
              [(ngModel)]="typeModel"
            >
              <option value="null">Tipo link</option>
              <option value="audio">Audio MP3</option>
              <option value="youtube">YouTube</option>
            </select>
            <input
              class="form-control col-sm-2 mr-2"
              placeholder="Titolo"
              name="titleModel"
              [(ngModel)]="titleModel"
            />
            <input
              class="form-control col-sm-5 mr-2"
              placeholder="https://"
              name="urlModel"
              [(ngModel)]="urlModel"
            />
            <button
              class="btn btn-link col-sm-2"
              (click)="addLink()"
              [disabled]="!typeModel || !urlModel || !titleModel"
            >
              Aggiungi
            </button>

            <!--<ul class="list-group mt-2">
							<li class="list-group-item">
								{{ link.type }} {{ link.title }} {{ link.url }}
							</li>
						</ul>-->
            <div *ngIf="links && links.length > 0" class="table-responsive">
              <table class="table mt-3">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Titolo</th>
                    <th>Url</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let link of links; let index = $index">
                    <td>{{ link.type }}</td>
                    <td>{{ link.title }}</td>
                    <td>{{ link.url }}</td>
                    <td>
                      <button class="btn btn-link" (click)="removeLink(index)">
                        rimuovi
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="form-group mt-5">
          <label>Testo</label>
          <!--<small class="form-text text-muted">
						il nome utente sarà generato in automatico</small
					>-->
          <div #lyricRef data-toggle="quill" id="lyricRef"></div>
        </div>
        <div class="form-group mt-5">
          <label>Accordi</label>
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

      <a (click)="location.back()" class="btn btn-block btn-link text-muted">
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

  @ViewChild("lyricRef")
  lyricElement: ElementRef;
  @ViewChild("chordRef")
  chordElement: ElementRef;
  lyricInput;
  id: string;
  title: string;
  song: SongModel;
  lyricEditor: any;
  chordEditor: any;
  categoriesArray: Array<Select2OptionData>;
  categories: [string];
  links: Array<ILinkModel>;
  typeModel = "null";
  urlModel: string;
  titleModel: string;

  editorConfig = {
    theme: "snow",
    modules: {
      toolbar: ["bold"],
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
      });
    });
  }

  onSaveOrUpdate(form: NgForm) {
    const data = new SongModel();
    data.title = form.value.title;
    data.keywords = SongUtil.createKeywords(data.title);
    const lyricHTML = this.lyricEditor.root.innerHTML;
    data.setHTML(lyricHTML); // .value per eseguire decode html to ASCII
    const chordHTML = this.chordEditor.root.innerHTML;
    data.setChordHTML(decodeURI(chordHTML)); // .value per eseguire decode html to ASCII

    //   return admin
    // 	.firestore()
    // 	.doc(`songs/${context.params.songId}`)
    // 	.update({
    // 	  keywords: utils.createKeywords(newSong?.title),
    // 	})
    // 	.then(() => {
    // 	  // Write to the algolia index
    // 	  const index = client.initIndex(ALGOLIA_INDEX_NAME);
    // 	  return index.saveObject(songAlgolia);
    // 	});

    if (this.categories && this.categories.length > 0) {
      data.categories = this.categories;
    }

    if (this.links && this.links.length > 0) {
      data.links = this.links as [ILinkModel];
    }

    if (this.id) {
      this.store
        .update(this.id, Object.assign({}, data))
        .then(() => {
          data.id = this.id;
          this.addOrUpdateAlgolia(data);
        })
        .then(() => alert("Canzone modificata con successo"))
        .catch((err) => console.error(err));
      return;
    }

    this.store
      .add(Object.assign({}, data))
      .then(async (res: DocumentReference) => {
        data.id = res.id;
        await this.addOrUpdateAlgolia(data);
      })
      .then(() => alert("Canzone aggiunto con successo"))
      .catch((err) => console.error(err));
  }

  onDelete() {
    const message = "Inserisci il titolo della canzone da eliminare";
    const titleToDelete = prompt(message, "");
    if (titleToDelete === this.song.title) {
      this.store
        .delete(this.id)
        .then(() => alert(`${this.song.title} eliminato!`));
    }
  }

  addLink() {
    if (!this.links) {
      this.links = new Array();
    }

    const data: ILinkModel = {
      type: this.typeModel,
      title: this.titleModel,
      url: this.urlModel,
    };
    this.links.push(data);
    console.log(data);
  }

  removeLink(index) {
    this.links.splice(index, 1);
  }

  categoriesLoad() {
    this.categoriesArray = categories.map((y: Category) =>
      Object.create({
        id: y.value,
        text: y.title,
      } as Select2OptionData)
    ) as [Select2OptionData];
  }

  async addOrUpdateAlgolia(song: SongModel) {
    const remoteConfig = firebase.remoteConfig();

    // Initialize Algolia, requires installing Algolia dependencies:
    // https://www.algolia.com/doc/api-client/javascript/getting-started/#install
    //
    // App ID and API Key are stored in functions config variables
    // const ALGOLIA_SEARCH_KEY = remoteConfig.getValue('algolia_search_key').asString();

    // await remoteConfig.getString("algolia_app_id")
    // const ALGOLIA_ID = "MYFNFA4QU7";
    // const ALGOLIA_ADMIN_KEY = "3ba30ae0f39e292ffed2a11e70ebbdbb";

	await remoteConfig.fetchAndActivate();
    const ALGOLIA_ID = remoteConfig.getString("algolia_app_id");
    const ALGOLIA_ADMIN_KEY = remoteConfig.getString("algolia_api_key");
    const ALGOLIA_INDEX_NAME = "dev_SONGS";
    const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

    // Add an 'objectID' field which Algolia requires
    const songAlgolia = {
      objectID: song.id,
      lyric: song.lyric,
      title: song.title,
    };

    // Write to the algolia index
    const index = client.initIndex(ALGOLIA_INDEX_NAME);
    return index.saveObject(songAlgolia);
    return;
  }
}
