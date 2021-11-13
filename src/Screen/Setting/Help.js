import React, {Component} from 'react';
import {
	View,
	Text,
	Dimensions,
	Image,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import BlueDot from '../../Components/BlueDot';

import HeaderText from '../../Components/HeaderText';

class Help extends Component {
	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<View style={styles.headerContainer}>
					<View style={styles.headerLeft}>
						<HeaderText title="자주묻는 질문" />
					</View>
					<View style={styles.headerRight}>
						<TouchableOpacity onPress={() => this.props.navigation.pop()}>
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={{flex: 0.85, width: "90%", marginLeft: "5%", marginRight: "5%", marginBottom: 5,}}>
					<View style={styles.itemContainer}>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>Q. 고객센터와 연락은 어떻게 하면 되나요?</Text>
							</View>
						</View>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>앱 화면 왼쪽 상단의 설정 아이콘을 클릭하여 숫자로 된 UserID를 확인한 후, 같은 설정 화면의 고객센터를 클릭하여 카카오톡, 전화, 이메일 중 편한 방법을 선택하여 연락 하시면 됩니다.</Text>
							</View>
						</View>
					</View>
					<View style={styles.itemContainer}>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>Q. 변호사 인증은 어떻게 하면 되나요?</Text>
							</View>
						</View>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>앱 화면 왼쪽 상단의 설정 아이콘을 클릭하여 숫자로 된 UserID를 확인한 후, 같은 설정 화면의 고객센터를 클릭하여 카카오톡, 전화, 이메일 중 편한 방법을 선택하여 연락 하시면 됩니다.</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		);
	}
}

export default Help;

const styles = StyleSheet.create({
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
		paddingBottom: 20,
	},
	contentText: {
		fontSize: 13,
	},
});