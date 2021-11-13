import React from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import CaseDetailContent from '../Screen/Case/Detail/CaseDetailContent'
import CaseDefaultContent from '../Screen/Case/Detail/CaseDefaultContent'
import CaseToDo from '../Screen/Case/Detail/CaseToDo'
import CaseMemo from '../Screen/Case/Detail/CaseMemo'
import { createAppContainer } from 'react-navigation';
import WriteToDo from '../Screen/ToDo/WriteToDo';
import WriteMemo from '../Screen/Case/Detail/WriteMemo';
import { createStackNavigator } from 'react-navigation-stack';

const TabNavigator = createMaterialTopTabNavigator(
    {
        진행내용: {
			// screen: (props) => <CaseDetailContent screenProps={props.screenProps} navigation={props.navigation} buttonHandler={buttonHandler(false, '')}/>,
			screen: (props) => <CaseDetailContent screenProps={props.screenProps} navigation={props.navigation} />,
            navigationOptions: {
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    // navigation.getScreenProps().goFirstPage();
                    // navigation.replace('DepositMain');
                    defaultHandler()
                },
            }
            
		},
        일반내용: {
			// screen: (props) => <CaseDefaultContent screenProps={props.screenProps} navigation={props.navigation} buttonHandler={buttonHandler(false, '')}/>,
			screen: (props) => <CaseDefaultContent screenProps={props.screenProps} navigation={props.navigation} />,
            navigationOptions: {
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    // navigation.getScreenProps().goFirstPage();
                    // navigation.replace('DepositMain');
                    defaultHandler()
                },
            }
            
		},
		ToDo: {
			// screen: (props) => <CaseToDo screenProps={props.screenProps} navigation={props.navigation} buttonHandler={buttonHandler(true, 'WriteTodo')}/>,
			screen: (props) => <CaseToDo screenProps={props.screenProps} navigation={props.navigation} />,
            navigationOptions: {
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    // navigation.getScreenProps().goFirstPage();
                    // navigation.replace('DepositMain');
                    defaultHandler()
                },
            }
            
		},
		메모: {
			// screen: (props) => <CaseMemo screenProps={props.screenProps} navigation={props.navigation} buttonHandler={buttonHandler(true, 'WriteMemo')}/>,
			screen: (props) => <CaseMemo screenProps={props.screenProps} navigation={props.navigation} />,
            navigationOptions: {
                tabBarOnPress: ({ navigation, defaultHandler }) => {
                    // navigation.getScreenProps().goFirstPage();
                    // navigation.replace('DepositMain');
                    defaultHandler()
                },
            }
            
		},
    },
    {
        animationEnabled: false,
        swipeEnabled: false,
        tabBarOptions: {
            pressColor: 'black',
            style: {
                backgroundColor: "#FFFFFF",
            },
            indicatorStyle: {
                backgroundColor: "#0078d4",
            },
            activeTintColor: '#000',
            inactiveTintColor: '#C7C7C7'
        }
    }
);

const StackNavigator = createStackNavigator(
    {
        WriteToDo: {
            screen: WriteToDo,
        },
        WriteMemo: {
            screen: WriteMemo,
        },
        TabNavigator: {
            screen: TabNavigator,
        }
    },
    {
        initialRouteName: 'TabNavigator',
        headerMode: 'none',
		defaultNavigationOptions: {
			cardStyle: {
				backgroundColor: "#FFFFFF",
			}
		}
    }
)

export default createAppContainer(StackNavigator);