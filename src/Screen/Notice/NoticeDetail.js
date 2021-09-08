import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
} from 'react-native';

import { commonApi } from '../../Common/ApiConnector';

import { store } from '../../redux/store';

class NoticeDetail extends Component {
	constructor(props) {
		super(props)
		this.state = ({
			content: '',
			createAt: '',
			updateAt: '',
			title: '',
			idx: '',
		})
	}


	async componentDidMount() {

		const noticeIdx = this.props.navigation.getParam('idx')

		commonApi('GET', `admin/notice/noticeIdx/${noticeIdx}`, {}).then((result) => {
			
			if(result.success) {
				
				// console.log(result, 'asdsa')
				
				this.setState({
					content: result.data[0].content,
					createAt: result.data[0].createAt,
					updateAt: result.data[0].updateAt,
					title: result.data[0].title,
					idx: result.data[0].idx
				})

			}

		}).catch((err) => console.log(`admin/notice/noticeIdx/${noticeIdx}`, err))

	}

	
	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<View style={styles.headerContainer}>
					<HeaderText title='공지사항' />
					{
						store.getParam().user.email === 'admin@admin.com' ? (
							<TouchableOpacity style={{}}>
								<Text>삭제</Text>
							</TouchableOpacity>
						) : (<></>)
					}
				</View>
				<View style={{flex: 0.85, width: "90%", marginLeft: "5%", marginRight: "5%", marginBottom: 5,}}>
					<View style={styles.itemContainer}>
						<View style={styles.titleContainer}>
							<View style={styles.title}>
								<BlueDot />
								<Text style={styles.titleText}>{this.state.title}</Text>
							</View>
							<View style={styles.dateContainer}>
								<Text style={styles.date}>{this.state.createAt !== null ? this.state.createAt.split('T')[0] : this.state.createAt}</Text>
							</View>
						</View>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>{this.state.content}</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		)
	}
}


export default NoticeDetail

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
		// flexDirection: 'row',
		// justifyContent: 'space-between'
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
	dateContainer: {
		marginLeft: Dimensions.get('window').width / 22
	},
	date: {
		fontSize: 14,
		color: '#2665A1',
		fontWeight: '400',
	},
	contentContainer: {
		width: "95%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
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
})