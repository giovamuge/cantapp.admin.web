"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createKeywords = (name) => {
    const arrName = [];
    let curName = '';
    name.split('').forEach((letter) => {
        curName += letter;
        arrName.push(curName);
    });
    return arrName;
};
exports.generateKeywords = (names) => {
    const [first, middle, last, sfx] = names;
    const suffix = sfx.length > 0 ? ` ${sfx}.` : '';
    const keywordNameWidthoutMiddleName = exports.createKeywords(`${first} ${last}${suffix}`);
    const keywordFullName = exports.createKeywords(`${first} ${middle} ${last}${suffix}`);
    const keywordLastNameFirst = exports.createKeywords(`${last}, ${first} ${middle}${suffix}`);
    const middleInitial = middle.length > 0 ? ` ${middle[0]}.` : '';
    const keywordFullNameMiddleInitial = exports.createKeywords(`${first}${middleInitial} ${last}${suffix}`);
    const keywordLastNameFirstMiddleInitial = exports.createKeywords(`${last}, ${first}${middleInitial}${suffix}`);
    return [
        ...new Set([
            '',
            ...keywordFullName,
            ...keywordLastNameFirst,
            ...keywordFullNameMiddleInitial,
            ...keywordLastNameFirstMiddleInitial,
            ...keywordNameWidthoutMiddleName,
        ]),
    ];
};
//# sourceMappingURL=utils.js.map