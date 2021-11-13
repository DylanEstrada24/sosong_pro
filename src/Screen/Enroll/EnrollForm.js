import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	Dimensions,
	Keyboard,
	Image,
} from 'react-native';
import BlueDot from '../../Components/BlueDot';
import Util from '../../Common/Util';
import Icon from 'react-native-vector-icons/AntDesign';
import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleToast from 'react-native-simple-toast';

class EnrollForm extends Component {
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
			secureTextEntry: false,
			showPassword: true,
			showPasswordConfirm: true,
		})

		this.overlapCheck = this.overlapCheck.bind(this)
		this.enrollHandler = this.enrollHandler.bind(this)
		this.pwdCheck = this.pwdCheck.bind(this)

	}

	async enrollHandler() {

		Keyboard.dismiss();

		const name = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s0-9]/gi

		if (!Util.isValidEmail(this.state.email)) {
			SimpleToast.show('이메일을 양식에 맞게 입력해주세요', SimpleToast.BOTTOM)
			return;
		}

		if (!Util.passwordTest2(this.state.password)) {
			SimpleToast.show('비밀번호를 양식에 맞게 입력해주세요', SimpleToast.BOTTOM)
			return;
		}

		if (this.state.passwordConfirm === '') {
			SimpleToast.show('비밀번호 확인을 입력해주세요', SimpleToast.BOTTOM)
			return;
		}

		if (this.state.name.trim() === '') {
			SimpleToast.show('이름을 입력해주세요', SimpleToast.BOTTOM)
			return;
		}

		if (name.test(this.state.name)) {
			SimpleToast.show('이름을 정확히 입력해주세요.', SimpleToast.BOTTOM)
			return;
		}

		if (!Util.phoneCheck(this.state.phoneNumber)) {
			SimpleToast.show('휴대폰번호를 양식에 맞게 입력해주세요', SimpleToast.BOTTOM)
			return;
		}

		if(this.state.password !== this.state.passwordConfirm) {
			SimpleToast.show('비밀번호가 다르게 입력됐습니다', SimpleToast.BOTTOM)
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


		commonApi('POST', 'auth/signup', user).then((data) => {

			// {"msg": "회원가입 완료", "success": true}
			if(data.success) {
				SimpleToast.show(data.msg, SimpleToast.BOTTOM)
				this.props.navigation.navigate("LoginScreen")
			} else {
				SimpleToast.show(data.msg, SimpleToast.BOTTOM)
			}

			// swal 사용해서 성공했을때 변호사 증명자료 제출 메세지 띄우기


		// }).catch((err) => (console.log(err)));
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM));

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

	render() {
		return (
			<View style={styles.container}>
				<KeyboardAwareScrollView style={{flex: 1,}} scrollEnabled={true}>
					<View style={styles.contentContainer}>
						<View style={styles.headerContainer}>
							<View style={styles.header}>
								<View style={styles.headerLeft}/>
								<View style={styles.headerRight}>
									<TouchableOpacity onPress={() => this.props.navigation.pop()}>
										<Image source={require('../../assets/images/X.png')} />
									</TouchableOpacity>
								</View>
							</View>
							<View style={styles.enrollTitleContainer}>
								<View style={styles.enrollTitle}>
									<Text style={styles.enrollText}>회원가입을 위해</Text>
									<Text style={styles.enrollText}>정보를 입력해주세요</Text>
								</View>
							</View>
						</View>
						<View style={styles.content}>
							<View style={styles.contentTop}>
								<View style={styles.inputContainer}>
									<View style={styles.inputTop}>
										<View style={styles.inputTopLeft}>
											<BlueDot color={'#1CAA99'} />
											<Text style={styles.inputHeader}>이메일 아이디</Text>
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
											placeholder="사용하실 이메일 주소를 등록하세요" 
											placeholderTextColor="#808080"
											value={this.state.email} 
											onChangeText={this.onEmailHandle} 
											onSubmitEditing={() => { this.secondTextInput.focus(); }}
											autoCapitalize='none' 
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
											<BlueDot color={'#1CAA99'} />
											<Text style={styles.inputHeader}>비밀번호</Text>
										</View>
									</View>
									<View style={styles.inputBottom}>
										<TextInput 
											style={styles.input} 
											placeholder="사용하실 비밀번호를 입력해주세요" 
											placeholderTextColor="#808080"
											value={this.state.password} 
											onChangeText={this.onPasswordHandle} 
											secureTextEntry={this.state.showPassword}
											onSubmitEditing={() => { this.thirdTextInput.focus(); }}
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
									<View style={styles.info}>
										<Text style={styles.infoText}>· 숫자·영문대/소문자·특수문자 포함 8자리 이상 입력해 주세요</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.content}>
							<View style={styles.contentTop}>
								<View style={styles.inputContainer}>
									<View style={styles.inputTop}>
										<View style={styles.inputTopLeft}>
											<BlueDot color={'#1CAA99'} />
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
											placeholder="사용하실 비밀번호를 재입력해주세요" 
											placeholderTextColor="#808080"
											value={this.state.passwordConfirm}
											onChangeText={this.onPasswordConfirmHandle}
											secureTextEntry={this.state.showPasswordConfirm}
											onSubmitEditing={() => { this.fourthTextInput.focus(); }}
											ref={(input) => { this.thirdTextInput = input; }}
											autoCapitalize='none' 
										/>
										<TouchableOpacity
											style={styles.rigthAction}
											onPressIn={this.handleShowPasswordConfirm}
											onPressOut={this.handleHidePasswordConfirm}>
											<Icon name="eyeo" style={styles.rigthIcon} />
										</TouchableOpacity>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.content2}>
							<View style={styles.contentTop}>
								<View style={styles.inputContainer}>
									<View style={styles.inputTop}>
										<View style={styles.inputTopLeft}>
											<BlueDot color={'#1CAA99'} />
											<Text style={styles.inputHeader}>이름</Text>
										</View>
									</View>
									<View style={styles.inputBottom}>
										<TextInput 
											style={styles.input} 
											placeholder="실명을 입력해주세요"
											placeholderTextColor="#808080"
											value={this.state.name}
											onChangeText={this.onAccountHandle}
											onSubmitEditing={() => { this.fifthTextInput.focus(); }}
											ref={(input) => { this.fourthTextInput = input; }}
										/>
									</View>
									<View style={styles.info}>
										<Text style={styles.infoText}>· 소송프로의 작업예측 프로세스를 위해 필요합니다.</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.content}>
							<View style={styles.contentTop}>
								<View style={styles.inputContainer}>
									<View style={styles.inputTop}>
										<View style={styles.inputTopLeft}>
											<BlueDot color={'#1CAA99'} />
											<Text style={styles.inputHeader}>휴대폰 번호</Text>
										</View>
									</View>
									<View style={styles.inputBottom}>
										<TextInput 
											style={styles.input} 
											placeholder="ex.01012345678" 
											placeholderTextColor="#808080"
											keyboardType={'numeric'} 
											value={this.state.phoneNumber} 
											onChangeText={this.onPhoneNumberHandle} 
											onSubmitEditing={() => this.enrollHandler()}
											ref={(input) => { this.fifthTextInput = input; }}
											maxLength={11}
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
							<Text style={styles.enroll}>회원가입</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

export default EnrollForm;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		marginTop: 10,
        marginBottom: 30,
		flexDirection: 'column',
		justifyContent: "space-between",
		alignItems: 'flex-start',
		paddingBottom: 5,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
	},
	headerLeft: {

	},
	headerRight: {

	},
	enrollTitleContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	enrollTitle: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	enrollText: {
		fontSize: 24,
        color: '#0078D4'
	},
	contentContainer: {
		flexDirection: 'column',
		width: '90%',
		marginLeft: "5%",
        marginRight: "5%",
		justifyContent: 'center',
	},
	content: {
		width: '100%',
		marginBottom: 14,
	},
	content2: {
		width: '100%',
		marginTop: 8,
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
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		backgroundColor: '#E5E5E5',
		borderRadius: 5,
		paddingLeft: 5,
		color: '#000',
		height: 36,
		width: '98%',
		
	},
	rigthAction: {
		height: 30,
		width: 35,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: Dimensions.get('window').width / 100,
	},
	rigthIcon: {
		color: '#000',
		fontSize: 20,
	},
	info: {
		marginTop: 5,
	},
	infoText: {
		fontSize: 12,
		color: '#808080'
	},
	buttonContainer: {
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		marginTop: 50,
		marginBottom: 50,
	},
	button: {
		width: '100%',
		backgroundColor: '#0078d4',
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