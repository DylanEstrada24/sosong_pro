import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import ToDo from './ToDo';

class ToDoList extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            todo: {}
        })
    }

    componentDidMount() {
        this.setState({
            todo: this.props.todo
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    {
                        Object.keys(this.props.todo).length !== 0 ? (
                            <ToDo data={this.props.todo} key={this.props.todo.todoIdx} />
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>등록된 Todo가 없습니다.</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }
}

export default ToDoList;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        width: '100%'
    },
    title: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    content: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
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
});