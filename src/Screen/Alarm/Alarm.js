import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

class Alarm extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<View style={styles.top}>
						<View style={styles.headerTitle}>
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
					<View style={styles.contentContainer}>
						<Text style={styles.content}>{this.props.content}</Text>
					</View>
				</View>
			</View>
		)
	}
}

export default Alarm

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingBottom: 6,
		borderBottomColor: 'rgba(0, 0, 0, 0.08)',
		borderBottomWidth: 1,
		marginTop: 5,
		marginBottom: 5,
	},
	headerContainer: {
		width: '100%',
	},
	top: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerTitle: {
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#0078D4',
	},
	date: {
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	dateText: {
		fontSize: 15,
		fontWeight: '400',
		color: '#0078d4',
	},
	contentContainer: {

	},
	content: {
		fontSize: 14,
	},
})