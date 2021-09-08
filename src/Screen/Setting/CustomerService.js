import React, {Component} from 'react';
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native';

import SettingItem from './SettingItem';

import HeaderText from '../../Components/HeaderText';

class CustomerService extends Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<HeaderText title="고객센터" />
				</View>
				<View style={styles.itemListContainer}>
					<TouchableOpacity style={styles.itemContainer, styles.bottomLine}>
						<SettingItem title="카카오톡" isMore />
					</TouchableOpacity>
					<TouchableOpacity style={styles.itemContainer, styles.bottomLine}>
						<SettingItem title="이메일" isMore />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default CustomerService;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		// justifyContent: "center",
		// alignItems: "center",
	},
	headerContainer: {
		marginTop: 30,
	},
	itemListContainer: {
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: Dimensions.get('window').width / 20,
		marginRight: Dimensions.get('window').width / 20,
	},
	buttonContainer: {
		justifyContent: 'center',
		width: "80%",
	},
	logout: {
		width: '100%',
		borderRadius: 5,
		textAlign: 'center',
		fontWeight: "600",
		fontSize: 15,
		// marginTop: 30,
	},
	itemContainer: {
		// marginLeft: Dimensions.get('window').width / 10,
		// marginRight: Dimensions.get('window').width / 10,
	},
	bottomLine: {
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
});