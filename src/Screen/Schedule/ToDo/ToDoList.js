import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import ToDo from './ToDo';

class ToDoList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ToDo />
                <ToDo />
            </View>
        )
    }
}

export default ToDoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 15,
    },
});