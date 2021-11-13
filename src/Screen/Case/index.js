import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	StyleSheet,
	FlatList,
	Keyboard,
	BackHandler,
	Dimensions,
	Alert,
	Platform
} from 'react-native';

import IconFontisto from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import { store } from '../../redux/store';
import { setUser } from '../../redux/actions/user';
import { setCase, clearCase } from '../../redux/actions/cases';
import { connect } from 'react-redux';
import { commonApi } from '../../Common/ApiConnector';
import * as RNIap from 'react-native-iap';
import SimpleToast from 'react-native-simple-toast';
import CaseComponent from './Case'
import HeaderText from '../../Components/HeaderText';

class Case extends Component {

	constructor(props) {
		super(props);
		this.state = ({
			cases: [],
			sort: '',
			pageNum: 0,
			isVisible: false,
			tempSort: '',
			searchValue: '',
			tempCases: [],
			searching: false,
			deleteModalVisible: false,
			deleteCaseTitle: '',
			deleteCaseIdx: 0,
			url: '',
		})

		this.toggleModal = this.toggleModal.bind(this)
		this.changeSort = this.changeSort.bind(this)
		this.loadCases = this.loadCases.bind(this)
		this.searchHandle = this.searchHandle.bind(this)
		this.searchItem = this.searchItem.bind(this)
		this.cancelSearch = this.cancelSearch.bind(this)
		this.caseHandle = this.caseHandle.bind(this)
		this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
		this.caseDelete = this.caseDelete.bind(this)
		this.loadCasesDidFocused = this.loadCasesDidFocused.bind(this)
		this.changeNewSort = this.changeNewSort.bind(this)
		this.caseAddHandle = this.caseAddHandle.bind(this)
		this.checkReceipt = this.checkReceipt.bind(this)
	}

	async componentDidMount() {

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

		const sort = store.getState().user.sort
		let url = store.getState().user.url

		switch(sort) {
		case 'todo': 
			url = `user/case/userIdx/todo/DESC`
			break
		case 'termin': 
			url = `user/case/userIdx/ASC`
			break
		default: 
			url = `user/case/userIdx/title/ASC`
			break
		}


		this.setState({
			sort: sort,
			tempSort: sort,
			url: url,
		})

		this.props.navigation.addListener("didFocus", () => {
			this.setState({
				cases: [],
				// pageNum: 0,
			})

			// 유저 검증 함수
			this.checkReceipt()

			// 사건 맨처음 불러오는 함수
			this.loadCasesDidFocused(url)

		})

	}

	componentWillUnmount() {
        this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
		this.setState({
			pageNum: 0,
		})
    }

	async checkReceipt() {

		// 유저 결제검증 로직
		// 상용할때 체크해야함 ... JY

		/*

		let result = false

		// let receipt = ''

		try {

		
			try {
				result = await RNIap.initConnection();
				await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
				if (result === false) {
					Alert.alert(ENV.language["couldn't get in-app-purchase information"]);
					return;
				}
			} catch (err) {
				console.debug('initConnection');
				console.error(err.code, err.message);
				// Alert.alert(ENV.language['fail to get in-app-purchase information']);
			}

			if(result !== false) {

				try {
					// const availablePurchases = RNIap.getAvailablePurchases()
					// console.log(availablePurchases)
					
					const purchases = await RNIap.getAvailablePurchases()

					console.log(purchases)
						
					// receipt = purchases[0].transactionReceipt

					// if(Platform.OS === 'android' && purchases[0].purchaseToken) {
					// 	receipt = purchases[0].purchaseToken
					// }

					if(purchases.length !== 0 && purchases[0].autoRenewingAndroid) {

						const params = {
							userIdx: store.getState().user.userIdx,
							userType: 'member'
						}

						await commonApi('POST', `admin/update/user/type`, params).then((result) => {
                			if(result.success){
								this.props.setUser({
									userType: 'member'
								})
                			} else {
								SimpleToast.show(result.message, SimpleToast.SHORT);
								// this.setState({isFetching: false});
                			}
            			}).catch((error) => {
							SimpleToast.show(error.msg, SimpleToast.BOTTOM)
            			})

					} else {

						const params = {
							userIdx: store.getState().user.userIdx,
							userType: 'common'
						}

						await commonApi('POST', `admin/update/user/type`, params).then((result) => {
                			if(result.success){
								this.props.setUser({
									userType: 'common'
								})
                			} else {
								SimpleToast.show(result.message, SimpleToast.SHORT);
								// this.setState({isFetching: false});
                			}
            			}).catch((error) => {
							SimpleToast.show(error.msg, SimpleToast.BOTTOM)
            			})

					}

				} catch (err) {
					console.warn(err.code, err.message);
				}

				// getAvailablePurchases가 성공적으로 호출되어야 검증함
				// if(receipt !== '') {
				// 	// 토큰 검증 API
				// 	await commonApi('GET', `purchase/${receipt}`, {}).then((res) => {
				// 		console.log('166 ',res)
				// 		if(res === 'success') {
				// 			// 구독멤버
				// 			console.log('member!!')
				// 			this.props.setUser({
				// 				userType: 'member'
				// 			})
				// 		} else if(res === 'invalid') {
				// 			console.log('common..')
				// 			this.props.setUser({
				// 				userType: 'common'
				// 			})
				// 		}
				// 	}).catch((err) => SimpleToast.show('서버와 연결이 끊어졌습니다. \n나중에 다시 시도해주세요.', SimpleToast.BOTTOM))

				// }

				
			}
		} catch (err) {
			console.log(err)
		}

		*/

	}

	async loadCasesDidFocused(url) {
		// if(store.getState().user.userType === 'common') {
		// 일반유저도 사건 불러와야됨
		if(true) {
			await commonApi('GET', `${url}/0`, {}).then((data) => {
				if(data.length > 0 && data[0].userCase !== undefined) {
					this.setState({
						cases: this.state.cases.concat(data),
						pageNum: 1,
					})
				} else {
					// 사건이 없음
				}
			// }).catch((err) => console.log('loadCasesDidFocused', err))
			}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
		}
	}
	
	async loadCases(sort) {

		// if(store.getState().user.userType === 'common') {
		// 일반유저도 사건 불러와야됨
		if(true) {
			await commonApi('GET', `${this.state.url}/${this.state.pageNum}`, {}).then((data) => {
				this.setState({
					cases: this.state.cases.concat(data),
					pageNum: this.state.pageNum + 1,
				})
			}).catch((err) => console.log(`${this.state.url}/${this.state.pageNum}`, err))
			// }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
		}
	}

	toggleModal() {
		this.setState({
			isVisible: !this.state.isVisible,
			tempSort: this.state.sort,
		})

	}

	async changeSort() {
		
		const sort = this.state.sort

		if(this.state.tempSort !== sort) {	
			this.props.setUser({
				sort: sort,
				tempSort: sort,
				pageNum: 0,
			})

			this.setState({
				sort: sort,
				tempSort: sort,
				pageNum: 0,
			})

			// if(store.getState().user.userType === 'common') {
			// 일반유저도 사건 불러와야됨
			if(true) {

				await commonApi('GET', `user/case/userIdx/${this.state.sort}/0`, {}).then((data) => {

					this.setState({
						cases: data,
						pageNum: 1
					})

					this.toggleModal()
				}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

			}

		}
			
		this.toggleModal()
			
	}
	
	async changeNewSort(sort) {

		this.toggleModal()

		if(this.state.tempSort !== sort) {
			let url = ``
			
			switch(sort) {
				case 'todo': 
					url = `user/case/userIdx/todo/DESC`
					break
				case 'termin': 
					url = `user/case/userIdx/userCaseIdx/ASC`
					break
				default: 
					url = `user/case/userIdx/title/ASC`
					break
			}

			this.props.setUser({
				sort,
				tempSort: sort,
				pageNum: 0,
				url
			})

			this.setState({
				sort,
				tempSort: sort,
				pageNum: 0,
				url
			})


			// if(store.getState().user.userType === 'common') {
			// 일반유저도 사건 불러와야됨
			if(true) {

				await commonApi('GET', `${url}/0`, {}).then((data) => {

					if(data.length !== 0 && data[0].userCase !== undefined) {
						this.setState({
							cases: data,
							pageNum: 1,
						})
					}

				// }).catch((err) => console.log('changeSort', err))
				}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

			}
		}
	}

	searchHandle(value) {
		this.setState({
			searchValue: value,
		})
	}

	searchItem() {

		Keyboard.dismiss()

		const searchValue = this.state.searchValue

		// 예외처리
		if(searchValue.trim() === '') {
			SimpleToast.show("검색어를 입력해주세요.", SimpleToast.BOTTOM)
			return false
		}

		let filterCases = this.state.cases.filter((value) => {
			if(value.userCase.court.includes(searchValue) || value.userCase.caseNumber.includes(searchValue)) {
					return true
			}

			if(value.userCase.title !== null) {
				if(value.userCase.title.includes(searchValue)) {
					return true
				}
			}

			if(value.party.length !== 0) {
				for(let i = 0; i < value.party.length; i++) {
					if(value.party[i].Classification.includes(searchValue) || value.party[i].name.includes(searchValue)) {
						return true
					}
				}
			}

			if(value.representative.length !== 0) {
				for(let i = 0; i < value.representative.length; i++) {
					if(value.representative[i].Classification.includes(searchValue) || value.representative[i].name.includes(searchValue)) {
						return true
					}
				}
			}

			return false

		})

		if(filterCases.length !== 0) {
			this.setState({
				tempCases: this.state.cases,
				searching: true,
				cases: filterCases,
			})
		} else {
			SimpleToast.show("일치하는 사건이 없습니다.", SimpleToast.BOTTOM)
		}

	}

	cancelSearch() {
		this.setState({
			cases: this.state.tempCases,
			// tempCases: [],
			searching: false,
			searchValue: '',
		})
	}

	_renderItem = ({item}) => {
		if(item !== undefined) {
			return (
				<TouchableOpacity 
					onPress={() => this.caseHandle(item)}
					onLongPress={() => this.toggleDeleteModal(item.userCase.title, item.userCase.caseIdx)}
				>
					<CaseComponent 
						navigation={this.props.navigation} 
						key={item.userCase.caseIdx} 
						data={item} 
						// onLongPress={this.toggleDeleteModal}
					/>
				</TouchableOpacity>
			)
		} else {
			return (
				<></>
			)
		}
	}

	caseHandle(data) {

        this.props.clearCase()

		this.setState({
			searchValue: '',
			searching: false
		})
        
		let plaintiff = ''
		let defendant = ''
		let plaintiffDeputy = ''
		let defendantDeputy = ''

		this.props.setCase({
            caseIdx: data.userCase.caseIdx,
            caseNumber: data.userCase.caseNumber,
            title: data.userCase.title,
            court: data.userCase.court,
            caseName: data.userCase.caseName,
            judiciary: data.userCase.judiciary,
            receiptAt: data.userCase.receiptAt,
            mergeClassification: data.userCase.mergeClassification,
            fee: data.userCase.fee,
            finalResult: data.userCase.finalResult,
			plaintiff: plaintiff,
			defendant: defendant,
			plaintiffDeputy: plaintiffDeputy,
			defendantDeputy: defendantDeputy,
			party: data.party,
			representative: data.representative,
			content: data.content,
        })

        this.props.navigation.navigate('CaseDetail')

    }

	toggleDeleteModal(title, idx) {
		this.setState({
			deleteModalVisible: !this.state.deleteModalVisible,
			deleteCaseTitle: title,
			deleteCaseIdx: idx
		})
	}

	caseDelete(idx) {

		commonApi('DELETE', `user/case/caseIdx/${idx}`, {}).then((result) => {
			if(result.success) {

				const cases = this.state.cases.filter((value) => value.userCase.caseIdx !== idx)
				this.setState({
					cases: cases,
				})
				this.toggleDeleteModal('', 0)
			} else {
				SimpleToast.show(result.msg, SimpleToast.BOTTOM)
			}
		// }).catch((err) => console.log(`user/case/caseIdx/${idx}`, err))
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

	}

	async caseAddHandle() {

		const type = store.getState().user.userType
		let caseCount
		
		// 사건개수에 따른 분기처리용 
		let flag
		
		// 사건 총 갯수 구해옴
		// await commonApi('GET', `user/case/userIdx/count`, {}).then((result) => {
		// 	if(result.success) {
		// 		caseCount = result.count
		// 	} else {
		// 		SimpleToast.show(result.msg, SimpleToast.BOTTOM)
		// 		return
		// 	}
		// }).catch((err) => {
		// 	SimpleToast.show("서버와 연결이 끊어졌습니다. \n나중에 다시 시도해주세요.", SimpleToast.BOTTOM)
		// 	return
		// })

		// 지금은 caseCount 가져오는 API가 없어서 화면에 표시된 개수로 판단
		// common 멤버는 5개가 최대라 지금은 괜찮음

		
		caseCount = this.state.cases.length
		
		switch(type) {
			// 상용할때 체크해야함 ... JY
			case 'common':
				if(caseCount >= 100) {
					flag = false
				} else {
					flag = true
				}
			break
			default:
				if(caseCount >= 5) {
					flag = false
				} else {
					flag = true
				}
			break
		}

		if(flag) {
			this.props.navigation.navigate('CaseAdd')
		} else {
			Alert.alert(
				'알림',
				'등록가능한 사건 수를 초과하였습니다.',
				[
					{'text': '확인',}
				]
			)
		}
	}

	_handleLoadMore = () => {
		if(this.state.searching === false) {
			this.loadCases(this.state.sort)
		}
	}

	// 백버튼 제어
    handleBackButton = () => {

		if (!this.props.navigation.isFocused()) {
			// The screen is not focused, so don't do anything
			return false;
		}
        // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        if (this.exitApp == undefined || !this.exitApp) {
            SimpleToast.show('한번 더 누르시면 종료됩니다.', SimpleToast.BOTTOM);
            this.exitApp = true;

            this.timeout = setTimeout(
                () => {
                    this.exitApp = false;
                },
                2000    // 2초
            );
        } else {
            clearTimeout(this.timeout);

            BackHandler.exitApp();  // 앱 종료
        }
        return true;
    }

	render() {
		return (
			<View style={styles.caseContainer}>
				<View style={styles.header}>
					<HeaderText title='사건' count={`(${this.state.cases.length})`} />
					<View style={{flexDirection: 'row'}}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Alarm')} style={{marginRight: 5}}>
							{/* <Image source={require('../../assets/images/Bell.png')} /> */}
							<IconFontisto name="bell" size={28} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.toggleModal()} style={{marginHorizontal: 5}}>
							{/* 필터 아이콘 */}
							<FontAwesome name={'sliders'} size={26} color={ this.state.isVisible ? '#0078D4' : '#000'} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.searchContainer}>
					<TextInput 
						style={styles.searchInput} 
						placeholder="검색어를 입력하세요." 
						placeholderTextColor="#808080"
						value={this.state.searchValue} 
						onChangeText={(value) => this.searchHandle(value)} 
						onSubmitEditing={
							this.state.searching ? (
								() => this.cancelSearch()
							) : (
								() => this.searchItem()
							)
						}
					/>
						{/* 돋보기 아이콘 */}
						{
							this.state.searching ? (
								<TouchableOpacity style={{flex: 1}} onPress={() => this.cancelSearch()}>
									<Image source={require('../../assets/images/X.png')} />
								</TouchableOpacity>
								) : (
								<TouchableOpacity style={{flex: 1}} onPress={() => this.searchItem()}>
									<Image source={require('../../assets/images/MagnifyingGlass.png')} />
								</TouchableOpacity>
							)
						}

				</View>
				{/* 사건 리스트 나오는 목록 */}
				<FlatList 
					style={styles.caseListContainer} 
					navigation={this.props.navigation} 
					data={this.state.cases} 
					renderItem={this._renderItem} 
					keyExtractor={(item, index) => index}
					onEndReached={this._handleLoadMore}
					onEndReachedThreshold={1}
					ListEmptyComponent={
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyText}>등록된 사건이 없습니다.</Text>
						</View>
					}
				/>
				<TouchableOpacity style={styles.write} onPress={() => this.caseAddHandle()}>
					<View style={styles.circle}>
						<Icon name={'addfolder'} size={25} color={'#FFF'} />
					</View>
				</TouchableOpacity>
				{
					this.state.isVisible ? (
						<View style={styles.sortContainer}>
							<View style={styles.sortItemContainer}>
								<TouchableOpacity 
									style={
										this.state.sort === 'title' ? [styles.sortItemSelected, {borderBottomWidth: 1, borderBottomColor: '#808080'}] :[styles.sortItem, {borderBottomWidth: 1, borderBottomColor: '#808080'}]
									} 
									onPress={() => this.changeNewSort('title')}>
									<Text style={
										this.state.sort === 'title' ? [styles.sortText, styles.sortTextBold] : styles.sortText
									}>
										사건별칭순
									</Text>
								</TouchableOpacity>
								<TouchableOpacity 
									style={
										this.state.sort === 'todo' ? [styles.sortItemSelected, {borderBottomWidth: 1, borderBottomColor: '#808080'}] :[styles.sortItem, {borderBottomWidth: 1, borderBottomColor: '#808080'}]
									} 
									onPress={() => this.changeNewSort('todo')}>
									<Text style={
										this.state.sort === 'todo' ? [styles.sortText, styles.sortTextBold] : styles.sortText
									}>
										ToDo순
									</Text>
								</TouchableOpacity>
								<TouchableOpacity 
									style={
										this.state.sort === 'termin' ? [styles.sortItemSelected] :[styles.sortItem, {}]
									} 
									onPress={() => this.changeNewSort('termin')}>
									<Text style={
										this.state.sort === 'termin' ? [styles.sortText, styles.sortTextBold] : styles.sortText
									}>
										일정순
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					) : (<></>)
				}
				<Modal isVisible={this.state.deleteModalVisible}>
                    <View style={{backgroundColor: '#FFFFFF', padding: 10, justifyContent: 'space-between'}}>
						<View>
							<View style={styles.modalContainer}>
								<View style={styles.deleteModalContent}>
									<Text>{this.state.deleteCaseTitle}</Text>
									<Text>사건을 삭제하시겠습니까?</Text>
								</View>
							</View>
						</View>
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.cancel} onPress={() => this.toggleDeleteModal('', 0)}>
								<Text style={styles.buttonText}>취소</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.submit} onPress={() => this.caseDelete(this.state.deleteCaseIdx)}>
								<Text style={styles.buttonText}>삭제</Text>
							</TouchableOpacity>
						</View>
                    </View>
                </Modal>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		webToken: state.user.webToken,
		sort: state.user.sort
	}
};

const mapDispatchToProps = {
	setUser, setCase, clearCase
}

export default connect(mapStateToProps, mapDispatchToProps)(Case);

const styles = StyleSheet.create({
	caseContainer: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginRight: 5,
		// marginRight: Dimensions.get('window').width / 20,
		marginTop: 10,
	},
	sortContainer: {
		position: 'absolute',
		top: 40,
		right: Dimensions.get('window').width / 20,
		width: 150,
		zIndex: 9999,
		backgroundColor: '#FFF',
		borderColor: '#000',
		borderWidth: 1,
		flex: 1,
	},
	sortItemContainer: {
		flex: 1,
	},
	sortItem: {

	},
	sortText: {
		fontSize: 14,
		marginLeft: 10,
		marginTop: 10,
		marginBottom: 10,
	},
	sortItemSelected: {
		backgroundColor: '#D4D4D4'
	},
	sortTextBold: {
		fontWeight: 'bold',
	},
	searchContainer: {
		// height: 40,
		// justifyContent: "space-around",
		// alignItems: "flex-start",
		// paddingTop: 4,
		// paddingBottom: 4,
		// paddingLeft: 16,
		// paddingRight: 16,
		// marginBottom: 8,
		// flexDirection: "row",
		marginTop: 5,
		justifyContent: "center",
		alignItems: "flex-start",
		borderBottomWidth: 0.8,
		borderBottomColor: "#C4C4C4",
		height: 38,
		paddingLeft: 16,
		paddingBottom: 45,
		flexDirection: "row",
	},
	searchInput: {
		// width: '100%',
		// height: 36,
		// fontSize: 14,
		// fontWeight: "400",
		// justifyContent: 'center',
		// borderRadius: 5,
		// backgroundColor: '#e5e5e5',
		// color: '#000'
		flex: 8,
		paddingLeft: 16,
		width: '80%',
		height: 36,
		marginBottom: 7,
		fontSize: 13,
		fontWeight: "400",
		justifyContent: 'center',
		borderRadius: 5,
		backgroundColor: '#e5e5e5',
	},
	caseListContainer: {
		backgroundColor: "#F4F4F4",
	},
	write: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginRight: 30,
		marginBottom: 30,
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
	circle: {
		backgroundColor: '#0078d4',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		width: 50,
		height: 50,
	},
	modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
    },
    modalTitle: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
	radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
	modalContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    radioItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
	buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30,
    },
	cancel: {
        backgroundColor: '#808080',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 35,
        borderRadius: 3,
		marginHorizontal: 2,
    },
	submit: {
        backgroundColor: '#0078d4',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 35,
        borderRadius: 3,
		marginHorizontal: 2,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
	deleteModalContent: {
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
	},
	emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 30,
    },
    emptyText: {
        fontSize: 15,
        fontWeight: '400'
    },
})