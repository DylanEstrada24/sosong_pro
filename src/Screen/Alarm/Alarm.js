import React, {Component} from 'react';
import {
	View,
	ScrollView,
	Text,
	StyleSheet,
	Dimensions
} from 'react-native';

class Alarm extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.contentContainer}>
					<View style={styles.content}>
						<Text style={styles.title}>
							{this.props.title}
						</Text>
					</View>
					<View style={styles.date}>
						<Text style={styles.dateText}>
							{this.props.date}
						</Text>
					</View>
				</View>
			</View>
		)
	}
}

export default Alarm

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 40,
		width: '100%',
		// marginLeft: Dimensions.get('window').width / 20,
		// marginRight: Dimensions.get('window').width / 20,
		paddingBottom: 6,
		borderBottomColor: 'rgba(0, 0, 0, 0.08)',
		borderBottomWidth: 1,
		borderLeftColor: '#2665A1',
		borderLeftWidth: 5,
		marginTop: 5,
		marginBottom: 5,
	},
	contentContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '90%',
	},
	content: {
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	title: {
		fontSize: 15,
		fontWeight: 'bold',
	},
	date: {
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	dateText: {
		fontSize: 15,
		fontWeight: '400',
		color: '#2665A1',
	},
})