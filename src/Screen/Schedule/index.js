import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	StyleSheet,
	Dimensions,
	BackHandler,
	FlatList,
	ActivityIndicator,
	Alert
} from 'react-native';
import { format } from 'date-fns'
import moment from 'moment';
import 'moment/locale/ko';
import SimpleToast from 'react-native-simple-toast';

import { Calendar, CalendarList, Agenda, LocaleConfig } from '../../Common/react-native-calendars';
import HeaderText from '../../Components/HeaderText';
import ScheduleNavigator from '../../Navigation/ScheduleNavigator';
import Modal from 'react-native-modal';
import { commonApi } from '../../Common/ApiConnector';
// import ApiCalendar from 'react-google-calendar-api';
import { store } from '../../redux/store';
import { setSchedule, clearSchedule } from '../../redux/actions/schedule';
import { connect } from 'react-redux';
import RNCalendarEvents from "react-native-calendar-events";
import formatISO from 'date-fns/formatISO';
import BlueDot from '../../Components/BlueDot';


// https://github.com/wix/react-native-calendars
LocaleConfig.locales['ko'] = {
	monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
	dayNames: ['일요일','월요일', '화요일','수요일','목요일','금요일','토요일'],
  	dayNamesShort: ['일', '월','화','수','목','금','토'],
	today: 'Aujourd\'hui'
};
LocaleConfig.defaultLocale = 'ko';

class Schedule extends Component {

	
	constructor(props) {
		super(props);
		// let date = moment().format('MMMM')
		let date = moment().format('YYYY-MM-DD')
		this.state = ({
			date: new Date(),
			selectedDate: date,
			// selectedDate: '',
			// isVisible: false,
			todos: [],
			memos: [],
			progresses: [],
			calendars: [],
			// dataSource: [],
            // pageToken: '',
            // loading: false,
            // scrollPosition: 0,
            // selectedDay: moment(),
            // month: date = date[0].toUpperCase() + date.substr(1),
            // error: null,
            // refreshing: false,
			dots: {}
		})
		
		// this.newDate=[];
        // this.heights=[];
        // this.onLayout = this.onLayout.bind(this)
		
		// this.toggleModal = this.toggleModal.bind(this)
		this.fetchData = this.fetchData.bind(this)
		// this.googleLogin = this.googleLogin.bind(this)
		this.fetchAllData = this.fetchAllData.bind(this)
	}
	
	// toggleModal() {
	// 	this.setState({isVisible: !this.state.isVisible})
	// }

	async componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

		// if(store.getState().user.google !== 'auth') {
		// 	this.setState({
		// 		isVisible: true,
		// 	})
		// }

		// this.getEvents()

		let dots = new Object()
		let temp = {}
		let tempDate = {}
		
		let selectedDate = moment().format('YYYY-MM-DD')
		let dates = [] // 점 찍은 날짜 담기. 해당 날짜가 있으면 --> dots.[temp.date].dots.push(termin/todo/user), 없으면 --> assign
		const termin = {key: 'termin', color: '#f0842c', selectedDotColor: '#f0842c'}
		const user = {key: 'user', color: '#ae4bd5', selectedDotColor: '#ae4bd5'}
		const todo = {key: 'todo', color: '#1daa99', selectedDotColor: '#1daa99'}

		dates = []
		let flag = false

		this.props.navigation.addListener('didFocus', () => {

			dates = []
			let flag = false

			new Promise((resolve, reject) => {

				commonApi('GET', 'user/case/todo/userIdx', {}).then((result) => {
					{
						result.success ? (
							result.data.map((outerValue) => {
								outerValue.userTodo.map((innerValue) => {
									// moment.tz(innerValue.settingAt.split('T')[0], 'Asia/Seoul').utc(9).format()
									// 타임존 날짜변경 해야함.
									// temp = {date: innerValue.updateAt.split('T')[0].toString()} // "YYYY-MM-DD"
									temp = {date: moment.tz(innerValue.settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")} // "YYYY-MM-DD"

									// 날짜 없을때
									// todo는 처음 넣는거라 중복일필요 없음, 넘어감
									if(!dates.includes(temp.date)) {
										dates.push(temp.date) // 날짜배열에 넣음.
										tempDate = {[temp.date]: {dots: [todo]}}
										Object.assign(dots, tempDate)
									}

								})
							}),
							console.log('todo dot'),
							resolve()

							// this.setState({
							// 	dots: dots,
							// }, () => {
							// 	console.log('141', this.state.dots)
							// })

						) : (
							// SimpleToast.show(`${result.msg}`, SimpleToast.BOTTOM)
							console.log('user/case/todo/userIdx ', result.msg),
							resolve()
						)
					}
				}).catch((err) => {
					console.log('user/case/todo/userIdx ', err),
					resolve()
				})
				// }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

			})
			.then(() => {
				return new Promise((resolve, reject) => {
					commonApi('GET', 'user/case/note/userIdx', {}).then((result) => {
						{
							result.success ? (
								result.data.map((outerValue) => {
									outerValue.userNote.map((innerValue) => {
										// temp = {date: innerValue.updateAt.split('T')[0].toString()}
										temp = {date: moment.tz(innerValue.settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")}
	
										if(!dates.includes(temp.date)) {
											dates.push(temp.date)
											tempDate = {[temp.date]: {dots: [user]}}
											Object.assign(dots, tempDate)
										} else {
	
											dots[temp.date].dots.map((value) => {
	
	
												if(value.key === 'user') {
													flag = true
												}
											})
	
											if(flag === false) {
												dots[temp.date].dots.push(user)
											}
											flag = false
										}
									})
	
								}),
								console.log('note dot'),
								resolve()
	
								// this.setState({
								// 	dots: dots,
								// }, () => {
								// 	console.log('186', this.state.dots)
								// })
	
							) : (
								// SimpleToast.show(`${result.msg}`, SimpleToast.BOTTOM)
								console.log('schedule/index.js load todo dates ', result.msg),
								resolve()
							)
						}
	
					}).catch((err) => {
						console.log('schedule/index.js load usernote dates ', err),
						resolve()
					})
					// }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
					
				})
			})
			.then(() => {
				return new Promise((resolve, reject) => {
					
					commonApi('GET', 'user/case/progress/content', {}).then((result) => {
						{
							result.success === undefined ? (
								
								result.map((value) => {
	
									// temp = {date: value.date.split('T')[0].toString()}
									temp = {date: moment.tz(value.date, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")}
	
									if(!dates.includes(temp.date)) {
										dates.push(temp.date)
										tempDate = {[temp.date]: {dots: [termin]}}
										Object.assign(dots, tempDate)
									} else {
	
										dots[temp.date].dots.map((value) => {
											if(value.key === 'termin') {
												flag = true
											}
										})
	
										if(flag === false) {
											dots[temp.date].dots.push(termin)
										}
										flag = false
									}
								}),
								console.log('termin dot'),
								resolve()
	
								// this.setState({
								// 	dots: dots,
								// }, () => {
								// 	console.log('230', this.state.dots)
								// })
	
							) : (
								// SimpleToast.show(`${result.msg}`, SimpleToast.BOTTOM)
								console.log('schedule/index.js load todo dates ', result.msg),
								resolve()

							)
						}
					}).catch((err) => {
						console.log('schedule/index.js load termin dates ', err),
						resolve()
					})
					// }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
				})
			})
			.then(() => {
				console.log('before ')
				this.setState({dots}, () => {
					console.log('255', this.state.dots)
					this.fetchData(selectedDate)
				})
			})

		})

	}

	async fetchAllData() {
		// react native calendar events 라이브러리
		const now = new Date()
		const inTwoYears = (new Date().setFullYear(new Date().getFullYear() - 2)) // 2019

		const data = await RNCalendarEvents.fetchAllEvents(
			formatISO(inTwoYears),
			formatISO(now),
			// [this.state.calendars] // []가 들어가면 앱 꺼짐
		);

	}



	componentWillUnmount() {
		this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
		this.props.clearSchedule() // 옆에 갔다왔을때 데이터 받아오는지 체크해야됨.
	}

	async fetchData(selectedDate) {

		console.log('287', this.state.dots)
		// * selectedDate = '2021-01-01'

		let progresses = []
		let todos = []
		let memos = []

		await commonApi('GET', `user/case/progress/date/${selectedDate}`, selectedDate).then((result) => {

			/*
				[{"content": " 피고 김진식 이의신청", "courtCase_caseNumber": "2020가소377585", "date": "2021-01-28T15:00:00.000Z", "title": "title"}, 
				{"content": " 피고 김진식 답변서 제출", "courtCase_caseNumber": "2020가소377585", "date": "2021-01-28T15:00:00.000Z", "title": "title"}]
			 */

			if(result[0].title !== undefined) {
				console.log('318', result)
				progresses = result
			} else {
				// SimpleToast.show(result.msg, SimpleToast.BOTTOM)
				console.log('`user/case/progress/date ', result.msg)
			}
		}).catch((err) => console.log('user/case/progress', err))
		// }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

		await commonApi('GET', `user/case/usertodo/date/${selectedDate}`, {}).then((result) => {

			if(result.success) {
				todos = result.data
			} else {
				// SimpleToast.show(result.msg, SimpleToast.BOTTOM)
				console.log('`user/case/usertodo/date ', result.msg)
			}
		}).catch((err) => console.log(`user/case/usertodo/date/${selectedDate}`, err))
		// }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

		await commonApi('GET', `user/case/note/date/${selectedDate}`, {}).then((result) => {

			console.log('305', result)

			if(result.success) {
				memos = result.data
			} else {
				// SimpleToast.show(result.msg, SimpleToast.BOTTOM)
				console.log('`user/case/note/date ', result.msg)
			}
		}).catch((err) => console.log(`user/case/note/date/${selectedDate}`, err))
		// }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

		// this.setState({
		// 	selectedDate: selectedDate,
		// // 	progresses: progresses,
		// // 	todos: todos,
		// // 	memos: memos
		// })

		// let dots = []
		// dots = this.state.dots
		// let temp = {date: selectedDate}
		// let tempDate = {[temp.date]: {selected: true, selectedColor: '#0078D4'}}

		// console.log(tempDate, 'tempDaterr') 
		// {"2021-09-24": {"selected": true, "selectedColor": "#0078D4"}}

		// if(!dots.hasOwnProperty(selectedDate)) {
		// 	Object.assign(dots, tempDate)
		// } else {
		// 	dots[temp.date] = {selected: true, selectedColor: '#0078D4'}
		// }


		// console.log(dots[this.state.selectedDate], 'dots[this.state]')
		// delete dots[this.state.selectedDate].selected
		// delete dots[this.state.selectedDate].marked
		// delete dots[this.state.selectedDate].selectedColor

		// dots[this.state.selectedDate].selected = false
		// dots[this.state.selectedDate].selectedColor = '#FFF'

		// tempDate = {"2021-09-24": {selected: true, selectedColor: '#000'}}

		// Object.assign(dots, tempDate)

		// dots["2021-09-24"].selected = true
		// dots["2021-09-24"].selectedColor = '#000'
		
		// console.log(dots[this.state.selectedDate], 'dots[this.state]222222')
		// console.log(this.state.selectedDate, 'dots[this.state]32343')
		// console.log(dots, 'dots asdasdasd32343')

		this.setState({
			// dots: dots,
			selectedDate: selectedDate
		})

		let filterTodos = []
		let filterMemos = []
		let filterProgresses = []

		// if(progresses.length !== 0) {

		// }

		// todos에 "선택한 날짜"만 들어가게
		if(todos.length !== 0) {

			let temp = {}
			todos.map((outerValue) => {
				outerValue.userTodo.map((innerValue) => {
					temp = {
						todoIdx: innerValue.todoIdx,
						title: outerValue.userCase.title,
						content: innerValue.title,
						updateAt: innerValue.updateAt,
					}
					filterTodos.push(temp)
				})
			})

		}

		// progresses에 "기일"이 포함된거만 들어가게
		if(progresses.length !== 0) {
			// progresses = progresses.filter((value) => value.content.includes("기일"))
			// filterProgresses = progresses.filter((value) => value.type === 1)
			
			// 11-05 진행내용 type이 없어져서 필터링 조건이 바뀜 ... JY
			filterProgresses = progresses.filter((value) => value.content.includes('기일') && value.content.includes(':'))
		}

		// memo에 선택한 날짜만
		if(memos.length !== 0) {
			let temp = {}
			memos.map((outerValue) => {
				outerValue.userNote.map((innerValue) => {
					temp = {
						todoIdx: innerValue.todoIdx,
						updateAt: innerValue.updateAt,
						caseTitle: outerValue.userCase.title,
						caseIdx: innerValue.caseIdx,
						memoTitle: innerValue.title,
						content: innerValue.content,
						settingAt: innerValue.settingAt,
					}

					filterMemos.push(temp)
				})

			})
		}

		this.props.setSchedule({
			progresses: filterProgresses,
			todos: filterTodos,
			memos: filterMemos,
		})

		// this.forceUpdate()

	}

	componentDidUpdate(prevProps, prevState) {

		if(prevState.selectedDate !== this.state.selectedDate) {

			// let color = ''

			// tempIdx % 2 === 0 ? (color = 'red') : (color = 'white')

			// let dots = this.state.dots

			// let date = {'2021-09-24': {selected: true, selectedColor: color}}

			// Object.assign(dots, date)

			// this.setState({
			// 	dots: dots
			// })
		}
	}

	// googleLogin() {
	// 	ApiCalendar.handleAuthClick()
	// }

	handleBackButton = () => {

		if (!this.props.navigation.isFocused()) {
			// The screen is not focused, so don't do anything
			return false;
		}
        // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        if (this.exitApp == undefined || !this.exitApp) {
            SimpleToast.show('한번 더 누르시면 종료됩니다.', SimpleToast.BOTTOM);
            this.exitApp = true;

            this.timeout = setTimeout(
                () => {
                    this.exitApp = false;
                },
                2000    // 2초
            );
        } else {
            clearTimeout(this.timeout);

            BackHandler.exitApp();  // 앱 종료
        }
        return true;
    }

	// getEvents = () => {
	// 	const CALENDAR_ID = '884929781673-i30qdmapv05kjisjtq51s22frn199lje.apps.googleusercontent.com' // 클라이언트ID 기재했음.
	// 	const API_KEY = 'AIzaSyAr2onuy6mkPpKhxFTCloQi9USdMLVqs8E'
	// 	const beginDate = moment()
	// 	let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&timeMin=${beginDate.toISOString()}&maxResults=50&singleEvents=true&orderBy=startTime&pageToken=${this.state.pageToken}`

	// 	this.setState({ loading: true });
	// 	fetch(url)
    //         .then((response) => response.json())
    //         .then((responseJson) => {
	// 			console.log(responseJson)
    //             this.setState({
    //                 pageToken: responseJson.nextPageToken,
    //                 dataSource: [...this.state.dataSource, ...responseJson.items],
    //                 loading: false,
    //                 refreshing: false,
    //                 error: responseJson.error || null,
    //             });
    //         })
    //         .then(() => {
    //             this.getDates()
    //         }) 
    //         .catch(error => {
    //             this.setState({ error, loading: false, refreshing: false });
    //         });
	// }

	// handleLoadMore = () => {
    //     this.setState(
    //         {
    //             pageToken: this.state.pageToken,
    //             refreshing: true
    //         },
    //         () => {
    //             this.getEvents()
    //         }
    //     )
    // };

	// getDates() {
    //     let tempDate = '';
    //     tempDate = _.map(this.state.dataSource, 'start.dateTime');
    //     this.newDate.length = 0;
    //     for (let j in tempDate) {
    //         this.newDate.push(
    //             tempDate[j]
    //         );
    //     }
    //     this.newDate = this.newDate.map((v, i, a) => (a[i - 1] || '').slice(0, 10) !== v.slice(0, 10) && v);
    // }

	// onLayout(event) {
    //     this.viewHeight = event.nativeEvent.layout.height;
    // }

	// renderDate(item) {
    //     const date = item.start.dateTime;
    //     const eventdate = moment(item.start.dateTime);
    //     const today = (moment() == eventdate) ? styles.today : undefined;
    //     const checkDate = moment(item.start.dateTime).format('YYYY-MM-DD');
        
    //     if (this.newDate.includes(date)) {
    //         return (
    //             <View style={styles.day}>
    //                 <Text allowFontScaling={false} style={[styles.dayNum, today]}>{moment(checkDate).format('DD')}</Text>
    //                 <Text allowFontScaling={false} style={[styles.dayText, today]}>{moment(checkDate).format('dd')}</Text>
    //             </View>
    //         );
    //     }else{
    //         return (
    //             <View style={styles.day}/>
    //         );
    //     }
    // };
    // renderRow({item, index}) {
    //     return (
    //         <View style={styles.datesContainer} onLayout={this.onRowLayoutChange.bind(this, index)}>
    //             {this.renderDate(item)}
    //             <View style={[styles.item, {height: item.height}]}>
    //                 <Text style={styles.itemtitle}>{item.summary}</Text>
    //                 <Text>{moment(item.start.dateTime).format('HH:mm')} - {moment(item.end.dateTime).format('HH:mm')}</Text>
    //                 <Text>{item.description}</Text>
    //             </View>
    //         </View>
    //     )
    // };
    // onScroll(event) {
    //     const yOffset = event.nativeEvent.contentOffset.y;
    //     let topRowOffset = 0;
    //     let topRow;
    //     for (topRow = 0; topRow < this.heights.length; topRow++) {
    //         if (topRowOffset + this.heights[topRow] / 2 >= yOffset) {
    //           	break;
    //         }
    //         topRowOffset += this.heights[topRow];
    //     }
    //     const row = this.state.dataSource[topRow];
    //     if (!row) return;
    //     const month = moment(row.start.dateTime).format('MMMM');
    //     this.setState({ month: month[0].toUpperCase() + month.substr(1) });
    // }

	// onRowLayoutChange(ind, event) {
    //     this.heights[ind] = event.nativeEvent.layout.height;
    // };
    // renderFooter = () => {
    //     if (!this.state.loading) return null;
    
    //     return (
    //       <View
    //         style={{
    //           paddingVertical: 20,
    //           borderTopWidth: 1,
    //           borderColor: "#CED0CE"
    //         }}
    //       >
    //         <ActivityIndicator animating size="large" />
    //       </View>
    //     );
    // };

	render() {
		moment.locale('ko');
        let dt = this.state.date;
		const termin = {key: 'termin', color: 'red', selectedDotColor: 'red'}
		const todo = {key: 'todo', color: 'purple', selectedDotColor: 'purple'}
		const user = {key: 'user', color: 'green', selectedDotColor: 'green'}
		return (
			<>
				<View style={styles.container}>
					<View style={styles.header}>
						<HeaderText title="일정" />
						{/* <TouchableOpacity style={styles.gear}>
							<Image source={require("../../assets/images/Gear.png")} />
						</TouchableOpacity> */}
					</View>
					<View style={[styles.calendarContainer, {flex: 5}]}>
						<Calendar
							// Initially visible month. Default = Date()
							current={moment(dt).format('YYYY-MM-DD').toString()}
							// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
							minDate={moment(dt).subtract(12, 'M').format('YYYY-MM-DD').toString()}
							// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
							maxDate={moment(dt).add(12, 'M').format('YYYY-MM-DD').toString()}
							// Handler which gets executed on day press. Default = undefined
							onDayPress={(day) => this.fetchData(day.dateString)}
							// Handler which gets executed on day long press. Default = undefined
							onDayLongPress={(day) => {console.log('selected day', day)}}
							// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
							monthFormat={'yyyy년 MM월'}
							// Handler which gets executed when visible month changes in calendar. Default = undefined
							onMonthChange={(month) => {console.log('month changed', month)}}
							markingType={'multi-dot'}
							markedDates={{
								...this.state.dots,
								[this.state.selectedDate]: {
									selected: true,
									marked: true,
									selectedColor: '#0078D4'
								}}
							}
							style={styles.calendar}
							theme={{
								todayTextColor: '#0078d4',
								selectedDayTextColor: '#FFFFFF',
								textMonthFontSize: 18,
								textDayFontSize: 16,
								monthTextColor: '#000',
								textDayFontWeight: '400',
							}}
						/>
					</View>
					<View 
						style={{
							flexDirection: 'row', 
							justifyContent: 'flex-end', 
							alignItems: 'center', 
							marginRight: Dimensions.get('window').width / 40,
						}}
					>
						<BlueDot color={'#f0842c'} />
						<Text style={{marginLeft: 5, marginRight: 5,}}>기일</Text>
						<BlueDot color={'#ae4bd5'} />
						<Text style={{marginLeft: 5, marginRight: 5,}}>사용자</Text>
						<BlueDot color={'#1daa99'} />
						<Text style={{marginLeft: 5, marginRight: 5,}}>ToDo</Text>
					</View>
					<View style={styles.navigator}>
						<ScheduleNavigator data={this.state} />
					</View>
				</View>
				{/* <Modal visible={this.state.isVisible}>
					<View style={styles.modalContainer}>
						<Text>캘린더를 이용하시려면 구글 로그인을 해주세요.</Text>
						<TouchableOpacity style={styles.closeButton} onPress={() => this.fetchAllData()}>
							<Text style={styles.loginButton}>fetchAllEvents</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.closeButton} onPress={() => this.toggleModal()}>
							<Text style={styles.loginButton}>닫기</Text>
						</TouchableOpacity>
					</View>
					<FlatList
						ref={(c) => this.list = c}
						data={this.state.dataSource}
						renderItem={this.renderRow.bind(this)}
						ListFooterComponent={this.renderFooter}
						onScroll={this.onScroll.bind(this)}
						keyExtractor={(item, index) => String(index)}
						refreshing={this.state.refreshing}
						onEndReached={this.handleLoadMore}
						onEndReachedThreshold={100}
					/>
				</Modal> */}
			</>
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
	setSchedule, clearSchedule
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		paddingBottom: 2,
	},
	calendarContainer: {
		flex: 1,
	},
	calendar: {

	},
	navigator: {
		flex: 7,
	},
	modalContainer: {
		backgroundColor: '#FFFFFF',
		elevation: 3,
		borderColor: '#000',
		borderWidth: 1,
		borderRadius: 10,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
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