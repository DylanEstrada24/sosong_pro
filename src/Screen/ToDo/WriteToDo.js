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
    Keyboard,
    BackHandler,
    Touchable,
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';

import BlueDot from '../../Components/BlueDot';
import { Table, Col } from 'react-native-table-component';
import Detail from '../Case/Detail/Detail';
import moment from 'moment';
import 'moment/locale/ko';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';
import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
import ToDo from './ToDo';
import Case from '../Case/Case';
import NavigationService from '../../Navigation/NavigationService';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

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
            tempCases: [],
            pageNum: 0,
            clicked: false,
            searchValue: '',
            searching: false
        }

        this.showHandler = this.showHandler.bind(this)
        this.dateHandler = this.dateHandler.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.todoTitleHandle = this.todoTitleHandle.bind(this)
        this.contentHandle = this.contentHandle.bind(this)
        this.addTodo = this.addTodo.bind(this)
        this.modifyTodo = this.modifyTodo.bind(this)
        // this.nextButton = this.nextButton.bind(this)
        this.loadData = this.loadData.bind(this)
        this.selectCase = this.selectCase.bind(this)
        this.nextList = this.nextList.bind(this)
        this.handleBackButton = this.handleBackButton.bind(this)
    }

    showHandler() {
        this.setState({show: true})
    }

    dateHandler(event, date) {
        this.setState({show: false})
        if(date !== undefined) {
            this.setState({date: new Date(date)})
        }
    }

    toggleModal() {

        if(this.state.isVisible) {

            this.setState({
                isVisible: !this.state.isVisible,
                pageNum: 0,
                cases: [],
                tempCases: [],
                searchValue: '',
                searching: false,
            }, () => this.loadData(0))
            return
        }

        this.setState({
            isVisible: !this.state.isVisible,
            pageNum: 0,
        })

        // ?????? 11??? ???????????? ??????????????? ... JY
        // if(!this.state.isVisible) {
        //     this.loadData(0)
        // }
    }

    toggleClicked = (value) => this.setState({clicked: value})

    textHandle = (value) => {
        if(value === '' && this.state.searching) {
            this.setState({
                searchValue: value,
                searching: false,
                cases: this.state.tempCases,
                tempCases: [],
            })
        } else {
            this.setState({searchValue: value})
        }
    }

    searchItem = () => {

        if(this.state.searching === true) {

            const searchCase = this.state.tempCases.filter((value) => value.userCase.title.includes(this.state.searchValue))

            if(searchCase.length === 0) {
                SimpleToast.show('???????????? ???????????? ????????? ????????????', SimpleToast.BOTTOM)
                return
            } else {
                this.setState({
                    cases: searchCase,
                })
            }

            return
        }



        if(this.state.searchValue.trim().length === 0) {
            SimpleToast.show('???????????? ??????????????????', SimpleToast.BOTTOM)
            return
        }
        
        const searchCase = this.state.cases.filter((value) => value.userCase.title.includes(this.state.searchValue))

        if(searchCase.length === 0) {
            SimpleToast.show('???????????? ???????????? ????????? ????????????', SimpleToast.BOTTOM)
            return
        }

        this.setState({
            cases: searchCase,
            tempCases: this.state.cases,
            searching: true
        })


    }

    todoTitleHandle(value) {
        this.setState({todoTitle: value})
    }

    contentHandle(value) {
        this.setState({content: value})
    }

    async componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

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

        if(this.props.navigation.getParam("modify")) {

            this.setState({
                todoTitle: this.props.navigation.getParam('title'),
                content: this.props.navigation.getParam("content"),
                date: this.props.navigation.getParam("settingAt")
            })

        }

        this.loadData(this.state.pageNum)

    }

    componentWillUnmount() {

        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

    }

    handleBackButton() {
        if(this.state.isVisible === false) {
            NavigationService.back()
        } else {
            this.toggleModal()
        }
    }
    
    async loadData(pageNum) {
        commonApi('GET', `user/case/userIdx/title/ASC/${pageNum}`, {}).then((result) => {
            // pageNum?????? ????????? ???????????? []??? ???..
            const cases = [...this.state.cases, ...result]
            this.setState({
                cases: cases
            })
        // }).catch((err) => console.log("writeTodo user/case ::: ", err))
        }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

    }

    async addTodo(date) {

        Keyboard.dismiss()

        if(this.state.todoTitle.trim() === '') {
            SimpleToast.show('????????? ??????????????????', SimpleToast.BOTTOM)
            return
        }
        
        if(this.state.content.trim() === '') {
            SimpleToast.show('????????? ??????????????????', SimpleToast.BOTTOM)
            return
        }

        const todo = {
            title: this.state.todoTitle,
            content: this.state.content,
            settingAt: date,
            caseIdx: this.state.caseIdx,
        }

        this.toggleClicked(true)

        commonApi('POST', 'user/case/usertodo', todo).then((result) => {

            if(result.success) {
                // ???????????????
                SimpleToast.show("ToDo??? ?????????????????????.", SimpleToast.BOTTOM);
                this.toggleClicked(false)
                this.props.navigation.pop()
            } else {
                this.toggleClicked(false)
                SimpleToast.show(result.msg, SimpleToast.BOTTOM)
            }
        // }).catch((err) => console.log('user/case/usertodo ::: ', err))
        }).catch((err) => {
            this.toggleClicked(false)
            SimpleToast.show(err.msg, SimpleToast.BOTTOM)
        })

    }

    async modifyTodo(date) {

        Keyboard.dismiss()

        if(this.state.todoTitle.trim() === '') {
            SimpleToast.show('????????? ??????????????????', SimpleToast.BOTTOM)
            return
        }
        
        if(this.state.content.trim() === '') {
            SimpleToast.show('????????? ??????????????????', SimpleToast.BOTTOM)
            return
        }

        const todo = {
            title: this.state.todoTitle,
            content: this.state.content,
            settingAt: date,
            caseIdx: this.state.caseIdx,
            todoIdx: this.props.navigation.getParam('todoIdx')
        }

        this.toggleClicked(true)

        commonApi('PUT', `user/case/usertodo/${todo.todoIdx}/${todo.content}`, {}).then((result) => {
            if(result.success) {
                // ???????????????
                SimpleToast.show("ToDo??? ?????????????????????.", SimpleToast.BOTTOM);
                this.toggleClicked(false)
                this.props.navigation.pop()
            } else {
                this.toggleClicked(false)
                SimpleToast.show(result.msg, SimpleToast.BOTTOM)
            }
        }).catch((err) => {
            this.toggleClicked(false)
            SimpleToast.show(err.msg, SimpleToast.BOTTOM)
            console.log(`user/case/usertodo/${todo.caseIdx}/${todo.content} ::: `, err)
        })

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

    renderItem = (item, index) => {

        let division = ''
        let markColor = 'black'
        let mark = item.userCase.caseNumber.substring(4)
        mark = mark.replace(new RegExp("[(0-9)]", "gi"), "") // ??????/??????/??? ??? ??????/?????? ????????? ?????????

        const minsa = ['??????', '??????', '??????', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', 
                    '?????????', '?????????', '?????????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', 
                    '????????????', '????????????', '????????????', '?????????', '?????????', '?????????', '?????????', '?????????']

		const sincheong = ['???', '??????', '??????', '??????', '?????????', '??????', '??????', '??????', '??????', '??????', '??????', '?????????', '??????', '??????', '??????', '??????', '??????', '??????']

		const jibhang = ['??????', '??????', '??????', '??????']
		
		const bisong = ['??????', '??????', '???', '???', '???', '?????????', '?????????']
		
		const dosan = ['??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '?????????', '?????????']

		const hyeongsa = ['??????', '??????', '??????', '??????', '???', '???', '???', '???', '???', '???', '???', '???', '??????', 
                    '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '?????????', '?????????', '?????????', 
                    '?????????', '??????', '??????', '?????????', '?????????', '?????????', '?????????', '??????', '??????', '??????', '??????', 
                    '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????', '??????']

		const boho = ['???', '???', '???', '??????', '???', '???', '???', '???', '???', '??????', '??????', '??????', '???']

		const gasa = ['???', '??????', '??????', '???', '???', '???', '???', '???', '???', '??????', '??????', '??????', '??????', '??????', 
                    '??????', '?????????', '?????????', '??????', '??????', '??????', '??????', '??????', '?????????', '?????????', '?????????', 
                    '????????????', '????????????', '?????????', '?????????', '?????????', '????????????', '????????????', '???', '??????', '??????', '??????', '??????']

        const haengjeong = ['???', '??????', '??????', '???', '???', '???', '???', '???', '???', '???', '??????', '?????????', '?????????', '??????', '??????', '??????', '??????', '??????', '?????????', '?????????', '??????']

        const teukheo = ['???', '???', '???', '???', '??????', '??????', '??????']

		const seongeo = ['???', '??????', '???']

		const teuksu = ['???']

        const gamchi = ['??????', '??????', '??????', '??????']

        const hojeok = ['??????', '??????']

        const divisions = [minsa, sincheong, jibhang, bisong, dosan, hyeongsa, boho, gasa, haengjeong, teukheo, seongeo, teuksu, gamchi, hojeok]

        let num = 0 // division ?????????

        divisions.map((outerValue, i) => {
            outerValue.map((innerValue, j) => {
                if(innerValue === mark) {
                    num = i
                }
            })
        })
        
        switch(num) {
            case 0 : 
                division = '??????'
                markColor = '#0078D7'
                break
            case 1 : 
                division = '??????'
                markColor = '#0ED145'
                break
            case 2 : 
                division = '??????'
                markColor = '#F0842C'
                break
            case 3 : 
                division = '??????'
                markColor = '#D2C0A8'
                break
            case 4 : 
                division = '??????'
                markColor = '#43513A'
                break
            case 5 : 
                division = '??????'
                markColor = '#FA0F00'
                break
            case 6 : 
                division = '??????'
                markColor = '#6FA5B5'
                break
            case 7 : 
                division = '??????'
                markColor = '#FFCA16'
                break
            case 8 : 
                division = '??????'
                markColor = '#AE4BD5'
                break
            case 9 : 
                division = '??????'
                markColor = '#9F5542'
                break
            case 10 : 
                division = '??????'
                markColor = '#6FA5B5'
                break
            case 11 : 
                division = '??????'
                markColor = '#6FA5B5'
                break
            case 12 : 
                division = '??????'
                markColor = '#6FA5B5'
                break
            case 13 : 
                division = '??????'
                markColor = '#6FA5B5'
                break
            default : division = ''
        }

        let party = item.party !== undefined && item.party.length !== 0 ? item.party[0].name : ''

        return (
            <TouchableHighlight
                onPress={() => this.selectCase(item.userCase.caseIdx, item.userCase.title)}
                // 11-08 ???????????? ???????????? ?????? ???????????? ?????????
                style={{
                    borderColor: '#000', 
                    borderWidth: 0.5,
                    borderRadius: 5,
                    marginVertical: 10,
                }}
            >
                <Detail 
                    key={item.userCase.caseIdx}
                    date={division}
                    result={item.userCase.court}
                    type={1}
                    style={{borderRadius: 5, height: 60}}
                    select={true}
                    markColor={markColor}
                    content={item.userCase.title}
                    divisionStyle={{backgroundColor: markColor, color: '#FFF'}}
                    // party={party} // ?????????? ??????? 0?????? ??????
                    // party={item.party[0].name}
                />
                {/* <Case 
                    navigation={this.props.navigation} 
                    key={item.userCase.caseIdx} 
                    data={item}
                /> */}
            </TouchableHighlight>
        )
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
                                ??????ToDo ??????
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
                                <Text style={styles.subTitleText} >??????</Text>
                            </View>
                            <View style={styles.contentContainer}>
                                <TextInput 
                                    style={styles.titleInput} 
                                    placeholder="????????? ???????????????." 
                                    placeholderTextColor="#808080"
                                    value={this.state.todoTitle}
                                    onChangeText={(value) => this.todoTitleHandle(value)}
                                />
                            </View>
                        </View>
                        <View style={styles.inputTitle}>
                            <View style={styles.subTitleContainer2}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <BlueDot />
                                    <Text style={styles.subTitleText} >????????????</Text>
                                </View>
                                <TouchableOpacity 
                                    style={{backgroundColor: '#0078d4', borderRadius: 12, height: 20, width: 45, justifyContent: 'center', alignItems: 'center', marginLeft: 15}}
                                    onPress={this.toggleModal}
                                >
                                    <Text style={{color: '#FFFFFF', fontSize: 13, fontWeight: '700'}}>??????</Text>
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
                                        <Text style={styles.caseLeft}>??????</Text>
                                    )
                                }
                            </View>
                        </View>
                        <View style={styles.inputContent}>
                            <View style={styles.subTitleContainer}>
                                <BlueDot />
                                <Text style={styles.subTitleText} >??????</Text>
                            </View>
                            <View style={styles.contentContainer}>
                                <TextInput 
                                    style={styles.contentInput} 
                                    multiline={true} 
                                    placeholder="????????? ???????????????."
                                    placeholderTextColor="#808080"
                                    value={this.state.content}
                                    onChangeText={(value) => this.contentHandle(value)}
                                />
                            </View>
                        </View>
                        <View style={styles.inputDate}>
                            <View style={styles.subTitleContainer2}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                    <BlueDot />
                                    <Text style={styles.subTitleText} >?????????</Text>
                                </View>
                                <TouchableOpacity 
                                    style={{backgroundColor: '#0078d4', borderRadius: 12, height: 20, width: 45, justifyContent: 'center', alignItems: 'center', marginLeft: 15}}
                                    onPress={this.showHandler}
                                >
                                    <Text style={{color: '#FFFFFF', fontSize: 13, fontWeight: '700'}}>??????</Text>
                                </TouchableOpacity>
                            </View>
                            {/* ?????? ????????? */}
                            <View style={styles.contentContainer}>
                                <View style={styles.datePickerButton}>
                                    <View style={styles.datePickerTextContainer}>
                                        <Text style={styles.datePickerText}>{moment(dt).format("YYYY??? ")}</Text>
                                        <Text style={styles.datePickerText}>{moment(dt).format("MM??? ")}</Text>
                                        <Text style={styles.datePickerText}>{moment(dt).format("DD???")}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.buttonContainer}>
                            {
                                this.props.navigation.getParam('modify') ? (
                                    <TouchableOpacity 
                                        style={[
                                            styles.button, 
                                            this.state.clicked ? {backgroundColor: '#C8C8C8'} : null
                                        ]} 
                                        disabled={this.state.clicked ? true : false}
                                        onPress={() => this.modifyTodo(moment(dt).format('YYYY-MM-DD'))} 
                                    >
                                            <Text style={styles.loginButton}>??????</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity 
                                        style={[
                                            styles.button, 
                                            this.state.clicked ? {backgroundColor: '#C8C8C8'} : null
                                        ]} 
                                        disabled={this.state.clicked ? true : false}
                                        onPress={() => this.addTodo(moment(dt).format('YYYY-MM-DD'))} 
                                    >
                                            <Text style={styles.loginButton}>??????</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
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
                    <View style={{flex: 1, backgroundColor: '#FFF', padding: 10,}}>
                        <FlatList 
                            data={this.state.cases}
                            renderItem={({item, index}) => this.renderItem(item, index)}
                            keyExtractor={(item, index) => `${index}`}
                            ListHeaderComponent={
                                this.state.cases.length !== 0 ? (
                                    <View>
                                        <View style={{flexDirection: 'row'}}>
                                            <View style={{flex: 1}} />
                                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                                {/* <Text style={{fontSize: 20}}>????????????</Text> */}
                                            </View>
                                            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                                                <TouchableOpacity style={{}} onPress={() => this.toggleModal()}>
                                                    <Image source={require('../../assets/images/X.png')} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                                            <View style={styles.inputContainer}>
                                                <TextInput 
                                                    style={styles.searchInput} 
                                                    placeholder="???????????? ???????????????." 
                                                    placeholderTextColor="#808080"
                                                    value={this.state.searchValue} 
                                                    onChangeText={(value) => this.textHandle(value)} 
                                                    onSubmitEditing={() => this.searchItem()}
                                                />
                                            </View>
                                            <TouchableOpacity style={{flex: 1}} onPress={() => this.searchItem()}>
                                                <Image source={require('../../assets/images/MagnifyingGlass.png')} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : <></>
                            }
                            
                            onEndReached={
                                this.state.cases.length / 10 > 0 && !this.state.searching ? (
                                    this.nextList
                                ) : null
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
    writeToDoTitleContainer: { // ToDo ??????
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
    subTitleContainer: { // ??? ?????? ????????????
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
        justifyContent: "flex-start",
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
        marginBottom: 20,
    },
    contentContainer2: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        marginLeft: Dimensions.get('window').width / 20,
        marginRight: Dimensions.get('window').width / 20,
        marginBottom: 20,
    },
    caseLeft: {
        fontSize: 15,
        marginLeft: 15,
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
        color: '#000',
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
        color: '#000',
    },
    inputDate: {

    },
    datePickerButton: {
        width: "90%",
    },
    datePickerTextContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginLeft: 15,
    },
    datePickerText: {
        fontSize: 16,
        fontWeight: "400",
        color: "#000",
    },
    buttonContainer: {
        flex: 1,
		justifyContent: 'center',
        alignItems: 'center',
	},
    button: {
        width: '85%', 
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
	},
    inputContainer: {
		flex: 8,
		marginRight: 10,
		marginLeft: 5,
	},
	searchInput: {
		fontSize: 13,
		fontWeight: "400",
		justifyContent: 'center',
		borderRadius: 5,
		backgroundColor: '#e5e5e5',
		color: '#000',
	},
	searchButton: {
		flex: 1,
	},
});