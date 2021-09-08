const defaultState = {
	idx: 0,
	title: '',
	createAt: '',
	content: '',
	updateAt: '',
};

function reducer(state = defaultState, {type, payload}) {
	switch (type) {
		case 'SET_NOTICE': {
			return {
				...state, 
				...payload,
			};
		}
		case 'CLEAR_NOTICE': {
			return defaultState;
		}
		default:
			return state;
	}
}

export default reducer;
