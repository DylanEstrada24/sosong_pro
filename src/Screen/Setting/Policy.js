import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
    Image,
	Button,
	StyleSheet,
	Dimensions,
} from 'react-native';
import BlueDot from '../../Components/BlueDot';

import HeaderText from '../../Components/HeaderText';

class Policy extends Component {
	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<View style={styles.headerContainer}>
					<HeaderText title="개인정보 취급방침" />
				</View>
				<View style={{flex: 0.85, width: "90%", marginLeft: "5%", marginRight: "5%", marginBottom: 5,}}>
					<View style={styles.contentContainer}>
						<Text style={{fontSize: 13}}>소송프로는 개인정보 보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원할하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.</Text>
					</View>
					<View style={styles.itemContainer}>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>1. 수집하는 개인정보 항목</Text>
							</View>
						</View>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>본 약관은 소송프로(이하'회사')가 제공하는 서비스를 이용함에 있어 회사와 화원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다. 

본 약관은 소송프로(이하'회사')가 제공하는 서비스를 이용함에 있어 회사와 화원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</Text>
							</View>
						</View>
					</View>
					<View style={styles.itemContainer}>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>2. 수집하는 개인정보 사용처</Text>
							</View>
						</View>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>본 약관은 소송프로(이하'회사')가 제공하는 서비스를 이용함에 있어 회사와 화원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다. 

본 약관은 소송프로(이하'회사')가 제공하는 서비스를 이용함에 있어 회사와 화원과의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export default Policy;

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
		color: "#0078d4",
	},
	loginButton: {
		width: '100%',
		borderRadius: 5,
		textAlign: 'center',
		fontWeight: "bold",
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
});