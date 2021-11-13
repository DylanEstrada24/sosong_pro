import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import All from '../Screen/Schedule/All'
import Termin from '../Screen/Schedule/Termin'
import ToDo from '../Screen/Schedule/ToDo'
import Memo from '../Screen/Schedule/Memo'

import { createAppContainer } from 'react-navigation';

const TabNavigator = createMaterialTopTabNavigator(
    {
        // 캘린더: {
		// 	screen: All
		// },
        기일: {
			screen: Termin
		},
		사용자: {
            screen: Memo
		},
        ToDo: {
            screen: ToDo
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

export default createAppContainer(TabNavigator);