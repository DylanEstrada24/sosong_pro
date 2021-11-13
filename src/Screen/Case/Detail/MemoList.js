import React, {Component} from 'react';
import {
    View,
    Text,
	StyleSheet,
} from 'react-native';

import Memo from '../../Memo/Memo';
import { store } from '../../../redux/store';
import { commonApi } from '../../../Common/ApiConnector';
import moment from 'moment';
import { connect } from 'react-redux';

class MemoList extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            memos: [],
        })

        this.sortMemo = this.sortMemo.bind(this)
        this.updateArray = this.updateArray.bind(this)
    }
    
    async componentDidMount() {
        
        // const cases = store.getState().cases

        // let sortData = []
        // let date_1
        // let date_2
        
        // // 상용할때 체크해야함 ... JY
        // if(store.getState().user.userType === 'common') {

        //     const url = `user/case/usernote/${cases.caseIdx}`

        //     commonApi('GET', url, {}).then((data) => {
        //         {
        //             data.success === undefined ? (

        //                 // 먼저 설정한 날짜가 낮은거부터 위로
        //                 sortData = data.sort(function(a, b) {
        //                     date_1 = new Date(a.settingAt)
        //                     date_2 = new Date(b.settingAt)
        //                     if(date_1 > date_2) {
        //                         return -1
        //                     } else if(date_1 === date_2) {
        //                         return 0
        //                     } else {
        //                         return 1
        //                     }
        //                 }),

        //                 this.setState({
        //                     memos: sortData,
        //                 })
        //             ) : (
        //                 SimpleToast.show(data.msg, SimpleToast.BOTTOM)
        //             )
        //         }
        //     // }).catch((err) => console.log(url + err))
        //     }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

        //     this.props.navigation.addListener('didFocus', () => {

        //         commonApi('GET', url, {}).then((data) => {
        //             {
        //                 data.success === undefined ? (

        //                     // 먼저 설정한 날짜가 낮은거부터 위로
        //                     sortData = data.sort(function(a, b) {
        //                         date_1 = new Date(a.settingAt)
        //                         date_2 = new Date(b.settingAt)
        //                         if(date_1 > date_2) {
        //                             return -1
        //                         } else if(date_1 === date_2) {
        //                             return 0
        //                         } else {
        //                             return 1
        //                         }
        //                     }),

        //                     this.setState({
        //                         memos: sortData,
        //                     })
        //                 ) : (
        //                     SimpleToast.show(data.msg, SimpleToast.BOTTOM)
        //                 )
        //             }
        //         // }).catch((err) => console.log(url + err))
        //         }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
        //     })
        // }

    }

    updateArray(memoIdx, item) {

        let sortData = this.state.todos
        for(let i = 0; i < sortData.length; i++) {
            if(sortData[i].memoIdx === memoIdx) {
                item === 'isCheck' ? (
                    sortData[i].isCheck = !sortData[i].isCheck
                ) : (
                    sortData[i].favorite = !sortData[i].favorite
                )
            }
        }

        return sortData

    }

    sortMemo(memoIdx) {
        let sortData = this.updateArray(memoIdx, 'isCheck')
        let date_1
        let date_2

        sortData = sortData.sort(function(a, b) {
            date_1 = new Date(a.settingAt)
            date_2 = new Date(b.settingAt)
            if(date_1 > date_2) {
                return -1
            } else if(date_1 === date_2) {
                return 0
            } else {
                return 1
            }
        })

        this.setState({
            todos: sortData
        })

    }

    render() {

        return (
            <View style={styles.memoListContainer}>
                {
                    // 상용할때 체크해야함 ... JY 
                    this.props.memos.length !== 0 && store.getState().user.userType === 'common' ? (
                        this.props.memos.map((memo) => (
                            <Memo 
                                key={memo.idx} 
                                updateAt={memo.updateAt.split('T')[0]} 
                                content={memo.content}
                                settingAt={moment.tz(memo.settingAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")}
                                time={moment.tz(memo.settingAt, 'Asia/Seoul').utc(9).format("HH:mm")}
                                userIdx={memo.user_idx} 
                                userCaseIdx={memo.userCase_idx}
                            />
                        ))
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>등록된 작업항목이 없습니다.</Text>
                        </View>
                    )
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return ({
        memos: state.cases.memos
    })
}

export default connect(mapStateToProps)(MemoList);

const styles = StyleSheet.create({
    memoListContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: 10,
        marginBottom: 10,
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