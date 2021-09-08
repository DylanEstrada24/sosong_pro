import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { store } from '../../../redux/store';
import { commonApi } from '../../../Common/ApiConnector';

import Detail from './Detail';

class DetailList extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            // caseNumber: '',
            progresses: [],
        })
    }

    componentDidMount() {
        // const cases = store.getState().cases
        // this.setState({
            // caseNumber: encodeURI(cases.caseNumber),
            // caseNumber: cases.caseNumber,
        // })
        
        // let url = `user/case/progress/${cases.caseNumber}`

        // commonApi('GET', url, {}).then((data) => {
        //     // console.log('user/case/progress/' + this.state.caseNumber)
        //     // console.log(data)

        //     data.success === undefined ? (
        //         this.setState({
        //             progresses: data,
        //         })
        //     ) : (
        //         console.log(data.msg)
        //     )
        // }).catch((err) => console.log("user/case/progress/", this.state.caseNumber, " ::: ", err))
        this.setState({
            progresses: this.props.progresses
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.progresses.length !== this.props.progresses.length) {
            this.setState({})
        }
    }

    render() {
        return (
            <View style={{}}>
                <ScrollView style={{}}>
                    {
                        this.props.progresses !== undefined && this.props.progresses.length !== 0 ? (

                            this.props.progresses.map((progress) => (
                                <Detail 
                                    key={progress.idx} 
                                    date={progress.date.split('T')[0]} 
                                    content={progress.content.trim()} 
                                    result={progress.result} 
                                    disclosure={progress.disclosure} 
                                    isUpdate={progress.isUpdate}
                                />
                            ))
                            
                        ) : (<></>)
                    }
                </ScrollView>
            </View>
        )
    }
}

export default DetailList;

const styles = StyleSheet.create({
    
});