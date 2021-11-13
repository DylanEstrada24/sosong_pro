import React, { Component } from 'react';
import {
    ScrollView,
    View,
    StyleSheet
} from 'react-native';
import moment from 'moment';
import { Table, Col } from 'react-native-table-component';

import Detail from './Detail';

class DetailList extends Component {
    constructor(props) {
        super(props)
        this.state = ({
            progresses: [],
        })
    }

    componentDidMount() {
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

        const tableData = []
        for(let i = 0; i < this.props.progresses.length; i++) {
            tableData.push(
                <Detail 
                    key={this.props.progresses[i].idx} 
                    date={moment.tz(this.props.progresses[i].date, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")} 
                    content={this.props.progresses[i].content.trim()} 
                    result={this.props.progresses[i].result} 
                    disclosure={this.props.progresses[i].disclosure} 
                    isUpdate={this.props.progresses[i].isUpdate}
                    type={this.props.progresses[i].type}
                />
            )
        }

        return (
            <View style={{}}>
                <ScrollView style={{}}>
                    <Table borderStyle={{borderWidth: 1, borderColor: '#D8D8D8'}}>
                        <Col
                            style={styles.col}
                            textStyle={styles.tableText}
                            data={tableData}
                        />
                    </Table>
                </ScrollView>
            </View>
        )
    }
}

export default DetailList;

const styles = StyleSheet.create({
    
});