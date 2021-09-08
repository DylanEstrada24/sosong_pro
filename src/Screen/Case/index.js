import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	StyleSheet,
	FlatList,
	Keyboard,
	BackHandler,
} from 'react-native';

import CaseList from './CaseList';
import Modal from 'react-native-modal';
import { store } from '../../redux/store';
import { setUser } from '../../redux/actions/user';
import { setCase, clearCase } from '../../redux/actions/cases';
import { RadioButton } from 'react-native-paper';
import { connect } from 'react-redux';
import { sort } from 'prelude-ls';
import { commonApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
import CaseComponent from './Case'

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
		})

		this.toggleModal = this.toggleModal.bind(this)
		this.changeSort = this.changeSort.bind(this)
		this.loadCases = this.loadCases.bind(this)
		this.searchHandle = this.searchHandle.bind(this)
		this.searchItem = this.searchItem.bind(this)
		this.cancelSearch = this.cancelSearch.bind(this)
		this.caseHandle = this.caseHandle.bind(this)
		this.loadCasesDidFocused = this.loadCasesDidFocused.bind(this)
	}

	async componentDidMount() {

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

		const sort = store.getState().user.sort


		this.setState({
			sort: sort,
			tempSort: sort,
		})


		// 일반유저 구분
		if(store.getState().user.userType !== 'common') {

			
			this.loadCases(sort);
			
			this.props.navigation.addListener("didFocus", () => {
				this.setState({
					cases: [],
					// pageNum: 0,
				})

				let stateSort = this.state.sort

				if(stateSort === '') {
					stateSort = sort
				}

				this.loadCasesDidFocused(stateSort)
			})
			
		} else {

			this.setState({
				cases: [
					{
						"userCase": {
						"caseIdx": 0,
						"title": "소송프로",
						"court": "부산지방법원 동부지원",
						"caseNumber": "2020가소123456",
						"caseName": " [전자] 임금",
						"judiciary": " 민사24단독 (전화:780-1337(재판 관련),1307(이행권고결정 및 각종 보정 관련 문의))",
						"receiptAt": " 2020.12.28",
						"mergeClassification": " 없음",
						"fee": " 4,800원",
						"finalResult": " "
						},
						"party": [
						{
							"Classification": " 피고",
							"name": "홍길동"
						},
						{
							"Classification": " 원고",
							"name": "김개똥"
						}
						],
						"representative": [
						{
							"Classification": "원고 소송대리인",
							"name": "변호사 강변호"
						}
						]
					}
				]
			})

			this.props.navigation.addListener("didFocus", () => {
				this.setState({
					cases: 
					[
						{
							"userCase": {
								"caseIdx": 0,
								"title": "소송프로",
								"court": "부산지방법원 동부지원",
								"caseNumber": "2020가소123456",
								"caseName": " [전자] 임금",
								"judiciary": " 민사24단독 (전화:780-1337(재판 관련),1307(이행권고결정 및 각종 보정 관련 문의))",
								"receiptAt": " 2020.12.28",
								"mergeClassification": " 없음",
								"fee": " 4,800원",
								"finalResult": " "
							},
							"party": [
								{
									"Classification": " 피고",
									"name": "홍길동"
								},
								{
									"Classification": " 원고",
									"name": "김개똥"
								}
							],
							"representative": [
								{
									"Classification": "원고 소송대리인",
									"name": "변호사 강변호"
								}
							]
						}
					],
				})
			})

		}
	}

	componentWillUnmount() {
        this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
		this.setState({
			pageNum: 0,
		})
    }

	async loadCasesDidFocused(sort) {
		if(store.getState().user.userType === 'common') {
			commonApi('GET', `user/case/userIdx/${sort}/0`, {}).then((data) => {
				this.setState({
					cases: this.state.cases.concat(data),
					pageNum: 1,
				})
			}).catch((err) => console.log('loadCasesDidFocused', err))
		}
	}
	
	async loadCases(sort) {

		if(store.getState().user.userType !== 'common') {
			commonApi('GET', `user/case/userIdx/${sort}/${this.state.pageNum}`, {}).then((data) => {
				this.setState({
					cases: this.state.cases.concat(data),
					pageNum: this.state.pageNum + 1,
				})
			}).catch((err) => console.log(`user/case/userIdx/${sort}/${this.state.pageNum}`, err))
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

			if(store.getState().user.userType !== 'common') {

				commonApi('GET', `user/case/userIdx/${this.state.sort}/0`, {}).then((data) => {

					// console.log("changed data ::", data)
					this.setState({
						cases: data,
						pageNum: 1
					})
				}).catch((err) => console.log('changeSort', err))

			}

		}
			
		this.toggleModal()
			
	}

	searchHandle(value) {
		if(store.getState().user.userType !== 'common') {
			this.setState({
				searchValue: value,
			})
		}
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
			if(value.userCase.title.includes(searchValue) || value.userCase.court.includes(searchValue) || 
				value.userCase.caseNumber.includes(searchValue) || value.userCase.caseName.includes(searchValue) || 
				value.userCase.judiciary.includes(searchValue) || value.userCase.receiptAt.includes(searchValue) || 
				value.userCase.mergeClassification.includes(searchValue) || value.userCase.fee.includes(searchValue) || 
				value.userCase.finalResult.includes(searchValue)) {
					return true
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

	_renderItem = ({item}) => (
		<TouchableOpacity onPress={() => this.caseHandle(item)}>
			<CaseComponent navigation={this.props.navigation} key={item.userCase.caseIdx} data={item}/>
		</TouchableOpacity>
	)

	caseHandle(data) {

        this.props.clearCase()
        
		let plaintiff = ''
		let defendant = ''
		let plaintiffDeputy = ''
		let defendantDeputy = ''

		if(data.party.length !== 0) {


			data.party.map((item) => {
				if(item.Classification.includes('원고')) {
					plaintiff = item.name
				} else {
					defendant = item.name
				}
			})

		}

		if(data.representative.length !== 0) {

			data.representative.map((item) => {
				if(item.Classification.includes('원고')) {
					plaintiffDeputy = item.name
				} else {
					defendantDeputy = item.name
				}
			})

		}

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
        })

        this.props.navigation.navigate('CaseDetail')

    }

	_handleLoadMore = () => {
		this.loadCases(this.state.sort);
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	console.log('prev ',prevState)
	// 	console.log('this', this.state)
	// 	if(prevState.cases.length !== 0 && this.state.cases.length !== 0) {

	// 		if(prevState.cases[0].userCase.caseIdx !== this.state.cases[0].userCase.caseIdx) {
	// 			this.setState({
	// 				cases: this.state.cases
	// 			})
	// 		} else if(prevState.cases.length !== this.state.cases.length) {
	// 			this.setState({
	// 				cases: this.state.cases
	// 			})
	// 		}
	// 	}
	// }

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
				{/* <View style={styles.caseHeader}>
					<View style={{flex: 10}}>
						<Text style={styles.headerText}>소송프로</Text>
					</View>
				</View> */}
				{/* 진행중 칸 */}
				<View style={styles.filterContainer}>
					<View style={{flex: 1,}}></View>
					<View style={{flex: 1,}}></View>
					<View style={{flex: 6, alignItems: "center"}}>
						<Text style={styles.filterTitle}>사건({this.state.cases.length}/{store.getState().user.maxCase})</Text>
					</View>
					<View style={{flex: 1}}/>
					<View style={{flex: 1}}/>
					{/* 종 아이콘 추가 */}
					{/* <TouchableOpacity style={{flex: 1}} onPress={() => this.props.navigation.navigate('Alarm')}>
						<Image source={require('../../assets/images/Bell.png')} />
					</TouchableOpacity> */}
					{/* <TouchableOpacity style={{flex: 1}}>
						<Image source={require('../../assets/images/Gear.png')} />
					</TouchableOpacity> */}
				</View>
				<View style={styles.searchContainer}>
					<View style={{flex: 8}}>
						<TextInput 
							style={styles.searchInput} 
							placeholder="검색어를 입력하세요." 
							value={this.state.searchValue} 
							onChangeText={(value) => this.searchHandle(value)} 
						/>
					</View>
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
					<TouchableOpacity style={{flex: 1}} onPress={() => this.toggleModal()}>
						{/* 필터 아이콘 */}
						<Image source={require('../../assets/images/FadersHorizontal.png')} />
					</TouchableOpacity>
				</View>
				{/* 사건 리스트 나오는 목록 */}
				{/* <ScrollView 
					style={styles.caseListContainer}
					keyboardDismissMode="on-drag"
				>
					<CaseList navigation={this.props.navigation} sort={this.state.sort} cases={this.state.cases} />
				</ScrollView> */}
				<FlatList 
					style={styles.caseListContainer} 
					navigation={this.props.navigation} 
					data={this.state.cases} 
					renderItem={this._renderItem} 
					keyExtractor={(item, index) => index}
					onEndReached={this._handleLoadMore}
					onEndReachedThreshold={1}
				/>
				{
					store.getState().user.userType !== 'common' ? (
						<TouchableOpacity style={styles.write} onPress={() => this.props.navigation.navigate('CaseAdd')}>
							<View style={styles.circle}>
								<Image source={require('../../assets/images/FolderPlus-1.png')} />
							</View>
						</TouchableOpacity>
					// ) : (<></>)
					) : (<TouchableOpacity style={styles.write} onPress={() => SimpleToast.show("플랜가입 유저만 가능합니다.", SimpleToast.BOTTOM)}>
						<View style={styles.circle}>
							<Image source={require('../../assets/images/FolderPlus-1.png')} />
						</View>
					</TouchableOpacity>)
				}
				<Modal isVisible={this.state.isVisible}>
                    <View style={{flex: 1, backgroundColor: '#FFFFFF', padding: 10, justifyContent: 'space-between'}}>
						<View>
							<View style={styles.modalHeader}>
								<BlueDot />
								<Text style={styles.modalTitle}>사건 정렬</Text>
							</View>
							<View style={styles.radioContainer}>
								<View style={styles.radioItemContainer}>
									<RadioButton 
										value="ASC"
										status={ this.state.sort === 'ASC' ? 'checked' : 'unchecked' }
										onPress={() => this.setState({ sort: 'ASC' })}
										color="#2665A1"
									/>
									<Text>오름차순</Text>
								</View>
								<View style={styles.radioItemContainer}>
									<RadioButton 
										value="DESC"
										status={ this.state.sort === 'DESC' ? 'checked' : 'unchecked' }
										onPress={() => this.setState({ sort: 'DESC' })}
										color="#2665A1"
									/>
									<Text>내림차순</Text>
								</View>
							</View>
						</View>
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.submit} onPress={() => this.changeSort()}>
								<Text style={styles.buttonText}>확인</Text>
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
	// caseHeader: {
	// 	marginTop: 40,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	borderBottomWidth: 0.8,
	// 	borderBottomColor: "#2665A1",
	// 	height: 38,
	// },
	// headerText: {
	// 	fontSize: 22,
	// 	fontWeight: "bold",
	// },
	filterContainer: {
		// marginTop: 5,
		marginTop: 40,
		height: 35,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		paddingBottom: 4,
		borderBottomColor: '#2665A1',
		borderBottomWidth: 1,
		alignSelf: 'stretch',
	},
	filterTitle: {
		fontSize: 13,
		fontWeight: "700",
		color: "#2665A1",

	},
	searchContainer: {
		marginTop: 10,
		height: 40,
		justifyContent: "space-around",
		alignItems: "flex-start",
		paddingTop: 4,
		paddingBottom: 4,
		paddingLeft: 16,
		paddingRight: 16,
		marginBottom: 8,
		flexDirection: "row",
	},
	searchInput: {
		paddingLeft: 16,
		width: '90%',
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
		backgroundColor: '#2665A1',
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
	submit: {
        backgroundColor: '#2665A1',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 35,
        borderRadius: 3,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
})