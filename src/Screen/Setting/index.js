import React, {Component} from 'react';
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	StyleSheet,
	BackHandler,
	Dimensions,
	ScrollView
} from 'react-native';

import SettingItem from './SettingItem';
import NavigationService from '../../Navigation/NavigationService';
import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';
import { setUser, clearUser } from '../../redux/actions/user';
import { connect } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';

class Setting extends Component {

	constructor(props) {
		super(props)
		this.state = ({
			info: {
				email: '',
				gender: '',
				joinAt: '',
				maxCase: '',
				nickName: '',
				phoneNumber: '',
				pushSetting: '',
				status: '',
				name: '',
				userType: '',
			}
		})

		this.logout = this.logout.bind(this)
	}

	async componentDidMount() {

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

		commonApi('GET', 'user/info', {}).then((data) => {
			// console.log(data[0])

			this.setState({
				...this.state,
				info: data[0]
			})

			this.props.setUser({
				pushSetting: data[0].pushSetting
			})

			// console.log(this.state.info)
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))


	}

	componentWillUnmount() {
		this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	logout() {
		this.props.clearUser()
		// this.props.navigation.pop()
		// NavigationService.push('LoginScreen');
		this.props.navigation.navigate('LoginScreen')
	}

	handleBackButton = () => {

		if (!this.props.navigation.isFocused()) {
			// The screen is not focused, so don't do anything
			return false;
		}
        // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        if (this.exitApp == undefined || !this.exitApp) {
            SimpleToast.show('한번 더 누르시면 종료됩니다.', SimpleToast.BOTTOM);
            this.exitApp = true;

            this.timeout = setTimeout(
                () => {
                    this.exitApp = false;
                },
                2000    // 2초
            );
        } else {
            clearTimeout(this.timeout);

            BackHandler.exitApp();  // 앱 종료
        }
        return true;
    }

	render() {

		const userType = store.getState().user.userType === 'common' ? '일반회원' : '플러스멤버'
		const payInfo = store.getState().user.userType === 'common' ? '멤버십 등록' : '멤버십 확인'

		return (
			<View style={{flex: 1}}>
				<View style={styles.headerContainer}>
					{/* <View style={styles.backButton}>
						<Image source={require('../../assets/images/CaretLeft.png')} />
					</View> */}
					<View style={styles.headerLeft}>
						<Text style={styles.writeToDoTitle}>
							설정
						</Text>
					</View>
					<View style={styles.headerRight}>
					</View>
				</View>
				<ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
					<View style={styles.settingContainer}>
						<View style={styles.itemListContainer}>
							<View style={styles.itemContainer, styles.bottomLine}>
								{/* <SettingItem title={this.state.info.email + "님"} content="일반회원" topItem /> */}
								<SettingItem title={`${this.state.info.name}`} content={userType} topItem />
							</View>
							<TouchableOpacity style={styles.itemContainer, styles.bottomLine} onPress={() => this.props.navigation.navigate('CheckUser')}>
								<SettingItem title="내정보 변경" content="변경하기" isMore />
							</TouchableOpacity>
							
							{/* <TouchableOpacity style={styles.itemContainer}>
								<SettingItem title="업무관련직 인증" content="인증하기" isMore />
							</TouchableOpacity> */}
							{/* <TouchableOpacity style={styles.itemContainer}>
								<SettingItem title="변호사 인증" content="인증하기" isMore />
							</TouchableOpacity> */}
						</View>
						<View style={styles.itemListContainer}>
							<TouchableOpacity style={styles.itemContainer, styles.bottomLine} onPress={() => this.props.navigation.navigate('PremiumMembership')}>
								<SettingItem title="멤버십 관리" isMore />
							</TouchableOpacity>
						</View>
						<View style={styles.itemListContainer}>
							<TouchableOpacity style={styles.itemContainer, styles.bottomLine} onPress={() => this.props.navigation.navigate('Notice')}>
								<SettingItem title="공지사항" isMore />
							</TouchableOpacity>
							<TouchableOpacity style={styles.itemContainer, styles.bottomLine} onPress={() => this.props.navigation.navigate('Help')}>
								<SettingItem title="자주묻는 질문" isMore />
							</TouchableOpacity>
							<TouchableOpacity style={styles.itemContainer, styles.bottomLine} onPress={() => this.props.navigation.navigate('CustomerService')}>
								<SettingItem title="고객센터" isMore />
							</TouchableOpacity>
						</View>
						{/* <View style={styles.itemListContainer}>
							<TouchableOpacity style={styles.itemContainer, styles.bottomLine} onPress={() => this.props.navigation.navigate('TerminAllSetting')}>
								<SettingItem title="기일 알림 설정" isMore />
							</TouchableOpacity>
						</View> */}

						{/* 전일/당일 기일알림설정 부분입니다 */}

						{/* <View style={styles.itemListContainer}>
							<TouchableOpacity style={styles.itemContainer, styles.bottomLine} onPress={() => this.props.navigation.navigate('TerminSetting')}>
								<SettingItem title="기일 알림 설정" isMore />
							</TouchableOpacity>
						</View> */}
						<View style={styles.itemListContainer}>
							<TouchableOpacity style={styles.itemContainer, styles.bottomLine} onPress={() => this.props.navigation.navigate('License')}>
								<SettingItem title="약관 등 법적 고지" isMore />
							</TouchableOpacity>
							{/* <TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.navigate('Policy')}>
								<SettingItem title="개인정보 보호 약관" isMore />
							</TouchableOpacity> */}
						</View>
						<TouchableOpacity style={styles.buttonContainer} onPress={() => this.logout()}>
							<Button style={styles.logout} color="#0078d4" title="로그아웃" onPress={() => this.logout()}/>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	}
};

const mapDispatchToProps = {
	setUser, clearUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Setting)

const styles = StyleSheet.create({
	headerContainer: {
		marginTop: 10,
        marginBottom: 15,
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: 'flex-start',
		// justifyContent: 'flex-start',
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
		paddingBottom: 2,
	},
	headerLeft: {
        marginLeft: Dimensions.get('window').width / 20
	},
	writeToDoTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
	headerRight: {
        marginRight: Dimensions.get('window').width / 20
	},
	settingContainer: {
		flex: 1,
		width: '100%',
		justifyContent: "center",
		alignItems: "center",
	},
	itemListContainer: {
		width: "80%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingTop: 15,
		paddingBottom: 15,
	},
	buttonContainer: {
		justifyContent: 'center',
		width: "80%",
		marginTop: 50,
		marginBottom: 50
	},
	logout: {
		width: '100%',
		borderRadius: 5,
		textAlign: 'center',
		fontWeight: "600",
		fontSize: 15,
		// marginTop: 30,
	},
	itemContainer: {
		// marginLeft: Dimensions.get('window').width / 10,
		// marginRight: Dimensions.get('window').width / 10,
	},
	bottomLine: {
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
});