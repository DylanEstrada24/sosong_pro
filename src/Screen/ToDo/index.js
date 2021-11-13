import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	StyleSheet,
	Keyboard,
	BackHandler,
	Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import ToDoList from './ToDoList';
import { commonApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
import { store } from '../../redux/store';
import Icon from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HeaderText from '../../Components/HeaderText';
// import moment from 'moment';
import 'moment/locale/ko';
import moment from 'moment-timezone';

class ToDo extends Component {

	constructor(props) {
		super(props)
		this.state = ({
			todos: 
			[],
			isVisible: false,
			sort: 'CASE',
			tempSort: 'CASE',
			searchValue: '',
			searching: false,
			tempTodos: [],
			focused: false,
			count: 0,
			alertVisible: false,
		})

		// require('moment-timezone');
		var moment = require('moment');
		moment.tz.setDefault("Asia/Seoul");
		// moment().tz('Asia/Seoul').format()

		this.toggleModal = this.toggleModal.bind(this)
		this.changeSort = this.changeSort.bind(this)
		this.textHandle = this.textHandle.bind(this)
		this.searchItem = this.searchItem.bind(this)
		this.cancelSearch = this.cancelSearch.bind(this)
		this.filterTodos = this.filterTodos.bind(this)
		this.sortTodo = this.sortTodo.bind(this)
		this.updateArray = this.updateArray.bind(this)
	}

	filterTodos(data) {

		let temp = []
		let sortTodos = []
		let date_1
		let date_2
		let count = 0;

		temp = data.data

		// // 먼저 todo가 없는 사건 없앰
		// temp = data.data.filter((value) => value.userTodo.length !== 0)

		// 완료된 todo 없앰
		temp.map((outerValue) => {
			sortTodos.push(outerValue.userTodo.filter((innerValue) => {
				if(innerValue.isCheck === 'true' || innerValue.isCheck === true) {
					return false
				} else {
					count++
					return true
				}
			}))
		})

		// todo가 없는 사건 없앰
		for(let i = 0; i < temp.length; i++) {
			temp[i].userTodo = sortTodos[i]
		}

		temp = temp.filter((value) => value.userTodo.length !== 0)

		sortTodos = temp

		// 날짜 맞추기
		for(let i = 0; i < sortTodos.length; i++) {

			temp = sortTodos[i].userTodo

			temp = temp.sort(function(a, b) {
				date_1 = new Date(a.settingAt)
				date_2 = new Date(b.settingAt)
				if(date_1 > date_2) {
					return -1
				} else if(date_1 === date_2) {
					return 0
				} else {
					return 1
				}
			})

			sortTodos[i].userTodo = temp

		}

		let day = ''
		let today = moment.tz(new Date(), 'Asia/Seoul').utc(9).format('YYYY-MM-DD')
		// today = moment(today)

		sortTodos.map((outerValue) => {
			outerValue.userTodo.map((innerValue) => {
				// day = moment(innerValue.settingAt.split('T')[0]).format('dddd').charAt(0)
				day = moment(innerValue.settingAt).add('9', 'h').format('dddd').charAt(0)

				let settingDate = moment.tz(innerValue.settingAt, 'Asia/Seoul').utc(9).format('YYYY-MM-DD')
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

				// innerValue.settingAt = `${innerValue.settingAt.split('T')[0]}(${day})`
				innerValue.settingAt = `${settingDate.split('T')[0]}(${day})`
				innerValue.diff = diff
				innerValue.color = color

			})
		})

		// 사건이름 체크
		// const sortTodos2 = await Promise.all(
		// 	sortTodos.map((value, idx) => {
		// 		if(value.userCase.title === '') {
		// 			commonApi('GET', `user/case/caseIdx/${value.userCase.caseIdx}`, {}).then((result) => {
		// 				if(result.success !== undefined || result.success !== null) {
		// 					// return sortTodos[idx].userCase.title = result[0].caseName
							
		// 					value.userCase.title = result[0].caseName
		// 					// return value.userCase.title = result[0].caseName
		// 					return value
		// 				}
		// 			})

		// 		} else {
		// 			return value
		// 		}
		// 	})
		// )

		this.setState({count})

		return sortTodos

	}

	async componentDidMount() {

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

		// 일반유저 구분
		// 상용할때 체크해야함 ... JY
		if(store.getState().user.userType === 'common') {
		// if(true) {

			let focusTemp = []
			let sortTodos = []
		
			// await commonApi('GET', url, {}).then((data) => {
			// 	{
			// 		data.success ? (

			// 			sortTodos = this.filterTodos(data),

			// 			this.setState({
			// 				todos: sortTodos,
			// 			})
			// 		) : (
			// 			console.log(data.msg)
			// 		)
			// 	}
			// }).catch((err) => console.log(url + err))


			this.props.navigation.addListener("didFocus", () => {
				
				commonApi('GET', `user/case/todo/userIdx`, {}).then((data) => {
					{
						if(data.success) {
							focusTemp = this.filterTodos(data)
							setTimeout(() => {
								this.setState({
									todos: focusTemp,
									sort: 'CASE',
									tempSort: 'CASE',
								})
							}, 1000)

						} else {
							SimpleToast.show(data.msg, SimpleToast.BOTTOM)
						}
					}
				// }).catch((err) => console.log(url + err))
				}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
				
			})

		}

    }

	// componentDidUpdate(prevProps, prevState) {

	// 	if(prevState.todos.length !== 0 || this.state.todos.length !== 0) {
	// 		console.log(187)
	// 		// 사건개수가 같을때
	// 		if(prevState.todos.length === this.state.todos.length) { 
	// 			console.log(190)
				
	// 			// 이후 사건별로 todo값에 변화있는지 체크 후 업데이트
	// 			console.log(200)
	// 			this.state.todos.map((outerValue, i) => {

	// 				if(prevState.todos[i].userTodo.length !== 0 && outerValue.userTodo.length !== 0 && 
	// 					prevState.todos[i].userTodo.length === outerValue.userTodo.length) {
						
	// 					console.log(204)
	// 					outerValue.userTodo.map((innerValue, j) => {

	// 						console.log('start 207 for')
	// 						if(prevState.todos[i].userTodo[j].favorite !== innerValue.favorite || 
	// 							prevState.todos[i].userTodo[j].isCheck !== innerValue.isCheck) {
									
	// 							console.log(211)
								
	// 							this.setState({
	// 								todos: this.state.todos
	// 							}, () => console.log('215'))
	// 						} else {
	// 							console.log('217 else prev', prevState.todos[i].userTodo[j])
	// 							console.log('217 else this', innerValue)
	// 						}
							
	// 					})
	// 					console.log('end 218 for')
	// 				} else if(prevState.todos[i].userTodo.length !== 0 && outerValue.userTodo.length !== 0 && 
	// 					prevState.todos[i].userTodo.length !== outerValue.userTodo.length) {

	// 					console.log(222)


	// 					this.setState({
	// 						todos: this.state.todos
	// 					}, () => console.log('227'))
	// 				}
				
	// 			})

	// 			console.log('outer for end')

				
	// 		} else if(prevState.todos.length !== this.state.todos.length) {
	// 			console.log(224)
	// 			// 새 사건이 추가됬으므로 업데이트
	// 			this.setState({
	// 				todos: this.state.todos
	// 			}, () => console.log('228'))
	// 		}
	// 	}

	// 	// if(prevState.todos.length === this.state.todos.length) {
	// 	// 	for(let i = 0; i < this.state.todos.length; i++) {
	// 	// 		if(prevState.todos[i].userTodo.length !== 0 && this.state.todos[i].userTodo.length !== 0) {
	// 	// 			for(let j = 0; j < this.state.todos[i].userTodo.length; j++) {
	// 	// 				console.log(prevState.todos[i].userTodo[j])
	// 	// 			}
	// 	// 		}
	// 	// 	}
	// 	// } else if(prevState.todos.length !== this.state.todos.length) {
	// 	// 	this.setState({})
	// 	// }

	// }

	componentWillUnmount() {
        this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


	toggleModal() {
		this.setState({
			isVisible: !this.state.isVisible,
		})
	}

	toggleAlertVisible = () => this.setState({alertVisible: !this.state.alertVisible})

	async changeSort(sort) {

		if(this.state.tempSort !== sort) {

			let changedTodos = []
			let temp = []
			let tempObj = {}
			let flag = false
			let date_1
			let date_2
			let check = false
			
			if(this.state.todos.length >= 1) {
				flag = true
				if(sort === 'CASE') {
					this.state.todos.map((outerValue) => {
						
						outerValue.userTodo.map((innerValue) => {

							tempObj = {
								userCase: {
									caseIdx: innerValue.caseIdx,
									// title: innerValue.settingAt
									title: innerValue.settingAt
								},
								userTodo: {
									caseIdx: innerValue.caseIdx,
									content: innerValue.content,
									title: innerValue.title,
									favorite: innerValue.favorite,
									isCheck: innerValue.isCheck,
									settingAt: outerValue.userCase.title.split('(')[0],
									todoIdx: innerValue.todoIdx,
									updateAt: innerValue.updateAt,
									diff: 0,
									color: '',
								}
							}

							temp.push(tempObj)

						})
					})

					let count = 0;
					let ifFlag = true

					// 11-10 temp를 todo날짜순으로 정렬
					// temp = temp.sort(function(a, b) {
					// 	date_1 = new Date(a.settingAt)
					// 	date_2 = new Date(b.settingAt)
					// 	if(date_1 > date_2) {
					// 		return -1
					// 	} else if(date_1 === date_2) {
					// 		return 0
					// 	} else {
					// 		return 1
					// 	}
					// }),
					temp.map((value) => {

						check = false

						if(changedTodos.length === 0) {
							
							tempObj = {
								userCase: {
									caseIdx: value.userCase.caseIdx,
									title: value.userCase.title
								},
								userTodo: [
									{
										caseIdx: value.userTodo.caseIdx,
										title: value.userTodo.title,
										content: value.userTodo.content,
										favorite: value.userTodo.favorite,
										isCheck: value.userTodo.isCheck,
										settingAt: value.userTodo.settingAt,
										todoIdx: value.userTodo.todoIdx,
										updateAt: value.userTodo.updateAt,
										diff: 0,
										color: '',
									}
								]
							}

							

							changedTodos.push(tempObj)
						}

						changedTodos.map((innerValue, i) => {

							// if(changedTodos.length === 0) {

							// 	tempObj = {
							// 		userCase: {
							// 			caseIdx: value.userCase.caseIdx,
							// 			title: value.userCase.title
							// 		},
							// 		userTodo: [
							// 			{
							// 				caseIdx: value.userTodo.caseIdx,
							// 				content: value.userTodo.content,
							// 				favorite: value.userTodo.favorite,
							// 				isCheck: value.userTodo.isCheck,
							// 				settingAt: value.userTodo.settingAt,
							// 				todoIdx: value.userTodo.todoIdx,
							// 				updateAt: value.userTodo.updateAt,
							// 			}
							// 		]
							// 	}

							// 	count++

							// 	changedTodos.push(tempObj)

							// // 배열에 해당 날짜가 있을때
							// } else 

							if(ifFlag) {
								ifFlag = false
								return
							} else if(innerValue.userCase.caseIdx === value.userCase.caseIdx && check === false) {

								tempObj = {
									caseIdx: value.userTodo.caseIdx,
									title: value.userTodo.title,
									content: value.userTodo.content,
									favorite: value.userTodo.favorite,
									isCheck: value.userTodo.isCheck,
									settingAt: value.userTodo.settingAt,
									todoIdx: value.userTodo.todoIdx,
									updateAt: value.userTodo.updateAt,
									diff: 0,
									color: '',
								}

								changedTodos[i].userTodo.push(tempObj)
								check = true

							// 배열을 다 돌았는데 해당 날짜가 없을때 새로 넣음
							} else if(i === count && innerValue.userCase.caseIdx !== value.userCase.caseIdx && check === false){

								tempObj = {
									userCase: {
										caseIdx: value.userCase.caseIdx,
										title: value.userCase.title
									},
									userTodo: [
										{
											caseIdx: value.userTodo.caseIdx,
											title: value.userTodo.title,
											content: value.userTodo.content,
											favorite: value.userTodo.favorite,
											isCheck: value.userTodo.isCheck,
											settingAt: value.userTodo.settingAt,
											todoIdx: value.userTodo.todoIdx,
											updateAt: value.userTodo.updateAt,
											diff: 0,
											color: '',
										}
									]
								}

								count++

								changedTodos.push(tempObj)
								check = true

							}
						})
					})

					let day = ''
					let today = moment.tz(new Date(), 'Asia/Seoul').utc(9).format('YYYY-MM-DD')
					// today = moment(today)
					
					
					// 변환 후 글자순 정렬
					changedTodos = changedTodos.sort(function(a, b) {
						let x = a.userCase.title.toLowerCase();
						let y = b.userCase.title.toLowerCase();
						if (x < y) {
							return -1;
						}
						if (x > y) {
							return 1;
						}
						return 0;
					})
					
					changedTodos.map((outerValue) => {
						
						outerValue.userTodo.map((innerValue) => {
							day = moment(innerValue.settingAt).format('dddd').charAt(0)

							
							let settingDate = moment.tz(innerValue.settingAt, 'Asia/Seoul').utc(9).format('YYYY-MM-DD')
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

							innerValue.settingAt = `${innerValue.settingAt}(${day})`
							innerValue.diff = diff
							innerValue.color = color
						})
						
					})
					
				} else if(sort === 'DATE') {
					this.state.todos.map((outerValue) => {

						outerValue.userTodo.map((innerValue) => {

							
							tempObj = {
								userCase: {
									// caseIdx: outerValue.userCase.caseIdx,
									title: innerValue.settingAt.split('(')[0]
								},
								userTodo: {
									caseIdx: innerValue.caseIdx,
									content: innerValue.content,
									favorite: innerValue.favorite,
									isCheck: innerValue.isCheck,
									title: innerValue.title,
									settingAt: outerValue.userCase.title,
									todoIdx: innerValue.todoIdx,
									updateAt: innerValue.updateAt,
									diff: 0,
									color: '',
								}
							}

							temp.push(tempObj)

						})
					})

					let count = 0;
					let ifFlag = true

					temp.map((value) => {

						check = false

						if(changedTodos.length === 0) {
							
							tempObj = {
								userCase: {
									// caseIdx: value.userCase.caseIdx,
									title: value.userCase.title
								},
								userTodo: [
									{
										caseIdx: value.userTodo.caseIdx,
										title: value.userTodo.title,
										content: value.userTodo.content,
										favorite: value.userTodo.favorite,
										isCheck: value.userTodo.isCheck,
										settingAt: value.userTodo.settingAt,
										todoIdx: value.userTodo.todoIdx,
										updateAt: value.userTodo.updateAt,
										diff: 0,
										color: '',
									}
								]
							}

							

							changedTodos.push(tempObj)
						}

						changedTodos.map((innerValue, i) => {

							// if(changedTodos.length === 0) {

							// 	tempObj = {
							// 		userCase: {
							// 			caseIdx: value.userCase.caseIdx,
							// 			title: value.userCase.title
							// 		},
							// 		userTodo: [
							// 			{
							// 				caseIdx: value.userTodo.caseIdx,
							// 				content: value.userTodo.content,
							// 				favorite: value.userTodo.favorite,
							// 				isCheck: value.userTodo.isCheck,
							// 				settingAt: value.userTodo.settingAt,
							// 				todoIdx: value.userTodo.todoIdx,
							// 				updateAt: value.userTodo.updateAt,
							// 			}
							// 		]
							// 	}

							// 	count++

							// 	changedTodos.push(tempObj)

							// // 배열에 해당 날짜가 있을때
							// } else 


							if(ifFlag) {
								ifFlag = false
								return
							} else if(innerValue.userCase.title === value.userCase.title && check === false) {

								tempObj = {
									caseIdx: value.userTodo.caseIdx,
									title: value.userTodo.title,
									content: value.userTodo.content,
									favorite: value.userTodo.favorite,
									isCheck: value.userTodo.isCheck,
									settingAt: value.userTodo.settingAt,
									todoIdx: value.userTodo.todoIdx,
									updateAt: value.userTodo.updateAt,
									diff: 0,
									color: '',
								}

								changedTodos[i].userTodo.push(tempObj)
								check = true

							// 배열을 다 돌았는데 해당 날짜가 없을때 새로 넣음
							} else if(i === count && innerValue.userCase.title !== value.userCase.title && check === false){

								tempObj = {
									userCase: {
										// caseIdx: value.userCase.caseIdx,
										title: value.userCase.title
									},
									userTodo: [
										{
											caseIdx: value.userTodo.caseIdx,
											title: value.userTodo.title,
											content: value.userTodo.content,
											favorite: value.userTodo.favorite,
											isCheck: value.userTodo.isCheck,
											settingAt: value.userTodo.settingAt,
											todoIdx: value.userTodo.todoIdx,
											updateAt: value.userTodo.updateAt,
											diff: 0,
											color: '',
										}
									]
								}

								count++

								changedTodos.push(tempObj)
								check = true

							}
						})
					})


					let day = ''
					// 변환 후 날짜정렬
					changedTodos = changedTodos.sort(function(a, b) {
						date_1 = new Date(a.userCase.title)
						date_2 = new Date(b.userCase.title)
						if(date_1 > date_2) {
							return 1
						} else if(date_1 === date_2) {
							return 0
						} else {
							return -1
						}
					})

					//////////////////////////

					
					let today = moment.tz(new Date(), 'Asia/Seoul').utc(9).format('YYYY-MM-DD')


					changedTodos.map((outerValue) => {
						console.log('702', outerValue.userCase.title)
						let settingDate = moment.tz(outerValue.userCase.title, 'Asia/Seoul').utc(9).format('YYYY-MM-DD')
						let diff = moment(settingDate).diff(today, 'days')
						console.log('705', diff)
						console.log('today', today)
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

						outerValue.userTodo.map((innerValue) => {

							// innerValue.settingAt = `${innerValue.settingAt}(${day})`
							innerValue.diff = diff
							innerValue.color = color
						})
						day = moment(outerValue.userCase.title).format('dddd').charAt(0)
						outerValue.userCase.title = `${outerValue.userCase.title}(${day})`
					})


				}
				// if(sort === 'ASC') {
				// 	changedTodos = this.state.todos.sort(function(a, b) {
				// 		return a.userCase.caseIdx - b.userCase.caseIdx
				// 	})
				// } else if(sort === 'DESC') {
				// 	changedTodos = this.state.todos.sort(function(a, b) {
				// 		return b.userCase.caseIdx - a.userCase.caseIdx
				// 	})
				// }

			}

			if(flag) {
				this.setState({
					sort: sort,
					tempSort: sort,
					todos: changedTodos,
					// tempTodos: this.state.todos
				})
			} else {
				this.setState({
					sort: sort,
					tempSort: sort,
				})
			}

		}
			
		this.toggleModal()
			
	}

	textHandle(value) {
		this.setState({
			searchValue: value
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

		let filterTodos = 
			[
				{
				'userCase': {
					'caseIdx': 0,
					'title': '검색 결과'
				},
				'userTodo': []
			}
		]

		// filterTodos.userCase.title = '검색 결과'
		// filterTodos.userTodo = {}

		// let temp = {}
		
		this.state.todos.map((value) => {
			// if(value.userCase.title.includes(searchValue)) {
			// 		return true
			// }

			if(value.userTodo.length !== 0) {
				value.userTodo.map((innerValue) => {
					if(innerValue.content.includes(searchValue)) {
						filterTodos[0].userTodo.push(innerValue)
					}
				})
				// for(let i = 0; i < value.userTodo.length; i++) {
				// 	if(value.userTodo[i].content.includes(searchValue)) {
				// 		return true
				// 	}
				// }
			}

			// return false

		})

		if(filterTodos[0].userTodo.length !== 0) {
			this.setState({
				tempTodos: this.state.todos,
				searching: true,
				todos: filterTodos,
			})
		} else {
			SimpleToast.show("일치하는 항목이 없습니다.", SimpleToast.BOTTOM)
		}
	}

	cancelSearch() {
		this.setState({
			todos: this.state.tempTodos,
			// tempCases: [],
			searching: false,
			searchValue: '',
		})
	}

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

	sortTodo(todoIdx, bool) {

        let sortData = this.updateArray(todoIdx, 'isCheck', bool)
        let date_1
        let date_2
		let temp = []

		for(let i = 0; i < sortData.length; i++) {

			// sortData = sortData.sort(function(a, b) {
			// 	date_1 = new Date(a.settingAt)
			// 	date_2 = new Date(b.settingAt)
			// 	if(date_1 > date_2) {
			// 		return -1
			// 	} else if(date_1 === date_2) {
			// 		return 0
			// 	} else {
			// 		return 1
			// 	}
			// })

			temp = sortData[i].userTodo

			temp = temp.sort(function(a, b) {
				date_1 = new Date(a.settingAt)
				date_2 = new Date(b.settingAt)
				if(date_1 > date_2) {
					return -1
				} else if(date_1 === date_2) {
					return 0
				} else {
					return 1
				}
			})

			sortData[i].userTodo = temp

		}

        // 그 뒤에 체크된거 처리
        // sortData = sortData.sort(function(a, b) {
        //     if((a.isCheck === true || a.isCheck === 'true') && (b.isCheck === false || b.isCheck === 'false')) {
        //         return 1
        //     } else if((a.isCheck === false || a.isCheck === 'false') && (b.isCheck === true || b.isCheck === 'true')) {
        //         return -1
        //     } else {
        //         return 0
        //     }	
        // })

        this.setState({
            todos: sortData,
			count: this.state.count - 1
        }, () => console.log('436   ', this.state.todos))

        // this.setState((state, props) => {
        //     return {
		// 		todos: sortData,
		// 		count: state.count - 1
		// 	}
        // })

		// this.forceUpdate(() => console.log('force', this.state.todos))
		
    }

	updateArray(todoIdx, item, bool) {

        let sortData = this.state.todos
		let temp = []

		sortData.map((outerValue) => {
			temp = outerValue.userTodo

			temp = temp.filter((innerValue) => innerValue.todoIdx !== todoIdx)

			if(temp.length === 0) {
				outerValue.userTodo = []
			} else if(temp.length !== 0) {
				outerValue.userTodo = temp
			}

		})

        // for(let i = 0; i < sortData.length; i++) {
		// 	temp = sortData[i].userTodo

		// 	temp = temp.filter((value) => value.todoIdx !== todoIdx)


		// 	if(temp.length === 0) {
		// 		sortData[i] = []
		// 	} else if(temp.length !== 0) {
		// 		sortData[i].userTodo = temp
		// 	}


		// 	// for(let j = 0; j < sortData[i].userTodo.length; j++) {
		// 	// 	if(sortData[i].idx === todoIdx) {
		// 	// 		item === 'isCheck' ? (
		// 	// 			sortData[i].userTodo[j].isCheck = bool
		// 	// 		) : (
		// 	// 			sortData[i].userTodo[j].favorite = bool
		// 	// 		)
		// 	// 	}
		// 	// }
        // }

		sortData = sortData.filter((value) => value.userTodo.length !== 0)

        return sortData

    }

	render() {

		// let newTodos = this.state.todos.filter((todos) => todos.userTodo.length !== 0)

		return (
			// 하단 탭 네비게이션의 ToDo
			<View style={styles.toDoContainer}>
				<View style={styles.header}>
				<HeaderText title='작업ToDo' count={`(${this.state.count})`} />
					<View style={{flexDirection: 'row'}}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate("ToDoExplan")} style={{marginRight: 5}}>
							<Icon name="questioncircleo" size={28}/>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.toggleModal()} style={{marginHorizontal: 5}}>
							{/* <Image source={require('../../assets/images/FadersHorizontal.png')} /> */}
							<FontAwesome name={'sliders'} size={26} color={ this.state.isVisible ? '#0078D4' : '#000'} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.toDoHeader}>
					<TextInput 
						style={styles.searchInput} 
						placeholder="검색어를 입력하세요." 
						placeholderTextColor="#808080"
						value={this.state.searchValue} 
						onChangeText={(value) => this.textHandle(value)} 
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
					{/* 필터 아이콘 */}
					{/* <TouchableOpacity style={{flex: 1,}} onPress={() => this.toggleModal()}>
						<Image source={require('../../assets/images/FadersHorizontal.png')} />
					</TouchableOpacity> */}
				</View>
				{/* 진행중 칸 */}
				<ScrollView style={styles.toDoListContainer}>
					{/* 사건 리스트 나오는 목록 */}
					{
						this.state.todos.length === 0 ? (
							<View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>등록된 작업항목이 없습니다.</Text>
                            </View>
						) : (
							this.state.todos.map((todos) => (
								// console.log('1027', todos),
								<ToDoList key={todos.userCase.caseIdx} todos={todos} sortTodo={this.sortTodo} />
							))
						)
					}
				</ScrollView>
				{/* 작성버튼 */}
				{
					// 상용할때 체크해야함 ... JY
					store.getState().user.userType === 'common' ? (
						<TouchableOpacity style={styles.write} onPress={() => this.props.navigation.navigate('WriteToDo', {inCase: false})}>
							<View style={styles.circle}>
								{/* <Image source={require('../../assets/images/NotePencil.png')} /> */}
								<Foundation name={'clipboard-pencil'} size={30} color={'#FFF'} style={{marginLeft: 5}}/>
							</View>
						</TouchableOpacity>
					// ) : (<></>)
					) : (
						<TouchableOpacity style={styles.write} onPress={() => this.toggleAlertVisible()}>
							<View style={styles.circle}>
								{/* <Image source={require('../../assets/images/NotePencil.png')} /> */}
								<Foundation name={'clipboard-pencil'} size={30} color={'#FFF'} style={{marginLeft: 5}}/>
							</View>
						</TouchableOpacity>
					)
				}
				{/* <Modal isVisible={this.state.isVisible}>
                    <View style={{flex: 1, backgroundColor: '#FFFFFF', padding: 10, justifyContent: 'space-between'}}>
						<View>
							<View style={styles.modalHeader}>
								<BlueDot />
								<Text style={styles.modalTitle}>Todo 정렬</Text>
							</View>
							<View style={styles.radioContainer}>
								<View style={styles.radioItemContainer}>
									<RadioButton 
										value="CASE"
										status={ this.state.sort === 'CASE' ? 'checked' : 'unchecked' }
										onPress={() => this.setState({ sort: 'CASE' })}
										color="#0078d4"
									/>
									<Text>사건별칭순</Text>
								</View>
								<View style={styles.radioItemContainer}>
									<RadioButton 
										value="DATE"
										status={ this.state.sort === 'DATE' ? 'checked' : 'unchecked' }
										onPress={() => this.setState({ sort: 'DATE' })}
										color="#0078d4"
									/>
									<Text>날짜순</Text>
								</View>
							</View>
						</View>
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.submit} onPress={() => this.changeSort()}>
								<Text style={styles.buttonText}>확인</Text>
							</TouchableOpacity>
						</View>
                    </View>
                </Modal> */}
				{
					this.state.isVisible ? (
						<View style={styles.sortContainer}>
							<View style={styles.sortItemContainer}>
								<TouchableOpacity 
									style={
										this.state.sort === 'CASE' ? [styles.sortItemSelected, {borderBottomWidth: 1, borderBottomColor: '#808080'}] :[styles.sortItem, {borderBottomWidth: 1, borderBottomColor: '#808080'}]
									} 
									onPress={() => this.changeSort('CASE')}>
									<Text style={
										this.state.sort === 'CASE' ? [styles.sortText, styles.sortTextBold] : styles.sortText
									}>
										사건별칭순
									</Text>
								</TouchableOpacity>
								<TouchableOpacity 
									style={
										this.state.sort === 'DATE' ? [styles.sortItemSelected, {borderBottomWidth: 1, borderBottomColor: '#808080'}] :[styles.sortItem, {borderBottomWidth: 1, borderBottomColor: '#808080'}]
									} 
									onPress={() => this.changeSort('DATE')}>
									<Text style={
										this.state.sort === 'DATE' ? [styles.sortText, styles.sortTextBold] : styles.sortText
									}>
										날짜순
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					) : (<></>)
				}
				<Modal isVisible={this.state.alertVisible}>
					<View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>
						<View style={{marginTop: 20, marginBottom: 20,}}>
							<View style={{justifyContent: 'flex-start', alignItems: 'flex-start', maginTop: 10, marginBottom: 10,}}>
								<Text style={{fontSize: 16, fontWeight: 'bold'}}>알림</Text>
							</View>
							<View style={{justifyContent: 'center', alignItems: 'center', maginTop: 10, marginBottom: 10,}}>
								<Text style={{fontSize: 16}}>멤버십(구독) 회원에게 제공되는 서비스입니다.</Text>
							</View>
							<TouchableOpacity style={{justifyContent: 'flex-end', alignItems: 'flex-end', maginTop: 10, marginBottom: 10,}} onPress={() => this.toggleAlertVisible()}>
								<Text style={{fontSize: 16, fontWeight: 'bold', color: '#0078D4'}}>확인</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

export default ToDo;

const styles = StyleSheet.create({
	toDoContainer: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginRight: 5,
		marginTop: 10,
	},
	toDoHeader: {
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
	toDoListContainer: {
		flex: 1,
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
        backgroundColor: '#0078d4',
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
})