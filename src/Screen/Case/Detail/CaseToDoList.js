import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	StyleSheet,
} from 'react-native';

import ToDo from '../../ToDo/ToDo';
// import CheckBox from '@react-native-community/checkbox';
import { store } from '../../../redux/store';
import { commonApi } from '../../../Common/ApiConnector';
class CaseToDoList extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            todos: [],
        })
    }

    async componentDidMount() {
        
        const cases = store.getState().cases

        if(store.getState().user.userType !== 'common') {
    
            const url = `user/case/todo/caseIdx/${cases.caseIdx}`
        
            commonApi('GET', url, {}).then((data) => {
                // console.log(data)
                {
                    data.success === undefined ? (
                        this.setState({
                            todos: data,
                        })
                    ) : (
                        console.log(data.msg)
                    )
                }
            }).catch((err) => console.log(url + err))


            this.props.navigation.addListener('didFocus', () => {
                commonApi('GET', url, {}).then((data) => {
                    // console.log(data)
                    {
                        data.success === undefined ? (
                            this.setState({
                                todos: data,
                            })
                        ) : (
                            console.log(data.msg)
                        )
                    }
                }).catch((err) => console.log(url + err))

            })

        } else {
            this.setState({
                todos: 
                [
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
                ]
            })

            this.props.navigation.addListener('didFocus', () => {
                
                this.setState({
                    todos: 
                    [
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
                    ]
                })

            })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    render() {


        return (
            <View style={styles.toDoList}>
                {
                    this.state.todos && 
                    this.state.todos.map((todo) => (
                        <ToDo 
                            key={todo.idx}
                            updateAt={todo.updateAt.split('T')[0]} 
                            content={todo.content.trim()} 
                            settingAt={todo.settingAt.split('T')[0]} 
                            todoIdx={todo.idx}
                            userIdx={todo.user_idx} 
                            caseIdx={todo.userCase_idx}
                            isCheck={todo.isCheck} 
                            favorite={todo.favorite} 
                        />
                    ))
                }
            </View>
        );
    }
}

export default CaseToDoList;

const styles = StyleSheet.create({
    toDoList: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 10,
    },
});