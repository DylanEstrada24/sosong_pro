const setNotice = (notice) => {
	return {
		type: 'SET_NOTICE',
		payload: notice,
	};
};

const clearNotice = () => {
	return {
		type: 'CLEAR_NOTICE',
		payload: {},
	};
};

export {setNotice, clearNotice};
