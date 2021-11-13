const defaultState = {
	courts: [],
    marks: [],
};

function reducer(state = defaultState, {type, payload}) {
	switch (type) {
		case 'SET_LATEST': {
			return {
				...state,
				...payload,
			};
		}
		case 'CLEAR_LATEST': {
			return defaultState;
		}
		default:
			return state;
	}
}

export default reducer;
