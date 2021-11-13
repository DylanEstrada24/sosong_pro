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

import Util from '../../Common/Util';
import HeaderText from '../../Components/HeaderText';
import { commonApi } from '../../Common/ApiConnector';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleToast from 'react-native-simple-toast';

class FindPwd extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			email: '',
			userIdx: '',
			isLoading: false,
		})

		this.submitHandler = this.submitHandler.bind(this)

	}

	async submitHandler() {

		Keyboard.dismiss();

		if (!Util.isValidEmail(this.state.email)) {
			SimpleToast.show("이메일을 양식에 맞게 입력해주세요", SimpleToast.BOTTOM)
			return;
		}

		const data = {
			userEmail: this.state.email
		}

		commonApi('POST', 'auth/findpw', data).then((result) => {
			if(result.success) {
				SimpleToast.show("임시 비밀번호를 발송했습니다. \n메일을 확인해주세요.")
			} else {
				SimpleToast.show(result.msg, SimpleToast.BOTTOM)
			}
		}).catch((err) => console.log(err))
		// }).catch((err) => SimpleToast.show("서버와 연결이 끊어졌습니다. \n나중에 다시 시도해주세요.", SimpleToast.BOTTOM))

	}

	onEmailHandle = (email) => this.setState({email})



	render() {
		return (
			<View style={styles.container}>
				<KeyboardAwareScrollView style={{flex: 1,}} scrollEnabled={true}>
					<View style={styles.contentContainer}>

						<View style={styles.headerContainer}>
							<View style={styles.headerLeft}>
								<HeaderText title="비밀번호 찾기" />
							</View>
                            <View style={styles.headerRight}>
                                <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                                    <Image source={require('../../assets/images/X.png')} />
                                </TouchableOpacity>
                            </View>
						</View>

						<View style={styles.content}>
							<View style={styles.contentTop}>
								<View style={styles.inputContainer}>
									<View style={styles.inputTop}>
                                        <Text style={styles.inputHeader}>가입하신 이메일 주소를</Text>
                                        <Text style={styles.inputHeader}>입력해주세요</Text>
									</View>
									<View style={styles.inputBottom}>
										<TextInput 
											style={styles.input} 
											placeholder="이메일 주소를 입력하세요." 
											placeholderTextColor="#808080"
											value={this.state.email} 
											onChangeText={this.onEmailHandle} 
											onSubmitEditing={() => this.submitHandler()} 
											autoCapitalize='none' 
										/>
									</View>
								</View>
							</View>
						</View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={this.submitHandler} 
                            >
                                <Text style={styles.enroll}>확인</Text>
                            </TouchableOpacity>
                        </View>
						<View style={styles.content}>
                            <View style={styles.explanContainer}>
                                <Text style={styles.explan}>· 아이디 이메일로 임시 비밀번호가 발송됩니다.</Text>
                                <Text style={styles.explan}>· 임시 비밀번호로 로그인 후 비밀번호를</Text>
                                <Text style={styles.explan}>  변경하시기 바랍니다.</Text>
							</View>
						</View>
						
					</View>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

export default FindPwd;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		marginTop: 10,
        marginBottom: 30,
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: 'flex-start',
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
	titleText: {
		fontSize: 20,
		fontWeight: '700',
	},
	contentContainer: {
		flexDirection: 'column',
		width: '100%',
		justifyContent: 'center',
	},
	content: {
		width: '90%',
        marginLeft: Dimensions.get('window').width / 20,
        marginRight: Dimensions.get('window').width / 20,
		marginBottom: 14,
	},
	content2: {
		width: '90%',
        marginLeft: Dimensions.get('window').width / 20,
        marginRight: Dimensions.get('window').width / 20,
		marginTop: 28,
		marginBottom: 14,
	},
	contentTop: {
		
	},
	inputContainer: {

	},
	inputTop: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	message: {
		color: '#F0842C',
		fontSize: 13,
		fontWeight: 'bold',
	},
	inputHeader: {
		fontSize: 20,
		fontWeight: 'bold',
        color: '#0078D4'
	},
	inputBottom: {
		marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
	},
	input: {
		backgroundColor: '#E5E5E5',
		borderRadius: 5,
		color: '#000',
        width: '90%',
		height: 36,
		fontSize: 14,
	},
	buttonContainer: {
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		marginTop: 30,
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
    explanContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
    },
    explan: {
        fontSize: 13,
        marginLeft: Dimensions.get('window').width / 20,
    },
})