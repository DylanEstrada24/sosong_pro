import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Termin from './Termin';

class TerminList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Termin />
                <Termin />
            </View>
        )
    }
}

export default TerminList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 15,
    },
});