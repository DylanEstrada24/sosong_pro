import React, {Component} from 'react';
import {
	View,
    Text,
	StyleSheet,
} from 'react-native';

class Memo extends Component {
    render() {
        return (
            <View style={styles.detailContainer}>
                <View style={styles.topContainer}>
                    <View>
                        <Text style={styles.date}>{this.props.settingAt} {this.props.time}</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.content}>{this.props.content}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default Memo;

const styles = StyleSheet.create({
    detailContainer: {
        width: '100%',
        padding: 10,
        flexDirection: 'column',
        justifyContent: "space-between",
        borderBottomColor: "#0078d4",
        borderBottomWidth: 1,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    date: {
        fontSize: 13,
        fontWeight: 'bold',
        color: "#5E8CCF",
    },
    content: {
        fontSize: 13,
    },
    bottomContainer: {
        marginTop: 5,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    result: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#5C4B77',
    },
});