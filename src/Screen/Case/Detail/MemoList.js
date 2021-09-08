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

import Memo from '../../Memo/Memo';
import { store } from '../../../redux/store';
import { commonApi } from '../../../Common/ApiConnector';

class MemoList extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            memos: [],
        })
    }
    
    async componentDidMount() {
        
        const cases = store.getState().cases
        
        if(store.getState().user.userType !== 'common') {

            const url = `user/case/usernote/${cases.caseIdx}`

            commonApi('GET', url, {}).then((data) => {
                // console.log(data)
                {
                    data.success === undefined ? (
                        this.setState({
                            memos: data,
                        })
                    ) : (
                        console.log(data.msg)
                    )
                }
            }).catch((err) => console.log(url + err))

            this.props.navigation.addListener('didFocus', () => {

                commonApi('GET', url, {}).then((data) => {
                    // console.log(data)
                    {
                        data.success === undefined ? (
                            this.setState({
                                memos: data,
                            })
                        ) : (
                            console.log(data.msg)
                        )
                    }
                }).catch((err) => console.log(url + err))

            })

        } else {
            this.setState({
                memos: 
                [
                    {
                        "idx": 0,
                        "updateAt": "2021-08-23T06:00:49.000Z",
                        "content": "Memo할 것을 여기적으십시오",
                        "settingAt": "2021-08-29T15:00:00.000Z",
                        "user_idx": 0,
                        "userCase_idx": 0
                    },
                    {
                        "idx": 1,
                        "updateAt": "2021-08-23T06:00:49.000Z",
                        "content": "Memo할 것을 여기적으십시오",
                        "settingAt": "2021-08-29T15:00:00.000Z",
                        "user_idx": 0,
                        "userCase_idx": 0
                    }
                ]
            })

            this.props.navigation.addListener('didFocus', () => {

                this.setState({
                    memos: 
                    [
                        {
                            "idx": 0,
                            "updateAt": "2021-08-23T06:00:49.000Z",
                            "content": "Memo할 것을 여기적으십시오",
                            "settingAt": "2021-08-29T15:00:00.000Z",
                            "user_idx": 0,
                            "userCase_idx": 0
                        },
                        {
                            "idx": 1,
                            "updateAt": "2021-08-23T06:00:49.000Z",
                            "content": "Memo할 것을 여기적으십시오",
                            "settingAt": "2021-08-29T15:00:00.000Z",
                            "user_idx": 0,
                            "userCase_idx": 0
                        }
                    ]
                })

            })
        }

    }

    render() {

        return (
            <View style={styles.memoListContainer}>
                {
                    this.state.memos && 
                    this.state.memos.map((memo) => (
                        <Memo 
                            key={memo.idx} 
                            updateAt={memo.updateAt.split('T')[0]} 
                            content={memo.content}
                            settingAt={memo.settingAt} 
                            userIdx={memo.user_idx} 
                            userCaseIdx={memo.userCase_idx}
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
});