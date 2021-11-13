import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	Keyboard,
	StyleSheet,
	Dimensions,
	BackHandler,
} from 'react-native';

import HeaderText from '../../Components/HeaderText';
import CaseNavigator from '../../Navigation/CaseNavigator';
import PreformerSelect from './Detail/PerformerSelect';
import { store } from '../../redux/store';
import { setCase, clearCase } from '../../redux/actions/cases'
import { connect } from 'react-redux';
import { commonApi } from '../../Common/ApiConnector';
import Modal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';
import BlueDot from '../../Components/BlueDot';
import moment from 'moment';

class CaseDetail extends Component {

	constructor(props) {
		super(props)

		this.state = ({
			cases: {},
			isVisible: false,
			title: '',
			caseIdx: 0,
			favorite: false,
			performer: '',
			performerSelect: false, // 작업자 수행 선택
		})

		this.toggleFavorite = this.toggleFavorite.bind(this)
		this.buttonHandler = this.buttonHandler.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
		this.textHandle = this.textHandle.bind(this)
		this.changeTitle = this.changeTitle.bind(this)
		this.togglePerformerSelect = this.togglePerformerSelect.bind(this)
		this.setPerformer = this.setPerformer.bind(this)
	}

	async componentDidMount() {
		
		const data = store.getState().cases

		let sortData = []
		let date_1 
		let date_2 

		this.setState({
			cases: data,
			title: data.title,
			caseIdx: data.caseIdx,
		})

		commonApi('GET', `user/case/caseIdx/${data.caseIdx}`, {}).then((result) => {

			if(typeof result[0].favorite === 'string') {
				if(result[0].favorite === 'false') {
					this.setState({
						favorite: false,
					})
				} else if(result[0].favorite === 'true') {
					this.setState({
						favorite: true,
					})
				}
			} else if(typeof result[0].favorite === 'boolean') {
				this.setState({
					favorite: result[0].favorite
				})
			}

			this.props.setCase({
				content: result.content
			})

			// }).catch((err) => console.log(`user/case/caseIdx/${data.caseIdx}`, err))
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

		// 상용할때 체크해야함 ... JY
		if(store.getState().user.userType === 'common') {

			// ToDo
			const todoUrl = `user/case/todo/caseIdx/${data.caseIdx}`
			const memoUrl = `user/case/usernote/${data.caseIdx}`
            let today = moment.tz(new Date(), 'Asia/Seoul')
        
            // await commonApi('GET', todoUrl, {}).then((data) => {
            //     {
            //         data.success === undefined ? (

            //             // 먼저 설정한 날짜가 낮은거부터 위로
            //             sortData = data.sort(function(a, b) {
            //                 date_1 = new Date(a.settingAt)
            //                 date_2 = new Date(b.settingAt)
            //                 if(date_1 > date_2) {
            //                     return -1
            //                 } else if(date_1 === date_2) {
            //                     return 0
            //                 } else {
            //                     return 1
            //                 }
            //             }),

            //             // 그 뒤에 체크된거 처리
            //             sortData = sortData.sort(function(a, b) {
            //                 if((a.isCheck === true || a.isCheck === 'true') && (b.isCheck === false || b.isCheck === 'false')) {
            //                     return 1
            //                 } else if((a.isCheck === false || a.isCheck === 'false') && (b.isCheck === true || b.isCheck === 'true')) {
            //                     return -1
            //                 } else {
            //                     return 0
            //                 }
            //             }),

            //             sortData.map((value) => {
            //                 let settingDate = moment.tz(value.settingAt, 'Asia/Seoul').utc(9).format()
            //                 let diff = moment(settingDate).diff(today, 'days')
            //                 let color = '#000'
        
            //                 diff *= -1
            //                 diff > 0 ? (
            //                     diff = `D+${diff}`,
            //                     color = '#88001b'
            //                 ) : (
            //                     diff === 0 ? (
            //                         diff = `D-0`
            //                     ) : (
            //                         diff = `D${diff}`,
            //                         color = '#23895f'
            //                     )
            //                 )

            //                 value.diff = diff
            //                 value.color = color
            //             }),

            //             this.props.setCase({
            //                 todos: sortData,
            //             }, () => console.log(148, store.getState().cases.todos))
            //         ) : (
            //             SimpleToast.show(data, SimpleToast.BOTTOM)
            //         )
            //     }
            // // }).catch((err) => console.log(url + err))
            // }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

            // commonApi('GET', memoUrl, {}).then((data) => {
            //     {
            //         data.success === undefined ? (

            //             // 먼저 설정한 날짜가 낮은거부터 위로
            //             sortData = data.sort(function(a, b) {
            //                 date_1 = new Date(a.settingAt)
            //                 date_2 = new Date(b.settingAt)
            //                 if(date_1 > date_2) {
            //                     return -1
            //                 } else if(date_1 === date_2) {
            //                     return 0
            //                 } else {
            //                     return 1
            //                 }
            //             }),

            //             this.props.setCase({
            //                 memos: sortData,
            //             })
            //         ) : (
            //             SimpleToast.show(data.msg, SimpleToast.BOTTOM)
            //         )
            //     }
            // // }).catch((err) => console.log(url + err))
            // }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

			this.props.navigation.addListener('didFocus', () => {

				let memos = []
				let todos = []
				sortData = []

				// Todo
				commonApi('GET', todoUrl, {}).then((data) => {
                    {
                        data.success === undefined ? (

                            // 먼저 설정한 날짜가 낮은거부터 위로
                            todos = data.sort(function(a, b) {
                                date_1 = new Date(a.settingAt)
                                date_2 = new Date(b.settingAt)
                                if(date_1 > date_2) {
                                    return -1
                                } else if(date_1 === date_2) {
                                    return 0
                                } else {
                                    return 1
                                }
                            }),

                            // 그 뒤에 체크된거 처리
                            todos = todos.sort(function(a, b) {
                                if((a.isCheck === true || a.isCheck === 'true') && (b.isCheck === false || b.isCheck === 'false')) {
                                    return 1
                                } else if((a.isCheck === false || a.isCheck === 'false') && (b.isCheck === true || b.isCheck === 'true')) {
                                    return -1
                                } else {
                                    return 0
                                }
                            }),

                            todos.map((value) => {
                                let settingDate = moment.tz(value.settingAt, 'Asia/Seoul').utc(9).format()
                                let diff = moment(settingDate).diff(today, 'days')
                                let color = '#000'
            
                                diff *= -1
                                diff > 0 ? (
                                    diff = `D+${diff}`,
                                    color = '#88001b'
                                ) : (
                                    diff === 0 ? (
                                        diff = `D-0`
                                    ) : (
                                        diff = `D${diff}`,
                                        color = '#23895f'
                                    )
                                )
    
                                value.diff = diff
                                value.color = color
                            }),

                            this.props.setCase({
                                todos: todos,
                            }, () => console.log('detail focused', todos))
                            
                        ) : (
                            console.log(data.msg)
                            // SimpleToast.show(data.msg, SimpleToast.BOTTOM)
                        )
                    }
                // }).catch((err) => console.log(url + err))
                }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

				// Memo
				commonApi('GET', memoUrl, {}).then((data) => {
                    {
                        data.success === undefined ? (

                            // 먼저 설정한 날짜가 낮은거부터 위로
                            memos = data.sort(function(a, b) {
                                date_1 = new Date(a.settingAt)
                                date_2 = new Date(b.settingAt)
                                if(date_1 > date_2) {
                                    return -1
                                } else if(date_1 === date_2) {
                                    return 0
                                } else {
                                    return 1
                                }
                            }),

                            this.props.setCase({
                                memos: memos,
                            })
                        ) : (
                            console.log(data.msg)
                            // SimpleToast.show(data.msg, SimpleToast.BOTTOM)
                        )
                    }
                // }).catch((err) => console.log(url + err))
                }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
	
			})

		}

		

	}
	
	componentWillUnmount() {

		this.props.clearCase()

	}

	toggleFavorite() {
		const caseIdx = this.state.cases.caseIdx

		commonApi('PUT', `user/case/favorite/${caseIdx}`, {}).then((result) => {

			if(result.success) {
				this.setState({
					favorite: !this.state.favorite
				})
			} else {
				SimpleToast.show(result.msg, SimpleToast.BOTTOM)
			}
		// }).catch((err) => console.log(`user/case/favorite/${caseIdx} :: `, err))
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

	}

	buttonHandler(bool, screen) {
		if(bool) {
			this.props.navigation.navigate(screen, {inCase: true})
		}
	}

	toggleModal() {
		this.setState({
			isVisible: !this.state.isVisible
		})
	}

	togglePerformerSelect() {
		this.setState({
			performerSelect: !this.state.performerSelect
		})
	}

	setPerformer(category, name) {
		if(category !== 'no') {
			if(name === '') {
				SimpleToast.show("수행자를 선택해주세요.", SimpleToast.BOTTOM)
				return
			} else {
				this.setState({
					performer: name
				})
			}
		}
		this.togglePerformerSelect()
	}

	textHandle(value) {
		this.setState({
			title: value
		})
	}

	changeTitle() {

		Keyboard.dismiss()

		if(this.state.title.trim() === '') {
			SimpleToast.show("사건별명을 입력해주세요.", SimpleToast.BOTTOM)
			return
		}

		if(this.state.title.trim().length > 15) {
			SimpleToast.show("사건별칭은 15자까지 입력가능합니다.")
			return
		}

		commonApi('PUT', `user/case/title/${this.state.title}/${this.state.caseIdx}`, {}).then((result) => {

			if(result !== undefined) {
				if(result.success) {

					this.props.setCase({
						title: this.state.title
					})
					this.setState({
						cases: store.getState().cases
					})
					SimpleToast.show("사건별명이 변경되었습니다.", SimpleToast.BOTTOM)

					this.toggleModal()
				} else {
					SimpleToast.show(result.msg, SimpleToast.BOTTOM)
				}
			}

		// }).catch((err) => console.log(`user/case/title/${this.state.title}/${this.state.caseIdx}`, err))
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

	}

	render() {
		return (
			<View style={styles.caseContainer}>
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<HeaderText title={`${this.state.cases.title}`} />
						<TouchableOpacity style={styles.currentState} onPress={() => this.toggleModal()}>
							<Text style={styles.stateText}>
								수정
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.headerRight}>
						<TouchableOpacity onPress={() => this.props.navigation.pop()}>
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.tabContainer}>
					<CaseNavigator buttonHandler={(bool, screen) => this.buttonHandler(bool, screen)} data={this.props} />
				</View>
				<Modal isVisible={this.state.isVisible}>
					<View style={{}}>
						<View style={{backgroundColor: '#FFF', padding: 15}}>
							<View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', borderBottomColor: '#C4C4C4', borderBottomWidth: 1, paddingBottom: 2,}}>
								<BlueDot color={'#1CAA99'} />
								<Text style={{marginLeft: 5, fontSize: 16, fontWeight: 'bold'}}>사건별칭 수정</Text>
							</View>
							<View style={styles.modalContent}>
								<TextInput 
									style={styles.input} 
									value={this.state.title} 
									onChangeText={(value) => this.textHandle(value)} 
									onSubmitEditing={() => this.changeTitle()}
								/>
								<Text style={{fontSize: 12, marginTop: 10}}>· 글자수 제한 15자</Text>
							</View>
							<View style={styles.buttonContainer}>
								<TouchableOpacity style={styles.closeButton} onPress={() => this.toggleModal()}>
									<Text style={styles.modalButton}>취소</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.applyButton} onPress={() => this.changeTitle()}>
									<Text style={styles.modalButton}>변경</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
				<Modal isVisible={this.state.performerSelect}>
					<View style={{flex: 1}}>
						<PreformerSelect 
							party={this.state.cases.party} 
							representative={this.state.cases.representative} 
							toggleModal={this.togglePerformerSelect}
							setPerformer={this.setPerformer}
						/>
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
		casesIdx: state.cases.caseIdx,
	}
};

const mapDispatchToProps = {
	setCase, clearCase,
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseDetail);


const styles = StyleSheet.create({
	caseContainer: {
		flex: 1
	},
	back: {
		marginTop: 10,
		marginLeft: 10,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: "space-between",
		borderBottomColor: "#0078d4",
		borderBottomWidth: 1,
		paddingBottom: 5,
		paddingLeft: Dimensions.get('window').width / 30,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginRight: 10,
		marginTop: 10,
		width: '100%',
		paddingBottom: 5,
		borderBottomColor: '#808080',
		borderBottomWidth: 1,
	},
	headerLeft: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: "center",
		marginLeft: Dimensions.get('window').width / 20,
	},
	headerRight: {
		marginRight: Dimensions.get('window').width / 20,
	},
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	currentState: {
		marginLeft: 10,
		backgroundColor: "#0ed145",
		borderRadius: 12,
		width: 45,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	stateText: {
		fontSize: 13,
		fontWeight: "bold",
		color: "#FFFFFF"
	},
	tabContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	tab: {
		alignItems: "center",
		justifyContent: "center",
		padding: 15,
	},
	tabText: {
		fontSize: 15,
		fontWeight: 'bold',

	},
	contentContainer: {
		flex: 1,
		padding: 16,
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
	modalContent: {
		marginTop: 20,
	},
	input: {
		backgroundColor: '#E5E5E5',
		borderRadius: 5,
		paddingLeft: 5,
		height: 36,
		fontSize: 13,

	},
	buttonContainer: {
		justifyContent: 'space-around',
        alignItems: 'center',
		flexDirection: 'row',
		marginTop: 30,
	},
	closeButton: {
        width: '45%', 
        justifyContent: "center", 
        alignItems: "center",
		backgroundColor: '#D8D8D8',
		borderRadius: 5,
    },
	applyButton: {
        width: '45%', 
        justifyContent: "center", 
        alignItems: "center",
		backgroundColor: '#0078D4',
		borderRadius: 5,
    },
	modalButton: {
		margin: 5,
		fontSize: 16,
		fontWeight: 'bold',
		color: '#FFF',
	},
	loginButton: {
        width: '100%',
		borderRadius: 5,
		textAlign: 'center',
        justifyContent: 'center',
		fontWeight: "600",
		fontSize: 15,
        backgroundColor: '#0078d4',
        color: '#FFFFFF',
        paddingTop: 8,
        paddingBottom: 8,
	}
})