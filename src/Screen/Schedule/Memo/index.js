import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    ScrollView,
    Text,
    StyleSheet,
} from 'react-native';
import MemoList from './MemoList';
import { store } from '../../../redux/store';
import { connect } from 'react-redux';
import { setSchedule, clearSchedule } from '../../../redux/actions/schedule';
import NavigationService from '../../../Navigation/NavigationService';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

class Memo extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            memos: [],
            focus: false,
            alertVisible: false,
        })

    }

    componentDidMount() {
        this.setState({
            memos: store.getState().schedule.memos
        })

        this.props.navigation.addListener('didFocus', () => {
            this.setState({focus: true})
        })

    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.focus !== this.state.focus) {
            this.setState({focus: false, memos: store.getState().schedule.memos})
        }
    }

    componentWillUnmount() {
        this.setState({
            memos: [],
        })

    }

    toggleAlertVisible = () => this.setState({alertVisible: !this.state.alertVisible})

    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scroll}>
                    {
                        this.props.schedule.memos.length !== 0 ? (
                            this.props.schedule.memos.map((memo, index) => {
                                return (
                                    <View style={styles.content} key={index}>
                                        <MemoList memo={memo} />
                                    </View>
                                )
                            })
                        ) : (
                            
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyText}>등록된 메모가 없습니다.</Text>
                            </View>
                        )
                    }
                </ScrollView>
                {
                    // 상용할때 체크해야함 ... JY
					store.getState().user.userType === 'common' ? (
						<TouchableOpacity style={styles.write} onPress={() => NavigationService.navigate('WriteMemo', {inCase: false})}>
							<View style={styles.circle}>
                                <FontAwesome name={'calendar-plus-o'} size={25} color={'#FFF'} />
							</View>
						</TouchableOpacity>
					) : (
						<TouchableOpacity style={styles.write} onPress={() => this.toggleAlertVisible()}>
							<View style={styles.circle}>
                                <FontAwesome name={'calendar-plus-o'} size={25} color={'#FFF'} />
							</View>
						</TouchableOpacity>
					)
				}
                <Modal isVisible={this.state.alertVisible}>
					<View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>
						<View style={{marginTop: 20, marginBottom: 20,}}>
							<View style={{justifyContent: 'flex-start', alignItems: 'flex-start', maginTop: 10, marginBottom: 10,}}>
								<Text style={{fontSize: 16, fontWeight: 'bold'}}>알림</Text>
							</View>
							<View style={{justifyContent: 'center', alignItems: 'center', maginTop: 10, marginBottom: 10,}}>
								<Text style={{fontSize: 16}}>멤버십(구독) 회원에게 제공되는 서비스입니다.</Text>
							</View>
							<TouchableOpacity style={{justifyContent: 'flex-end', alignItems: 'flex-end', maginTop: 10, marginBottom: 10,}} onPress={() => this.toggleAlertVisible()}>
								<Text style={{fontSize: 16, fontWeight: 'bold', color: '#0078D4'}}>확인</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
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


export default connect(mapStateToProps, mapDispatchToProps)(Memo);

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
        flex: 1,
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
    write: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginRight: 15,
		marginBottom: 15,
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
	circle: {
		backgroundColor: '#0078d4',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		width: 50,
		height: 50,
	},
});