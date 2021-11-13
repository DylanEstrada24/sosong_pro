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
	sort: 'title',
	tempSort: 'title',
	url: 'user/case/userIdx/title/ASC',
	// sort: 'ASC',
	// tempSort: 'ASC',
	userType: 'common',
	name: '',
	pushSetting: '',
	userIdx: '',
	autoLogin: false,
	receipt: '',
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
