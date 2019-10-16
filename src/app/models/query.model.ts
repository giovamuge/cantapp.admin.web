import { firestore } from 'firebase';
// tslint:disable-next-line: no-use-before-declare
export class QueryModel implements IQueryModel {
	constructor(
		property: string,
		operator: firestore.WhereFilterOp,
		value: any
	) {
		this.opertator = operator;
		this.property = property;
		this.value = value;
	}
	property: string;
	opertator: firestore.WhereFilterOp;
	value: any;
}

export interface IQueryModel {
	property: string;
	opertator: firestore.WhereFilterOp;
	value: any;
}
