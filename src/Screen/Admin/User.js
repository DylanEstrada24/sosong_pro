import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
} from 'react-native';

import { commonApi } from '../../Common/ApiConnector';

class User extends Component {

	constructor(props) {
		super(props)
		this.state = ({
			user: {}
		})

		this.updateStatus = this.updateStatus.bind(this)

	}

	componentDidMount() {
		this.setState({
			user: this.props.user
		})
	}

	async updateStatus(data) {

		commonApi('POST', 'admin/update/user/status', data).then((result) => {
			if(result.success) {
				this.props.deleteUser(this.state.user.idx)
			} else {
				SimpleToast.show(result.msg, SimpleToast.BOTTOM)
			}
		// }).catch((err) => console.log('admin/update/user/status', err))
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.infoContainer}>
					<Text style={styles.text}>{this.state.user.name}</Text>
					<Text style={styles.text}>{this.state.user.phoneNumber}</Text>
					<Text style={styles.email}>{this.state.user.email}</Text>
				</View>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.accept} onPress={() => this.updateStatus({userIdx: this.state.user.idx, status: 'accept'})}>
						<Text style={styles.acceptText}>승인</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.reject} onPress={() => this.updateStatus({userIdx: this.state.user.idx, status: 'reject'})}>
						<Text style={styles.text}>거부</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default User

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
		flexDirection: 'row',
		paddingTop: 15,
		paddingBottom: 15,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
	},
	infoContainer: {
		paddingLeft: 25,
		borderLeftColor: '#0078d4',
		borderLeftWidth: 6,
	},
	text: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#0078d4'
	},
	email: {
		fontSize: 15,
		fontWeight: '400',
	},
	buttonContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	accept: {
		backgroundColor: '#0078d4',
		borderRadius: 3,
		height: 32,
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
	},
	acceptText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF'
	},
	reject: {
		backgroundColor: '#FFFFFF',
		borderColor: '#0078d4',
		borderWidth: 2,
		borderRadius: 3,
		marginTop: 7,
		height: 32,
		width: 70,
		justifyContent: 'center',
		alignItems: 'center',
	},
});