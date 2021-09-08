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

import DateTimePicker from '@react-native-community/datetimepicker';

import BlueDot from '../../Components/BlueDot';

import moment from 'moment';
import 'moment/locale/ko';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
import ToDo from './ToDo';
import Case from '../Case/Case';

class WriteToDo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            show: false,
            isVisible: false,
            caseIdx: 0,
            title: '',
            plaintiff: '',
            defendant: '',
            todoTitle: '',
            content: '',
            cases: [],
            pageNum: 0,
        }

        this.showHandler = this.showHandler.bind(this)
        this.dateHandler = this.dateHandler.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.todoTitleHandle = this.todoTitleHandle.bind(this)
        this.contentHandle = this.contentHandle.bind(this)
        this.addTodo = this.addTodo.bind(this)
        // this.nextButton = this.nextButton.bind(this)
        this.loadData = this.loadData.bind(this)
        this.selectCase = this.selectCase.bind(this)
        this.nextList = this.nextList.bind(this)
    }

    showHandler() {
        this.setState({show: true})
    }

    dateHandler(event, date) {
        if(date !== undefined) {
            this.setState({date: new Date(date)})
        }
        this.setState({show: false})
    }

    toggleModal() {
        this.setState({
            isVisible: !this.state.isVisible,
            pageNum: 0,
        })

        if(!this.state.isVisible) {
            this.loadData(0)
        }
    }

    todoTitleHandle(value) {
        this.setState({todoTitle: value})
    }

    contentHandle(value) {
        this.setState({content: value})
    }

    async componentDidMount() {

        if(this.props.navigation.getParam("inCase")) {
            
            const cases = store.getState().cases
    
            if(cases.title.trim() !== ''){
                this.setState({
                    caseIdx: cases.caseIdx,
                    title: cases.title,
                    plaintiff: cases.plaintiff,
                    defendant: cases.defendant,
                })
            }

        }

        this.loadData(this.state.pageNum)

    }
    
    async loadData(pageNum) {
        commonApi('GET', `user/case/userIdx/ASC/${pageNum}`, {}).then((result) => {
            this.setState({
                cases: result
            })
        }).catch((err) => console.log("writeTodo user/case ::: ", err))

    }

    async addTodo(date) {

        // if(this.state.todoTitle.trim() === '') {
        //     console.log(`this.state.todoTitle.trim() === ''`)
        //     return
        // }

        if(this.state.content.trim() === '') {
            console.log(`this.state.content.trim() === ''`)
            return
        }

        const todo = {
            // title: this.state.todoTitle,
            content: this.state.content,
            settingAt: date,
            caseIdx: this.state.caseIdx,
        }

        commonApi('POST', 'user/case/usertodo', todo).then((result) => {

            if(result.success) {
                // 안내메세지
                SimpleToast.show("ToDo가 작성되었습니다.", SimpleToast.BOTTOM);
                this.props.navigation.pop()
            }
        }).catch((err) => console.log('user/case/usertodo ::: ', err))

    }

    async nextList() {
        this.loadData(this.state.pageNum + 1)
        this.setState({
            pageNum: this.state.pageNum + 1,
        })
    }

    selectCase(caseIdx, title) {
        this.setState({
            caseIdx: caseIdx,
            title: title,
        })
        this.toggleModal()
    }

    renderItem = (item, index) => ( 
        <TouchableOpacity onPress={() => this.selectCase(item.userCase.caseIdx, item.userCase.title)}>
            <Case 
                navigation={this.props.navigation} 
                key={item.userCase.caseIdx} 
                data={item}
            />
        </TouchableOpacity>
    )

    render() {
        moment.locale('ko');
        let dt = this.state.date;

        return (
            <KeyboardAvoidingView style={styles.writeToDoContainer}>
                <View style={{flex: 9}}>
                    <View style={styles.header}>
                        {/* <View style={styles.backButton}>
                            <Image source={require('../../assets/images/CaretLeft.png')} />
                        </View> */}
                        <View style={styles.writeToDoTitleContainer}>
                            <Text style={styles.writeToDoTitle}>
                                ToDo 등록
                            </Text>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        {/* <View style={styles.inputTitle}>
                            <View style={styles.subTitleContainer}>
                                <BlueDot />
                                <Text style={styles.subTitleText} >제목</Text>
                            </View>
                            <View style={styles.contentContainer}>
                                <TextInput 
                                    style={styles.titleInput} 
                                    placeholder="제목을 입력하세요." 
                                    value={this.state.todoTitle}
                                    onChangeText={(value) => this.todoTitleHandle(value)}
                                />
                            </View>
                        </View> */}
                        <View style={styles.inputTitle}>
                            <View style={styles.subTitleContainer2}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <BlueDot />
                                    <Text style={styles.subTitleText} >관련사건</Text>
                                </View>
                                <TouchableOpacity 
                                    style={{backgroundColor: '#2665A1', borderRadius: 12, height: 20, width: 45, justifyContent: 'center', alignItems: 'center'}}
                                    onPress={this.toggleModal}
                                >
                                    <Text style={{color: '#FFFFFF', fontSize: 13, fontWeight: '700'}}>선택</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.contentContainer2}>
                                {
                                    this.state.caseIdx !== 0  ? (
                                        <>
                                            <Text style={styles.caseLeft}>{this.state.title}</Text>
                                            {/* <Text style={styles.caseRight}>{this.state.plaintiff} / {this.state.defendant}</Text> */}
                                        </>
                                    ) : (
                                        <Text style={styles.caseLeft}>사건이 선택되지 않았습니다.</Text>
                                    )
                                }
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
                                    value={this.state.content}
                                    onChangeText={(value) => this.contentHandle(value)}
                                />
                            </View>
                        </View>
                        <View style={styles.inputDate}>
                            <View style={styles.subTitleContainer}>
                                <BlueDot />
                                <Text style={styles.subTitleText} >종료일</Text>
                            </View>
                            {/* 날짜 입력란 */}
                            <View style={styles.contentContainer}>
                                <TouchableHighlight onPress={this.showHandler}
                                    style={styles.datePickerButton}
                                    activeOpacity={0.6}
                                    underlayColor={"#E5E5E5"}>
                                    {/* <Text style={styles.datePickerText}>{this.state.date.toString()}</Text> */}
                                    <View style={styles.datePickerTextContainer}>
                                        <Text style={styles.datePickerText}>{moment(dt).format("yyyy년")}</Text>
                                        <Text style={styles.datePickerText}>{moment(dt).format("MM월")}</Text>
                                        <Text style={styles.datePickerText}>{moment(dt).format("DD일")}</Text>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => this.addTodo(moment(dt).format('yyyy-MM-DD'))}>
                            <Text style={styles.loginButton}>등록</Text>
                    </TouchableOpacity>
                </View>
                {this.state.show && (
                    <RNDateTimePicker
                        testId="dateTimePicker"
                        value={this.state.date}
                        mode={'date'}
                        onChange={this.dateHandler}
                    />
                )}
                <Modal isVisible={this.state.isVisible}>
                    <View style={{flex: 1}}>
                        <FlatList 
                            data={this.state.cases}
                            renderItem={({item, index}) => this.renderItem(item, index)}
                            keyExtractor={(item, index) => `${index}`}
                            ListEmptyComponent={
                                <View style={{flex: 1}}>
                                    <View style={{}}>
                                        <Text style={{color: '#FFFFFF', fontSize: 24}}>조회가능한 사건이 없습니다.</Text>
                                    </View>
                                    {/* <View style={styles.buttonContainer}>
                                        <TouchableOpacity style={styles.button} onPress={() => this.toggleModal()}>
                                            <Text style={styles.loginButton}>닫기</Text>
                                        </TouchableOpacity>
                                    </View> */}
                                </View>
                            }
                            ListFooterComponent={
                                <View style={{flex: 1}}>
                                    <View style={styles.buttonContainer}>
                                        {
                                            this.state.cases.length !== 0 ? (
                                                <TouchableOpacity style={styles.button} onPress={() => this.nextList()}>
                                                    <Text style={styles.loginButton}>다음</Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <></>
                                            )
                                        }
                                        <TouchableOpacity style={styles.closeButton} onPress={() => this.toggleModal()}>
                                            <Text style={styles.loginButton}>닫기</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }

                        />
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        );
    }
}

export default WriteToDo;

const styles = StyleSheet.create({
    writeToDoContainer: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 15,
        // justifyContent: 'center',
        alignItems: 'center',
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
        color: '#2665A1'
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
		// justifyContent: 'flex-start',
        // alignItems: "stretch",
		borderRadius: 5,
		backgroundColor: '#e5e5e5',
        textAlignVertical: 'top',
        paddingLeft: 16,
    },
    inputDate: {

    },
    datePickerButton: {
        width: "80%",
        backgroundColor: '#2665A1',
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
        // width: (Dimensions.get('window').width - (Dimensions.get('window').width / 5)),
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
        backgroundColor: '#2665A1',
        color: '#FFFFFF',
        paddingTop: 8,
        paddingBottom: 8,
	}
});