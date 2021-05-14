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
                        <small
                            >Inserisci una
                            <a routerLink="/it/songs/crud"
                                >nuova canzone
                            </a></small
                        >
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
                        <span class="badge badge-primary badge-pill">{{
                            song.number
                        }}</span>
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
        <div class="row">
            <div class="col mt-3">
                <nav aria-label="Page navigation">
                    <ul class="pagination">
                        <li class="page-item">
                            <button
                                class="page-link"
                                (click)="prevPage()"
                                [disabled]="isFirst"
                            >
                                Previous
                            </button>
                        </li>
                        <li class="page-item">
                            <button
                                class="page-link"
                                (click)="nextPage()"
                                [disabled]="songs?.length < pageSize"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    `,
})
export class ListSongComponent implements OnInit {
    constructor(private store: SongStore, private db: AngularFirestore) {}

    searchSong: string;
    songs: Array<SongModel>;
    songsData: Array<SongModel>;
    searchName: string;
    pageSize = 10;
    isFirst = true;
    // first: SongModel;
    // last: SongModel;

    ngOnInit() {
        this.firstPage();
    }

    onSearch(form: NgForm) {
        this.searchName = form.value.searchName.toLowerCase();
        this.firstPage();
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

    firstPage = () => {
        this.isFirst = true;
        this.buildReference().limit(this.pageSize).get().then(this.onResult);
    };

    nextPage = () => {
        this.isFirst = false;
        const last = this.songs[this.songs.length - 1]['title'];
        console.log(last);
        return this.buildReference()
            .startAfter(last)
            .limit(this.pageSize)
            .get()
            .then(this.onResult);
    };

    prevPage = () => {
        this.isFirst = false;
        const first = this.songs[0]['title'];
        console.log(first);
        return this.buildReference()
            .endBefore(first)
            .limitToLast(this.pageSize)
            .get()
            .then(this.onResult);
    };

    buildReference = () => {
        let ref = this.db.collection<SongModel>('songs').ref;
        if (this.searchName) {
            ref = this.buildQuery(ref, this.searchName);
        }

        return ref.orderBy('title');
    };

    buildQuery = (ref, value) => {
        return ref.where('keywords', 'array-contains', value);
    };

    onResult = (y) => {
        const datas: [{}] = [{}];
        y.forEach((k) => datas.push({ id: k.id, ...k.data() }));
        datas.splice(0, 1);
        // console.log(datas);
        this.songs = this.songsData = datas as [SongModel];
    };
}
