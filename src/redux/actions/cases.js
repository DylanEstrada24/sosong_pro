const setCase = (cases) => {
	return {
		type: 'SET_CASE',
		payload: cases,
	};
};

const clearCase = () => {
	return {
		type: 'CLEAR_CASE',
		payload: {},
	};
};

export {setCase, clearCase};