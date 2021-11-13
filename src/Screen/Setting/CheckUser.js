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
    Image,
} from 'react-native';
import BlueDot from '../../Components/BlueDot';
import Util from '../../Common/Util';
import HeaderText from '../../Components/HeaderText';
import Icon from 'react-native-vector-icons/AntDesign';
import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import SimpleToast from 'react-native-simple-toast';

class CheckUser extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			password: '',
			isLoading: false,
            secureTextEntry: false,
			showPassword: true,
		})

		this.submitHandler = this.submitHandler.bind(this)

	}

	async submitHandler() {

		Keyboard.dismiss();

		if(this.state.password !== store.getState().user.password) {
            SimpleToast.show("비밀번호가 일치하지 않습니다.", SimpleToast.BOTTOM)
        } else {
            this.props.navigation.navigate("Profile")
        }

	}

	onPasswordHandle = (password) => this.setState({password})

    handleShowPassword = () => {
		this.setState({showPassword: false});
	};
	
	handleHidePassword = () => {
		this.setState({showPassword: true});
	};

	render() {
		return (
			<View style={styles.container}>
				<KeyboardAwareScrollView style={{flex: 1,}} scrollEnabled={true}>
					<View style={styles.contentContainer}>

						<View style={styles.headerContainer}>
							<View style={styles.headerLeft}>
								<HeaderText title="내 정보 변경" />
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
                                        <Text style={styles.inputHeader}>현재 사용중인</Text>
                                        <Text style={styles.inputHeader}>비밀번호를 입력해주세요</Text>
									</View>
									<View style={styles.inputBottom}>
										<TextInput 
											style={styles.input} 
											placeholder="비밀번호를 입력하세요." 
											placeholderTextColor="#808080"
											value={this.state.password} 
											onChangeText={this.onPasswordHandle} 
                                            secureTextEntry={this.state.showPassword}
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
							</View>
						</View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={styles.button} 
                                onPress={this.submitHandler} 
                            >
                                <Text style={styles.enroll}>다음</Text>
                            </TouchableOpacity>
                            <View style={styles.content}>
                                <View style={styles.explanContainer}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('FindPwd')}>
                                        <Text style={styles.explan}>비밀번호 찾기</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
						
					</View>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

export default CheckUser;

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
	titleText: {
		fontSize: 20,
		fontWeight: '700',
	},
	contentContainer: {
		// flex: 1,
		flexDirection: 'column',
		width: '100%',
		// marginLeft: "5%",
        // marginRight: "5%",
		justifyContent: 'center',
		// alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
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
        width: '90%',
		marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
	},
	input: {
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
		// marginRight: 5,
		height: 36,
		width: 35,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		bottom: 0,
		// top: 0,
		right: 0,
	},
	rigthIcon: {
		color: '#000',
		fontSize: 20,
	},
	buttonContainer: {
		width: '80%',
		// justifyContent: 'center',
		// alignItems: 'center',
		// backgroundColor: 'red',
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
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 20,
    },
    explan: {
        fontSize: 13,
        // color: '#C4C4C4',
        // marginLeft: Dimensions.get('window').width / 20,
        textDecorationColor: '#000',
        textDecorationLine: 'underline'
    },
})