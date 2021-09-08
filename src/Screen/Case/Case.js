import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
    Image,
	StyleSheet,
} from 'react-native';

import { store } from '../../redux/store';
import { connect } from 'react-redux';
import { setCase, clearCase } from '../../redux/actions/cases'; // action
import { commonApi } from '../../Common/ApiConnector';
import moment from 'moment';

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
        })
        
        this.caseHandle = this.caseHandle.bind(this)
    }

    caseHandle(data) {
        console.log("clicked, ", data)

        this.props.clearCase()

        let plaintiff = ''
        let defendant = ''

        if(data.party.length !== 0) {
			this.setState({
				plaintiff: data.party[1].name,
				defendant: data.party[0].name
			})
		}

        
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

    async componentDidMount() {

        let todoSetdate = ''
        let memoSetdate = ''
        let progress = ''
        let today = moment().format('YYYY-MM-DD')
        today = moment(today)
        let diff = 0

        // case Todo 가져오기.

        if(store.getState().user.userType !== 'common') {



            commonApi('GET', `user/case/todo/caseIdx/${this.props.data.userCase.caseIdx}`, {}).then((result) => {
                result.success === undefined ? (
                    // todoSetdate = result[result.length-1].settingAt.split('T')[0],
                    // todoSetdate = moment(todoSetdate),
                    // diff = todoSetdate.diff(today, 'days'),
                    
                    // diff *= -1,
                    
                    // diff > 0 ? (diff = `+${diff}`) : (diff === 0 ? (diff = `-0`) : (<></>)),

                    this.setState({
                        todoText: `ToDo : ${result[result.length-1].content}`,
                        // todoDiff: diff
                    })
                    
                ) : (
                    console.log(result.msg)
                )
            }).catch((err) => console.log('loading case information during user/case/todo/caseIdx :::', err))

            // case 진행사항 마지막항목 가져오기
            commonApi('GET', `user/case/progress/${this.props.data.userCase.caseNumber}`, {}).then((result) => {

                if(result.success === undefined) {
                    memoSetdate = result[(result.length - 1)].date.split('T')[0]
                    progress = result[(result.length - 1)].content

                    console.log(result)
                    console.log(memoSetdate)
                    console.log(progress)

                    memoSetdate = moment(memoSetdate)
                    diff = memoSetdate.diff(today, 'days')
                    diff *= -1

                    diff > 0 ? (diff = `D+${diff}`) : (diff === 0 ? (diff = `D-0`) : (diff = `D-${diff}`))

                    this.setState({
                        todoDiff: diff,
                        progress: progress
                    })

                }

            }).catch((err) => console.log(`user/case/progress/${this.props.data.userCase.caseNumber}`, err))

            // // case 메모 가져오기.
            // commonApi('GET', `user/case/usernote/${this.props.data.userCase.caseIdx}`, {}).then((result) => {
            //     result.success === undefined ? (
            //         // memoSetdate = result[result.length-1].settingAt.split('T')[0],
            //         // memoSetdate = moment(memoSetdate),
            //         // diff = memoSetdate.diff(today, 'days'),
                    
            //         // diff *= -1,

            //         // diff > 0 ? (diff = `+${diff}`) : (diff === 0 ? (diff = `-0`) : (<></>)),

            //         this.setState({
            //             memoText: result[result.length-1].content,
            //             // memoDiff: diff
            //         })

            //     ) : (
            //         console.log(result.msg)
            //     )
            // }).catch((err) => console.log('loading case information during user/case/todo/caseIdx :::', err))

        }

    }

    render() {

        const {data} = this.props;

        // console.log(data);

        return (
            <View style={styles.caseContainer}>
                <View style={styles.caseTitle}>
                    {/* <View style={styles.caseCategory}>
                        <Text style={styles.categoryText}>민사</Text>
                    </View> */}
                    <Text style={styles.caseTitleText}>{data.userCase.title}</Text>
                    <View style={styles.headerRight}>

                        {/* <Image source={require('../../assets/images/Favorite.png')} /> */}
                        {/* <Image source={require('../../assets/images/NonFavorite.png')} /> */}
                        <Text style={styles.caseLocation}>{data.userCase.court}</Text>
                    </View>
                </View>
                <View style={styles.detailContainer}>
                    <View style={styles.detailTextContainer}>
                            {
                                data.party[0] !== undefined ? (
                                    <Text style={styles.company}>
                                        {data.party[0].name} / {data.party[1].name}
                                    </Text>
                                ) : (
                                    <Text style={styles.company} />
                                )
                            }
                        <Text style={styles.detailTodoText}>{this.state.todoText}</Text>
                        {/* 진행내용의 제일 마지막 값 출력되게. */}
                        {/* <Text style={styles.subDetailText}>변론기일 21.06.24(목) 14:00</Text> */}
                        <Text style={styles.subDetailText}>{this.state.progress}</Text>
                    </View>
                    <View style={styles.dDayContainer}>
                        <Text style={styles.limitDate}>{this.state.todoDiff}</Text>
                        <View style={styles.dDaySubContainer}>
                            <View style={styles.dDayTextContainer}>
                                <Text style={styles.dDayText}>기일</Text>
                            </View>
                            <Text style={styles.subLimitDate}>{this.state.todoDiff}</Text>
                            <Text style={styles.subLimitDate}></Text>
                        </View>
                    </View>
                </View>
                {/* <View style={styles.locationContainer}>
                    <Text style={styles.locationText}>
                        사회 봉사허가청구/시회봉서허가청구취소
                    </Text>
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
        height: 141,
        marginTop: 10,
        marginBottom: 10,
        // marginBottom: 10,
        backgroundColor:  "#FFFFFF",
        // borderBottomLeftRadius: 15,
        // borderBottomRightRadius: 15,
        borderRadius: 15,
        // shadowColor: "#000",
        // shadowOffset: {
        // width: 0,
        // height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    caseTitle: {
        width: "100%",
        height: 38,
        // backgroundColor: "#2665A1",
        flexDirection: "row",
        paddingTop: 10,
        justifyContent: "space-between",
        alignItems: "flex-end",
        // paddingBottom: 10,
        borderBottomColor: '#2665A1',
        borderBottomWidth: 1,
    },
    caseCategory: {
        width: 50,
        height: 25,
        // borderStyle: "solid",
        borderColor: "#FFFFFF",
        borderWidth: 2.8,
        // borderTopLeftRadius: 12,
        // borderTopRightRadius: 12,
        // borderBottomLeftRadius: 12,
        // borderBottomRightRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    categoryText: {
        fontSize: 13,
        fontWeight: "bold",
        // color: "#FFFFFF",
    },
    caseTitleText: {
        fontSize: 20,
        fontWeight: "bold",
        alignItems: "center",
        color: "#000",
        marginLeft: 5,
        marginBottom: 3,
    },
    headerRight: {
        // justifyContent: 'flex-end',
        display: 'flex',
        alignItems: 'flex-end',
        marginRight: 10,
    },
    caseLocation: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#000",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginRight: 5,
        marginBottom: 3,
    },
    detailContainer: {
        height: 90,
        borderBottomColor: "#2665A1", // 포인트컬러
        borderBottomWidth: 1,
        flexDirection: "row",
        paddingTop: 17,
        paddingBottom: 16,
        justifyContent: "space-between",
        alignItems: "center",
    },
    detailTextContainer: {
        // justifyContent: 'space-around',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 17,
        flex: 7.5,
    },
    company: {
        fontSize: 13,
        color: '#000',
    },
    detailTodoText: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#2665A1",
    },
    subDetailText: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#2665A1" // 포인트컬러
    },
    dDayContainer: {
        alignItems: "center",
        paddingRight: 19,
        flex: 4,
    },
    limitDate: {
        color: "#F0842C",
        fontWeight: "bold",
        fontSize: 32,
    },
    dDaySubContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
    },
    dDayTextContainer: {
        backgroundColor: "#2665A1", // 포인트컬러
        // borderRadius: 12,
        width: 30,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    dDayText: {
        color: "#FFFFFF",
        fontSize: 12,
        fontWeight: "bold",
    },
    subLimitDate: {
        color: "#2665A1", // 포인트컬러
        fontSize: 20,
        fontWeight: "bold",
    },
    locationContainer: {
        alignItems: "flex-end",
        // paddingRight: 20,
        height: 20,
    },
    locationText: {
        // fontSize: 13,
        // fontWeight: "bold",
        // color: "#2665A1", // 포인트컬러
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
