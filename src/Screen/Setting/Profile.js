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
} from 'react-native';
import BlueDot from '../../Components/BlueDot';

import Util from '../../Common/Util'
import HeaderText from '../../Components/HeaderText';
import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/user';

class Profile extends Component {

	constructor(props) {
		super(props)
		this.state = ({
			email: '',
			name: '',
			password: '',
			passwordConfirm: '',
			phoneNumber: '',
		})

		this.modifyHandler = this.modifyHandler.bind(this)
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
			return;
		}

		if (!Util.passwordTest2(this.state.password)) {
			this.setState({
				isLoading: false,
				errorMsg: 'You must include a password',
			});
			return;
		}

		if (this.state.passwordConfirm === '') {
			this.setState({
				isLoading: false,
				errorMsg: 'You must include a password confirm',
			});
			return;
		}

		if(this.state.password !== this.state.passwordConfirm) {
			this.setState({
				passwordConfirm: '',
				isLoading: false,
				errorMsg: 'You must check a password confirm',
			});
			return;
		}

		let phoneNumber = Util.autoHypenPhone(this.state.phoneNumber)


		let url = 'auth/update/' + this.state.email + '/m/' + phoneNumber

		commonApi('PUT', url, {}).then((data) => {
			console.log(data)
			this.props.setUser({
				email: this.state.email,
				phoneNumber: this.state.phoneNumber,
			})
			this.props.navigation.pop();
		})

	}

	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<KeyboardAvoidingView style={{flex: 1,}} enabled={false}>

				
				<View style={styles.headerContainer}>
					<HeaderText title="내정보 변경" />
				</View>
				<View style={{flex: 0.85, width: "90%", marginLeft: "5%", marginRight: "5%", marginBottom: 5,}}>
					<View style={styles.itemContainer}>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>ID</Text>
							</View>
							<View style={styles.titleContent}>
								{/* <Text style={styles.titleText}>{this.state.email}</Text> */}
							</View>
						</View>
						<View style={styles.contentContainer}>
							<TextInput 
								style={styles.input} 
								placeholder="sosongpro@gmail.com" 
								onChangeText={this.onEmailHandle}
								value={this.state.email}
							/>
						</View>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>이름</Text>
							</View>
							<View style={styles.titleContent}>
								{/* <Text style={styles.titleText}>{this.state.name}</Text> */}
								<Text style={styles.titleText}>{store.getState().user.name}</Text>
							</View>
						</View>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>휴대폰 번호</Text>
							</View>
						</View>
						<View style={styles.contentContainer}>
							<TextInput 
								style={styles.input} 
								value={this.state.phoneNumber}
								onChangeText={this.onPhoneNumberHandle}
								keyboardType='numeric'
								placeholder="ex)01012345678" 
							/>
						</View>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>비밀번호</Text>
							</View>
						</View>
						<View style={styles.contentContainer}>
							<TextInput 
								style={styles.input} 
								placeholder="영소문자, 영대문자, 숫자, 특수문자 포함 8자리 이상" 
								onChangeText={this.onPasswordHandle}
								value={this.state.password}
								secureTextEntry
							/>
						</View>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>비밀번호 확인</Text>
							</View>
						</View>
						<View style={styles.contentContainer}>
							<TextInput 
								style={styles.input} 
								placeholder="영소문자, 영대문자, 숫자, 특수문자 포함 8자리 이상" 
								onChangeText={this.onPasswordConfirmHandle}
								value={this.state.passwordConfirm}
								secureTextEntry
							/>
						</View>
					</View>
				</View>
				<View style={styles.bottom}>
					<TouchableOpacity style={styles.nextButton} onPress={this.modifyHandler}>
						<Text style={styles.nextButtonText}>수정완료</Text>
					</TouchableOpacity>
				</View>
				</KeyboardAvoidingView>
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
	headerContainer: {
		flex: 0.075,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-end",
		// paddingBottom: 20,
		marginBottom: 10,
	},
	replyContainer: {
		marginRight: "5%",
	},
	replyText: {
		fontSize: 15,
		color: "#2665A1",
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
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
		paddingBottom: 2,
		marginBottom: 16,
	},
	title: {
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
	},
	titleText: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	contentContainer: {
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: -9,
		// height: Dimensions.get("window").height / 3,
		// height: 'auto',
		paddingBottom: 20,
	},
	contentText: {
		fontSize: 13,
	},
	input: {
		width: '100%',
		backgroundColor: '#E5E5E5',
		borderRadius: 5,
		paddingLeft: 23,
	},
	nextButton: {
		backgroundColor: '#2665A1',
		borderRadius: 5,
		width: '80%',
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
});