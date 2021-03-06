import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
    Image,
	StyleSheet,
    Dimensions,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import { store } from '../../redux/store';
import { connect } from 'react-redux';
import { setCase, clearCase } from '../../redux/actions/cases'; // action
import { commonApi } from '../../Common/ApiConnector';
import moment from 'moment';
import SimpleToast from 'react-native-simple-toast';

class Case extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            todoText: '-',
            todoSetdate: '',
            memoText: '',
            memoSetdate: '',
            todoDiff: '',
            memoDiff: '',
            progress: '-',
            todoColor: 'black',
            memoColor: 'black',
            division: '',
            markColor: 'black',
            favorite: false,
            title: '',
        })
        
        this.caseHandle = this.caseHandle.bind(this)
        this.toggleFavorite = this.toggleFavorite.bind(this)
    }

    caseHandle(data) {

        this.props.clearCase()

        let plaintiff = ''
        let defendant = ''

        // if(data.party.length !== 0) {
		// 	this.setState({
		// 		plaintiff: data.party[1].name,
		// 		defendant: data.party[0].name
		// 	})
		// }

        
        // if(data.party[1].name !== undefined) {
        //     plaintiff = data.party[1].name
        // }

        // if(data.party[0].name !== undefined) {
        //     defendant = data.party[0].name
        // }

        this.props.setCase({
            caseIdx: data.userCase.caseIdx,
            caseNumber: data.userCase.caseNumber,
            title: data.userCase.title,
            court: data.userCase.court,
            caseName: data.userCase.caseName,
            plaintiff: plaintiff,
            defendant: defendant,
            judiciary: data.userCase.judiciary,
            receiptAt: data.userCase.receiptAt,
            mergeClassification: data.userCase.mergeClassification,
            fee: data.userCase.fee,
            finalResult: data.userCase.finalResult,
        })

        this.props.navigation.navigate('CaseDetail')

    }

    async toggleFavorite() {

        await commonApi('PUT', `user/case/favorite/${this.props.data.userCase.caseIdx}`, {}).then((result) => {
            if(result.success) {
                this.setState({
                    favorite: !this.state.favorite
                })
            } else {
                SimpleToast.show(result.msg, SimpleToast.BOTTOM)
            }
        // }).catch((err) => console.log(('toggleFavorite err ', err)))
        }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

    }

    async componentDidMount() {

        let dates = []
        let todoSetdate = ''
        let todoColor = 'black'
        let memoSetdate = ''
        let memoColor = 'black'
        let progress = ''
        let today = moment.tz(new Date(), 'Asia/Seoul').utc(9).format('YYYY-MM-DD')
        // today = moment(today)
        let diff = 0
        let date = ''
        let todoText = ''
        let markColor = 'black'
        let division = ''
        let flag = false
        let favorite = false
        if(this.props.data.userCase.favorite === 'true' || this.props.data.userCase.favorite === true) {
            favorite = true
        }

        let mark = this.props.data.userCase.caseNumber.substring(4)
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

        this.setState({
            division: division,
            markColor: markColor,
            favorite: favorite
        })
        

        // case Todo ????????????.
        // ?????? ????????? ????????? ????????? ???????????? ??????
        if(true) {
            // ???????????? ??????????????? ... JY
            if(store.getState().user.userType === 'common') {
                commonApi('GET', `user/case/todo/caseIdx/${this.props.data.userCase.caseIdx}`, {}).then((result) => {
                    if(result.success === undefined || result.success === null){

                        // for(let i = 1; i <= result.length; i++) {

                        //     if(result[result.length - i].isCheck === true || result[result.length - i].isCheck === 'true') { // ??????????????? ??????, ????????? ???????????? ?????????
                        //         continue
                        //     } else {
                        //         todoSetdate = moment.tz(result[result.length - i].settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")
                        //         // todoSetdate = result[result.length - i].settingAt.split('T')[0]
                        //         todoText = `ToDo: ${result[result.length-i].title}`
                        //         break
                        //     }
                        // }

                        // check true ????????????
                        let filterResult = result.filter((value) => value.isCheck !== true || value.isCheck !== 'true')

                        /*
                            todoSetdate ????????????
                            1?????? : value.settingAt??? ????????? ??????
                            2?????? : value.settingAt??? ???????????? ??????????????? ?????? ??????????????? 1??????
                            3?????? : value.settingAt??? ???????????? ??????????????? ?????? ??????????????? 1??????
                        */
                       
                       let resultSettingAt = ''

                        // map ????????? dates ????????? ??????????????? ??????

                        filterResult.map((value) => {
                            resultSettingAt = moment.tz(value.settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")
                            todoSetdate = moment(resultSettingAt)
                            diff = todoSetdate.diff(today, 'days')
                            dates.push(diff)
                        })


                        if(dates.length > 0) {
                            if(dates.indexOf(0) !== -1) {
                                // 1?????? ??????
                                todoSetdate = moment.tz(filterResult[dates.indexOf(0)].settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")
                                todoText = `ToDo: ${filterResult[dates.indexOf(0)].title}`
                            } else {
                                // 2, 3?????? ??????
                                let temp = dates.filter((value) => value > 0)

                                if(temp.length !== 0) {
                                    temp.sort(function(a, b)  {
                                        return a - b;
                                    })

                                    // 0?????? ????????? ??? ????????? indexOf ???????????? ==> D-~~~ ??? ????????????????????? ?????????
                                    todoSetdate = moment.tz(filterResult[dates.indexOf(temp[0])].settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")
                                    todoText = `ToDo: ${result[dates.indexOf(temp[0])].title}`

                                } else {

                                    temp = dates.filter((value) => value < 0)

                                    if(temp.length !== 0) {
                                        temp.sort(function(a, b)  {
                                            return b - a;
                                        })
                                    }

                                    // reverse ?????? 0?????? ????????? ??? ????????? indexOf ???????????? ==> D+~~~ ??? ????????????????????? ?????????
                                    todoSetdate = moment.tz(filterResult[dates.indexOf(temp[0])].settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")
                                    todoText = `ToDo: ${result[dates.indexOf(temp[0])].title}`

                                }
                            }
                        }

                        todoSetdate = moment(todoSetdate)
                        diff = todoSetdate.diff(today, 'days')
                        
                        diff *= -1
                        
                        diff > 0 ? (
                            diff = `(D+${diff})`,
                            todoColor = '#88001b'
                        ) : (
                            diff === 0 ? (
                                diff = `(D-0)`
                            ) : (
                                diff < 0 ? (
                                    diff = `(D${diff})`,
                                    todoColor = '#23895f'
                                ) : (
                                    diff = `-`
                                )
                            )
                        )

                        this.setState({
                            todoText: todoText,
                            todoDiff: diff,
                            todoColor: todoColor,
                        })
                        
                    } else {
                        // SimpleToast.show(result.msg, SimpleToast.BOTTOM)
                        console.log(result.msg)
                    }
                }).catch((err) => console.log('loading case information during user/case/todo/caseIdx :::', err))
                // }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
            }
            // case ???????????? ??????????????? ???????????? --> ????????????
            commonApi('GET', `user/case/progress/caseNumber/${this.props.data.userCase.caseNumber}`, {}).then((result) => {

                if(result.success === undefined || result.success === null) {

                    let termins = []
                    let date_1
                    let date_2  

                    // termins = result.filter((value) => value.type === 1)
                    // termins = result.filter((value) => value.content.includes('??????') && value.content.includes(':') && value.result === '')

                    // 11-05 ???????????? type??? ???????????? ????????? ????????? ?????? ... JY

                    // ??????????????? ???????????? type??? ????????? ???????????? ?????? ????????? '??????'??? ':' ??? ?????????
                    // ????????? ????????? ?????? ??? ???????????? ????????????, ??????????????? ?????????????????? ????????? ???????????????????????? ????????? ???????????? ?????????

                    // 11-08 ????????????????????? ????????? ????????????????????? result ????????? ???????????? ????????? ????????? ?????? ... JY
                    termins = result.filter((value) => (value.content.includes('??????') && value.content.includes(':')) 
                                                        && value.result !== undefined && value.result !== null && value.result === '')

                    // console.log('305', termins)

                    if(termins.length !== 0) {
                        termins = termins.sort(function(a,b ) {
                            date_1 = new Date(a.date)
                            date_2 = new Date(b.date)
                            if(date_1 > date_2) {
                                return -1
                            } else if(date_1 === date_2) {
                                return 0
                            } else {
                                return 1
                            }
                        }),
                        
                        memoSetdate = moment.tz(termins[0].date, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")
                        // memoSetdate = termins[0].date.split('T')[0]
                        date = moment(memoSetdate).format('dddd').charAt(0)
                        progress = termins[0].content
    
                        memoSetdate = moment(memoSetdate)
                        diff = memoSetdate.diff(today, 'days')
                        diff *= -1
    
                        diff > 0 ? (
                            diff = `(D+${diff})`,
                            memoColor = '#88001b'
                        ) : (
                            diff === 0 ? (
                                diff = `(D-0)`
                            ) : (
                                diff = `(D${diff})`,
                                memoColor = '#23895f'
                            )
                        )
    
                        // memoSetdate = `${progress.split('??????')[0].trim()}?????? : ${moment(memoSetdate).format('YY. MM. DD')}(${moment(memoSetdate).format('dddd').charAt(0)}) ${result[(result.length - 1)].date.split('T')[1].substring(0, 5)}`
                        memoSetdate = `${progress.split('??????')[0].trim()}?????? : ${moment(memoSetdate).format('YY. MM. DD')}(${moment(memoSetdate).format('dddd').charAt(0)}) ${termins[0].content.split(':')[0].slice(-2)}:${termins[0].content.split(':')[1].slice(0, 2)}`

                    } else {
                        diff = ``
                        memoSetdate = `-`
                    }


                    this.setState({
                        memoDiff: diff,
                        progress: progress,
                        date: date,
                        memoSetdate: memoSetdate,
                        memoColor: memoColor,
                    })

                } else {
                    // SimpleToast.show(result.msg, SimpleToast.BOTTOM)
                    console.log(`user/case/progress/caseNumber/${this.props.data.userCase.caseNumber}`, result.msg)
                }

            }).catch((err) => console.log(`user/case/progress/caseNumber/${this.props.data.userCase.caseNumber}`, err))
            // }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

            // ???????????? ''?????? ?????? ?????? ?????????????????? caseName?????? ????????????
            // if(this.props.data.userCase.title === '') {
            //     commonApi('GET', `user/case/caseIdx/${this.props.data.userCase.caseIdx}`, {}).then((result) => {
            //         if(result.success !== undefined || result.success !== null) {
            //             this.setState({
            //                 title: result[0].caseName
            //             })
            //         } else {
            //             SimpleToast.show(result.msg, SimpleToast.BOTTOM)
            //         }
            //     // }).catch((err) => SimpleToast.show("????????? ????????? ??????????????????. \n????????? ?????? ??????????????????.", SimpleToast.BOTTOM))
            //     }).catch((err) => console.log(err.msg))
            // } else {
            //     this.setState({title: this.props.data.userCase.title})
            // }
        }

    }

    longPress = () => {
        this.props.onLongPress(this.state.title, this.props.data.userCase.caseIdx)
    }

    render() {

        const {data} = this.props;
        let title = ''

        if(data.userCase.title !== null) {
            if(data.userCase.title.length > 10) {
                title = data.userCase.title.slice(0, 10) + '...'
            } else {
                title = data.userCase.title
            }
        }

        return (
            <View 
                style={styles.caseContainer} 
                // onPress={() => this.caseHandle(this.props.data)} 
                // onLongPress={this.longPress}
            >
                <View style={styles.caseTitle}>
                    <Text style={styles.caseTitleText}>{title}</Text>
                    <View style={styles.headerRight}>
                        <View style={[styles.divisionContainer, {backgroundColor: this.state.markColor}]}>
                            <Text style={styles.division}>{this.state.division}</Text>
                        </View>
                        <Text style={styles.caseLocation}>{data.userCase.court}</Text>
                    </View>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.detailTextContainer}>
                        <View style={styles.itemContainer}>
                            <Icon name="person-circle-outline" size={15} style={styles.companyIcon} />
                            {
                                data.party !== undefined && data.party[0] !== undefined ? (
                                    <Text style={styles.company}>
                                        {
                                            data.party.length > 1 && (data.party[0].name !== null && data.party[1].name !== null) && data.party[1].name.trim() !== '' ? (
                                                `${data.party[0].name.replace(/[0-9\.]/g,"").trim()} / ${data.party[1].name.replace(/[0-9\.]/g,"").trim()}`
                                            ) : (
                                                data.party.length > 0 && data.party[0].name !== null ? (
                                                    `${data.party[0].name.replace(/[0-9\.]/g,"").trim()}`
                                                ) : null
                                            )
                                        }
                                        
                                    </Text>
                                ) : (
                                    <Text style={styles.company} />
                                )
                            }
                        </View>
                        <View style={styles.itemContainer}>
                            <Icon name="md-reader-outline" size={15} style={styles.todoIcon} />
                            <Text style={styles.detailTodoText}>{this.state.todoText}<Text style={{color: this.state.todoColor}}> {this.state.todoDiff}</Text></Text>
                        </View>
                        {/* ??????????????? ?????? ????????? ??? ????????????. */}
                        <View style={styles.itemContainer}>
                            <Icon name="calendar-outline" size={15} style={styles.memoIcon} />
                            <Text style={styles.subDetailText}>{this.state.memoSetdate}<Text style={{color: this.state.memoColor}}> {this.state.memoDiff}</Text></Text>
                        </View>
                    </View>
                </View>
                {/* <View style={styles.favoriteIcon}>
                    <View style={[styles.divisionContainer, {backgroundColor: this.state.markColor}]}>
                        <Text style={styles.division}>{this.state.division}</Text>
                    </View>
                </View> */}
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    caseContainer: {
        flex: 1,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor:  "#FFFFFF",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    caseTitle: {
        width: "95%",
        height: 38,
        flexDirection: "row",
        paddingTop: 5,
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderBottomColor: '#0078d4',
        borderBottomWidth: 1,
        marginLeft: Dimensions.get('window').width / 40,
        marginRight: Dimensions.get('window').width / 40,
    },
    caseCategory: {
        width: 50,
        height: 25,
        borderColor: "#FFFFFF",
        borderWidth: 2.8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryText: {
        fontSize: 11,
        fontWeight: "bold",
    },
    caseTitleText: {
        fontSize: 16,
        fontWeight: "bold",
        alignItems: "center",
        color: "#000",
        marginBottom: 3,
        marginLeft: 3,
    },
    headerRight: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom: 3,
    },
    divisionContainer: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginLeft: 2,
        // position: 'absolute',
        // right: -5,
        // bottom: 2,
    },
    division: {
        color: '#FFF',
        fontSize: 11,
    },
    caseLocation: {
        fontSize: 11,
        color: "#000",
    },
    detailContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
    },
    detailTextContainer: {
        alignItems: 'flex-start',
        flex: 7.5,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%',
        marginLeft: Dimensions.get('window').width / 40,
    },
    companyIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 21,
    },
    todoIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 24,
    },
    memoIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 16,
    },
    company: {
        fontSize: 13,
        marginBottom:5,
        color: '#808080',
        marginLeft: 5,
    },
    detailTodoText: {
        fontSize: 13,
        marginBottom: 10,
        color: "#000",
        marginLeft: 5,
    },
    subDetailText: {
        fontSize: 13,
        color: "#2665A1", // ???????????????
        marginLeft: 5,
    },
    favoriteIcon: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginRight: 10,
    },
    dDayContainer: {
        alignItems: "center",
        paddingRight: 19,
        flex: 4,
    },
    limitDate: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 30,
    },
    dDaySubContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    dDayTextContainer: {
        backgroundColor: "#0078d4", // ???????????????
        width: 30,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    dDayText: {
        color: "#FFFFFF",
        fontSize: 10,
        fontWeight: "bold",
    },
    subLimitDate: {
        color: "#0078d4", // ???????????????
        fontSize: 18,
        fontWeight: "bold",
    },
    locationContainer: {
        alignItems: "flex-end",
        height: 20,
    },
    locationText: {

    },
});

const mapStateToProps = (state) => {
	return {
		caseIdx: state.cases.caseIdx,
        caseNumber: state.cases.caseNumber,
        title: state.cases.title,
	}
};

const mapDispatchToProps = {
	setCase, clearCase,
}

export default connect(mapStateToProps, mapDispatchToProps)(Case);
