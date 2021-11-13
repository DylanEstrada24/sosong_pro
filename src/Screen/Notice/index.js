import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Image,
	Dimensions,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { commonApi } from '../../Common/ApiConnector';
import { store } from '../../redux/store';

import HeaderText from '../../Components/HeaderText';
import NoticeList from './NoticeList';
import NoticeComponent from './Notice';
import moment from 'moment';

class Notice extends Component {

	constructor() {
        super();
        this.state = {
            notices: []
        }

    }

	async componentDidMount() {
		commonApi('GET', 'user/notice', {}).then((result) => {
			if(result.success) {
				this.setState({
					notices: result.data
				})
			} else {
				SimpleToast.show(result.msg, SimpleToast.BOTTOM)
			}
		// }).catch((err) => console.log('user/notice', err))
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

		this.props.navigation.addListener("didFocus", () => {
			commonApi('GET', 'user/notice', {}).then((result) => {
				if(result.success) {
					this.setState({
						notices: result.data
					})
				} else {
					SimpleToast.show(result.msg, SimpleToast.BOTTOM)
				}
			// }).catch((err) => console.log('user/notice', err))
			}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
		})
	}

	_renderItem = ({item}) => (
		<TouchableOpacity onPress={() => this.props.navigation.navigate('NoticeDetail', {notice: item})}>
			<NoticeComponent title={item.title} createAt={moment(item.createAt).add('9', 'h').toISOString()} key={item.idx} />
		</TouchableOpacity>
	)


	render() {
		return (
			<View style={styles.container}>
				<View style={styles.Top}>
					<View style={styles.headerContainer}>
						<View style={styles.headerLeft}>
							<HeaderText title='공지사항' />
						</View>
						<View style={styles.headerRight}>
							{
								store.getState().user.email === 'admin@admin.com' ? (
									<TouchableOpacity style={styles.addContainer} onPress={() => this.props.navigation.navigate('WriteNotice')}>
										<Text style={styles.addText}>등록</Text>
									</TouchableOpacity>
								) : (<></>)
							}
							{/* <TouchableOpacity onPress={() => this.props.navigation.pop()}>
								<Image source={require('../../assets/images/X.png')} />
							</TouchableOpacity> */}
						</View>
					</View>
					<View style={styles.contentContainer}>
						<FlatList 
							style={styles.userListContainer} 
							navigation={this.props.navigation} 
							data={this.state.notices} 
							renderItem={this._renderItem} 
							keyExtractor={(item, index) => index}
							onEndReachedThreshold={1}
							ListEmptyComponent={
								<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30,}}>
									<Text style={{fontSize: 16, fontWeight: 'bold'}}>공지사항이 없습니다.</Text>
								</View>
							}
						/>
					</View>
				</View>
			</View>
		);
	}
}

export default Notice

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	// header: {
	// 	width: '100%',
	// 	flexDirection: 'row',
	// 	justifyContent: 'space-between',
	// 	marginTop: 10,
	// 	borderBottomColor: '#C4C4C4',
	// 	borderBottomWidth: 1,
	// 	paddingBottom: 5,
	// },
	// title: {

	// },
	// titleText: {
	// 	fontSize: 20,
	// 	fontWeight: '700',
	// 	marginLeft: 18,
	// },
	headerContainer: {
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
	addContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 18,
		marginTop: 3
	},
	addText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#0078d4'
	},
	contentContainer: {
		flexDirection: 'column',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 12,
	},
})