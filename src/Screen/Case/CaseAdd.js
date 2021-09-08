import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	StyleSheet,
	Dimensions,
	Platform,
	ScrollView,
} from 'react-native';

// import BlueDot from '../../Components/BlueDot';
import SettingItem from '../Setting/SettingItem';

import CheckBox from '@react-native-community/checkbox';
import { store } from '../../redux/store';
import { commonApi, fileUploadApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
import DocumentPicker from 'react-native-document-picker'

class CaseAdd extends Component {

	constructor() {
        super()
        this.state = {
            checkbox1: false,
			checkbox2: false,
			imgPathList: '',
			title: '',
			court: '',
			year: '',
			caseNumber: '',
			name: '',
        }

        this.toggleCheckBox1 = this.toggleCheckBox1.bind(this)
        this.toggleCheckBox2 = this.toggleCheckBox2.bind(this)
		this.excelHandler = this.excelHandler.bind(this)
		// this.courtCallback = this.courtCallback.bind(this)
		this.titleHandle = this.titleHandle.bind(this)
		this.divisionHandle = this.divisionHandle.bind(this)
		this.caseNumberHandle = this.caseNumberHandle.bind(this)
		this.nameHandle = this.nameHandle.bind(this)
		// this.toNavigate = this.toNavigate.bind(this)
		this.addHandler = this.addHandler.bind(this)
    }

	componentDidMount() {
		this.props.navigation.addListener("didFocus", () => {
			// console.log("focused!!")
			this.setState({
				court: store.getState().cases.court,
				year: store.getState().cases.year,

			})
		})
	}

	// toNavigate(screenName) {
	// 	this.props.navigation.push({
	// 		name: screenName,
	// 		passProps: {
	// 			courtCallback: this.courtCallback
	// 		}
	// 	})
	// }

	// async courtCallback() {
	// 	await console.log(store.getState().cases.court)
	// }

    toggleCheckBox1(newValue) {
        this.setState({checkbox1: newValue});
    }
    toggleCheckBox2(newValue) {
        this.setState({checkbox2: newValue});
    }

	titleHandle(value) {
		this.setState({title: value})
	}

	divisionHandle(value) {
		this.setState({division: value})
	}

	caseNumberHandle(value) {
		this.setState({caseNumber: value})
	}

	nameHandle(value) {
		this.setState({name: value})
	}

	async excelHandler() {
		try {
			const res = await DocumentPicker.pick({
			  type: [DocumentPicker.types.xls, DocumentPicker.types.xlsx],
			})
			const formData = new FormData();
			console.log(res)
			formData.append("excelFile", {
				name: res[0].name,
				uri: res[0].uri,
				type: 'application/vnd.ms-excel',
			});
			const formResult = fileUploadApi('post', 'file/excel/upload', formData, {
			}).then((res) => {
				console.log('formResult : ', res)
				this.props.navigation.pop()
			}).catch((e) => console.log(e,'err'))
		  } catch (err) {
			  console.log('err', err)
			// if (DocumentPicker.isCancel(err)) {
			//   // User cancelled the picker, exit any dialogs or menus and move on
			// } else {
			//   throw err
			// }
		  }
	}

	async addHandler() {

		if(!this.state.checkbox1) {
			console.log("!this.state.checkbox1")
			return
		}

		if(!this.state.checkbox2) {
			console.log("!this.state.checkbox2")
			return
		}

		if(this.state.court === '') {
			console.log(`this.state.court === ''`)
			return
		}

		if(this.state.year === '') {
			console.log(`this.state.year === ''`)
			return
		}

		if(this.state.division.trim() === '') {
			console.log(`this.state.division.trim() === ''`)
			return
		}

		if(this.state.caseNumber.trim() === '') {
			console.log(`this.state.caseNumber.trim() === ''`)
			return
		}

		if(this.state.name.trim() === '') {
			console.log(`this.state.name.trim() === ''`)
			return
		}

		const caseNumber = `${this.state.year}${this.state.division}${this.state.caseNumber}`
		const webToken = store.getState().user.webToken

		// console.log("caseNumber:::", caseNumber)

		const data = {
			title: this.state.title,
			court: this.state.court,
			caseNumber: caseNumber,
			name: this.state.name,
			webToken: webToken
		}

		commonApi('POST', 'user/case', data).then((result) => {

			// console.log("success", result)
			if(result.success) {

				SimpleToast.show("사건이 추가되었습니다.", SimpleToast.BOTTOM);
				this.props.navigation.pop()

			}

		}).catch((err) => console.log("user/case ::: ", err))

	}


	render() {
		return (
			<ScrollView style={styles.container}>
				<View style={styles.Top}>
					<View style={styles.header}>
						<TouchableOpacity style={styles.exit} onPress={() => this.props.navigation.pop()} >
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
						<View style={styles.title}>
							<Text style={styles.titleText}>사건 등록</Text>
						</View>
					</View>
					<View style={styles.contentContainer}>
						<View style={styles.excelContent}>
							<TouchableOpacity style={styles.nextButton} onPress={() => this.excelHandler()}>
								<Text style={styles.nextButtonText}>나의 사건 엑셀파일 업로드</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.horizonLine}>
							<View style={styles.horizon}></View>
							<View style={styles.horizonText}>
								<Text style={styles.lightGray}>혹은</Text>
							</View>
							<View style={styles.horizon}></View>
						</View>
						<View style={styles.itemListContainer}>
							<View style={styles.itemContainer2}>
								<View style={styles.titleContainer}>
									<Text style={styles.contentTitle}>사건별명</Text>
								</View>
								<View style={styles.contentInput}>
									<TextInput 
										style={styles.content} 
										placeholder="사건별명을 입력하세요." 
										value={this.state.title}
										onChangeText={(value) => this.titleHandle(value)}
									/>
								</View>
								<View></View>
							</View>
							<TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.navigate("CourtSelect")} >
								<SettingItem title="법원" content={this.state.court} isMore />
							</TouchableOpacity>
							<TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.navigate('YearSelect')} >
								<SettingItem title="사건년도" content={this.state.year} isMore />
							</TouchableOpacity>
							<View style={styles.itemContainer2}>
								<View style={styles.titleContainer}>
									<Text style={styles.contentTitle}>사건구분</Text>
								</View>
								<View style={styles.contentInput}>
									<TextInput 
									style={styles.content} 
									placeholder="사건구분을 입력하세요." 
									value={this.state.division}
									onChangeText={(value) => this.divisionHandle(value)}
								/>
								</View>
								<View></View>
							</View>
							<View style={styles.itemContainer2}>
								<View style={styles.titleContainer}>
									<Text style={styles.contentTitle}>일련번호</Text>
								</View>
								<View style={styles.contentInput}>
									<TextInput 
									style={styles.content} 
									placeholder="일련번호를 입력하세요." 
									value={this.state.caseNumber}
									onChangeText={(value) => this.caseNumberHandle(value)}
								/>
								</View>
								<View></View>
							</View>
							<View style={styles.itemContainer2}>
								<View style={styles.titleContainer}>
									<Text style={styles.contentTitle}>당사자</Text>
								</View>
								<View style={styles.contentInput}>
									<TextInput 
									style={styles.content} 
									placeholder="당사자를 입력하세요." 
									value={this.state.name}
									onChangeText={(value) => this.nameHandle(value)}
								/>
								</View>
								<View></View>
							</View>
						</View>
						<View style={styles.checkboxContainer}>
							<View style={styles.checkboxList}>
								<CheckBox style={styles.checkbox} tintColors={{ true: '#2665A1', false: '#2665A1' }} value={this.state.checkbox1} onValueChange={(newValue) => this.toggleCheckBox1(newValue)} />
								<Text style={styles.checkboxText}>회사에 사건정보의 조회 및 저장 권한을 위임합니다.</Text>
							</View>
							<View style={styles.checkboxList}>
								<CheckBox style={styles.checkbox} tintColors={{ true: '#2665A1', false: '#2665A1' }} value={this.state.checkbox2} onValueChange={(newValue) => this.toggleCheckBox2(newValue)} />
								<Text style={styles.checkboxText}>사건의 이해관계인 임을 확인합니다.</Text>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.bottom}>
					{/* <TouchableOpacity style={styles.nextButton} onPress={() => this.props.navigation.navigate("CaseAddSubstitute")}> */}
					<TouchableOpacity style={styles.nextButton} onPress={() => this.addHandler()}>
						<Text style={styles.nextButtonText}>사건등록</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		);
	}
}

export default CaseAdd;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: 'space-between',
	},
	header: {
		width: '100%',
		flexDirection: 'column',
		marginTop: 20,
		borderBottomColor: '#2665A1',
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	exit: {
		marginLeft: 15,
	},
	title: {

	},
	titleText: {
		fontSize: 20,
		fontWeight: '700',
		marginLeft: 18,
	},
	contentContainer: {
		flexDirection: 'column',
		width: '100%',
		justifyContent: 'center',
		// alignItems: 'center',
		// marginLeft: Dimensions.get('window').width / 20,
		// marginRight: Dimensions.get('window').width / 20,
		marginTop: 36,
	},
	horizonLine: {
		flexDirection: 'row',
		// justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
	},
	horizon: {
		backgroundColor: '#C4C4C4',
		flex: 1,
		height: 1,
		// backgroundColor: 'red',

	},
	horizonText: {

	},
	lightGray: {
		color: '#C4C4C4',
		fontSize: 15,
		fontWeight: 'bold',
		width: 90,
		textAlign: 'center',
	},
	itemListContainer: {
		marginTop: 37,
		width: '80%',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		height: 400,
		// backgroundColor: 'yellow',
	},
	bottomLine: {
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	itemContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
		// marginLeft: Dimensions.get('window').width / 10,
		// marginRight: Dimensions.get('window').width / 10,
		paddingTop: 8, 
		paddingBottom: 8,
		flex: 1,
		// backgroundColor: 'blue',
		// height: 80,
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	itemContainer2: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
		// marginLeft: Dimensions.get('window').width / 10,
		// marginRight: Dimensions.get('window').width / 10,
		paddingTop: 8,
		paddingBottom: 8,
		flex: 1,
		// backgroundColor: 'red',
		// height: 80,
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	titleContainer: {
		// alignItems: "flex-start",
		flex: 1,
	},
	contentTitle: {
		fontSize: 15,
		fontWeight: "bold",
		color: "#2665A1",
	},
	contentInput: {
		alignItems: "flex-end",
		flex: 2,
		marginRight: 5,
		// width: 100,
		// backgroundColor: 'red',
	},
	content: {
		fontSize: 15,
		fontWeight: 'bold',
		color: "#666666",
		textAlign: 'right',
	},
	checkboxContainer: {
		marginTop: 10,
		width: '80%',
		marginLeft: Dimensions.get('window').width / 10
	},
	checkboxList: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 10,
	},
	checkbox: {
		flex: 1,
	},
	checkboxText: {
		fontSize: 15,
		flex: 9,
	},
	nextButton: {
		backgroundColor: '#2665A1',
		borderRadius: 5,
		width: '80%',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30,
	},
	nextButtonText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF',
		margin: 9,
	},
})