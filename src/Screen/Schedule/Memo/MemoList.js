import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Memo from './Memo';

class MemoList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Memo />
                <Memo />
            </View>
        )
    }
}

export default MemoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
});