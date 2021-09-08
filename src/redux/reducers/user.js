const defaultState = {
	email: '',
	password: '',
	gender: 'm',
	joinAt: '',
	maxCase: 0,
	modifyAt: '',
	nickName: null,
	phoneNumber: '',
	status: '',
	token: '',
	webToken: '',
	fcmToken:  '',
	saveId: false,
	savePassword: false,
	sort: 'ASC',
	tempSort: 'ASC',
	userType: 'common',
	name: '',
	pushSetting: '',
	userIdx: '',
};

function reducer(state = defaultState, {type, payload}) {
	switch (type) {
		case 'SET_USER': {
			return {
				...state,
				...payload,
			};
		}
		case 'CLEAR_USER': {
			return defaultState;
		}
		default:
			return state;
	}
}

export default reducer;
