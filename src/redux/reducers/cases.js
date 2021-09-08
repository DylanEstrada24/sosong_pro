const defaultState = {
	caseIdx: 0,
	title: '',
    court: '',
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
