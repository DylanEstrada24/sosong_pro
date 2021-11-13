const defaultState = {
	progresses: [],
    todos: [],
    memos: [],
};

function reducer(state = defaultState, {type, payload}) {
	switch (type) {
		case 'SET_SCHEDULE': {
			return {
				...state,
				...payload,
			};
		}
		case 'CLEAR_SCHEDULE': {
			return defaultState;
		}
		default:
			return state;
	}
}

export default reducer;
