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
			// {
			// 	title: "더스쿠프 상대 사건",
			// 	date: "2021.07.06 18:40",
			// },
			// {
			// 	title: "준비서면 제출",
			// 	date: "2021.07.06 18:40",
			// },
			// {
			// 	title: "(전자)손해배상(기)",
			// 	date: "2021.07.06 18:40",
			// },
		]
		return (
			<View style={styles.container}>
				{
					alarmList && alarmList.map((alarm, idx) => <Alarm title={alarm.title} date={alarm.date} key={idx} />)
				}
			</View>
		)
	}
}

export default AlarmList

const styles = StyleSheet.create({
	container: {
	},
})