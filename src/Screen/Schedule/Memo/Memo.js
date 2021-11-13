import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import moment from 'moment';

class Memo extends Component {
    render() {
        return (
            <View style={styles.detailContainer}>
                <View style={styles.topContainer}>
                    <View style={styles.caseTitle}>
                        <Text style={styles.caseTitleText}>{this.props.data.caseTitle}</Text>
                    </View>
                    <View style={styles.memoDate}>
                        {/* <Text style={styles.date}>{this.props.data.updateAt.split(":")[0].slice(-2)}:{this.props.data.updateAt.split(":")[1].slice(0, 2)}</Text> */}
                        <Text style={styles.date}>{moment.tz(this.props.data.settingAt, 'Asia/Seoul').utc(9).format("HH:mm")}</Text>
                        {/* <Text style={styles.date}>{this.props.data.settingAt}</Text> */}
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.memoTitle}>{this.props.data.memoTitle}</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <Text style={styles.content}>{this.props.data.content}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default Memo;

const styles = StyleSheet.create({
    detailContainer: {
        flex: 1,
        width: "100%",
        marginLeft: "5%",
        marginRight: "5%",
        justifyContent: "space-around",
        alignItems: "flex-start",
        borderColor: "#0078d4",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 10,
    },
    topContainer: {
        flex: 3,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    caseTitle: {
        marginLeft: 10,
    },
    caseTitleText: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 4,
    },
    memoDate: {
        marginRight: 10,
    },
    bottomContainer: {
        justifyContent: 'center',
    },
    contentContainer: {
        marginLeft: 10,
    },
    memoTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0078D4',
    },
    content: {
        fontSize: 15,
        fontWeight: "400",
    },
});