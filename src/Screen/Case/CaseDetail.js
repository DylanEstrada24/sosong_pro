import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	Keyboard,
	StyleSheet,
	Dimensions,
	BackHandler,
} from 'react-native';

import CaseNavigator from '../../Navigation/CaseNavigator';
import { store } from '../../redux/store';
import { setCase, clearCase } from '../../redux/actions/cases'
import { connect } from 'react-redux';
import { commonApi } from '../../Common/ApiConnector';
import Modal from 'react-native-modal';
import SimpleToast from 'react-native-simple-toast';

class CaseDetail extends Component {

	constructor(props) {
		super(props)

		this.state = ({
			cases: {},
			isVisible: false,
			title: '',
			caseIdx: 0,
			favorite: false,
		})

		this.toggleFavorite = this.toggleFavorite.bind(this)
		this.buttonHandler = this.buttonHandler.bind(this)
		this.toggleModal = this.toggleModal.bind(this)
		this.textHandle = this.textHandle.bind(this)
		this.changeTitle = this.changeTitle.bind(this)
	}

	componentDidMount() {

		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
		
		const data = store.getState().cases

		this.setState({
			cases: data,
			title: data.title,
			caseIdx: data.caseIdx,
		})

		console.log(data)

		commonApi('GET', `user/case/caseIdx/${data.caseIdx}`, {}).then((result) => {

			if(typeof result[0].favorite === 'string') {
				if(result[0].favorite === 'false') {
					this.setState({
						favorite: false,
					})
				} else if(result[0].favorite === 'true') {
					this.setState({
						favorite: true,
					})
				}
			} else if(typeof result[0].favorite === 'boolean') {
				this.setState({
					favorite: result[0].favorite
				})
			}

		}).catch((err) => console.log(`user/case/caseIdx/${data.caseIdx}`, err))

	}
	
	componentWillUnmount() {

		this.props.clearCase()
		
		this.exitApp = false;
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

	}

	// 백버튼 제어
    handleBackButton = () => {

		if (!this.props.navigation.isFocused()) {
			// The screen is not focused, so don't do anything
			return false;
		}
        // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        this.props.navigation.pop()
        return true;
    }

	toggleFavorite() {
		const caseIdx = this.state.cases.caseIdx

		commonApi('PUT', `user/case/favorite/${caseIdx}`, {}).then((result) => {
			console.log(result)
			if(result.success) {
				this.setState({
					favorite: !this.state.favorite
				})
			}
		}).catch((err) => console.log(`user/case/favorite/${caseIdx} :: `, err))

	}

	buttonHandler(bool, screen) {
		if(bool) {
			this.props.navigation.navigate(screen, {inCase: true})
		}
	}

	toggleModal() {
		this.setState({
			isVisible: !this.state.isVisible
		})
	}

	textHandle(value) {
		this.setState({
			title: value
		})
	}

	changeTitle() {

		Keyboard.dismiss()

		if(this.state.title.trim() === '') {
			SimpleToast.show("사건별명을 입력해주세요.", SimpleToast.BOTTOM)
			return
		}

		commonApi('PUT', `user/case/title/${this.state.title}/${this.state.caseIdx}`, {}).then((result) => {

			if(result !== undefined) {
				if(result.success) {

					this.props.setCase({
						title: this.state.title
					})
					this.setState({
						cases: store.getState().cases
					})
					SimpleToast.show("사건별명이 변경되었습니다.", SimpleToast.BOTTOM)

					this.toggleModal()
				}
			}

		}).catch((err) => console.log(`user/case/title/${this.state.title}/${this.state.caseIdx}`, err))

	}

	render() {

		// const {navigation} = this.props;
		// const data = navigation.getParam("data");

		return (
			<View style={styles.caseContainer}>
				<View style={styles.headerContainer}>
					<View style={styles.headerLeft}>
						{/* <View style={{marginLeft: 5}}>
							<Image source={require('../../assets/images/CaretLeft.png')} />
						</View> */}
						<View style={{marginLeft: 5}}>
							<Text style={styles.titleText}>
								{this.state.cases.title}
							</Text>
						</View>
						<TouchableOpacity style={styles.currentState} onPress={() => this.toggleModal()}>
							<Text style={styles.stateText}>
								수정
							</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity style={{marginRight: 10}} onPress={() => this.toggleFavorite()}>
						{
							this.state.favorite ? (
								<Image source={require('../../assets/images/Favorite.png')} />
							) : (
								<Image source={require('../../assets/images/NonFavorite.png')} />
							)
						}
					</TouchableOpacity>
				</View>
				<View style={styles.tabContainer}>
					{/* <TouchableOpacity style={styles.tab}>
						<Text style={styles.tabText}>
							진행내용
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.tab}>
						<Text style={styles.tabText}>
							일반내용
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.tab}>
						<Text style={styles.tabText}>
							ToDo
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.tab}>
						<Text style={styles.tabText}>
							메모
						</Text>
					</TouchableOpacity> */}
					<CaseNavigator buttonHandler={(bool, screen) => this.buttonHandler(bool, screen)} />
				</View>
				{/* <TouchableOpacity style={styles.write} onPress={() => this.props.navigation.navigate('WriteToDo', {inCase: true})}>
					<View style={styles.circle}>
						<Image source={require('../../assets/images/NotePencil.png')} />
					</View>
				</TouchableOpacity> */}
				{/* <View style={styles.contentContainer}></View> */}
				<Modal isVisible={this.state.isVisible}>
					<View style={{flex: 1}}>
						<View style={styles.modalContent}>
							<TextInput 
								style={styles.input} 
								value={this.state.title} 
								onChangeText={(value) => this.textHandle(value)} 
								onSubmitEditing={() => this.changeTitle()}
							/>
						</View>
						<View style={styles.buttonContainer}>
							<TouchableOpacity style={styles.closeButton} onPress={() => this.changeTitle()}>
								<Text style={styles.loginButton}>변경</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.user.token,
		webToken: state.user.webToken,
		casesIdx: state.cases.caseIdx,
	}
};

const mapDispatchToProps = {
	setCase, clearCase,
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseDetail);


const styles = StyleSheet.create({
	caseContainer: {
		flex: 1
	},
	headerContainer: {
		marginTop: 30,
		flexDirection: 'row',
		justifyContent: "space-between",
		borderBottomColor: "#2665A1",
		borderBottomWidth: 1,
		paddingBottom: 5,
		paddingLeft: Dimensions.get('window').width / 30,
	},
	headerLeft: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: "center",
	},
	titleText: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	currentState: {
		marginLeft: 10,
		backgroundColor: "#2665A1",
		borderRadius: 12,
		width: 45,
		height: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	stateText: {
		fontSize: 13,
		fontWeight: "bold",
		color: "#FFFFFF"
	},
	tabContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	tab: {
		alignItems: "center",
		justifyContent: "center",
		padding: 15,
	},
	tabText: {
		fontSize: 15,
		fontWeight: 'bold',

	},
	contentContainer: {
		flex: 1,
		padding: 16,
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
		backgroundColor: '#2665A1',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		width: 50,
		height: 50,
	},
	input: {
		backgroundColor: '#E5E5E5',
		borderRadius: 5,
		paddingLeft: 23,
	},
	buttonContainer: {
        flex: 1,
        // width: (Dimensions.get('window').width - (Dimensions.get('window').width / 5)),
		justifyContent: 'center',
        alignItems: 'center',
	},
	closeButton: {
        width: '80%', 
        justifyContent: "center", 
        alignItems: "center",
        marginTop: 20,
    },
	loginButton: {
        width: '100%',
		borderRadius: 5,
		textAlign: 'center',
        justifyContent: 'center',
		fontWeight: "600",
		fontSize: 15,
        backgroundColor: '#2665A1',
        color: '#FFFFFF',
        paddingTop: 8,
        paddingBottom: 8,
	}
})