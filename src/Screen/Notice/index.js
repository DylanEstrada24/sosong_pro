import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { commonApi } from '../../Common/ApiConnector';
import { store } from '../../redux/store';

import NoticeList from './NoticeList';
import NoticeComponent from './Notice';

class Notice extends Component {

	constructor() {
        super();
        this.state = {
            notices: []
        }

    }

	async componentDidMount() {
		commonApi('GET', 'admin/notice', {}).then((result) => {
			if(result.success) {
				this.setState({
					notices: result.data
				})
			}
		}).catch((err) => console.log('admin/notice', err))

		this.props.navigate.addListener('didFocus', () => {
			commonApi('GET', 'admin/notice', {}).then((result) => {
				if(result.success) {
					this.setState({
						notices: result.data
					})
				}
			}).catch((err) => console.log('admin/notice', err))
		})
	}

	_renderItem = ({item}) => (
		<TouchableOpacity onPress={() => this.props.navigation.navigate('NoticeDetail', {idx: item.idx})}>
			<NoticeComponent title={item.title} createAt={item.createAt} key={item.idx} />
		</TouchableOpacity>
	)


	render() {
		return (
			<View style={styles.container}>
				<View style={styles.Top}>
					<View style={styles.header}>
						<View style={styles.title}>
							<Text style={styles.titleText}>공지사항</Text>
						</View>
						{
							store.getState().user.email === 'admin@admin.com' ? (
								<TouchableOpacity style={styles.addContainer} onPress={() => this.props.navigation.navigate('WriteNotice')}>
									<Text style={styles.addText}>등록</Text>
								</TouchableOpacity>
							) : (<></>)
						}
					</View>
					<View style={styles.contentContainer}>
						{/* <NoticeList navigation={this.props.navigation} notices={this.state.notices}/> */}
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
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 20,
		borderBottomColor: '#2665A1',
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	title: {

	},
	titleText: {
		fontSize: 20,
		fontWeight: '700',
		marginLeft: 18,
	},
	addContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 18,
	},
	addText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#2665A1'
	},
	contentContainer: {
		flexDirection: 'column',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		// marginLeft: Dimensions.get('window').width / 20,
		// marginRight: Dimensions.get('window').width / 20,
		marginTop: 12,
	},
})