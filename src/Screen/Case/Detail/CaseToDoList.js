import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
} from 'react-native';

import ToDo from '../../ToDo/ToDo';
import { store } from '../../../redux/store';
import { commonApi } from '../../../Common/ApiConnector';
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import NavigationService from '../../../Navigation/NavigationService';
import moment from 'moment';
import { connect } from 'react-redux';
import { setCase } from '../../../redux/actions/cases';
import SimpleToast from 'react-native-simple-toast';

class CaseToDoList extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            todos: [],
            collapse1: true,
            collapse2: false,
        })

        this.toggleCollapse = this.toggleCollapse.bind(this)
        this.sortTodo = this.sortTodo.bind(this)
        this.updateArray = this.updateArray.bind(this)
		this.filterTodos = this.filterTodos.bind(this)
        this.updateTodos = this.updateTodos.bind(this)
    }

    toggleCollapse(num) {
        if(num === 1) {
            this.setState({collapse1: !this.state.collapse1})
        } else if(num === 2) {
            this.setState({collapse2: !this.state.collapse2})
        }
    }

    filterTodos(data) {

		let temp = []
		let sortTodos = []

		// 먼저 todo가 없는 사건 없앰
		temp = data.data.filter((value) => value.userTodo.length !== 0)

		// 그 이후 완료된 todo 없앰
		temp.map((outerValue) => {
			sortTodos.push(outerValue.userTodo.filter((innerValue) => {
				if(innerValue.isCheck === 'true' || innerValue.isCheck === true) {
					return false
				} else {
					return true
				}
			}))
		})

		for(let i = 0; i < temp.length; i++) {
			temp[i].userTodo = sortTodos[i]
		}

		return temp

	}

    async componentDidMount() {
        
        // const cases = store.getState().cases

        let sortData = []
        let date_1
        let date_2
        
        this.setState({todos: this.props.todos})

        console.log(this.props.todos)

        // ToDo 불러오기
        // -> 멤버십 사용자만 불러옴

        // 상용할때 체크해야함 ... JY
        // if(store.getState().user.userType === 'common') {
    
        //     const url = `user/case/todo/caseIdx/${cases.caseIdx}`
        //     let today = moment.tz(new Date(), 'Asia/Seoul')
        
        //     await commonApi('GET', url, {}).then((data) => {
        //         {
        //             data.success === undefined ? (

        //                 // 먼저 설정한 날짜가 낮은거부터 위로
        //                 sortData = data.sort(function(a, b) {
        //                     date_1 = new Date(a.settingAt)
        //                     date_2 = new Date(b.settingAt)
        //                     if(date_1 > date_2) {
        //                         return -1
        //                     } else if(date_1 === date_2) {
        //                         return 0
        //                     } else {
        //                         return 1
        //                     }
        //                 }),

        //                 // 그 뒤에 체크된거 처리
        //                 sortData = sortData.sort(function(a, b) {
        //                     if((a.isCheck === true || a.isCheck === 'true') && (b.isCheck === false || b.isCheck === 'false')) {
        //                         return 1
        //                     } else if((a.isCheck === false || a.isCheck === 'false') && (b.isCheck === true || b.isCheck === 'true')) {
        //                         return -1
        //                     } else {
        //                         return 0
        //                     }
        //                 }),

        //                 sortData.map((value) => {
        //                     let settingDate = moment.tz(value.settingAt, 'Asia/Seoul').utc(9).format()
        //                     let diff = moment(settingDate).diff(today, 'days')
        //                     let color = '#000'
        
        //                     diff *= -1
        //                     diff > 0 ? (
        //                         diff = `D+${diff}`,
        //                         color = '#88001b'
        //                     ) : (
        //                         diff === 0 ? (
        //                             diff = `D-0`
        //                         ) : (
        //                             diff = `D${diff}`,
        //                             color = '#23895f'
        //                         )
        //                     )

        //                     value.diff = diff
        //                     value.color = color
        //                 }),

        //                 this.setState({
        //                     todos: sortData,
        //                 })
        //             ) : (
        //                 SimpleToast.show(data, SimpleToast.BOTTOM)
        //             )
        //         }
        //     // }).catch((err) => console.log(url + err))
        //     }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))


        //     this.props.navigation.addListener('didFocus', () => {
        //         commonApi('GET', url, {}).then((data) => {
        //             {
        //                 data.success === undefined ? (

        //                     // 먼저 설정한 날짜가 낮은거부터 위로
        //                     sortData = data.sort(function(a, b) {
        //                         date_1 = new Date(a.settingAt)
        //                         date_2 = new Date(b.settingAt)
        //                         if(date_1 > date_2) {
        //                             return -1
        //                         } else if(date_1 === date_2) {
        //                             return 0
        //                         } else {
        //                             return 1
        //                         }
        //                     }),

        //                     // 그 뒤에 체크된거 처리
        //                     sortData = sortData.sort(function(a, b) {
        //                         if((a.isCheck === true || a.isCheck === 'true') && (b.isCheck === false || b.isCheck === 'false')) {
        //                             return 1
        //                         } else if((a.isCheck === false || a.isCheck === 'false') && (b.isCheck === true || b.isCheck === 'true')) {
        //                             return -1
        //                         } else {
        //                             return 0
        //                         }
        //                     }),

        //                     sortData.map((value) => {
        //                         let settingDate = moment.tz(value.settingAt, 'Asia/Seoul').utc(9).format()
        //                         let diff = moment(settingDate).diff(today, 'days')
        //                         let color = '#000'
            
        //                         diff *= -1
        //                         diff > 0 ? (
        //                             diff = `D+${diff}`,
        //                             color = '#88001b'
        //                         ) : (
        //                             diff === 0 ? (
        //                                 diff = `D-0`
        //                             ) : (
        //                                 diff = `D${diff}`,
        //                                 color = '#23895f'
        //                             )
        //                         )
    
        //                         value.diff = diff
        //                         value.color = color
        //                     }),

        //                     this.setState({
        //                         todos: sortData,
        //                     })
                            
        //                 ) : (
        //                     SimpleToast.show(data.msg, SimpleToast.BOTTOM)
        //                 )
        //             }
        //         // }).catch((err) => console.log(url + err))
        //         }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

        //     })
        // }

    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.todos.length !== this.state.todos.length) {
            this.setState({todos: this.props.todos})
        } else {
            for(let i = 0; i < this.state.todos.length; i++) {
                if(this.state.todos[i].favorite !== this.props.todos[i].favorite) {
                    this.setState({todos: this.props.todos})
                }
            }
        }
    }

    updateArray(todoIdx, item, bool) {

        let sortData = this.state.todos
        for(let i = 0; i < sortData.length; i++) {
            if(sortData[i].idx === todoIdx) {
                item === 'isCheck' ? (
                    sortData[i].isCheck = bool
                ) : (
                    sortData[i].favorite = bool
                )
            }
        }

        return sortData

    }

    sortTodo(todoIdx, bool) {
        let sortData = this.updateArray(todoIdx, 'isCheck', bool)
        let date_1
        let date_2



        sortData = sortData.sort(function(a, b) {
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

        // 그 뒤에 체크된거 처리
        sortData = sortData.sort(function(a, b) {
            if((a.isCheck === true || a.isCheck === 'true') && (b.isCheck === false || b.isCheck === 'false')) {
                return 1
            } else if((a.isCheck === false || a.isCheck === 'false') && (b.isCheck === true || b.isCheck === 'true')) {
                return -1
            } else {
                return 0
            }
        })

        this.setState({
            todos: sortData
        })

    }

    updateTodos(idx) {
        const todos = this.state.todos.filter((value) => value.idx !== idx)

        this.setState({
            todos: todos
        })
    }

    render() {
        return (
            <View style={styles.toDoList}>
                <Collapse onToggle={() => this.toggleCollapse(1)} isExpanded={true} style={styles.collapse}>
                    <CollapseHeader style={styles.categoryButton}>
                        <View style={styles.categoryHeader}>
                            <View style={styles.categoryHeaderLeft}>
                                <BlueDot />
                                <Text style={styles.categoryTitle}>진행중</Text>
                                {/* <TouchableOpacity style={styles.performerButton}>
                                    <Text style={styles.performerText}>수행자 선택</Text>
                                </TouchableOpacity> */}
                            </View>
                            {
                                this.state.collapse1 ? (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretUp.png')} />
                                ) : (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretDown.png')} />
                                )
                            }
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                    {
                        this.state.todos && 
                        this.state.todos.map((todo) => {
                            if(todo.isCheck === false || todo.isCheck === 'false') {

                                return (
                                    <TouchableOpacity 
                                        style={{flex: 1,}}
                                        onPress={() => NavigationService.navigate('WriteToDo', {
                                            inCase: true, 
                                            modify: true, 
                                            title: todo.title, 
                                            content: todo.content, 
                                            settingAt: moment(todo.settingAt).add('9', 'h').format('YYYY-MM-DD'), 
                                            todoIdx: todo.idx
                                        })}
                                        onLongPress={() => this.props.toggleDeleteModal(todo.content, todo.idx)}
                                    >
                                        <ToDo 
                                            key={todo.idx}
                                            updateAt={moment(todo.updateAt).add('9', 'h').format('YYYY-MM-DD')} 
                                            title={todo.title} 
                                            content={todo.content} 
                                            settingAt={moment(todo.settingAt).add('9', 'h').format('YYYY-MM-DD')} 
                                            todoIdx={todo.idx}
                                            userIdx={todo.user_idx} 
                                            caseIdx={todo.userCase_idx}
                                            isCheck={todo.isCheck} 
                                            favorite={todo.favorite} 
                                            diff={todo.diff}
                                            color={todo.color}
                                            sortTodo={this.sortTodo}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                    </CollapseBody>
                </Collapse>
                <Collapse onToggle={() => this.toggleCollapse(2)} style={styles.collapse}>
                    <CollapseHeader style={styles.categoryButton}>
                        <View style={styles.categoryHeader}>
                            <View style={styles.categoryHeaderLeft}>
                                <BlueDot />
                                <Text style={styles.categoryTitle}>완료</Text>
                            </View>
                            {
                                this.state.collapse2 ? (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretUp.png')} />
                                ) : (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretDown.png')} />
                                )
                            }
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                    {
                        this.state.todos && 
                        this.state.todos.map((todo) => {
                            if(todo.isCheck === true || todo.isCheck === 'true') {

                                return (
                                    <TouchableOpacity 
                                        style={{flex: 1,}}
                                        onPress={() => this.props.navigation.navigate('WriteToDo', {
                                            inCase: true, 
                                            modify: true, 
                                            content: todo.content, 
                                            settingAt: todo.settingAt.split('T')[0], 
                                            todoIdx: todo.idx
                                        })}
                                        onLongPress={() => this.props.toggleDeleteModal(todo.content, todo.idx)}
                                    >
                                        <ToDo 
                                            key={todo.idx}
                                            updateAt={todo.updateAt.split('T')[0]} 
                                            title={todo.title} 
                                            content={todo.content} 
                                            settingAt={todo.settingAt.split('T')[0]} 
                                            todoIdx={todo.idx}
                                            userIdx={todo.user_idx} 
                                            caseIdx={todo.userCase_idx}
                                            isCheck={todo.isCheck} 
                                            favorite={todo.favorite} 
                                            diff={todo.diff}
                                            color={todo.color}
                                            sortTodo={this.sortTodo}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                    </CollapseBody>
                </Collapse>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        todos: state.cases.todos
    })
}

export default connect(mapStateToProps)(CaseToDoList);

const styles = StyleSheet.create({
    collapse: {
        flex: 1,
		margin: 10,
    },
    categoryButton: {
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        height: 30,
    },
    categoryHeaderLeft: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 5,
    },
    categoryTitle: {
        color: '#000',
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 5,
    },
    performerButton: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 5,
        backgroundColor: '#D8D8D8',
        marginLeft: 10,
    },
    performerText: {
        fontSize: 12,
        margin: 1,
    },
    categoryImage: {
        marginRight: 10,
    },
});