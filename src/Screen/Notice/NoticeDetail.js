import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity
} from 'react-native';

import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import HeaderText from '../../Components/HeaderText';
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

		this.deleteNotice = this.deleteNotice.bind(this)
	}


	componentDidMount() {

		const notice = this.props.navigation.getParam('notice')

		this.setState({
			content: notice.content,
			createAt: moment(notice.createAt).add('9', 'h').toISOString(),
			updateAt: moment(notice.updateAt).add('9', 'h').toISOString(),
			title: notice.title,
			idx: notice.idx,
		})

	}

	deleteNotice() {
		commonApi('DELETE', `admin/notice/${this.state.idx}`, {}).then((result) => {

			if(result.success) {
				SimpleToast.show("공지사항이 삭제되었습니다.", SimpleToast.BOTTOM)

				this.props.navigation.pop()
			} else {
				SimpleToast.show(result.msg, SimpleToast.BOTTOM)
			}

		// }).catch((err) => console.log(`admin/notice/${this.state.idx}`, err))
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
	}

	
	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<View style={styles.headerContainer}>
					<View style={styles.headerLeft}>
						<HeaderText title='공지사항' />
					</View>
					<View style={styles.headerRight}>
						{
							store.getState().user.email === 'admin@admin.com' ? (
								<TouchableOpacity style={styles.addContainer} onPress={() => this.deleteNotice()}>
									<Text style={styles.addText}>삭제</Text>
								</TouchableOpacity>
							) : (<></>)
						}
					</View>
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
        marginBottom: 15,
		marginTop: 10,
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
		flexDirection: 'row',
        marginRight: Dimensions.get('window').width / 20,
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
	dateContainer: {
		marginLeft: Dimensions.get('window').width / 22
	},
	date: {
		fontSize: 14,
		color: '#0078d4',
		fontWeight: '400',
	},
	contentContainer: {
		width: "95%",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 16,
		marginLeft: "auto",
		marginRight: "auto",
		paddingBottom: 20,
	},
	contentText: {
		fontSize: 13,
	},
	addContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 18,
		marginTop: 3,
	},
	addText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#0078d4'
	},
})