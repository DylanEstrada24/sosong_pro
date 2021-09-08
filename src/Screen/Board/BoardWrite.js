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
import GreenDot from '../../Components/BlueDot';

import HeaderText from '../../Components/HeaderText';
import BoardList from './BoardList';

class BoardWrite extends Component {
	render() {
		return (
			<View style={{flex: 1, justifyContent: 'space-between'}}>
				<View style={{flexDirection: "column", flex: 1}}>
					<View style={{flex: 0.03}}>
						{/* < 이미지 */}
						{/* <Image source={('backArrow.png')} /> */}
					</View>
					<View style={{flex: 0.05}}>
						<HeaderText title="글쓰기" />
					</View>
					<View style={{flex: 0.7, width: "90%", marginLeft: "5%", marginRight: "5%"}}>
						<View style={styles.inputTitle}>
							<View style={styles.subTitleContainer}>
								<GreenDot />
								<Text style={styles.subTitleText} >제목</Text>
							</View>
							<View style={styles.contentContainer}>
								<TextInput style={styles.titleInput} placeholder="제목을 입력하세요." ></TextInput>
							</View>
						</View>
						<View style={styles.inputContent}>
							<View style={styles.subTitleContainer}>
								<GreenDot />
								<Text style={styles.subTitleText} >내용</Text>
							</View>
							<View style={styles.contentContainer}>
								<TextInput style={styles.contentInput} multiline={true} placeholder="내용을 입력하세요."></TextInput>
							</View>
						</View>
					</View>
				</View>
				<View style={{flex: 0.1, width: "80%", marginLeft: "10%", justifyContent: 'center', marginBottom: 30,}}>
					<Button style={styles.loginButton} onPress={() => this.props.navigation.pop()} color="#2665A1" title="등록" />
				</View>
			</View>
		);
	}
}

export default BoardWrite;

const styles = StyleSheet.create({
	inputTitle: {
		flexDirection: "column",
	},
	subTitleContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		paddingBottom: 2,
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	subTitleText: {
		fontSize: 15,
		fontWeight: "bold",
		marginLeft: 10,
	},
	contentContainer: {
		marginTop: 7,
		marginBottom: 16,
	},
	titleInput: {
		backgroundColor: "#E5E5E5",
		borderRadius: 5,
		paddingLeft: 20,
	},
	inputContent: {

	},
	contentInput: {
		backgroundColor: "#E5E5E5",
		borderRadius: 5,
		paddingLeft: 20,
		height: 300,
		textAlignVertical: 'top',
	},
	loginButton: {
		width: '100%',
		borderRadius: 5,
		textAlign: 'center',
		fontWeight: "600",
		fontSize: 15,
		marginLeft: "10%",
	},
});