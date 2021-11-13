import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	Button,
    Dimensions,
	StyleSheet,
    TouchableHighlight,
    KeyboardAvoidingView,
    FlatList,
} from 'react-native';


import BlueDot from '../../Components/BlueDot';
import moment from 'moment';
import 'moment/locale/ko';
import Modal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';
import { commonApi } from '../../Common/ApiConnector';

import NavigationService from '../../Navigation/NavigationService';

class WriteNotice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            title: '',
            content: '',
        }

        this.todoTitleHandle = this.todoTitleHandle.bind(this)
        this.contentHandle = this.contentHandle.bind(this)
        this.addNotice = this.addNotice.bind(this)
    }


    todoTitleHandle(value) {
        this.setState({title: value})
    }

    contentHandle(value) {
        this.setState({content: value})
    }

    componentDidMount() {

        

    }

    async addNotice() {

        if(this.state.title.trim() === '') {
            console.log(`this.state.title.trim() === ''`)
            SimpleToast.show('제목을 입력해주세요', SimpleToast.BOTTOM)
            return
        }

        if(this.state.content.trim() === '') {
            console.log(`this.state.content.trim() === ''`)
            SimpleToast.show('내용을 입력해주세요', SimpleToast.BOTTOM)
            return
        }

		const today = moment(this.state.date).format('yyyy-MM-DD')
        const notice = {
            title: this.state.title,
            content: this.state.content,
            createAt: today,
        }

        commonApi('POST', 'admin/notice', notice).then((result) => {

            if(result.success) {
                // 안내메세지
                SimpleToast.show("공지사항이 작성되었습니다.", SimpleToast.BOTTOM);
                
				// 어드민페이지 메인으로 가야됨..
                NavigationService.navigate('AdminMenu')
            } else {
                SimpleToast.show(result.msg, SimpleToast.BOTTOM)
            }
        // }).catch((err) => console.log('admin/notice ::: ', err))
        }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

    }


    render() {
        moment.locale('ko');
        let dt = this.state.date;

        return (
            <KeyboardAvoidingView style={styles.writeToDoContainer}>
                <View style={{flex: 9}}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.writeToDoTitle}>
                                공지사항 등록
                            </Text>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.exit} onPress={() => NavigationService.back()} >
                                <Image source={require('../../assets/images/X.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <View style={styles.inputTitle}>
                            <View style={styles.subTitleContainer}>
                                <BlueDot />
                                <Text style={styles.subTitleText} >제목</Text>
                            </View>
                            <View style={styles.contentContainer}>
                                <TextInput 
                                    style={styles.titleInput} 
                                    placeholder="제목을 입력하세요." 
                                    placeholderTextColor="#808080"
                                    value={this.state.todoTitle}
                                    onChangeText={(value) => this.todoTitleHandle(value)}
                                />
                            </View>
                        </View>
                        <View style={styles.inputContent}>
                            <View style={styles.subTitleContainer}>
                                <BlueDot />
                                <Text style={styles.subTitleText} >내용</Text>
                            </View>
                            <View style={styles.contentContainer}>
                                <TextInput 
                                    style={styles.contentInput} 
                                    multiline={true} 
                                    placeholder="내용을 입력하세요."
                                    placeholderTextColor="#808080"
                                    value={this.state.content}
                                    onChangeText={(value) => this.contentHandle(value)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.addNotice()}>
                            <Text style={styles.loginButton}>등록</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

export default WriteNotice;

const styles = StyleSheet.create({
    writeToDoContainer: {
        flex: 1,
    },
    headerContainer: {
		marginTop: 10,
        marginBottom: 15,
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: 'flex-start',
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	headerLeft: {
        marginLeft: Dimensions.get('window').width / 20
	},
	headerRight: {
        marginRight: Dimensions.get('window').width / 20
	},
    backButton: {

    },
    writeToDoTitleContainer: { // ToDo 등록
        marginLeft: "5%",
        width: "100%",
        marginTop: 5,
        marginBottom: 5,
    },
    writeToDoTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
    inputContainer: {

    },
    inputTitle: {
        
    },
    subTitleContainer: { // 각 항목 제목부분
        borderBottomWidth: 1,
        borderBottomColor: "#C4C4C4",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        padding: 2,
    },
    subTitleContainer2: {
        borderBottomWidth: 1,
        borderBottomColor: "#C4C4C4",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        padding: 2,
    },
    greenDot: {
        marginLeft: 7,
        marginRight: 9,
        width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: "#1CAA99",
    },
    subTitleText: {
        fontSize: 15,
        fontWeight: "600",
        marginLeft: 9,
    },
    contentContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    contentContainer2: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginLeft: Dimensions.get('window').width / 20,
        marginRight: Dimensions.get('window').width / 20,
    },
    caseLeft: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#0078d4'
    },
    caseRight: {
        fontSize: 13,
    },
    titleInput: {
        paddingLeft: 16,
		width: '90%',
		height: 36,
		marginBottom: 7,
		fontSize: 13,
		fontWeight: "400",
		justifyContent: 'center',
		borderRadius: 5,
		backgroundColor: '#e5e5e5',
    },
    inputContent: {
        justifyContent: "flex-start",
        alignItems: "center",
    },
    contentInput: {
        width: (Dimensions.get('window').width - (Dimensions.get('window').width / 10)),
		height: 180,
		marginBottom: 7,
		fontSize: 13,
		fontWeight: "400",
		borderRadius: 5,
		backgroundColor: '#e5e5e5',
        textAlignVertical: 'top',
        paddingLeft: 16,
    },
    inputDate: {

    },
    datePickerButton: {
        width: "80%",
        backgroundColor: '#0078d4',
        paddingLeft: 5,
        paddingRight: 5,
        borderRadius: 3,
        marginTop: 5,
    },
    datePickerTextContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    datePickerText: {
        fontSize: 20,
        fontWeight: "400",
        color: "#FFFFFF",
    },
    buttonContainer: {
        flex: 1,
		justifyContent: 'center',
        alignItems: 'center',
	},
    button: {
        width: '80%', 
        justifyContent: "center", 
        alignItems: "center",
    },
    closeButton: {
        width: '80%', 
        justifyContent: "center", 
        alignItems: "center",
        marginTop: 20,
    },
	loginButton: {
        width: '100%',
		borderRadius: 5,
		textAlign: 'center',
        justifyContent: 'center',
		fontWeight: "600",
		fontSize: 15,
        backgroundColor: '#0078d4',
        color: '#FFFFFF',
        paddingTop: 8,
        paddingBottom: 8,
	}
});