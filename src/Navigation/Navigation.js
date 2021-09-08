import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 

import Login from '../Screen/Login';

const LoginStack = createStackNavigator();
const LoginStackScreen = () => {
	<LoginStack.Navigator>
		<LoginStack.Screen name="Login" component={Login} />
	</LoginStack.Navigator>
};

export default () => {
	<NavigationContainer>
		<LoginStackScreen />
	</NavigationContainer>
}