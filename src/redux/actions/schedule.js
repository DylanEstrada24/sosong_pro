const setSchedule = (schedule) => {
	return {
		type: 'SET_SCHEDULE',
		payload: schedule,
	};
};

const clearSchedule = () => {
	return {
		type: 'CLEAR_SCHEDULE',
		payload: {},
	};
};

export {setSchedule, clearSchedule};
