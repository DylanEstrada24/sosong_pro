import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
    Image,
	StyleSheet,
	Dimensions,
} from 'react-native';
import BlueDot from '../../Components/BlueDot';

class Board extends Component {
	render() {
		return (
			<View style={styles.boardContainer}>
				<View style={styles.textContainer}>
					<View style={styles.title}>
						<BlueDot />
						<Text style={styles.titleText}>캘린더 연동시 내용제안</Text>
					</View>
					<View style={styles.info}>
						<View style={styles.author}>
							<Text style={styles.authorText}>김나영 변호사</Text>
						</View>
						<View style={styles.date}>
							<Text style={styles.dateText}>2021.07.06 18:40</Text>
						</View>
					</View>
				</View>
				<View style={styles.replyContainer}>
					<View style={{flex: 1}} />
					<View style={styles.reply}>
						<Image style={styles.replyImage} source={require('../../assets/images/ChatText.png')} />
						<Text style={styles.replyText}>5</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default Board;

const styles = StyleSheet.create({
	boardContainer: {
		flexDirection: "row",
		// flex: 1,
		width: "90%",
		// marginLeft: "5%",
		// marginRight: "5%",
		marginLeft: Dimensions.get('window').width / 20,
		marginRight: Dimensions.get('window').width / 20,
		alignItems: "center",
		justifyContent: "center",
		borderBottomColor: "#0078d4",
		borderBottomWidth: 1,
		paddingBottom: 13,
		marginBottom: 10,
	},
	textContainer: {
		justifyContent: "space-between",
		width: "90%",
		// paddingLeft: 15,
	},
	title: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: 10,
	},
	titleText: {
		fontSize: 15,
		fontWeight: '700',
		marginLeft: 10,
	},
	info: {
		flexDirection: "row",
	},
	author: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	authorText: {
		fontSize: 15,
		fontWeight: "400",
		marginRight: 10,
	},
	date: {

	},
	dateText: {
		fontSize: 15,
		fontWeight: "400"
	},
	replyContainer: {
		flexDirection: 'column',
		width: '10%',
	},
	reply: {
		// flex: 1,
		alignItems: "flex-end",
		justifyContent: "flex-end",
		flexDirection: "row",
	},
	replyImage: {
		marginBottom: 2,
	},
	replyText: {
		fontSize: 15,
		color: "#0078d4",
	}
});