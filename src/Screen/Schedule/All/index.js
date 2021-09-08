import React, {Component} from 'react';
import {
    ScrollView,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Termin from '../Termin';
import ToDo from '../ToDo';
import Memo from '../Memo';

class All extends Component {
    render() {
        return (
            <View style={{flex: 1,}}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
                    <Termin />
                    <ToDo />
                    <Memo />
                </ScrollView>
            </View>
        )
    }
}

export default All;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});