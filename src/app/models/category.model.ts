export interface Category {
	title: string;
	value: CategoryEnum;
}

// export enum CategoryEnum {
// 	ingresso,
// 	pace,
// 	agnellodidio,
// 	comunione,
// 	mariani,
// 	canoni,
// 	inni,
// 	quaresima,
// 	natale,
// 	finali,
// 	offertorio,
// 	credo,
// 	alleluia,
// 	gloria,
// 	signorepieta,
// }

export class CategoryEnum {
	static ingresso = 'ingresso';
	static pace = 'pace';
	static agnellodidio = 'agnellodidio';
	static comunione = 'comunione';
	static mariani = 'mariani';
	static canoni = 'canoni';
	static inni = 'inni';
	static quaresima = 'quaresima';
	static natale = 'natale';
	static finali = 'finali';
	static offertorio = 'offertorio';
	static credo = 'credo';
	static alleluia = 'alleluia';
	static gloria = 'gloria';
	static signorepieta = 'signorepieta';
}

export const categories = [
	{ value: CategoryEnum.agnellodidio, title: 'Agnello di Dio' },
	{ value: CategoryEnum.alleluia, title: 'Alleluia' },
	{ value: CategoryEnum.canoni, title: 'Canoni' },
	{ value: CategoryEnum.comunione, title: 'Comunione' },
	{ value: CategoryEnum.credo, title: 'Credo' },
	{ value: CategoryEnum.finali, title: 'Finali' },
	{ value: CategoryEnum.gloria, title: 'Gloria' },
	{ value: CategoryEnum.ingresso, title: 'Ingresso' },
	{ value: CategoryEnum.inni, title: 'Inni' },
	{ value: CategoryEnum.mariani, title: 'Mariani' },
	{ value: CategoryEnum.natale, title: 'Natale' },
	{ value: CategoryEnum.offertorio, title: 'Offertorio' },
	{ value: CategoryEnum.pace, title: 'Pace' },
	{ value: CategoryEnum.quaresima, title: 'Quaresima' },
	{ value: CategoryEnum.signorepieta, title: 'Signore Pietà' },
];
