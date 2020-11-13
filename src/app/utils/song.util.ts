import { Injectable } from "@angular/core";

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
}
