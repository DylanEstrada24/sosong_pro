import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
} from 'react-native';
import BlueDot from '../../Components/BlueDot';
import SettingItem from './SettingItem';
import HeaderText from '../../Components/HeaderText';
class License extends Component {


	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<View style={styles.headerContainer}>
					<HeaderText title="이용약관" />
				</View>
				{/* <View style={{flex: 0.85, width: "90%", marginLeft: "5%", marginRight: "5%", marginBottom: 5,}}>
					<View style={styles.itemContainer}>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>제1조(목적)</Text>
							</View>
						</View>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>본 약관은 소송프로(이하'회사')가 제공하는 서비스를 이용함에 있어 회사와 화원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</Text>
							</View>
						</View>
					</View>
					<View style={styles.itemContainer}>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>제2조(용어의 정리)</Text>
							</View>
						</View>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>본 약관은 소송프로(이하'회사')가 제공하는 서비스를 이용함에 있어 회사와 화원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다. 

본 약관은 소송프로(이하'회사')가 제공하는 서비스를 이용함에 있어 회사와 화원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</Text>
							</View>
						</View>
					</View>
				</View> */}
				<View style={styles.itemListContainer}>
					<TouchableOpacity 
						style={styles.itemContainer, styles.bottomLine} 
						onPress={() => this.props.navigation.navigate('WebViewPage', {url: 'https://sspro.rhodolite.org/api/v1/terms/1'})}
					>
						<SettingItem title="서비스 이용약관" isMore />
					</TouchableOpacity>
					<TouchableOpacity 
						style={styles.itemContainer, styles.bottomLine} 
						onPress={() => this.props.navigation.navigate('WebViewPage', {url: 'https://sspro.rhodolite.org/api/v1/terms/2'})}
					>
						<SettingItem title="개인정보 이용약관" isMore />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default License;

const styles = StyleSheet.create({
	headerContainer: {
		flex: 0.075,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-end",
		// paddingBottom: 20,
		marginBottom: 10,
	},
	replyContainer: {
		marginRight: "5%",
	},
	replyText: {
		fontSize: 15,
		color: "#2665A1",
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