const defaultState = {
	caseIdx: 0,
	title: '',
    court: '선택하세요',
    caseNumber: '',
	caseName: '',
    plaintiff: '',
    defendant: '',
	plaintiffDeputy: '',
	defendantDeputy: '',
	judiciary: '',
	receiptAt: '',
	mergeSeparation: '',
	fee: '',
	finalResult: '',
    name: '',
    representative: '',
    webToken: '',
	favorite: false,
	year: '선택하세요',
	mark: '선택하세요',
	party: [],
	representative: [],
	content: '',
	todos: [],
	memos: [],
};

function reducer(state = defaultState, {type, payload}) {
	switch (type) {
		case 'SET_CASE': {
			return {
				...state, 
				...payload,
			};
		}
		case 'CLEAR_CASE': {
			return defaultState;
		}
		default:
			return state;
	}
}

export default reducer;
