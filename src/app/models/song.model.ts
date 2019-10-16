export interface ISongModel {
	id?: string;
	title: string;
	lyric: string;
}

export class SongModel implements ISongModel {
	id?: string;
	title: string;
	lyric: string;

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
			.replace(/<\/p>/g, '\n')
			.replace(/<br>/g, '\n')
			.replace(/(<strong>)/g, '{b}')
			.replace(/(<\/strong>)/g, '{/b}');
	}
}
