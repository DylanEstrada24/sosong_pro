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
} from 'react-native';

import moment from 'moment';
import 'moment/locale/ko';
import SimpleToast from 'react-native-simple-toast';

import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import HeaderText from '../../Components/HeaderText';
import ScheduleNavigator from '../../Navigation/ScheduleNavigator';
import Modal from 'react-native-paper'
import RNCalendarEvents from "react-native-calendar-events";

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

	constructor() {
		super();
		
		this.state = ({
			date: new Date(),
			selectedDate: '',
			isVisible: false,
		})

		this.toggleModal = this.toggleModal.bind(this)
	}
	
	toggleModal() {
		this.setState({isVisible: !this.state.isVisible})
	}

	async componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

		RNCalendarEvents.checkPermissions(true).then((result) => {
			console.log(result)

			if(result === 'denied' || result === 'restricted') {
				RNCalendarEvents.requestPermissions(true).then((result) => {
					console.log('Read-only Auth requested', result)
				}).catch((err) => console.log('requestPermission', err))
			}
		}).catch((err) => console.log('get calendar authorizations error :: ', err))

		// 캘린더 내용 가져오는거?
		RNCalendarEvents.findCalendars().then(
			(result) => {
			  console.log(result)
			},
			(result) => {
			  console.error(result);
			},
		);
	}

	componentWillUnmount() {
		this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

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

	render() {
		moment.locale('ko');
        let dt = this.state.date;
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<HeaderText title="일정" />
					<TouchableOpacity style={styles.gear}>
						<Image source={require("../../assets/images/Gear.png")} />
					</TouchableOpacity>
				</View>
				<View style={styles.calendarContainer}>
					<Calendar
						// Initially visible month. Default = Date()
						current={moment(dt).format('yyyy-MM-DD').toString()}
						// Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
						minDate={moment(dt).subtract(12, 'M').format('yyyy-MM-DD').toString()}
						// Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
						maxDate={moment(dt).add(12, 'M').format('yyyy-MM-DD').toString()}
						// Handler which gets executed on day press. Default = undefined
						onDayPress={(day) => this.setState({selectedDate: day.dateString})}
						// Handler which gets executed on day long press. Default = undefined
						onDayLongPress={(day) => {console.log('selected day', day)}}
						// Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
						monthFormat={'yyyy년 MM월'}
						// Handler which gets executed when visible month changes in calendar. Default = undefined
						onMonthChange={(month) => {console.log('month changed', month)}}
						markedDates={{
							[this.state.selectedDate]: {
								selected: true,
								marked: true,
								selectedColor: "#F0842C"
							}
						}}
						// // Hide month navigation arrows. Default = false
						// hideArrows={false}
						// // Replace default arrows with custom ones (direction can be 'left' or 'right')
						// renderArrow={(direction) => (<Arrow/>)}
						// // Do not show days of other months in month page. Default = false
						// hideExtraDays={true}
						// // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
						// // day from another month that is visible in calendar page. Default = false
						// disableMonthChange={true}
						// // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
						// firstDay={1}
						// // Hide day names. Default = false
						// hideDayNames={true}
						// // Show week numbers to the left. Default = false
						// showWeekNumbers={true}
						// // Handler which gets executed when press arrow icon left. It receive a callback can go back month
						// onPressArrowLeft={substractMonth => substractMonth()}
						// // Handler which gets executed when press arrow icon right. It receive a callback can go next month
						// onPressArrowRight={addMonth => addMonth()}
						// // Disable left arrow. Default = false
						// disableArrowLeft={true}
						// // Disable right arrow. Default = false
						// disableArrowRight={true}
						// // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
						// disableAllTouchEventsForDisabledDays={true}
						/** Replace default month and year title with custom one. the function receive a date as parameter. */
						// renderHeader={(date) => {/*Return JSX*/}}
						style={styles.calendar}
						theme={{
							textDisabledColor: '#C4C4C4',
							todayTextColor: '#2665A1',
							// selectedDayBackgroundColor: '#F0842C',
							selectedDayTextColor: '#FFFFFF',
							textMonthFontWeight: 'bold',
							textMonthFontSize: 20,
							monthTextColor: '#2665A1',
							textDayFontWeight: '500',
						}}
					/>
				</View>
				<View style={styles.navigator}>
					<ScheduleNavigator />
				</View>
			</View>
		);
	}
}

export default Schedule;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginRight: Dimensions.get('window').width / 20,
		marginTop: 30,
	},
	calendarContainer: {
		// flex: 1,
	},
	calendar: {
		// flex: 1,
	},
	navigator: {
		flex: 1,
	},
});