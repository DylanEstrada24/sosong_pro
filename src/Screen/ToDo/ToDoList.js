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

import BlueDot from '../../Components/BlueDot';

import ToDo from './ToDo';
// import CheckBox from '@react-native-community/checkbox';
import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';

class ToDoList extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            todos: [],
        })
    }

    componentDidMount() {
        this.setState({
            todos: this.props.todos
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.todos.legnth === this.props.todos.length) {
            for(let i = 0; i < prevProps.todos.userTodo.length; i++) {
                if(prevProps.todos.userTodo[i].favorite === this.props.todos.userTodo[i].favorite) {
                    continue
                } else if(prevProps.todos.userTodo[i].isCheck === this.props.todos.userTodo[i].isCheck) {
                    continue
                } else {
                    this.setState({
                        todos: this.props.todos
                    })
                }
            }
        } else if(prevProps.todos.length !== this.props.todos.length) {
            this.setState({
                todos:this.props.todos
            })
        }
        
    }

    render() {

        const todos = this.state.todos.userTodo

        return (
            <View style={styles.toDoList}>
                <View style={styles.toDoListTitleContainer}>
                    <BlueDot />
                    <Text style={styles.toDoListTitle}>{this.props.todos.userCase.title}</Text>
                </View>
                {
                    todos && 
                    todos.map((todo) => (
                        <ToDo 
                            key={todo.todoIdx}
                            todoIdx={todo.todoIdx} 
                            caseIdx={todo.caseIdx} 
                            updateAt={todo.updateAt.split('T')[0]} 
                            content={todo.content.trim()} 
                            settingAt={todo.settingAt.split('T')[0]} 
                            favorite={todo.favorite}
                            isCheck={todo.isCheck}
                        />
                    ))
                }
            </View>
        );
    }
}

export default ToDoList;

const styles = StyleSheet.create({
    toDoList: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 10,
    },
    toDoListTitleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#C4C4C4",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        padding: 2,
    },
    toDoListTitle: {
        marginLeft: 9,
        fontSize: 15,
        fontWeight: "bold",
    },
});