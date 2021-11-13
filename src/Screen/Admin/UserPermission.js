import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableOpacity,
	Image,
	FlatList,
} from 'react-native';

import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';
import { setUser, clearUser } from '../../redux/actions/user';
import { connect } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';
import User from './User'

class UserPermission extends Component {

	constructor(props) {
		super(props)
		this.state = ({
			users: []
		})

	}

	async componentDidMount() {
		commonApi('GET', 'admin/user', {}).then((result) => {

			if(result.success) {
				let users = result.data.filter((value) => value.status === 'request')
				this.setState({
					users: users
				})
			} else {
				SimpleToast.show(result.msg, SimpleToast.BOTTOM)
			}

		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
	}

	_renderItem = ({item}) => (
		<View>
			<User key={item.idx} user={item} deleteUser={this.deleteUser}/>
		</View>
	)

	deleteUser = (userIdx) => {
		let {users} = this.state
		users = users.filter(user => user.idx !== userIdx)
		this.setState({users})
	}

	render() {
		return (
			<View style={styles.container}>
				<View>
					{/* <View style={styles.header}>
						<View style={styles.title}>
							<Text style={styles.titleText}>회원가입 승인/거절</Text>
						</View>
					</View>
					 */}
					 <View style={styles.headerContainer}>
                        <View style={styles.headerLeft}>
                            <Text style={styles.writeToDoTitle}>
                                회원가입 승인/거절
                            </Text>
                        </View>
                        <View style={styles.headerRight}>
                            <TouchableOpacity style={styles.exit} onPress={() => this.props.navigation.pop()} >
                                <Image source={require('../../assets/images/X.png')} />
                            </TouchableOpacity>
                        </View>
                    </View>
					<View>
						<View style={styles.topContent}>
                            <Text style={styles.topText}>*가입요청자가 보낸 이메일을 확인 한 뒤 승인 해 주세요</Text>
						</View>
					</View>
				</View>
				<View style={styles.listContainer}>
					<FlatList 
						style={styles.userListContainer} 
						navigation={this.props.navigation} 
						data={this.state.users} 
						renderItem={this._renderItem} 
						keyExtractor={(item, index) => index}
						onEndReachedThreshold={1}
						ListEmptyComponent={
							<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30,}}>
								<Text style={{fontSize: 16, fontWeight: 'bold'}}>가입요청자가 없습니다.</Text>
							</View>
						}
					/>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	}
};

const mapDispatchToProps = {
	setUser, clearUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPermission)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	header: {
		width: '100%',
		flexDirection: 'column',
		marginTop: 10,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	exit: {
		marginLeft: 15,
	},
	title: {

	},
	titleText: {
		fontSize: 20,
		fontWeight: '700',
		marginLeft: 18,
	},
	headerContainer: {
		marginTop: 10,
        marginBottom: 15,
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: 'flex-start',
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	headerLeft: {
        marginLeft: Dimensions.get('window').width / 20
	},
	headerRight: {
        marginRight: Dimensions.get('window').width / 20
	},
    backButton: {

    },
    writeToDoTitleContainer: { // ToDo 등록
        marginLeft: "5%",
        width: "100%",
        marginTop: 5,
        marginBottom: 5,
    },
    writeToDoTitle: {
        fontSize: 20,
        fontWeight: "700",
    },
	contentContainer: {
		flexDirection: 'column',
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: Dimensions.get('window').width / 20,
		marginRight: Dimensions.get('window').width / 20,
		marginTop: 12,
	},
	content: {
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
		paddingBottom: 10,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		width: '100%',
	},
	topText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#F0842C'
	},
	topContent: {
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
		paddingTop: 15,
		paddingBottom: 10,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		width: '98%',
		marginLeft: Dimensions.get('window').width / 100,
		marginRight: Dimensions.get('window').width / 100,
	},
	textInput: {
		backgroundColor: '#E5E5E5',
		borderRadius: 5,
		paddingLeft: 19,
		width: '90%',
	},
	buttonContainer: {
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
	},
	buttonTop: {
		flexDirection: 'row',
	},
	buttonBottom: {
		flexDirection: 'row',
	},
	button: {
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		borderColor: '#0078d4',
		borderWidth: 1,
		borderRadius: 10,
		margin: 3,
	},
	buttonText: {
		fontSize: 13,
		fontWeight: 'bold',
		color: '#0078d4',
	},
	bottomLine: {
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	listContainer: {
		// width: '90%',
		height: '85%',
		marginLeft: Dimensions.get('window').width / 20,
		marginRight: Dimensions.get('window').width / 20,
	},
	userListContainer: {
		// height: '100%'
		flexGrow: 0,
	},
	categoryButton: {

    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        height: 30,
    },
    categoryTitle: {
        color: '#0078d4',
        fontSize: 15,
        fontWeight: "bold",
    },
    categoryImage: {
        marginRight: 10,
    },
});