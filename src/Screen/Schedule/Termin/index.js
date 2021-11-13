import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Text,
    StyleSheet
} from 'react-native';

import TerminList from './TerminList';
import { store } from '../../../redux/store';
import BlueDot from '../../../Components/BlueDot';
import TerminComponent from './Termin'
import { connect } from 'react-redux';
import { setSchedule, clearSchedule } from '../../../redux/actions/schedule';

class Termin extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            progresses: [],
            focus: false,
        })

    }

    /*
        progresses:: [
            {
                "content": " 피고 소송대리인 김주현 보정서 제출", 
                "courtCase_caseNumber": "2020나2031652", 
                "date": "2021-08-30T15:00:00.000Z", 
                "title": null, <--- 요청?
                "termin": "", <--- 추가해야됨
            }
        ]
    */

    componentDidMount() {
        this.setState({
            progresses: store.getState().schedule.progresses
        })

        // console.log(store.getState().schedule.progresses)


        this.props.navigation.addListener('didFocus', () => {
            this.setState({focus: true})
        })
        // console.log('memo index mount')
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.focus !== this.state.focus) {
            this.setState({focus: false, progresses: store.getState().schedule.progresses})
        }
    }

    componentWillUnmount() {
        this.setState({
            progresses: [],
        })
    }

    

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    {
                        this.props.schedule.progresses.length !== 0 ? (
                            console.log(this.props.schedule.progresses, 'asjdioasjioas'),
                            this.props.schedule.progresses.map((progress, index) => {
                                return (
                                    <TerminComponent data={progress} key={index} />
                                )
                            })
                        ) : (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>등록된 기일이 없습니다.</Text>
                            </View>
                        )
                    }
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state, props) => ({
    schedule: state.schedule
})

const mapDispatchToProps = {
	setSchedule, clearSchedule
}

export default connect(mapStateToProps, mapDispatchToProps)(Termin);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        flexDirection: 'column',

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
    },
    title: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    content: {
        flexDirection: 'column',
    },
    scroll: {
        flex: 1,
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