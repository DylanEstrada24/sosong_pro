const setLatest = (latest) => {
	return {
		type: 'SET_LATEST',
		payload: latest,
	};
};

const clearLatest = () => {
	return {
		type: 'CLEAR_LATEST',
		payload: {},
	};
};

export {setLatest, clearLatest};