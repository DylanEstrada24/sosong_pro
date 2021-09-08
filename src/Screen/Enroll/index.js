import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	Dimensions,
	KeyboardAvoidingView,
	Keyboard,
} from 'react-native';
import BlueDot from '../../Components/BlueDot';
import Util from '../../Common/Util';

import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Enroll extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			email: '',
			password: '',
			passwordConfirm: '',
			name: '',
			gender: 'm',
			phoneNumber: '',
			overlap: false,
			pwdCheck: false,
			errorMsg: '',
			isLoading: false,
		})

		this.overlapCheck = this.overlapCheck.bind(this)
		this.enrollHandler = this.enrollHandler.bind(this)
		this.pwdCheck = this.pwdCheck.bind(this)

	}

	async enrollHandler() {

		Keyboard.dismiss();

		if (!Util.isValidEmail(this.state.email)) {
			console.log("if (!Util.isValidEmail(this.state.email))")
			this.setState({
			  isLoading: false,
			  errorMsg: 'Invalid email address',
			});
			return;
		}

		if (!Util.passwordTest2(this.state.password)) {
			console.log("if (!Util.passwordTest2(this.state.password))")
			this.setState({
			  isLoading: false,
			  errorMsg: 'You must include a password',
			});
			return;
		}

		if (this.state.passwordConfirm === '') {
			console.log("if (this.state.passwordConfirm === '')")
			this.setState({
			  isLoading: false,
			  errorMsg: 'You must include a password confirm',
			});
			return;
		}

		if (this.state.name.trim() === '') {
			console.log("if (this.state.name.trim() === '')")
			this.setState({
			  isLoading: false,
			  errorMsg: 'You must include your name',
			});
			return;
		}

		if (!Util.phoneCheck(this.state.phoneNumber)) {
			console.log("if (!Util.phoneCheck(this.state.phoneNumber))")
			this.setState({
				isLoading: false,
				errorMsg: 'You must include a phone number',
			});
			return;
		}

		if(this.state.password !== this.state.passwordConfirm) {
			console.log("if(this.state.password !== this.state.passwordConfirm)")
			this.setState({
				passwordConfirm: '',
				isLoading: false,
				errorMsg: 'You must check a password confirm',
			});
			return;
		}

		let phoneNumber = Util.autoHypenPhone(this.state.phoneNumber)

		const user = {
			name: this.state.name,
			password: this.state.password,
			email: this.state.email,
			gender: 'm',
			phoneNumber: phoneNumber
		}

		// console.log(user)

		// this.setState({
		// 	phoneNumber: Util.autoHypenPhone(this.state.phoneNumber)
		// })

		commonApi('POST', 'auth/signup', user).then((data) => {

			console.log(data);

			// {"msg": "회원가입 완료", "success": true}

			// swal 사용해서 성공했을때 변호사 증명자료 제출 메세지 띄우기

			this.props.navigation.pop()

		}).catch((err) => (console.log(err)));

	}

	overlapCheck() {
		// 이메일 중복체크

	}

	pwdCheck() {
		
	}

	onEmailHandle = (email) => this.setState({email})

	onPasswordHandle = (password) => this.setState({password})

	onPasswordConfirmHandle = (passwordConfirm) => this.setState({passwordConfirm})

	onAccountHandle = (name) => this.setState({name})

	onPhoneNumberHandle = (phoneNumber) => this.setState({phoneNumber})

	render() {
		return (
			<View style={styles.container}>
				<KeyboardAwareScrollView style={{flex: 1,}} scrollEnabled={true}>
					<View style={styles.contentContainer}>
						<View style={styles.headerContainer}>
							<View>
								<Text style={styles.titleText}>
									회원가입
								</Text>
							</View>
						</View>
						<View style={styles.content}>
							<View style={styles.contentTop}>
								<View style={styles.inputContainer}>
									<View style={styles.inputTop}>
										<View style={styles.inputTopLeft}>
											<BlueDot />
											<Text style={styles.inputHeader}>ID</Text>
										</View>
										{ this.state.overlap ? (
											<View style={styles.inputTopRight}>
												<Text style={styles.message}>* 이미 가입된 계정 입니다.</Text>
											</View>

										) : (<View style={styles.inputTopRight} />) }
									</View>
									<View style={styles.inputBottom}>
										<TextInput 
											style={styles.input} 
											placeholder="이메일 주소를 등록하세요." 
											value={this.state.email} 
											onChangeText={this.onEmailHandle} 
											onSubmitEditing={() => { this.secondTextInput.focus(); }}
										/>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.content}>
							<View style={styles.contentTop}>
								<View style={styles.inputContainer}>
									<View style={styles.inputTop}>
										<View style={styles.inputTopLeft}>
											<BlueDot />
											<Text style={styles.inputHeader}>비밀번호</Text>
										</View>
									</View>
									<View style={styles.inputBottom}>
										<TextInput 
											style={styles.input} 
											placeholder="영소문자, 영대문자, 숫자, 특수문자 포함 8자리 이상" 
											value={this.state.password} 
											onChangeText={this.onPasswordHandle} 
											secureTextEntry
											onSubmitEditing={() => { this.thirdTextInput.focus(); }}
											ref={(input) => { this.secondTextInput = input; }}
										/>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.content}>
							<View style={styles.contentTop}>
								<View style={styles.inputContainer}>
									<View style={styles.inputTop}>
										<View style={styles.inputTopLeft}>
											<BlueDot />
											<Text style={styles.inputHeader}>비밀번호 확인</Text>
										</View>
										{ this.state.pwdCheck ? (
											<View style={styles.inputTopRight}>
												<Text style={styles.message}>* 비밀번호와 일치하지 않습니다.</Text>
											</View>
										) : (<View style={styles.inputTopRight} />) }
									</View>
									<View style={styles.inputBottom}>
										<TextInput 
											style={styles.input} 
											placeholder="영소문자, 영대문자, 숫자, 특수문자 포함 8자리 이상" 
											value={this.state.passwordConfirm}
											onChangeText={this.onPasswordConfirmHandle}
											secureTextEntry
											onSubmitEditing={() => { this.fourthTextInput.focus(); }}
											ref={(input) => { this.thirdTextInput = input; }}
										/>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.content2}>
							<View style={styles.contentTop}>
								<View style={styles.inputContainer}>
									<View style={styles.inputTop}>
										<View style={styles.inputTopLeft}>
											<BlueDot />
											<Text style={styles.inputHeader}>이름</Text>
										</View>
									</View>
									<View style={styles.inputBottom}>
										<TextInput 
											style={styles.input} 
											value={this.state.name}
											onChangeText={this.onAccountHandle}
											onSubmitEditing={() => { this.fifthTextInput.focus(); }}
											ref={(input) => { this.fourthTextInput = input; }}
										/>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.content}>
							<View style={styles.contentTop}>
								<View style={styles.inputContainer}>
									<View style={styles.inputTop}>
										<View style={styles.inputTopLeft}>
											<BlueDot />
											<Text style={styles.inputHeader}>휴대폰 번호</Text>
										</View>
									</View>
									<View style={styles.inputBottom}>
										<TextInput 
											style={styles.input} 
											placeholder="ex)01012345678" 
											keyboardType='numeric' 
											value={this.state.phoneNumber} 
											onChangeText={this.onPhoneNumberHandle} 
											onSubmitEditing={() => this.enrollHandler()}
											ref={(input) => { this.fifthTextInput = input; }}
										/>
									</View>
								</View>
							</View>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity 
							style={styles.button} 
							onPress={this.enrollHandler} 
						>
							<Text style={styles.enroll}>가입완료</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

export default Enroll;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		marginTop: 30,
		flexDirection: 'row',
		// justifyContent: "space-between",
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		// borderBottomColor: "#2665A1",
		// borderBottomWidth: 1,
		paddingBottom: 5,
	},
	headerLeft: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: "center",
	},
	titleText: {
		fontSize: 20,
		fontWeight: '700',
	},
	contentContainer: {
		// flex: 1,
		flexDirection: 'column',
		width: '90%',
		marginLeft: "5%",
        marginRight: "5%",
		justifyContent: 'center',
		// alignItems: 'center',
	},
	content: {
		width: '100%',
		marginBottom: 14,
	},
	content2: {
		width: '100%',
		marginTop: 28,
		marginBottom: 14,
	},
	contentTop: {
		
	},
	inputContainer: {

	},
	inputTop: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		paddingLeft: 7,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	inputTopLeft: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputTopRight: {

	},
	message: {
		color: '#F0842C',
		fontSize: 13,
		fontWeight: 'bold',
	},
	inputHeader: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	inputBottom: {
		marginTop: 7,
	},
	input: {
		backgroundColor: '#E5E5E5',
		borderRadius: 5,
		paddingLeft: 23,
	},
	buttonContainer: {
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'red',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		marginTop: 115,
	},
	button: {
		width: '100%',
		backgroundColor: '#2665A1',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		height: 35,
	},
	enroll: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
})