import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

class Notice extends Component {
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
							{this.props.createAt !== null ? this.props.createAt.split('T')[0] : this.props.createAt}
						</Text>
					</View>
				</View>
			</View>
		)
	}
}

export default Notice

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 40,
		width: '100%',
		paddingBottom: 6,
		borderBottomColor: 'rgba(0, 0, 0, 0.08)',
		borderBottomWidth: 1,
		borderLeftColor: '#0078d4',
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
		color: '#0078d4',
	},
})