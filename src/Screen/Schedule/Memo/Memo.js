import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

class Memo extends Component {
    render() {
        return (
            // <View style={styles.memoContainer}>
            //     <View style={{flex: 1,}}>
            //         <Text />
            //     </View>
            //     <View style={styles.contentContainer}>
            //         <View style={styles.topContainer}>
            //             <Text style={styles.date}>2021.04.30</Text>
            //         </View>
            //         <View style={styles.bottomContainer}>
            //             <Text style={styles.content}>-서울 중앙지법에서 의뢰인과 미팅예정.</Text>
            //             <Text style={styles.content}>-미팅 전날 문자요청.</Text>
            //         </View>
            //     </View>
            // </View>
            <View style={styles.detailContainer}>
                <View style={styles.topContainer}>
                    <View>
                        <Text style={styles.date}>{this.props.updateAt}</Text>
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

export default Memo;

const styles = StyleSheet.create({
    // memoContainer: {
    //     flex: 1,
    //     borderWidth: 1,
    //     borderColor: '#2665A1',
    //     borderRadius: 10,
    //     flexDirection: "row",
    //     marginTop: 5,
    //     marginBottom: 5,
    // },
    // contentContainer: {
    //     flex: 9,
    //     paddingTop: 18,
    //     paddingBottom: 18,
    //     paddingLeft: 30,
    //     borderLeftColor: "#1CAA99", // 사용자가 설정한 컬러로 ?
    //     borderLeftWidth: 5,
    //     flexDirection: 'column',
    //     justifyContent: 'center',
    //     alignItems: 'flex-start',
    // },
    // topContainer: {
    //     justifyContent: "center",
    //     alignItems: "flex-start",
    //     marginBottom: 5,
    // },
    // date: {
    //     fontSize: 15,
    //     fontWeight: "bold",
    //     color: "#2665A1",
    // },
    // bottomContainer: {
    //     justifyContent: "center",
    //     alignItems: "flex-start",
    //     marginTop: 5,
    // },
    // content: {
    //     fontSize: 15,
    // },
    detailContainer: {
        // backgroundColor: `${props => props.isOdd ? '#FFFFFF' : '#DEE6F1'}`,
        width: '90%',
        padding: 10,
        flexDirection: 'column',
        justifyContent: "space-between",
        // alignItems: "center",
        borderBottomColor: "#2665A1",
        // borderTopColor: "#2665A1",
        borderBottomWidth: 1,
        // borderTopWidth: 1,
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
        // fontWeight: 'bold',
        // color: "#D5722E",
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