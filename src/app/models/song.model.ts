export interface ISongModel {
	id?: string;
	title: string;
	lyric: string;
	chord: string;
	categories?: [string];
	links?: [ILinkModel];
	numberViews: number;
	CreatedAt: Date;
	UpdatedAt?: Date;
	artist: string;
	keywords: [string];
}

export class SongModel implements ISongModel {
	id?: string;
	title: string;
	lyric: string;
	chord: string;
	categories?: [string];
	links?: [ILinkModel];
	numberViews: number;
	CreatedAt: Date;
	UpdatedAt?: Date;
	artist: string;
	keywords: [string];

	get lyricHtml() {
		if (!this.lyric) {
			return '';
		}

		return this.lyric
			.replace(/{\/b}/g, '</strong>')
			.replace(/{b}/g, '<strong>')
			.replace(/\n/g, '<br>');
	}

	/**
	 * Imposta lyric da HTML
	 * passa il valore in formato HTML
	 */
	setHTML(value: string) {
		this.lyric = value
			.replace(/<p>/g, '')
			.replace(/&nbsp;/g, ' ')
			.replace(/<em>/g, '')
			.replace(/<\/em>/g, '')
			.replace(/<\/p>/g, '\n')
			.replace(/<br>/g, '\n')
			.replace(/(<strong>)/g, '{b}')
			.replace(/(<\/strong>)/g, '{/b}');
	}

	get chordHtml() {
		if (!this.chord) {
			return '';
		}

		return this.chord
			.replace(/{\/b}/g, '</strong>')
			.replace(/{b}/g, '<strong>')
			.replace(/\n/g, '<br>');
	}

	/**
	 * Imposta lyric da HTML
	 * passa il valore in formato HTML
	 */
	setChordHTML(value: string) {
		this.chord = value
			.replace(/<p>/g, '')
			.replace(/&nbsp;/g, ' ')
			.replace(/<\/em>/g, '')
			.replace(/<\/p>/g, '\n')
			.replace(/<\/p>/g, '\n')
			.replace(/<br>/g, '\n')
			.replace(/(<strong>)/g, '{b}')
			.replace(/(<\/strong>)/g, '{/b}');
	}
}

export interface ILinkModel {
	title: string;
	type: string;
	url: string;
}
