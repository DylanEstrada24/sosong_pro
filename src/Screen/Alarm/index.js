import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

import AlarmList from './AlarmList';

class Alarm extends Component {

	constructor() {
        super();
        this.state = {
            
        }

    }


	render() {
		return (
			<View style={styles.container}>
				<View style={styles.Top}>
					<View style={styles.header}>
						<View style={styles.title}>
							<Text style={styles.titleText}>알림 리스트</Text>
						</View>
					</View>
					<View style={styles.contentContainer}>
						<AlarmList />
					</View>
				</View>
			</View>
		);
	}
}

export default Alarm

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	header: {
		width: '100%',
		flexDirection: 'column',
		marginTop: 20,
		borderBottomColor: '#2665A1',
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	title: {

	},
	titleText: {
		fontSize: 20,
		fontWeight: '700',
		marginLeft: 18,
	},
	contentContainer: {
		flexDirection: 'column',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		// marginLeft: Dimensions.get('window').width / 20,
		// marginRight: Dimensions.get('window').width / 20,
		marginTop: 12,
	},
})