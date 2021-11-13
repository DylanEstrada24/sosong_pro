import React, {Component} from 'react';
import {
	View,
	Text,
	Button,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Image,
	Keyboard,
	BackHandler,
	Platform,
	Alert,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { commonApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';

import { store } from '../../redux/store';
import { connect } from 'react-redux';
import { setUser, clearUser } from '../../redux/actions/user'; // action

import messaging from '@react-native-firebase/messaging';
import Icon from 'react-native-vector-icons/AntDesign';
import PushNotification from 'react-native-push-notification';
import { Modal } from 'react-native-paper';
import NavigationService from '../../Navigation/NavigationService';
import * as RNIap from 'react-native-iap';


class Login extends Component {

	constructor() {
        super()
        this.state = {
            saveId: false,
			savePassword: false,
			email: '',
			password: '',
			fbToken: 'string',
			isVisible: false,
			autoLogin: false,
			secureTextEntry: false,
			showPassword: true,
			clicked: false,
        }

        this.toggleSaveId = this.toggleSaveId.bind(this)
        this.toggleSavePassword = this.toggleSavePassword.bind(this)
        this.toggleAutoLogin = this.toggleAutoLogin.bind(this)
		this.emailHandler = this.emailHandler.bind(this)
		this.passwordHandler = this.passwordHandler.bind(this)
		this.loginHandler = this.loginHandler.bind(this)
		this.localPush = this.localPush.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
		this.checkReceipt = this.checkReceipt.bind(this)
    }

    toggleSaveId(newValue) {
        this.setState({saveId: newValue});
    }
    toggleSavePassword(newValue) {
        this.setState({savePassword: newValue});
    }
    toggleAutoLogin(newValue) {
        this.setState({autoLogin: newValue});
    }
	emailHandler(value) {
		this.setState({email: value})
	}
	passwordHandler(value) {
		this.setState({password: value})
	}
	toggleModal() {
		this.setState({isVisible: !this.state.isVisible})
	}

	toggleClicked = (value) => this.setState({clicked: value})

	async checkReceipt() {
		
		let result
		let userType = 'common'

		let receipt = ''

		try {

		
			try {
				result = await RNIap.initConnection();
				await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
				if (result === false) {
					Alert.alert(ENV.language["couldn't get in-app-purchase information"]);
					return;
				}
			} catch (err) {
				console.debug('initConnection');
				console.error(err.code, err.message);
			}

			try {
				
				const purchases = await RNIap.getAvailablePurchases()

				console.log(purchases)
					
				receipt = purchases[0].transactionReceipt

				if(Platform.OS === 'android' && purchases[0].purchaseToken) {
					receipt = purchases[0].purchaseToken
				}

			} catch (err) {
				console.warn(err.code, err.message);
			}

			// getAvailablePurchases가 성공적으로 호출되어야 검증함
			console.log('131')
			if(receipt !== '') {
				// 토큰 검증 API
				await commonApi('GET', `purchase/${receipt}`, {}).then((res) => {
					console.log('135')
					if(res === success) {
						console.log('member!!')
						return 'member'
					} else {
						console.log('common..')
						return 'common'
					}
				}).catch((err) => SimpleToast.show('서버와 연결이 끊어졌습니다. \n나중에 다시 시도해주세요.', SimpleToast.BOTTOM))

			}
		} catch (err) {
			console.log(err)
		} finally {
			return userType
		}
	}

	async loginHandler() {


		const fcmToken = await messaging().getToken();
        console.log(fcmToken)

		Keyboard.dismiss();

		let loggedinUser;

		const user = {
			email: this.state.email,
			password: this.state.password,
			fbToken: this.state.fbToken,
		};

		if(user.email === '') {
			return SimpleToast.show("ID를 입력해주세요.", SimpleToast.BOTTOM);
		} else if(user.password === '') {
			return SimpleToast.show("PW를 입력해주세요.", SimpleToast.BOTTOM);
		} else if(user.email === 'admin@admin.com') { // 관리자 처리
			return this.adminLogin()
		}

		this.toggleClicked(true)

		await commonApi('POST', 'auth/signin', user).then((data) => {
			if(data.success) {

				this.toggleClicked(false)

				let receipt = '' // 구독여부 확인용
				let userType = 'common'

				// 구독이 돼었다가 끊겼으면 토스트 띄우기.
				// 로그인 시 구독정보 불러온 뒤 구독취소 / 구독만료 시 처리

				loggedinUser = data.data

				// 가입승인단계 사용자
				if(loggedinUser.status === 'request') {
					this.setState({
						isVisible: true
					})
					return 
				} else if(loggedinUser.status === 'reject') {
					SimpleToast.show("회원가입 승인이 거절되었습니다.", SimpleToast.BOTTOM)
					return
				}

				this.props.setUser({
					email: loggedinUser.email,
					password: this.state.password,
					gender: loggedinUser.gender,
					joinAt: loggedinUser.joinAt,
					maxCase: loggedinUser.maxCase,
					modifyAt: loggedinUser.modifyAt,
					nickName: loggedinUser.nickName,
					phoneNumber: loggedinUser.phoneNumber,
					status: loggedinUser.status,
					token: loggedinUser.token,
					webToken: loggedinUser.webToken,
					goodchAccessToken: loggedinUser.token,
					saveId: this.state.saveId,
					savePassword: this.state.savePassword,
					// 상용할때 체크해야함, dev: 'common' ... JY
					// userType: loggedinUser.userType, 
					userType: 'common',
					name: loggedinUser.name,
					userIdx: loggedinUser.idx,
					autoLogin: this.state.autoLogin,
					receipt: receipt,
				});

				this.setState({
					email: '',
					password: '',
				})
				this.props.navigation.navigate("TabNavigator")

			} else {
				// 회원정보가 일치하지않음.
				this.toggleClicked(false)
				SimpleToast.show(data.msg, SimpleToast.BOTTOM)
			}
		
		}).catch((err) => {
			this.toggleClicked(false)
			console.log(err)
			SimpleToast.show("서버와 연결이 끊어졌습니다. \n나중에 다시 시도해주세요.", SimpleToast.BOTTOM)
		});

	}

	async componentDidMount() {

		count = 0

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

		const user = store.getState().user

		console.log('login didmount user ',user)

		if(user.saveId) {
			this.setState({
				email: user.email,
				saveId: user.saveId
			})
		}

		if(user.savePassword) {
			this.setState({
				password: user.password,
				savePassword: user.savePassword
			})
		}

		if(user.autoLogin) {
			this.setState({
				autoLogin: user.autoLogin
			})
		}

	}

	componentWillUnmount() {
		this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	adminLogin() {

		let loggedinUser;

		const user = {
			email: this.state.email,
			password: this.state.password,
			fbToken: this.state.fbToken,
		};

		if(user.email === '') {
			return SimpleToast.show("ID를 입력해주세요.", SimpleToast.BOTTOM);
		} else if(user.password === '') {
			return SimpleToast.show("PW를 입력해주세요.", SimpleToast.BOTTOM);
		}

		this.toggleClicked(true)

		commonApi('POST', 'admin/auth/signin', user).then((data) => {
			if(data.success) {

				loggedinUser = data.data

				this.props.setUser({
					email: loggedinUser.email,
					token: loggedinUser.token,
					goodchAccessToken: loggedinUser.token,
				});

				this.setState({
					email: '',
					password: '',
				})
				this.toggleClicked(false)
				this.props.navigation.navigate("AdminMenu")
			} else {
				// 회원정보가 일치하지않음.
				this.toggleClicked(false)
				SimpleToast.show(data.msg, SimpleToast.BOTTOM)
			}
		}).catch((err) => {
			this.toggleClicked(false)
			SimpleToast.show("서버와 연결이 끊어졌습니다.", SimpleToast.BOTTOM)
		});
	}

	localPush() {
		PushNotification.localNotificationSchedule({
			message: 'test',
			date: new Date(Date.now())
		})
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

	handleShowPassword = () => {
		this.setState({showPassword: false});
	};
	
	handleHidePassword = () => {
		this.setState({showPassword: true});
	};
	
	
	render() {
		return (
			<View style={{flex: 1}}>
				<TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
					<View style={styles.loginContainer}>
						<View style={styles.titleContainer}>
							<Text style={styles.subTitle}>
								내 손안의 소송비서
							</Text>
							<Text style={styles.title}>
								소송프로
							</Text>
						</View>
						<View style={styles.inputContainer}>
							<View style={styles.textInputContainer}>
								<TextInput 
									value={this.state.email}
									style={styles.loginTextInput} 
									placeholder="ID를 입력해 주세요." 
									placeholderTextColor="#808080"
									onChangeText={(value) => this.emailHandler(value)}
									onSubmitEditing={() => { this.secondTextInput.focus(); }}
									autoCapitalize='none' 
								/>
							</View>
							<View style={styles.textInputContainer}>
								<TextInput 
									value={this.state.password}
									style={styles.loginTextInput} 
									placeholder="PW를 입력해 주세요." 
									placeholderTextColor="#808080"
									onSubmitEditing={(e) => this.loginHandler(e)}
									onChangeText={(value) => this.passwordHandler(value)}
									secureTextEntry={this.state.showPassword}
									ref={(input) => { this.secondTextInput = input; }}
									autoCapitalize='none' 
								/>
								<TouchableOpacity
									style={styles.rigthAction}
									onPressIn={this.handleShowPassword}
									onPressOut={this.handleHidePassword}>
									<Icon name="eyeo" style={styles.rigthIcon} />
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.checkboxContainer}>
							<View style={styles.checkboxItem}>
								<CheckBox style={styles.loginCheckbox} tintColors={{ true: '#0078d4', false: '#0078d4' }} value={this.state.saveId} onValueChange={(newValue) => this.toggleSaveId(newValue)} />
								<Text style={styles.loginCheckboxText}>아이디 저장</Text>
							</View>
							<View style={styles.checkboxItem}>
								<CheckBox style={styles.loginCheckbox} tintColors={{ true: '#0078d4', false: '#0078d4' }} value={this.state.savePassword} onValueChange={(newValue) => this.toggleSavePassword(newValue)} />
								<Text style={styles.loginCheckboxText}>비밀번호 저장</Text>
							</View>
						</View>
						<View style={styles.checkboxContainer}>
							<View style={styles.checkboxItem}>
								<CheckBox style={styles.loginCheckbox} tintColors={{ true: '#0078d4', false: '#0078d4' }} value={this.state.autoLogin} onValueChange={(newValue) => this.toggleAutoLogin(newValue)} />
								<Text style={styles.loginCheckboxText}>자동 로그인</Text>
							</View>
							<View style={styles.checkboxItem}/>
						</View>
						<View style={styles.textContainer}>
						</View>
						<View style={styles.buttonContainer}>
							<TouchableOpacity 
								style={[
									styles.button, 
									this.state.clicked ? {backgroundColor: '#C8C8C8'} : null
								]} 
								disabled={this.state.clicked ? true : false}
								onPress={(e) => this.loginHandler(e)}
							>
								<Text style={styles.login}>로그인</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.optionContainer}>
							<TouchableOpacity style={styles.underLine} onPress={() => this.props.navigation.navigate('Enroll')}>
								<Text style={styles.underLineText}>회원가입</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.underLine} onPress={() => this.props.navigation.navigate('FindPwd')}>
								<Text style={styles.underLineText}>비밀번호 찾기</Text>
							</TouchableOpacity>
						</View>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => this.toggleModal()}>
					<Modal visible={this.state.isVisible} onBackdropPress={() => this.toggleModal()}>
						<View style={{backgroundColor: '#FFF', borderRadius: 10, justifyContent: 'center', alignItems: 'center', margin: 50,}}>
							<View style={{justifyContent: 'center', alignItems: 'center', margin: 20,}}>
								<Text style={{fontSize: 14, fontWeight: 'bold'}}>
									변호사 인증이 필요합니다. {'\n'}아래 메일로 자료를 보내주시기 바랍니다.
								</Text>
								<Text style={{color: '#0078d4', fontSize: 20, fontWeight: 'bold'}}>
									sosongpro@gmail.com
								</Text>
							</View>
							<View style={styles.buttonContainer}>
								<TouchableOpacity style={styles.button} onPress={() => this.toggleModal()}>
									<Text style={styles.login}>확인</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>
				</TouchableWithoutFeedback>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	loginContainer: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	titleContainer: {
		marginBottom: 28,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: 130,
		height: 60,
	},
	subTitle: {
		fontSize: 12,
	},
	title: {
		fontSize: 40,
		fontWeight: "700",
		textAlign: 'center',
		color: '#0078D4',
	},
	inputContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		width: "80%",
	},
	textInputContainer: {
		width: '100%',
		height: 48,
	},
	loginTextInput: {
		width: '100%',
		height: 36,
		fontSize: 14,
		fontWeight: "400",
		justifyContent: 'center',
		borderRadius: 5,
		backgroundColor: '#e5e5e5',
		flexDirection: 'row',
		color: '#000',
	},
	rigthAction: {
		height: 36,
		width: 35,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: 0,
	},
	rigthIcon: {
		color: '#000',
		fontSize: 20,
	},
	checkboxContainer: {
		width: "80%",
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	checkboxItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	loginCheckbox: {

	},
	textContainer: {
		width: "73%",
		marginTop: 50,
		marginBottom: 25,
	},
	text: {
		flexWrap: 'nowrap',
	},
	buttonContainer: {
		justifyContent: 'center',
		width: '80%',
	},
	optionContainer: {
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		width: '80%',
	},
	button: {
		width: '100%',
		borderRadius: 5,
		backgroundColor: '#0078d4',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 40,
	},
	login: {
		fontWeight: "bold",
		fontSize: 15,
		color: '#FFFFFF',
		padding: 10,
	},
	underLine: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginBottom: 20,
	},
	underLineText: {
		fontSize: 14,
		fontWeight: 'bold',
		color: '#000',
		textDecorationLine: 'underline',
		textDecorationColor: '#000',
	},
})


const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		webToken: state.user.webToken,
	}
};

const mapDispatchToProps = {
	setUser, clearUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
