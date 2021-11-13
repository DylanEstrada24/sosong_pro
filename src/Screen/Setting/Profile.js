import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
    Image,
	Button,
	StyleSheet,
	Dimensions,
	Keyboard,
	KeyboardAvoidingView,
	Alert,
} from 'react-native';
import BlueDot from '../../Components/BlueDot';

import Util from '../../Common/Util'
import HeaderText from '../../Components/HeaderText';
import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';
import SimpleToast from 'react-native-simple-toast';
import Icon from 'react-native-vector-icons/AntDesign';
import NavigationService from '../../Navigation/NavigationService';

class Profile extends Component {

	constructor(props) {
		super(props)
		this.state = ({
			email: '',
			name: '',
			password: '',
			passwordConfirm: '',
			phoneNumber: '',
			secureTextEntry: false,
			showPassword: true,
			showPasswordConfirm: true,
		})

		this.modifyHandler = this.modifyHandler.bind(this)
		this.alertHandler = this.alertHandler.bind(this)
		this.withdrawHandler = this.withdrawHandler.bind(this)
	}

	componentDidMount() {
		const user = store.getState().user;

		let phoneNumber = user.phoneNumber.replace(/-/gi, '')
		this.setState({
			email: user.email,
			// name: user.name,
			phoneNumber: phoneNumber
		})
	}

	onEmailHandle = (email) => this.setState({email})

	onPasswordHandle = (password) => this.setState({password})

	onPasswordConfirmHandle = (passwordConfirm) => this.setState({passwordConfirm})

	onPhoneNumberHandle = (phoneNumber) => this.setState({phoneNumber})

	handleShowPassword = () => {
		this.setState({showPassword: false});
	};
	
	handleHidePassword = () => {
		this.setState({showPassword: true});
	};

	handleShowPasswordConfirm = () => {
		this.setState({showPasswordConfirm: false})
	}
	
	handleHidePasswordConfirm = () => {
		this.setState({showPasswordConfirm: true})
	}

	modifyHandler() {

		Keyboard.dismiss();

		if (!Util.isValidEmail(this.state.email)) {
			this.setState({
				isLoading: false,
				errorMsg: 'Invalid email address',
			});
			return;
		}

		if (!Util.phoneCheck(this.state.phoneNumber)) {
			this.setState({
				isLoading: false,
				errorMsg: 'You must include a phone number',
			});
			SimpleToast.show("휴대폰번호를 양식에 맞게 입력해주세요.", SimpleToast.BOTTOM)
			return;
		}

		if (!Util.passwordTest2(this.state.password)) {
			this.setState({
				isLoading: false,
				errorMsg: 'You must include a password',
			});
			SimpleToast.show("비밀번호를 양식에 맞게 입력해주세요.", SimpleToast.BOTTOM)
			return;
		}

		if (this.state.passwordConfirm === '') {
			this.setState({
				isLoading: false,
				errorMsg: 'You must include a password confirm',
			});
			return;
			SimpleToast.show("비밀번호 확인을 입력해주세요.", SimpleToast.BOTTOM)
		}

		if(this.state.password !== this.state.passwordConfirm) {
			this.setState({
				passwordConfirm: '',
				isLoading: false,
				errorMsg: 'You must check a password confirm',
			});
			SimpleToast.show("비밀번호 확인을 정확히 입력해주세요.", SimpleToast.BOTTOM)
			return;
		}

		let phoneNumber = Util.autoHypenPhone(this.state.phoneNumber)


		let url = 'auth/update/' + this.state.email + '/m/' + phoneNumber

		const password = {
			email: this.state.email,
			password: store.getState().user.password,
			newPassword: this.state.password
		}


		commonApi('PUT', url, {}).then((data) => {
			console.log(data)
			this.props.setUser({
				email: this.state.email,
				phoneNumber: this.state.phoneNumber,
			})
			// this.props.navigation.pop();
		}).then(() => {

			commonApi('POST', 'auth/update/pwd', password).then((result)=> {
				console.log(result)
				this.props.setUser({
					password: ''
				})
				SimpleToast.show("비밀번호가 변경되었습니다. 다시 로그인해주세요.", SimpleToast.BOTTOM)
				this.props.navigation.navigate('LoginScreen')
			// }).catch((err) => console.log('auth/update/pwd', err))
			}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

		// }).catch((err) => console.log(url, err))
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

	}

	alertHandler() {
		Alert.alert(
			"회원탈퇴",
			"정말 회원탈퇴하시겠습니까?",
			[
				{
					text: "아니요",
					// onPress: () => console.log("아니라는데"),
					style: "cancel"
				},
				{ 
					text: "네",
					onPress: () => this.withdrawHandler(),
					style: 'default',
				},
					
			]
		)
	}

	async withdrawHandler() {
		commonApi('DELETE', 'auth/withdrawal', {}).then((result) => {
			if(result.success) {
				SimpleToast.show("회원탈퇴 완료", SimpleToast.BOTTOM)
				NavigationService.navigate("LoginScreen")
			} else {
				SimpleToast.show(result.msg, SimpleToast.BOTTOM)
			}
		// }).catch((err) => console.log('widthrawal error ', err))
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
	}

	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				{/* <KeyboardAvoidingView style={{flex: 1,}} enabled={false}> */}
					<View style={styles.headerContainer}>
						<View style={styles.headerLeft}>
							<HeaderText title="내 정보 변경" />
						</View>
						<View style={styles.headerRight}>
							<TouchableOpacity onPress={() => NavigationService.navigate("TabNavigator")}>
								<Image source={require('../../assets/images/X.png')} />
							</TouchableOpacity>
						</View>
					</View>
					<View style={{flex: 9}}>
						<ScrollView>
							<View style={{flex: 0.85, width: "90%", marginLeft: "5%", marginRight: "5%", marginBottom: 5,}}>
								<View style={styles.itemContainer}>
									<View style={styles.titleContainer}>
										<View style={styles.title}>
											{/* <BlueDot /> */}
											<Text style={styles.titleText}>이메일 아이디 (변경불가)</Text>
										</View>
										{/* <View style={styles.titleContent}>
											<Text style={styles.titleText}>{this.state.email}</Text>
										</View> */}
									</View>
									<View style={styles.contentContainer}>
										<Text style={styles.input}>{this.state.email}</Text>
									</View>
									{/* <View style={styles.contentContainer}>
										<TextInput 
											style={styles.input} 
											placeholder="sosongpro@gmail.com" 
											placeholderTextColor="#808080"
											onChangeText={this.onEmailHandle}
											value={this.state.email}
											
										/>
									</View> */}
									<View style={styles.titleContainer}>
										<View style={styles.title}>
											{/* <BlueDot /> */}
											<Text style={styles.titleText}>이름</Text>
										</View>
										{/* <View style={styles.titleContent}>
											<Text style={styles.titleText}>{store.getState().user.name}</Text>
										</View> */}
									</View>
									<View style={styles.contentContainer}>
										<Text style={styles.input}>{store.getState().user.name}</Text>
									</View>
									<View style={styles.titleContainer}>
										<View style={styles.title}>
											{/* <BlueDot /> */}
											<Text style={styles.titleText}>휴대폰 번호</Text>
										</View>
									</View>
									<View style={styles.contentContainer}>
										<TextInput 
											style={styles.input} 
											value={this.state.phoneNumber}
											onChangeText={this.onPhoneNumberHandle}
											keyboardType='numeric'
											placeholder="01012345678" 
											placeholderTextColor="#808080"
										/>
									</View>
									<View style={styles.titleContainer}>
										<View style={styles.title}>
											{/* <BlueDot /> */}
											<Text style={styles.titleText}>비밀번호 변경</Text>
										</View>
									</View>
									<View style={styles.contentContainer}>
										<TextInput 
											style={styles.input} 
											placeholder="새로운 비밀번호를 입력해주세요" 
											placeholderTextColor="#808080"
											onChangeText={this.onPasswordHandle}
											value={this.state.password}
											secureTextEntry={this.state.showPassword}
										/>
										<TouchableOpacity
											style={styles.rigthAction}
											onPressIn={this.handleShowPassword}
											onPressOut={this.handleHidePassword}>
											<Icon name="eyeo" style={styles.rigthIcon} />
										</TouchableOpacity>
									</View>
									<View style={styles.contentContainer}>
										<TextInput 
											style={styles.input} 
											placeholder="다시 한번 입력해주세요" 
											placeholderTextColor="#808080"
											onChangeText={this.onPasswordConfirmHandle}
											value={this.state.passwordConfirm}
											secureTextEntry={this.state.showPasswordConfirm}
										/>
										<TouchableOpacity
											style={styles.rigthAction}
											onPressIn={this.handleShowPasswordConfirm}
											onPressOut={this.handleHidePasswordConfirm}>
											<Icon name="eyeo" style={styles.rigthIcon} />
										</TouchableOpacity>
									</View>
									<View style={styles.info}>
										<Text style={styles.infoText}>· 특수문자 포함 8자리 이상 입력해 주세요</Text>
									</View>
									<View style={[styles.contentContainer, {marginTop: 20,}]}>
										<TouchableOpacity style={styles.nextButton} onPress={this.modifyHandler}>
											<Text style={styles.nextButtonText}>내 정보 변경</Text>
										</TouchableOpacity>
									</View>
									<View style={styles.horizontalLine} />
									<View style={[styles.info, {marginLeft: 0}]}>
										<Text style={styles.withdrawText}>회원탈퇴</Text>
									</View>
									<View style={styles.bottom}>
										<TouchableOpacity style={styles.withdrawButton} onPress={this.alertHandler}>
											<Text style={styles.nextButtonText}>회원탈퇴</Text>
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</ScrollView>
					</View>
				{/* </KeyboardAvoidingView> */}
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		webToken: state.user.webToken,
	}
};

const mapDispatchToProps = {
	setUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

const styles = StyleSheet.create({
	// headerContainer: {
	// 	flex: 1,
	// 	flexDirection: "row",
	// 	justifyContent: "flex-start",
	// 	alignItems: "flex-end",
	// 	// paddingBottom: 20,
	// 	marginBottom: 10,
	// },
	headerContainer: {
		marginTop: 10,
        marginBottom: 30,
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: 'flex-start',
		// justifyContent: 'flex-start',
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	headerLeft: {
        marginLeft: Dimensions.get('window').width / 20
	},
	headerRight: {
        marginRight: Dimensions.get('window').width / 20
	},
	replyContainer: {
		marginRight: "5%",
	},
	replyText: {
		fontSize: 15,
		color: "#0078d4",
	},
	loginButton: {
		width: '100%',
		borderRadius: 5,
		textAlign: 'center',
		fontWeight: "600",
		fontSize: 15,
		marginLeft: "10%",
	},
	titleContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		// borderBottomColor: "#C4C4C4",
		// borderBottomWidth: 1,
		paddingBottom: 2,
		marginBottom: 16,
	},
	title: {
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
	},
	titleText: {
		fontSize: 14,
		// fontWeight: 'bold',
		// marginLeft: 10,
	},
	contentContainer: {
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: -9,
		// height: Dimensions.get("window").height / 3,
		// height: 'auto',
		marginBottom: 20,
	},
	contentText: {
		fontSize: 13,
	},
	input: {
		width: '95%',
		// backgroundColor: '#E5E5E5',
		borderBottomColor: '#E5E5E5',
		borderBottomWidth: 1,
		paddingBottom: 5,
		// borderRadius: 5,
		paddingLeft: 5,
		fontSize: 15,
	},
	rigthAction: {
		// marginRight: 5,
		height: 30,
		width: 35,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 9,
		// top: 0,
		right: 0,
	},
	rigthIcon: {
		color: '#000',
		fontSize: 20,
	},
	info: {
		marginTop: -15,
		marginBottom: 15,
		marginLeft: Dimensions.get('window').width / 40,
	},
	infoText: {
		fontSize: 12,
		color: '#808080'
	},
	nextButton: {
		backgroundColor: '#0078d4',
		borderRadius: 5,
		width: '100%',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		justifyContent: 'center',
		alignItems: 'center',
		// marginBottom: 30,
	},
	nextButtonText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF',
		margin: 9,
	},
	horizontalLine: {
		height: 1,
		marginTop: 40,
		marginBottom: 40,
		width: '100%',
		borderWidth: 0.5,
		borderRadius: 1,
		borderColor: '#808080',
		borderStyle: 'dashed',
	},
	withdrawButton: {
		backgroundColor: '#808080',
		borderRadius: 5,
		width: '100%',
		// marginLeft: Dimensions.get('window').width / 20,
		// marginRight: Dimensions.get('window').width / 20,
		justifyContent: 'center',
		alignItems: 'center',
		// marginBottom: 30,
	},
	nextButtonText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF',
		margin: 9,
	},
});