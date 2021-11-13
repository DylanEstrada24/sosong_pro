import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import {persistStore, persistReducer} from 'redux-persist';
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";

import user from './reducers/user';
import cases from './reducers/cases';
import notice from './reducers/notice';
import schedule from './reducers/schedule';
import latest from './reducers/latest';

const reducer = combineReducers({
	user,
	cases,
	notice,
	schedule,
	latest,
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	whitelist: [
		'user',
		'cases',
		'notice',
		'schedule',
		'latest',
	],
	blacklist: [],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(
	persistedReducer,
	composeEnhancers(applyMiddleware(thunk)),
);
let persistor = persistStore(store);

export {persistor, store};
