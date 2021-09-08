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
	BackHandler
} from 'react-native';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';
import ToDoList from './ToDoList';
import { commonApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
import { store } from '../../redux/store';

class ToDo extends Component {

	constructor(props) {
		super(props)
		this.state = ({
			todos: 
			[
				{
					userCase: {
						title: "소송프로",
						caseIdx : 0
					}, userTodo: [
						{
							"idx": 0,
							"updateAt": "2021-08-23T06:00:49.000Z",
							"content": "Todo할 것을 여기적으십시오",
							"settingAt": "2021-08-29T15:00:00.000Z",
							"favorite" : true,
							"isCheck" : true,
							"user_idx": 0,
							"userCase_idx": 0
						},
						{
							"idx": 1,
							"updateAt": "2021-08-23T06:00:49.000Z",
							"content": "Todo할 것을 여기적으십시오",
							"settingAt": "2021-08-29T15:00:00.000Z",
							"favorite" : false,
							"isCheck" : false,
							"user_idx": 0,
							"userCase_idx": 0
						}
					],
				}
			],
			isVisible: false,
			sort: 'ASC',
			tempSort: 'ASC',
			searchValue: '',
			searching: false,
			tempTodos: [],
			focused: false,
		})

		this.toggleModal = this.toggleModal.bind(this)
		this.changeSort = this.changeSort.bind(this)
		this.textHandle = this.textHandle.bind(this)
		this.searchItem = this.searchItem.bind(this)
		this.cancelSearch = this.cancelSearch.bind(this)
	}

	async componentDidMount() {

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

		// 일반유저 구분
		if(store.getState().user.userType !== 'common') {
    
			const url = `user/case/todo/userIdx`

			let temp = []
			let focusTemp = []
		
			commonApi('GET', url, {}).then((data) => {
				{
					data.success ? (

						temp = data.data.filter((value) => value.userTodo.length !== 0),

						this.setState({
							todos: temp,
						})
					) : (
						console.log(data.msg)
					)
				}
			}).catch((err) => console.log(url + err))


			this.props.navigation.addListener("didFocus", () => {
				commonApi('GET', url, {}).then((data) => {
					{
						data.success ? (
							focusTemp = data.data.filter((value) => value.userTodo.length !== 0),
							this.setState({
								todos: focusTemp,
							})
						) : (
							console.log(data.msg)
						)
					}
				}).catch((err) => console.log(url + err))
				
			})

		}

    }

	componentDidUpdate(prevProps, prevState) {
		if(prevState.todos.length === this.state.todos.length) {
			for(let i = 0; i < this.state.todos.length; i++) {
				if(prevState.todos[i].userTodo.length !== 0 || this.state.todos[i].userTodo.length !== 0) {
					for(let j = 0; j < this.state.todos[i].userTodo.length; j++) {
						if(prevState.todos[i].userTodo[j].favorite !== this.state.todos[i].userTodo[j].favorite || 
							prevState.todos[i].userTodo[j].isCheck !== this.state.todos[i].userTodo[j].isCheck) {
								this.setState({
									todos: this.state.todos
								})
						}
					}
				}
			}
		} else if(prevState.todos.length !== this.state.todos.length) {
			this.setState({
				todos: this.state.todos
			})
		}
	}

	componentWillUnmount() {
        this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }


	toggleModal() {
		this.setState({
			isVisible: !this.state.isVisible,
		})
	}

	async changeSort() {
		
		const sort = this.state.sort

		if(this.state.tempSort !== sort) {

			let changedTodos = []

			this.setState({
				sort: sort,
				tempSort: sort,
			})

			if(this.state.todos.length > 1) {
				if(sort === 'ASC') {
					changedTodos = this.state.todos.sort(function(a, b) {
						return a.userCase.caseIdx - b.userCase.caseIdx
					})
				} else if(sort === 'DESC') {
					changedTodos = this.state.todos.sort(function(a, b) {
						return b.userCase.caseIdx - a.userCase.caseIdx
					})
				}

				this.setState({
					todos: changedTodos
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

		let filterTodos = this.state.todos.filter((value) => {
			if(value.userCase.title.includes(searchValue)) {
					return true
			}

			if(value.userTodo.length !== 0) {
				for(let i = 0; i < value.userTodo.length; i++) {
					if(value.userTodo[i].content.includes(searchValue)) {
						return true
					}
				}
			}

			return false

		})

		if(filterTodos.length !== 0) {
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

	render() {

		// let newTodos = this.state.todos.filter((todos) => todos.userTodo.length !== 0)

		return (
			// 하단 탭 네비게이션의 ToDo
			<View style={styles.toDoContainer}>
				<View style={styles.toDoHeader}>
					<TextInput 
						style={styles.searchInput} 
						placeholder="검색어를 입력하세요." 
						value={this.state.searchValue} 
						onChangeText={(value) => this.textHandle(value)} 
						onSubmitEditing={() => this.searchItem()}
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
					<TouchableOpacity style={{flex: 1,}} onPress={() => this.toggleModal()}>
						<Image source={require('../../assets/images/FadersHorizontal.png')} />
					</TouchableOpacity>
				</View>
				{/* 진행중 칸 */}
				<ScrollView style={styles.toDoListContainer}>
					{/* 사건 리스트 나오는 목록 */}
					{
						this.state.todos &&
						this.state.todos.map((todos) => (
							<ToDoList key={todos.userCase.caseIdx} todos={todos} />
						))
					}
				</ScrollView>
				{/* 작성버튼 */}
				{
					store.getState().user.userType !== 'common' ? (
						<TouchableOpacity style={styles.write} onPress={() => this.props.navigation.navigate('WriteToDo', {inCase: false})}>
							<View style={styles.circle}>
								<Image source={require('../../assets/images/NotePencil.png')} />
							</View>
						</TouchableOpacity>
					// ) : (<></>)
					) : (
						<TouchableOpacity style={styles.write} onPress={() => SimpleToast.show("플랜가입 유저만 가능합니다.", SimpleToast.BOTTOM)}>
							<View style={styles.circle}>
								<Image source={require('../../assets/images/NotePencil.png')} />
							</View>
						</TouchableOpacity>
					)
				}
				<Modal isVisible={this.state.isVisible}>
                    <View style={{flex: 1, backgroundColor: '#FFFFFF', padding: 10, justifyContent: 'space-between'}}>
						<View>
							<View style={styles.modalHeader}>
								<BlueDot />
								<Text style={styles.modalTitle}>Todo 정렬</Text>
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

export default ToDo;

const styles = StyleSheet.create({
	toDoContainer: {
		flex: 1,
	},
	toDoHeader: {
		marginTop: 40,
		justifyContent: "center",
		alignItems: "flex-start",
		borderBottomWidth: 0.8,
		borderBottomColor: "#2665A1",
		height: 38,
		paddingLeft: 16,
		paddingBottom: 45,
		flexDirection: "row",
		// backgroundColor: "red",
		// elevation: 20,
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