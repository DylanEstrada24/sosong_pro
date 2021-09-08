import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';

class Detail extends Component {
    render() {
        return (
            <View style={styles.detailContainer}>
                <View style={styles.topContainer}>
                    <View>
                        <Text style={styles.date}>{this.props.date}</Text>
                    </View>
                    <View>
                        <Text style={styles.result}>{this.props.result}</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                        <Text style={styles.content}>{this.props.content}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default Detail;

const styles = StyleSheet.create({
    detailContainer: {
        // backgroundColor: `${props => props.isOdd ? '#FFFFFF' : '#DEE6F1'}`,
        padding: 10,
        flexDirection: 'column',
        justifyContent: "space-between",
        // alignItems: "center",
        // borderBottomColor: "#2665A1",
        // borderTopColor: "#2665A1",
        // borderBottomWidth: 1,
        // borderTopWidth: 1,
        borderColor: '#2665A1',
        borderWidth: 1,
        borderRadius: 10,
        paddingTop: 17,
        paddingBottom: 17,
        paddingLeft: 24,
        paddingRight: 24,
        marginBottom: 12,
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    date: {
        fontSize: 15,
        fontWeight: 'bold',
        color: "#5E8CCF",
    },
    content: {
        fontSize: 15,
        // fontWeight: 'bold',
        // color: "#D5722E",
    },
    bottomContainer: {
        marginTop: 5,
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    result: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#582F8C',
    },
});