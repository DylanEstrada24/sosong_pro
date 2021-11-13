import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import Memo from './Memo';
import BlueDot from '../../../Components/BlueDot';

class MemoList extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            memo: {}
        })
    }

    componentDidMount() {
        this.setState({
            memo: this.props.memo
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    {
                        console.log(this.props.memo, 'memolist'),
                        Object.keys(this.props.memo).length !== 0 ? (
                            <Memo data={this.props.memo} key={this.props.memo.todoIdx} />
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>등록된 메모가 없습니다.</Text>
                            </View>
                        )
                    }
                </View>
            </View>
        )
    }
}

export default MemoList;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
        width: '100%'
    },
    title: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    content: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 30,
    },
    emptyText: {
        fontSize: 15,
        fontWeight: '400'
    },
});