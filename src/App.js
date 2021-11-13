
import 'react-native-gesture-handler';
import React from 'react';
import {YellowBox} from 'react-native';

import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import {NavigationActions} from 'react-navigation';
import NavigationService from './Navigation/NavigationService';

import Login from './Screen/Login';
import Enroll from './Screen/Enroll';
import Case from './Screen/Case';
import ToDo from './Screen/ToDo';
import WriteToDo from './Screen/ToDo/WriteToDo';
import ToDoExplan from './Screen/ToDo/ToDoExplan';
import Board from './Screen/Board';
import BoardWrite from './Screen/Board/BoardWrite';
import BoardDetail from './Screen/Board/BoardDetail';
import Setting from './Screen/Setting';
import License from './Screen/Setting/License';
import Policy from './Screen/Setting/Policy';
import Help from './Screen/Setting/Help';
import Schedule from './Screen/Schedule';
import CaseDetail from './Screen/Case/CaseDetail';
import NameSetting from './Screen/Setting/NameSetting';
import TerminSetting from './Screen/Setting/TerminSetting';
import TerminAllSetting from './Screen/Setting/TerminAllSetting';
import CaseAdd from './Screen/Case/CaseAdd';
import CaseAddSubstitute from './Screen/Case/CaseAddSubstitute';
import CustomerService from './Screen/Setting/CustomerService';
import Profile from './Screen/Setting/Profile';
import CheckUser from './Screen/Setting/CheckUser';
import WriteMemo from './Screen/Case/Detail/WriteMemo';
import CourtSelect from './Screen/Case/CourtSelect';
import YearSelect from './Screen/Case/YearSelect';
import MarkSelect from './Screen/Case/MarkSelect';
import Alarm from './Screen/Alarm';
import Memo from './Screen/Memo';
import Notice from './Screen/Notice';
import NoticeDetail from './Screen/Notice/NoticeDetail';
import PremiumMembership from './Screen/Setting/PremiumMembership';
import ChangePassword from './Screen/Setting/ChangePassword';
import WebViewPage from './Screen/WebViewPage'
import AdminMenu from './Screen/Admin'
import UserPermission from './Screen/Admin/UserPermission'
import WriteNotice from './Screen/Notice/WriteNotice';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/Ionicons';
import PushNotification from 'react-native-push-notification';
import { AppState } from 'react-native';
import PushController from './Common/PushController';
import SplashScreen from 'react-native-splash-screen'
import FindPwd from './Screen/FindPwd';
import EnrollForm from './Screen/Enroll/EnrollForm';
import AgeInfo from './Screen/Enroll/Termin/AgeInfo';
import Term from './Screen/Enroll/Termin/Term';
import Termin from './Screen/Enroll/Termin/Termin';
import Service from './Screen/Enroll/Termin/Service';
import Jeonja from './Screen/Case/Jeonja';
import LoadingScreen from './Screen/SplashScreen';
// import dynamicLinks from '@react-native-firebase/dynamic-links';
// import NavigationService from '@app/navigation/NavigationService';

const TabNavigator = createBottomTabNavigator(
	{
		사건: {
			screen: Case,
		},
		일정: {
			screen: Schedule,
		},
		작업: {
			screen: ToDo,
		},
		// 메모: {
		// 	screen: Memo,
		// },
		설정: {
			screen: Setting,
		}
	},
	{
		defaultNavigationOptions: ({navigation}) => ({
			tabBarIcon: ({horizontal, tintColor}) => {
				const {routeName} = navigation.state;
				let iconName;
				if (routeName === '사건') {
					iconName = 'documents-outline';
				} else if (routeName === '일정') {
					iconName = 'calendar-outline';
				} else if (routeName === '작업') {
					iconName = 'md-reader-outline';
				} else if (routeName === '메모') {
					iconName = 'ios-newspaper-outline';
				} else if (routeName === '설정') {
					iconName = 'ellipsis-horizontal-outline';
				}
				return (
					<Icon name={iconName} size={25} color={tintColor} style={{marginTop: 5}} />
				)
			}
		})
	}
)

// var user = store.getState().user

var initialRouteName = 'LoginScreen' // 앱 시작화면

// if((user.saveId === true || user.saveId === 'true') && (user.savePassword === true || user.savePassword === 'true') && user.email !== '' && user.password !== '') {
// 	console.log('aa')
// if(user.autoLogin === true || user.autoLogin === 'true') {
// 	console.log('bbbb')
// 	initialRouteName = 'TabNavigator'
// }
// }

const App = createStackNavigator(
	{
		LoginScreen: {
			screen: Login,
		},
		Enroll: {
			screen: Enroll,
		},
		TabNavigator: {
			screen: TabNavigator,
		},
		CaseDetail: {
			screen: CaseDetail,
			WriteToDo: {
				screen: WriteToDo,
			}
		},
		Help: {
			screen: Help,
		},
		License: {
			screen: License,
		},
		Policy: {
			screen: Policy,
		},
		TerminSetting: {
			screen: TerminSetting,
		},
		NameSetting: {
			screen: NameSetting,
		},
		WriteToDo: {
			screen: WriteToDo,
		},
		BoardWrite: {
			screen: BoardWrite,
		},
		BoardDetail: {
			screen: BoardDetail,
		},
		CaseAdd: {
			screen: CaseAdd,
		},
		CaseAddSubstitute: {
			screen: CaseAddSubstitute,
		},
		CustomerService: {
			screen: CustomerService,
		},
		Profile: {
			screen: Profile,
		},
		WriteMemo: {
			screen: WriteMemo,
		},
		CourtSelect: {
			screen: CourtSelect,
		},
		YearSelect: {
			screen: YearSelect,
		},
		MarkSelect: {
			screen: MarkSelect,
		},
		Alarm: {
			screen: Alarm,
		},
		Notice: {
			screen: Notice,
		},
		NoticeDetail: {
			screen: NoticeDetail,
		},
		PremiumMembership: {
			screen: PremiumMembership,
		},
		ChangePassword: {
			screen: ChangePassword,
		},
		WebViewPage: {
			screen: WebViewPage,
		},
		AdminMenu: {
			screen: AdminMenu,
		},
		UserPermission: {
			screen: UserPermission,
		},
		WriteNotice: {
			screen: WriteNotice,
		},
		FindPwd: {
			screen: FindPwd,
		},
		EnrollForm: {
			screen: EnrollForm
		},
		AgeInfo: {
			screen: AgeInfo
		},
		Term: {
			screen: Term
		},
		Termin: {
			screen: Termin
		},
		Service: {
			screen: Service
		},
		Jeonja: {
			screen: Jeonja
		},
		TerminAllSetting: {
			screen: TerminAllSetting,
		},
		CheckUser: {
			screen: CheckUser,
		},
		ToDoExplan: {
			screen: ToDoExplan
		},
	},
	{
		// initialRouteName: initialRouteName,
		headerMode: 'none',
		defaultNavigationOptions: {
			cardStyle: {
				backgroundColor: "#FFFFFF",
			}
		}
	},
);

// export default App;
// export default createAppContainer(App);

const AppContainer = createAppContainer(App);

class Export extends React.Component {
    async componentDidMount() {
        // AppState.addEventListener('change', this.handleAppStateChange);
        // Disabling warning messages box
        console.disableYellowBox = true;
        YellowBox.ignoreWarnings(['Warning:']);
		setTimeout(() => SplashScreen.hide(), 1000)
        // SplashScreen.hide();
        // Hiding the React Native SplashScreen
        console.log('after addEventListener')
    // }
    
        console.log('before did mount')
        console.log(Platform.OS)
        if (Platform.OS === 'android') {
            console.log('did and mount')
            dynamicLinks().getInitialLink().then(response => {
                if(response.url != null) {
                    // var linkData = (response.url).replace('https://eeumpay.page.link/?', '').split('&')
                    // var linkIdx;
                    // linkData.map((value, index) => {
                    //     var splitKeyValue = value.split('=')
                    //     if (index == 0) {
                    //         linkIdx = splitKeyValue[1]
                    //     }
                    // })
                    console.log("data get")
                    NavigationService.push('TabNavigator');
                    // NavigationService.push('LoginScreen');
                } else {
                    console.log("else data get")
                    NavigationService.push('TabNavigator');
                    // NavigationService.push('LoginScreen');
                }
                
            })
        } else {
            console.log('did ios mount')
            // Linking.getInitialURL().then(res => {
            //         dynamicLinks().resolveLink(res).then(response => {
            //             console.log('response from didmount'+response);
            //             // var linkData = (response.url).replace('https://eeumpay.page.link/?', '').split('&')
            //             // var linkIdx;
            //             // linkData.map((value, index) => {
            //             //     var splitKeyValue = value.split('=')
            //             //     if (index == 0) {
            //             //         linkIdx = splitKeyValue[1]
            //             //     }
            //             // })
            //             console.log("click push data")
            //             NavigationService.navigate('TabNavigator');
                        NavigationService.navigate('LoginScreen');
            //         })
            //     })
        }
        console.log('after did mount')
        //푸시 설정
        //앱 켜져있을때
        messaging().onMessage(async (remoteMessage) => {
            console.log('onMessage from data:',remoteMessage);
            // if(remoteMessage.data != {}) {
            //     var linkIdx = remoteMessage.data.idx;
            //     NavigationService.navigate('PurchaseProductPaymentScreen', { idx: linkIdx });
            // }
        });
        //앱 비활성일때
        messaging().setBackgroundMessageHandler(async (remoteMessage) => {
            console.log('setBackgroundMessageHandler from data:',remoteMessage);
            // if(remoteMessage.data != {}) {
            //     var linkIdx = remoteMessage.data.idx;
            //     NavigationService.navigate('PurchaseProductPaymentScreen', { idx: linkIdx });
            // }
        });
        //앱 켜져있을때
        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            console.log('onNotificationOpenedApp from data:',remoteMessage);
            // if(remoteMessage.data != {}) {
            //     var linkIdx = remoteMessage.data.idx;
            //     NavigationService.navigate('PurchaseProductPaymentScreen', { idx: linkIdx });
            // }
        });
        //앱이 꺼져있을때
        messaging().getInitialNotification()(async (remoteMessage) => {
            console.log('getInitialNotification from data:',remoteMessage);
            if(remoteMessage.data != {}) {
                // var linkIdx = remoteMessage.data.idx;
                NavigationService.push('TabNavigator');
                // NavigationService.push('LoginScreen');

            }
        });
        //푸시 설정 끝
    }

    // componentWillUnmount() {
        // console.log('unmiount')
        // Linking.removeEventListener('url', this.handleOpenURL);
		// AppState.removeEventListener('change', this.handleAppStateChange)
    // }

    // handleOpenURL = async event => {
    //     console.log('event::::::',event.url)
    //     console.log('current state ::',AppState.currentState )
    //     if (AppState.currentState == 'background' ||AppState.currentState == 'unknown') {
    //         dynamicLinks().resolveLink(event.url).then(response => {
    //             // var linkData = (response.url).replace('https://eeumpay.page.link/?', '').split('&')
    //             // var linkIdx;
    //             // linkData.map((value, index) => {
    //             //     var splitKeyValue = value.split('=')
    //             //     if (index == 0) {
    //             //         linkIdx = splitKeyValue[1]
    //             //     }
    //             // })
    //             console.log("push on")
    //             // NavigationService.navigate('PurchaseProductPaymentScreen', { idx: linkIdx });
    //         })
    //     } 
    // }


    // handleAppStateChange = nextAppState => {
    //     if (AppState.currentState == 'background' || AppState.currentState == 'unknown') {
	// 		// PushNotification.localNotificationSchedule({
	// 		// 	message: 'test',
	// 		// 	date: new Date(Date.now() + 10 * 1000)
	// 		// })
    //       if(store.getState().user.useLock == "Y"){
    //           console.log("locked!!!!")
    //         NavigationService.navigate("LockScreen",{mode:1,type:'confirm',background : true})
    //       }
    //     }
    //   };
// const Export = () => {
    render(){
        return (
			<Provider store={store}>
				<PersistGate loading={<LoadingScreen />} persistor={persistor}>
					<AppContainer
						ref={(navigatorRef) => {
							NavigationService.setTopLevelNavigator(navigatorRef);
						}}
					/>
				</PersistGate>
			</Provider>
		)
    }
	
}

export default Export;