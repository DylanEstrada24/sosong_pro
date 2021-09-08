import React, {Component} from 'react';
import {
	View,
    Text,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	StyleSheet,
} from 'react-native';

import Memo from './Memo';
import { store } from '../../../redux/store';
import { commonApi } from '../../../Common/ApiConnector';

class MemoList extends Component {

    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        
    }

    render() {

        return (
            <View style={styles.memoListContainer}>
                <View style={styles.memoListTitleContainer}>
                    <BlueDot />
                    <Text style={styles.memoListTitle}>{this.props.memo.userCase.title}</Text>
                </View>
                {
                    this.props.memo.userTodo && 
                    this.props.memo.userTodo.map((memo) => (
                        <Memo 
                            key={memo.todoIdx} 
                            updateAt={memo.updateAt.split('T')[0]} 
                            content={memo.content}
                            settingAt={memo.settingAt.split('T')[0]} 
                            todoIdx={memo.todoIdx}
                            caseIdx={memo.caseIdx}
                        />
                    ))
                }
            </View>
        );
    }
}

export default MemoList;

const styles = StyleSheet.create({
    memoListContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 10,
    },
    memoListTitleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#C4C4C4",
        marginLeft: "5%",
        marginRight: "5%",
        marginBottom: 5,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        width: "90%",
        padding: 2,
    },
    memoListTitle: {
        marginLeft: 9,
        fontSize: 15,
        fontWeight: "bold",
    },
});