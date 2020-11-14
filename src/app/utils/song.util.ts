import { Injectable } from "@angular/core";
import { SongModel } from "../models/song.model";

export class SongUtil {
  static createKeywords = (name: string) => {
    const arrName: Array<string> = [""];
    let curName = "";
    name.split("").forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName as [string];
  };

  static onSortSong = (a: SongModel, b: SongModel) => {
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
