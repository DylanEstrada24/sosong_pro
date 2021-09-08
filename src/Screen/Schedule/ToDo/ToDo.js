import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import moment from 'moment';
import 'moment/locale/ko';
import CheckBox from '@react-native-community/checkbox';

class ToDo extends Component {

    constructor() {
        super()
        this.state = {
            checkBox: false,
            diff: 0,
        }

        moment().format()

        this.checkDiff = this.checkDiff.bind(this)
        this.toggleCheckBox = this.toggleCheckBox.bind(this)
    }

    toggleCheckBox(newValue) {
        this.setState({checkBox: newValue});
    }

    checkDiff() {
        let today = moment().format('YYYY-MM-DD')
        today = moment(today)
        const settingDate = moment(this.props.settingAt)
        let diff = settingDate.diff(today, 'days')

        diff *= -1
        if(diff > 0) {
            diff = `+${diff}`
        } else if(diff === 0) {
            diff = `-0`
        }

        this.setState({
            diff: diff,
        })
    }

    componentDidMount() {
        this.checkDiff()
    }


    render() {
        moment.locale('ko');
        const day = moment(this.props.settingAt).format('dddd').charAt(0)
        return (
            <View style={styles.toDoContainer}>
                <View style={styles.checkBox} />
                {/* <View style={styles.topContainer}>
                    <View style={styles.leftCategory}>
                        <Text style={styles.title}>
                            더스쿠프 상대 사건
                        </Text>
                    </View>
                </View> */}
                <View style={styles.toDoTextContainer}>
                    <Text style={styles.toDoTitle}>마감일 : {this.props.settingAt}({day})</Text>
                    {/* <Text style={styles.toDoContent}>{this.props.content}</Text> */}
                    <Text style={styles.toDoContent}>더스쿠프 상대 사건</Text>
                </View>
                <View style={styles.dDayTextContainer}>
                    <Text style={styles.dDayText}>D{this.state.diff}</Text>
                </View>
            </View>
        )
    }
}

export default ToDo;

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     // margin: 15,
    //     flexDirection: 'column',
    //     justifyContent: "center",
    //     borderColor: '#2665A1',
    //     borderRadius: 10,
    //     borderWidth: 1,
    //     marginTop: 5,
    //     marginBottom: 5,
    //     paddingTop: 10,
    //     paddingLeft: 20,
    //     paddingRight: 20,
    //     paddingBottom: 10,
    // },
    // topContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // leftCategory: {
    //     flexDirection: 'row',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // title: {
    //     fontSize: 15,
    //     fontWeight: 'bold',
    // },
    // content: {
    //     fontSize: 15,
    //     marginLeft: 15,
    // },
    // bottomContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     marginTop: 10,
    //     // backgroundColor: 'red'
    // },

    toDoContainer: {
        flex: 1,
        flexDirection: "row",
        width: "90%",
        // height: 80,
        marginLeft: "5%",
        marginRight: "5%",
        justifyContent: "space-around",
        alignItems: "flex-start",
        borderColor: "#2665A1",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 18,
        paddingBottom: 18,
    },
    checkBox: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toDoTextContainer: {
        flex: 3,
    },
    toDoTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#2665A1",
        marginBottom: 5,
    },
    toDoContent: {
        fontSize: 15,
        fontWeight: "400",
    },
    dDayTextContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    dDayText: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 32,
    },
});