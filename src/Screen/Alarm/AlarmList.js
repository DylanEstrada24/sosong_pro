import React, {Component} from 'react';
import {
	View,
	ScrollView,
	StyleSheet,
	Text
} from 'react-native';
import Alarm from './Alarm';

class AlarmList extends Component {
	constructor(props) {
		super(props)
	}

	
	render() {
		const alarmList = [
// 			{
// 				title: "김병철 임금 청구사건",
// 				date: "2021.08.23 11:23",
// 				content: `1. 변론기일(서관 309호 법정 11:20)
// 2. 피고 김한일에게 준비서면(21.08.21자) 부본/변론기일통지서송달
// 3. 피고 김한일 기일변경신청서 제출`
// 			},
// 			{
// 				title: "권우영 사기 사건",
// 				date: "2021.08.22 14:25",
// 				content: `1. 피고 권우영에게 변론준비기일 통지서 발송
// 2. 피고 권우영 기일변경신청서 제출`
// 			},
// 			{
// 				title: "김병철 임금 청구사건",
// 				date: "2021.07.30 18:25",
// 				content: `1. 원고 김병철 준비서면 제출
// 2. 피고 김한일에게 준비서면(21.07.30자)부본 송달`
// 			},
		]
		return (
			<View style={styles.container}>
				{
					alarmList.length !== 0 ? 
						(
							alarmList.map((alarm, idx) => <Alarm title={alarm.title} date={alarm.date} content={alarm.content} key={idx} />)
						)
					:
						(
							<View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
								<Text style={{fontSize: 16}}>알림이 없습니다</Text>
							</View>
						)

				}
			</View>
		)
	}
}

export default AlarmList

const styles = StyleSheet.create({
	container: {
		marginLeft: 10,
		marginRight: 10,
		marginTop: 10,
		backgroundColor: '#FFF'
	},
})