import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	StyleSheet,
	Dimensions,
    ScrollView,
    ActivityIndicator
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import CheckBox from '@react-native-community/checkbox';
import { commonApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
import NavigationService from '../../Navigation/NavigationService';

class Jeonja extends Component {

	constructor(props) {
        super(props)
        this.state = {
			id: '',
            password: '',
            secureTextEntry: false,
			showPassword: true,
            checkBox1: false, 
            checkBox2: false, 
            checkBox3: false, 
            clicked: false,
        }
    }

    idHandler = (value) => this.setState({id: value})

    passwordHandler = (value) => this.setState({password: value})

    handleShowPassword = () => {
		this.setState({showPassword: false});
	};
	
	handleHidePassword = () => {
		this.setState({showPassword: true});
	};

    toggleClicked = (value) => this.setState({clicked: value})

    buttonHandle = () => {

        this.toggleClicked(true)

        // 아이디 비번 처리

        if(this.state.id === '') {
            SimpleToast.show('아이디를 입력해주세요.', SimpleToast.BOTTOM)
            return
        }
        
        if(this.state.password === '') {
            SimpleToast.show('비밀번호를 입력해주세요.', SimpleToast.BOTTOM)
            return
        }
        
        // 체크박스 3개 처리
        
        if(this.state.checkBox1 === false) {
            SimpleToast.show('로그인 승낙을 확인해주세요.', SimpleToast.BOTTOM)
            return
        }
        
        if(this.state.checkBox2 === false) {
            SimpleToast.show('사건번호 등록을 확인해주세요.', SimpleToast.BOTTOM)
            return
        }
        
        if(this.state.checkBox3 === false) {
            SimpleToast.show('사건정보 조회 및 저장권한을 확인해주세요.', SimpleToast.BOTTOM)
            return
        }

        const user = {
            id: this.state.id,
            pw: this.state.password
        }

        this.toggleClicked(true)
        
        // 전자소송 가져오기 url : user/case/test
        commonApi('POST', 'user/case/test', user).then((result) => {

            if(result.success) {
                // success 체크해야됨
                SimpleToast.show('사건을 가져왔습니다.', SimpleToast.BOTTOM)
                this.toggleClicked(false)
                NavigationService.navigate('TabNavigator')

            } else {
                this.toggleClicked(false)
                SimpleToast.show(result.msg, SimpleToast.BOTTOM)
            }

        // }).catch((err) => console.log('57 user/case/test  :  ', err))
        }).catch((err) => {
            this.toggleClicked(false)
            console.log('전자소송 에러 ::: ', err)
            SimpleToast.show("서버와 연결이 끊어졌습니다. \n나중에 다시 시도해주세요.", SimpleToast.BOTTOM)
        })

    }

	render() {
		return (
            <>
                {
                    this.state.clicked ? (
                        <View 
                            style={{
                                position: 'absolute', 
                                flex: 1,
                                top: Dimensions.get('window').height / 2, 
                                right: 0, 
                                left: 0,
                                zIndex: 9999
                            }}
                        >
                            <ActivityIndicator color="#0078D4" size={75} />
                        </View>
                    ) : null
                }
                <View style={{
                    flex: 1,
                    opacity: this.state.clicked ? 0.4 : null
                }}>
                    <View style={styles.container}>
                        <View style={styles.top}>
                            <View style={styles.header}>
                                <View style={styles.title}>
                                    <Text style={styles.titleText}>전자소송 나의사건 가져오기</Text>
                                </View>
                                <TouchableOpacity style={styles.exit} onPress={() => this.props.navigation.pop()} >
                                    <Image source={require('../../assets/images/X.png')} />
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                                <View style={styles.contentContainer}>
                                    <View style={styles.inputWrapper}>
                                        <Image source={require('../../assets/images/Jeonja.png')} style={{width: 140, height: 50,}} />
                                        <View style={styles.inputContainer}>
                                            <View style={styles.inputHeaderContainer}>
                                                <Text style={styles.inputHeader}>ID</Text>
                                            </View>
                                            <View style={styles.textInputContainer}>
                                                <TextInput 
                                                    style={styles.textInput}
                                                    placeholder="전자소송 아이디를 입력해주세요"
                                                    placeholderTextColor="#808080"
                                                    value={this.state.id}
                                                    onChangeText={(value) => this.idHandler(value)}
                                                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                                    autoCapitalize='none' 
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.inputContainer}>
                                            <View style={styles.inputHeaderContainer}>
                                                <Text style={styles.inputHeader}>PW</Text>
                                            </View>
                                            <View style={styles.textInputContainer}>
                                                <TextInput 
                                                    style={styles.textInput}
                                                    placeholder="전자소송 비밀번호를 입력해주세요"
                                                    placeholderTextColor="#808080"
                                                    value={this.state.password}
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
                                    </View>
                                    <View style={styles.jeonjaExplanContainer}>
                                        <Text style={styles.explanText}>
                                            · 전자소송에 로그인하여 등록된 나의사건을 본 어플리케이션에 <Text style={{color: '#0078D4'}}>자동등록</Text>합니다.
                                        </Text>
                                        <Text style={styles.explanText}>
                                            · 아이디와 비밀번호는 본 어플리케이션에서 <Text style={{color: 'green', fontWeight: 'bold'}}>직접 전자소송에 로그인</Text>하기 위해 사용되며, 
                                            <Text style={{color: '#0078D4', fontWeight: 'bold'}}> 회사에 제공되거나 본 어플리케이션에 저장되지 않습니다.</Text>
                                        </Text>
                                    </View>
                                    <View style={styles.checkBoxWrapper}>
                                        <View style={styles.checkBoxContainer}>
                                            <View style={styles.checkBoxView}>
                                                <CheckBox 
                                                    tintColors={{ true: '#A4A4A4', false: '#A4A4A4' }} 
                                                    style={styles.checkBox} 
                                                    value={this.state.checkBox1} 
                                                    onValueChange={(newValue) => this.setState({checkBox1: newValue})} 
                                                />
                                            </View>
                                            <View style={styles.checkBoxTextContainer}>
                                                <Text style={styles.checkBoxText}>
                                                    본 어플리케이션을 통해 전자소송에 로그인 하는 것을 승낙합니다.
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.checkBoxContainer}>
                                            <View style={styles.checkBoxView}>
                                                <CheckBox 
                                                    tintColors={{ true: '#A4A4A4', false: '#A4A4A4' }} 
                                                    style={styles.checkBox} 
                                                    value={this.state.checkBox2} 
                                                    onValueChange={(newValue) => this.setState({checkBox2: newValue})} 
                                                />
                                            </View>
                                            <View style={styles.checkBoxTextContainer}>
                                                <Text style={styles.checkBoxText}>
                                                    본 어플리케이션을 통해 전자소송에서 사건번호를 확인하여 등록하는 것을 승낙합니다.
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={styles.checkBoxContainer}>
                                            <View style={styles.checkBoxView}>
                                                <CheckBox 
                                                    tintColors={{ true: '#A4A4A4', false: '#A4A4A4' }} 
                                                    style={styles.checkBox} 
                                                    value={this.state.checkBox3} 
                                                    onValueChange={(newValue) => this.setState({checkBox3: newValue})} 
                                                />
                                            </View>
                                            <View style={styles.checkBoxTextContainer}>
                                                <Text style={styles.checkBoxText}>
                                                    회사에 위 전자소송에서 가져온 사건정보의 조회 및 저장 권한을 위임합니다.
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity 
                                            style={[
                                                styles.button,
                                                this.state.clicked ? {backgroundColor: '#C8C8C8'} : null
                                            ]} 
                                            onPress={() => this.buttonHandle()}
                                            disabled={this.state.clicked ? true : false}
                                        >
                                            <Text style={styles.buttonText}>사건 가져오기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </>
		);
	}
}

export default Jeonja;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
    top: {
        flex: 1
    },
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	exit: {
		marginRight: 10,
	},
	title: {

	},
	titleText: {
		fontSize: 20,
		fontWeight: '700',
		marginLeft: 18,
	},
	contentContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		flexWrap: 'wrap',
		marginTop: 20,
	},
    inputWrapper: {
        marginTop: 30,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    inputHeaderContainer: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputHeader: {
        fontSize: 20,
        color: '#A4A4A4'
    },
    textInputContainer: {
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInput: {
		backgroundColor: '#E5E5E5',
		borderRadius: 5,
		paddingLeft: 5,
		color: '#000',
        width: '95%',
        height: 36,
        fontSize: 14,
		fontWeight: "400",
		justifyContent: 'center',
	},
    rigthAction: {
		height: 36,
		width: 35,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: Dimensions.get('window').width / 40,
	},
	rigthIcon: {
		color: '#000',
		fontSize: 20,
	},
    jeonjaExplanContainer: {
        marginTop: 20,
        width: '85%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    explanText: {
        marginBottom: 5,
        fontSize: 14,
    },
    checkBoxWrapper: {
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    checkBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 10,
    },
    checkBoxView: {
        width: '12%',
    },
    checkBox: {
        
    },
    checkBoxTextContainer: {
        width: '85%',
    },
    checkBoxText: {

    },
	buttonContainer: {
        width: '85%',
        justifyContent: 'center',
        alignItems: 'center',
	},
	button: {
		backgroundColor: '#0078d4',
		paddingTop: 13,
		paddingBottom: 13,
		paddingLeft: 18,
		paddingRight: 18,
		borderRadius: 3,
		margin: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
	},
	buttonText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFF',
	},
	buttonSelected: {
		backgroundColor: '#0078d4',
		borderColor: '#0078d4',
		borderWidth: 2,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 18,
		paddingRight: 18,
		borderRadius: 3,
		margin: 8,
	},
	buttonSelectedText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF'
	},
})