
export const createKeywords = (name: String) => {
	const arrName: Array<String> = [];
	let curName = '';
	name.split('').forEach((letter) => {
		curName += letter;
		arrName.push(curName);
	});
	return arrName;
};

export const generateKeywords = (names: Array<String>) => {
	const [first, middle, last, sfx] = names;
	const suffix = sfx.length > 0 ? ` ${sfx}.` : '';
	const keywordNameWidthoutMiddleName = createKeywords(
		`${first} ${last}${suffix}`
	);
	const keywordFullName = createKeywords(
		`${first} ${middle} ${last}${suffix}`
	);
	const keywordLastNameFirst = createKeywords(
		`${last}, ${first} ${middle}${suffix}`
	);

	const middleInitial = middle.length > 0 ? ` ${middle[0]}.` : '';
	const keywordFullNameMiddleInitial = createKeywords(
		`${first}${middleInitial} ${last}${suffix}`
	);
	const keywordLastNameFirstMiddleInitial = createKeywords(
		`${last}, ${first}${middleInitial}${suffix}`
	);
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
