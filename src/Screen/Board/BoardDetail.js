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

import HeaderText from '../../Components/HeaderText';
import ReplyList from './ReplyList';

class BoardWrite extends Component {
	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<View style={styles.headerContainer}>
					<HeaderText title="캘린더 연동시 내용제안" />
					<View style={styles.replyContainer}>
						{/* <Image source={('board.png')} /> */}
						<Text style={styles.replyText}>5</Text>
					</View>
				</View>
				<ScrollView style={{flex: 0.75, width: "90%", marginLeft: "5%", marginRight: "5%", marginBottom: 5,}}>
					<View style={styles.boardDetail}>
						<View style={styles.writeInfo}>
							<Text style={styles.author}>김나영 변호사</Text>
							<Text style={styles.writeDate}>2021.07.06 18:40</Text>
						</View>
						<View style={styles.contentContainer}>
							<Text style={styles.contentText}>앱이 참 쓰기좋네요. 만들어 주셔서 감사합니다. 기본 캘린더랑 연동되면 더 좋을것 같아요. 기본 캘린더랑 연동되면 더 좋을것 같아요. 기본 캘린더랑 연동되면 더 좋을것 같아요. 기본 캘린더랑 연동되면 더 좋을것 같아요. </Text>
						</View>
					</View>
					<View style={styles.replyListContainer}>
						{/* 댓글 리스트 */}
						<ReplyList />
					</View>
				</ScrollView>
				<View style={styles.insertContainer}>
					<View style={styles.replyInputContainer}>
						<TextInput style={styles.replyInput} placeholder="댓글을 입력하세요." />
					</View>
					<View style={styles.buttonContainer}>
						<Button style={styles.insertButton} color="#2665A1" title="입력" />
					</View>
				</View>
			</View>
		);
	}
}

export default BoardWrite;

const styles = StyleSheet.create({
	headerContainer: {
		flex: 0.075,
		flexDirection: "row",
		justifyContent: "space-between",
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
	boardDetail: {

	},
	writeInfo: {
		width: "100%",
		justifyContent: "space-between",
		flexDirection: "row",
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
		paddingBottom: 2,
	},
	author: {
		fontSize: 15
	},
	writeDate: {
		fontSize: 15
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
	replyListContainer: {

	},
	insertContainer: {
		width: "90%",
		marginLeft: "auto",
		marginRight: "auto",
		justifyContent: 'space-between',
		flexDirection: "row",
		// backgroundColor: "red",
		marginBottom: 10,
		marginTop: 10,
	},
	replyInputContainer: {
		width: '70%',
		backgroundColor: "#E5E5E5",
		borderRadius: 5,
	},
	replyInput: {
		height: 36,
		fontSize: 13,
		alignItems: "center",
	},
	buttonContainer: {
		backgroundColor: "#2665A1",
		width: "20%",
		// height: 36,
		// borderRadius: 12,
		borderRadius: 3,
	},
	insertButton: {
		color: 'white',
		fontSize: 15,
		width: '100%',
		fontWeight: "600",
	},
});