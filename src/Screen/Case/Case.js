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
        mark = mark.replace(new RegExp("[(0-9)]", "gi"), "") // 가합/가소/차 등 민사/형사 같은거 표시용

        const minsa = ['가합', '가단', '가소', '나', '다', '라', '마', '그', '바', '머', '자', '차', '러', 
                    '재가합', '재가단', '재가소', '재나', '재다', '재라', '재마', '재그', '재머', '재자', '재차', 
                    '준재가합', '준재가단', '준재가소', '준재나', '준재다', '준재라', '준재자', '준재머']

		const sincheong = ['카', '카공', '카구', '카기', '카기전', '카단', '카담', '카명', '카조', '카합', '카확', '재카기', '카열', '카불', '카임', '카정', '카경', '카소']

		const jibhang = ['타채', '타기', '타인', '타배']
		
		const bisong = ['비합', '비단', '파', '과', '책', '재비합', '재비단']
		
		const dosan = ['회합', '회단', '회확', '회기', '하합', '하단', '하확', '하면', '하기', '개회', '개확', '개기', '개보', '국승', '국지', '간회단', '간회합']

		const hyeongsa = ['고합', '고단', '고정', '고약', '노', '도', '로', '모', '오', '보', '코', '초', '초적', 
                    '초보', '초기', '감고', '감노', '감도', '감로', '감모', '감오', '감초', '재고합', '재고단', '재고정', 
                    '재고약', '재노', '재도', '재감고', '재감노', '재감도', '고약전', '초사', '전로', '전초', '전모', 
                    '치고', '치노', '치도', '치오', '치초', '초치', '치로', '치모', '초재', '전고', '저노', '전도', '전오']

		const boho = ['푸', '크', '트', '푸초', '버', '서', '어', '저', '성', '성로', '성모', '성초', '처']

		const gasa = ['드', '드합', '드단', '르', '므', '브', '스', '으', '너', '즈합', '즈단', '즈기', '느합', '느단', 
                    '재드', '재드합', '재드단', '재르', '재므', '재브', '재스', '재너', '재느합', '재느단', '준재드', 
                    '준재드합', '준재드단', '준재르', '준재므', '준재스', '준재느합', '준재느단', '인', '인라', '인마', '인카', '재으']

        const haengjeong = ['구', '구합', '구단', '누', '두', '루', '무', '부', '사', '아', '재구', '재구합', '재구단', '재누', '재두', '재루', '재무', '재아', '준재구', '준재누', '재부']

        const teukheo = ['허', '후', '흐', '히', '카허', '재허', '재후']

		const seongeo = ['수', '수흐', '주']

		const teuksu = ['추']

        const gamchi = ['정명', '정드', '정브', '정스']

        const hojeok = ['호기', '호명']

        const divisions = [minsa, sincheong, jibhang, bisong, dosan, hyeongsa, boho, gasa, haengjeong, teukheo, seongeo, teuksu, gamchi, hojeok]

        let num = 0 // division 구분용

        divisions.map((outerValue, i) => {
            outerValue.map((innerValue, j) => {
                if(innerValue === mark) {
                    num = i
                }
            })
        })
        
        switch(num) {
            case 0 : 
                division = '민사'
                markColor = '#0078D7'
                break
            case 1 : 
                division = '신청'
                markColor = '#0ED145'
                break
            case 2 : 
                division = '집행'
                markColor = '#F0842C'
                break
            case 3 : 
                division = '비송'
                markColor = '#D2C0A8'
                break
            case 4 : 
                division = '도산'
                markColor = '#43513A'
                break
            case 5 : 
                division = '형사'
                markColor = '#FA0F00'
                break
            case 6 : 
                division = '보호'
                markColor = '#6FA5B5'
                break
            case 7 : 
                division = '가사'
                markColor = '#FFCA16'
                break
            case 8 : 
                division = '행정'
                markColor = '#AE4BD5'
                break
            case 9 : 
                division = '특허'
                markColor = '#9F5542'
                break
            case 10 : 
                division = '선거'
                markColor = '#6FA5B5'
                break
            case 11 : 
                division = '특수'
                markColor = '#6FA5B5'
                break
            case 12 : 
                division = '감치'
                markColor = '#6FA5B5'
                break
            case 13 : 
                division = '호적'
                markColor = '#6FA5B5'
                break
            default : division = ''
        }

        this.setState({
            division: division,
            markColor: markColor,
            favorite: favorite
        })
        

        // case Todo 가져오기.
        // 일부 통신은 멤버십 회원만 가져오게 처리
        if(true) {
            // 상용할때 체크해야함 ... JY
            if(store.getState().user.userType === 'common') {
                commonApi('GET', `user/case/todo/caseIdx/${this.props.data.userCase.caseIdx}`, {}).then((result) => {
                    if(result.success === undefined || result.success === null){

                        // for(let i = 1; i <= result.length; i++) {

                        //     if(result[result.length - i].isCheck === true || result[result.length - i].isCheck === 'true') { // 체크됐는지 확인, 체크가 되었으면 넘어감
                        //         continue
                        //     } else {
                        //         todoSetdate = moment.tz(result[result.length - i].settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")
                        //         // todoSetdate = result[result.length - i].settingAt.split('T')[0]
                        //         todoText = `ToDo: ${result[result.length-i].title}`
                        //         break
                        //     }
                        // }

                        // check true 제외하기
                        let filterResult = result.filter((value) => value.isCheck !== true || value.isCheck !== 'true')

                        /*
                            todoSetdate 처리하기
                            1순위 : value.settingAt이 오늘일 경우
                            2순위 : value.settingAt이 오늘보다 미래이면서 가장 가까운날의 1번째
                            3순위 : value.settingAt이 오늘보다 과거이면서 가장 가까운날의 1번째
                        */
                       
                       let resultSettingAt = ''

                        // map 돌아서 dates 배열에 날짜차이를 넣기

                        filterResult.map((value) => {
                            resultSettingAt = moment.tz(value.settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")
                            todoSetdate = moment(resultSettingAt)
                            diff = todoSetdate.diff(today, 'days')
                            dates.push(diff)
                        })


                        if(dates.length > 0) {
                            if(dates.indexOf(0) !== -1) {
                                // 1순위 처리
                                todoSetdate = moment.tz(filterResult[dates.indexOf(0)].settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")
                                todoText = `ToDo: ${filterResult[dates.indexOf(0)].title}`
                            } else {
                                // 2, 3순위 처리
                                let temp = dates.filter((value) => value > 0)

                                if(temp.length !== 0) {
                                    temp.sort(function(a, b)  {
                                        return a - b;
                                    })

                                    // 0번째 인덱스 값 뽑아서 indexOf 돌리면됨 ==> D-~~~ 중 제일가까운날짜 지정됨
                                    todoSetdate = moment.tz(filterResult[dates.indexOf(temp[0])].settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")
                                    todoText = `ToDo: ${result[dates.indexOf(temp[0])].title}`

                                } else {

                                    temp = dates.filter((value) => value < 0)

                                    if(temp.length !== 0) {
                                        temp.sort(function(a, b)  {
                                            return b - a;
                                        })
                                    }

                                    // reverse 해서 0번째 인덱스 값 뽑아서 indexOf 돌리면됨 ==> D+~~~ 중 제일가까운날짜 지정됨
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
            // case 진행사항 마지막항목 가져오기 --> 기일설정
            commonApi('GET', `user/case/progress/caseNumber/${this.props.data.userCase.caseNumber}`, {}).then((result) => {

                if(result.success === undefined || result.success === null) {

                    let termins = []
                    let date_1
                    let date_2  

                    // termins = result.filter((value) => value.type === 1)
                    // termins = result.filter((value) => value.content.includes('기일') && value.content.includes(':') && value.result === '')

                    // 11-05 진행내용 type이 없어져서 필터링 조건이 바뀜 ... JY

                    // 진행내용을 가져올때 type을 더이상 가져오지 않기 때문에 '기일'과 ':' 로 구분함
                    // 기일이 포함된 내용 중 최신것만 들고오고, 비어보이지 않게하고싶기 때문에 소팅된것중에서도 결과가 있더라도 출력함

                    // 11-08 사건목록에서만 기일이 표시되는것들은 result 항목이 비어있는 기일만 나오게 한다 ... JY
                    termins = result.filter((value) => (value.content.includes('기일') && value.content.includes(':')) 
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
    
                        // memoSetdate = `${progress.split('기일')[0].trim()}기일 : ${moment(memoSetdate).format('YY. MM. DD')}(${moment(memoSetdate).format('dddd').charAt(0)}) ${result[(result.length - 1)].date.split('T')[1].substring(0, 5)}`
                        memoSetdate = `${progress.split('기일')[0].trim()}기일 : ${moment(memoSetdate).format('YY. MM. DD')}(${moment(memoSetdate).format('dddd').charAt(0)}) ${termins[0].content.split(':')[0].slice(-2)}:${termins[0].content.split(':')[1].slice(0, 2)}`

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

            // 사건명이 ''이면 사건 상세 가져오기에서 caseName으로 처리하기
            // if(this.props.data.userCase.title === '') {
            //     commonApi('GET', `user/case/caseIdx/${this.props.data.userCase.caseIdx}`, {}).then((result) => {
            //         if(result.success !== undefined || result.success !== null) {
            //             this.setState({
            //                 title: result[0].caseName
            //             })
            //         } else {
            //             SimpleToast.show(result.msg, SimpleToast.BOTTOM)
            //         }
            //     // }).catch((err) => SimpleToast.show("서버와 연결이 끊어졌습니다. \n나중에 다시 시도해주세요.", SimpleToast.BOTTOM))
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
                        {/* 진행내용의 제일 마지막 값 출력되게. */}
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
        color: "#2665A1", // 포인트컬러
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
        backgroundColor: "#0078d4", // 포인트컬러
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
        color: "#0078d4", // 포인트컬러
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
