import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

class Termin extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.leftCategory}>
                        {/* <View style={styles.category}>
                            <Text style={styles.categoryText}>민사</Text>
                        </View> */}
                        <Text style={styles.title}>
                            [민사] 더스쿠프 상대 사건
                        </Text>
                    </View>
                    <View style={styles.rightCategory}>
                        <Text style={styles.time}>
                            14:00
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.contentTitle}>변론기일</Text>
                    <Text style={styles.content}>
                        서울중앙지법 민사법정 동관 562호(1번법정출입구 이용)
                    </Text>
                </View>
            </View>
        )
    }
}

export default Termin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 15,
        flexDirection: 'column',
        justifyContent: "center",
        borderColor: '#2665A1',
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftCategory: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    category: {
        backgroundColor: '#2665A1',
        borderRadius: 10,
        height: 24,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 13,
        color: '#FFFFFF',
    },
    title: {
        // marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    rightCategory: {
        // marginBottom: 10
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#2665A1',
    },
    content: {
        fontSize: 15,
    },
    bottomContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 10,
        // backgroundColor: 'red'
    },
    time: {
        fontSize: 15,
    },
});