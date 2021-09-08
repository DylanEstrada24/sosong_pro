import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native';
import BlueDot from '../../../Components/BlueDot';
import MemoList from './MemoList';

class Memo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.header}>
                        <BlueDot />
                        <Text style={styles.title}>메모</Text>
                    </View>
                    <View style={styles.content}>
                        <MemoList />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default Memo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        flexDirection: 'column',

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
    },
    title: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    content: {
        flexDirection: 'column',
    },
});