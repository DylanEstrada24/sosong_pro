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
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { commonApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
// import { useSelector } from 'react-redux';

import { store } from '../../redux/store';
import { connect } from 'react-redux';
import { setUser, clearUser } from '../../redux/actions/user'; // action

import messaging from '@react-native-firebase/messaging';

import PushNotification from 'react-native-push-notification';
import { Modal } from 'react-native-paper';

// const user = await AsyncStorage.getItem('user');

var {user} = store.getState();

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
        }

        this.toggleCheckbox1 = this.toggleCheckbox1.bind(this)
        this.toggleCheckbox2 = this.toggleCheckbox2.bind(this)
		this.emailHandler = this.emailHandler.bind(this)
		this.passwordHandler = this.passwordHandler.bind(this)
		this.loginHandler = this.loginHandler.bind(this)
		this.localPush = this.localPush.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
    }

    toggleCheckbox1(newValue) {
        this.setState({saveId: newValue});
    }
    toggleCheckbox2(newValue) {
        this.setState({savePassword: newValue});
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

	async loginHandler() {

		// this.props.clearUser()

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

		commonApi('POST', 'auth/signin', user).then((data) => {
			if(data.success) {
				// console.log(data.data)

				loggedinUser = data.data

				// 가입승인단계 사용자
				if(loggedinUser.status === 'request') {
					this.setState({
						isVisible: true
					})
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
					userType: loggedinUser.userType,
					name: loggedinUser.name,
					userIdx: loggedinUser.idx,
				});

				// this.props.dispatchSetUser(data.data)
				this.setState({
					email: '',
					password: '',
				})
				this.props.navigation.navigate("TabNavigator")
			} else {
				// 회원정보가 일치하지않음.
				SimpleToast.show("아이디 혹은 비밀번호가 틀렸습니다.", SimpleToast.BOTTOM)
			}
		}).catch((err) => console.log(err));

	}

	async componentDidMount() {

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)

		const user = store.getState().user

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

		commonApi('POST', 'admin/auth/signin', user).then((data) => {
			if(data.success) {
				// console.log(data.data)

				loggedinUser = data.data

				this.props.setUser({
					email: loggedinUser.email,
					token: loggedinUser.token,
					goodchAccessToken: loggedinUser.token,
				});

				// this.props.dispatchSetUser(data.data)
				this.setState({
					email: '',
					password: '',
				})
				this.props.navigation.navigate("AdminMenu")
			} else {
				// 회원정보가 일치하지않음.
				SimpleToast.show("아이디 혹은 비밀번호가 틀렸습니다.", SimpleToast.BOTTOM)
			}
		}).catch((err) => console.log(err));
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
	
	render() {
		return (
			<View style={{flex: 1}}>
				<TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
					<View style={styles.loginContainer}>
						<View style={styles.titleContainer}>
							{/* <Text style={styles.title}>
								소송프로
							</Text> */}
							<Image source={require('../../assets/images/Logo.png')} />
						</View>
						<View style={styles.inputContainer}>
							<TextInput 
								value={this.state.email}
								style={styles.loginTextInput} 
								placeholder="ID를 입력해 주세요." 
								onChangeText={(value) => this.emailHandler(value)}
								onSubmitEditing={() => { this.secondTextInput.focus(); }}
							/>
							<TextInput 
								value={this.state.password}
								style={styles.loginTextInput} 
								placeholder="PW를 입력해 주세요." 
								onSubmitEditing={(e) => this.loginHandler(e)}
								onChangeText={(value) => this.passwordHandler(value)}
								secureTextEntry
								ref={(input) => { this.secondTextInput = input; }}
							/>
						</View>
						<View style={styles.checkboxContainer}>
							<View style={styles.checkboxItem}>
								<CheckBox style={styles.loginCheckbox} tintColors={{ true: '#2665A1', false: '#2665A1' }} value={this.state.saveId} onValueChange={(newValue) => this.toggleCheckbox1(newValue)} />
								<Text style={styles.loginCheckboxText}>아이디 저장</Text>
							</View>
							<View style={styles.checkboxItem}>
								<CheckBox style={styles.loginCheckbox} tintColors={{ true: '#2665A1', false: '#2665A1' }} value={this.state.savePassword} onValueChange={(newValue) => this.toggleCheckbox2(newValue)} />
								<Text style={styles.loginCheckboxText}>비밀번호 저장</Text>
							</View>
						</View>
						<View style={styles.textContainer}>
							{/* <Text style={styles.text}>
								아이디와 비밀번호는 본 어플리케이션에서 직접 <Text style={{color: '#F0842C'}}>전자소송</Text>에 로그인하기 위해 사용되며 <Text style={{color: '#F0842C'}}>회사에 제공되지 않습니다.</Text>
							</Text> */}
						</View>
						<View style={styles.buttonContainer}>
							{/* <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('TabNavigator')}> */}
							<TouchableOpacity style={styles.button} onPress={(e) => this.loginHandler(e)}>
								<Text style={styles.login}>로그인</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Enroll')}>
								<Text style={styles.login}>회원가입</Text>
							</TouchableOpacity>
							{/* <TouchableOpacity style={styles.button} onPress={() => this.localPush()}>
								<Text style={styles.login}>로컬푸시</Text>
							</TouchableOpacity> */}
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
								<Text style={{color: '#2665A1', fontSize: 20, fontWeight: 'bold'}}>
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
		// marginLeft: 138,
		// marginRight: 138,
		// marginTop: 140,
		marginBottom: 24,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		fontSize: 22,
		fontWeight: "700",
		textAlign: 'center',
	},
	inputContainer: {
		// marginLeft: 32,
		// marginRight: 32,
		alignItems: 'center',
		justifyContent: 'center',
		width: "80%",
	},
	loginTextInput: {
		width: '100%',
		height: 36,
		marginBottom: 7,
		fontSize: 13,
		fontWeight: "400",
		justifyContent: 'center',
		borderRadius: 5,
		backgroundColor: '#e5e5e5',
	},
	checkboxContainer: {
		// marginLeft: 50,
		// marginRight: 50,
		// marginBottom: 124,
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
		// marginLeft: 32,
		// marginRight: 32,
		// marginTop: 153,
		// marginBottom: 186,
		justifyContent: 'center',
		width: '80%',
	},
	button: {
		width: '100%',
		borderRadius: 5,
		// textAlign: 'center',
		backgroundColor: '#2665A1',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	login: {
		fontWeight: "bold",
		fontSize: 15,
		color: '#FFFFFF',
		padding: 10,
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
