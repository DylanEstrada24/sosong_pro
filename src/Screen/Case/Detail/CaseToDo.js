import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	StyleSheet,
} from 'react-native';

import Modal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';
import CaseToDoList from './CaseToDoList';
import { store } from '../../../redux/store';
import { commonApi } from '../../../Common/ApiConnector';
import NavigationService from '../../../Navigation/NavigationService';
import { connect } from 'react-redux';
import { setCase } from '../../../redux/actions/cases';
class CaseToDo extends Component {

	constructor(props) {
		super(props)

		this.state = ({
			deleteTodoVisible: false,
			todoTitle: '',
			todoIdx: 0,
			isVisible: false,
			alertVisible: false,
		})

		this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
		this.deleteTodo = this.deleteTodo.bind(this)
	}

	toggleDeleteModal(title, idx) {

		this.setState({
			deleteTodoVisible: !this.state.deleteTodoVisible,
			todoTitle: title,
			todoIdx: idx,
		})
	}
	
	deleteTodo(idx) {

		commonApi('DELETE', `user/case/usertodo/todoIdx/${idx}`).then((result) => {

			if(result.success) {
				this.updateTodos(idx)
				this.toggleDeleteModal('', 0)
			} else {
				SimpleToast.show(result.msg, SimpleToast.BOTTOM)
			}
		// }).catch((err) => console.log(`user/case/usertodo/todoIdx/${idx}`, err))
		}).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
	}

	updateTodos = (idx) => {
        const todos = this.props.todos.filter((value) => value.idx !== idx)

        this.props.setCase({
            todos: todos
        })
    }

	toggleIsVisible = () => this.setState({isVisible: !this.state.isVisible})

	toggleAlertVisible = () => this.setState({alertVisible: !this.state.alertVisible})


	render() {
		return (
			<View style={styles.caseContainer}>
				<ScrollView>
					<CaseToDoList 
						navigation={this.props.navigation} 
						toggleDeleteModal={this.toggleDeleteModal}
						ref="CaseToDoList" {...this.props}
					/>
				</ScrollView>
				{
					// 상용할때 체크해야함 ... JY
					store.getState().user.userType === 'common' ? (
						<TouchableOpacity style={styles.write} onPress={() => NavigationService.navigate('WriteToDo', {inCase: true})}>
							<View style={styles.circle}>
								<Image source={require('../../../assets/images/NotePencil.png')} />
							</View>
						</TouchableOpacity>
					) : (
						<TouchableOpacity style={styles.write} onPress={() => this.toggleAlertVisible()}>
							<View style={styles.circle}>
								<Image source={require('../../../assets/images/NotePencil.png')} />
							</View>
						</TouchableOpacity>
					)
				}
				<Modal isVisible={this.state.deleteTodoVisible}>
                    <View style={{backgroundColor: '#FFFFFF', padding: 10, justifyContent: 'space-between'}}>
						<View>
							<View style={styles.modalContainer}>
								<View style={styles.deleteModalContent}>
									<Text>{this.state.todoTitle}</Text>
									<Text>ToDo를 삭제하시겠습니까?</Text>
								</View>
							</View>
						</View>
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.cancel} onPress={() => this.toggleDeleteModal('', 0)}>
								<Text style={styles.buttonText}>취소</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.submit} onPress={() => this.deleteTodo(this.state.todoIdx)}>
								<Text style={styles.buttonText}>삭제</Text>
							</TouchableOpacity>
						</View>
                    </View>
                </Modal>
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
		);
	}
}

const mapStateToProps = (state) => {
	return ({
		todos: state.cases.todos
	})
}

const mapDispatchToProps = {
	setCase
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseToDo);

const styles = StyleSheet.create({
    caseContainer: {
        flex: 1,
    },
	write: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginRight: 30,
		marginBottom: 30,
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
	modalContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    radioItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
	buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30,
    },
	cancel: {
        backgroundColor: '#808080',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 35,
        borderRadius: 3,
		marginHorizontal: 2,
    },
	submit: {
        backgroundColor: '#0078d4',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 35,
        borderRadius: 3,
		marginHorizontal: 2,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
	deleteModalContent: {
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
	},
})