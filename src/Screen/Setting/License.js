import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Image,
} from 'react-native';
import BlueDot from '../../Components/BlueDot';
import SettingItem from './SettingItem';
import HeaderText from '../../Components/HeaderText';
class License extends Component {


	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<View style={styles.headerContainer}>
					<View style={styles.headerLeft}>
						<HeaderText title="이용약관" />
					</View>
					<View style={styles.headerRight}>
						<TouchableOpacity onPress={() => this.props.navigation.pop()}>
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.itemListContainer}>
					<TouchableOpacity 
						style={[styles.itemContainer, styles.bottomLine]} 
						onPress={() => this.props.navigation.navigate('Service')}
					>
						<SettingItem title="서비스 이용약관" isMore />
					</TouchableOpacity>
					<TouchableOpacity 
						style={[styles.itemContainer, styles.bottomLine]} 
						onPress={() => this.props.navigation.navigate('Termin')}
					>
						<SettingItem title="개인정보처리방침" isMore />
					</TouchableOpacity>
					<TouchableOpacity 
						style={[styles.itemContainer, styles.bottomLine]} 
						onPress={() => this.props.navigation.navigate('Term')}
					>
						<SettingItem title="개인정보 유효기간 안내" isMore />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default License;

const styles = StyleSheet.create({
	// headerContainer: {
	// 	flex: 0.075,
	// 	flexDirection: "row",
	// 	justifyContent: "flex-start",
	// 	alignItems: "flex-end",
	// 	// paddingBottom: 20,
	// 	marginBottom: 10,
	// },
	headerContainer: {
		marginTop: 10,
        marginBottom: 30,
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: 'flex-start',
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	headerLeft: {
        marginLeft: Dimensions.get('window').width / 20
	},
	headerRight: {
        marginRight: Dimensions.get('window').width / 20
	},
	replyContainer: {
		marginRight: "5%",
	},
	replyText: {
		fontSize: 15,
		color: "#0078d4",
	},
	loginButton: {
		width: '100%',
		borderRadius: 5,
		textAlign: 'center',
		fontWeight: "600",
		fontSize: 15,
		marginLeft: "10%",
	},
	titleContainer: {

	},
	title: {
		width: "100%",
		justifyContent: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
		paddingBottom: 2,
	},
	titleText: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	contentContainer: {
		width: "95%",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 16,
		marginLeft: "auto",
		marginRight: "auto",
		// height: Dimensions.get("window").height / 3,
		// height: 'auto',
		paddingBottom: 20,
	},
	contentText: {
		fontSize: 13,
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