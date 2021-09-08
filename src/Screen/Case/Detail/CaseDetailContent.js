import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	Keyboard,
	StyleSheet,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';
import DetailList from './DetailList';
import { store } from '../../../redux/store';
import { commonApi } from '../../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast'
class CaseDetailContent extends Component {

	constructor(props) {
		super(props)
		this.state = ({
			category: 'all',
			cases: {},
			searchValue: '',
			searching: false,
			isVisible: false,
			progresses: [],
			tempProgresses: [],
		})

		this.textHandle = this.textHandle.bind(this)
        this.searchItem = this.searchItem.bind(this)
        this.cancelSearch = this.cancelSearch.bind(this)
	}

	async componentDidMount() {
		const cases = store.getState().cases;

		console.log('aaa', this.props.navigation.getParam())

		this.setState({
			cases: cases,
		})

		let url = `user/case/progress/${cases.caseNumber}`

        commonApi('GET', url, {}).then((data) => {
            // console.log('user/case/progress/' + this.state.caseNumber)
            // console.log(data)

            data.success === undefined ? (
                this.setState({
                    progresses: data,
                })
            ) : (
                console.log(data.msg)
            )
        }).catch((err) => console.log("user/case/progress/", this.state.caseNumber, " ::: ", err))
	}

	textHandle(value) {
        this.setState({
            searchValue: value,
        })
    }

	searchItem() {
        Keyboard.dismiss()

		const searchValue = this.state.searchValue

		// 예외처리
		if(searchValue.trim() === '') {
			SimpleToast.show("검색어를 입력해주세요.", SimpleToast.BOTTOM)
			return false
		}

		let filterProgresses = this.state.progresses.filter((value) => {

			if(value.date.includes(searchValue) || value.content.includes(searchValue) || 
				value.result.includes(searchValue) || value.disclosure.includes(searchValue)) {
					return true
			}

			return false

		})

		if(filterProgresses.length !== 0) {
			this.setState({
				tempProgresses: this.state.progresses,
				searching: true,
				progresses: filterProgresses,
			})
		} else {
			SimpleToast.show("일치하는 항목이 없습니다.", SimpleToast.BOTTOM)
		}
    }

    cancelSearch() {
        this.setState({
			progresses: this.state.tempProgresses,
			tempProgresses: [],
			searching: false,
            searchValue: '',
		})
    }

	render() {

		// const {navigation} = this.props;
		// const data = navigation.getParam("data")
		// console.log(data);

		return (
			<View style={styles.caseContainer}>
				<View style={styles.contentHeader}>
					<View style={styles.pickerConatiner}>
						<Picker 
							selectedValue={this.state.category}
							onValueChange={(val, idx) => {
								this.setState({category: val})
							}}
							style={styles.picker}
						>
							<Picker.Item label="전체" value="all" />
							<Picker.Item label="진행" value="progress" />
							<Picker.Item label="종료" value="end" />
						</Picker>
					</View>
					<View style={styles.inputContainer}>
						<TextInput 
							style={styles.searchInput} 
							placeholder="검색어를 입력하세요." 
							value={this.state.searchValue} 
							onChangeText={(value) => this.textHandle(value)} 
							onSubmitEditing={() => this.searchItem()}
						/>
					</View>
					{
						this.state.searching ? (
							<TouchableOpacity style={{flex: 1}} onPress={() => this.cancelSearch()}>
								<Image source={require('../../../assets/images/X.png')} />
							</TouchableOpacity>
							) : (
							<TouchableOpacity style={{flex: 1}} onPress={() => this.searchItem()}>
								<Image source={require('../../../assets/images/MagnifyingGlass.png')} />
							</TouchableOpacity>
						)
					}
				</View>
				<View style={styles.contentContainer}>
					<DetailList progresses={this.state.progresses} />
				</View>
			</View>
		);
	}
}

export default CaseDetailContent;

const styles = StyleSheet.create({
	caseContainer: {
		flex: 1,
		margin: 15,
	},
	contentHeader: {
		flexDirection: 'row',
		height: 50,
		justifyContent: 'space-around',
		alignItems: "center",
		// backgroundColor: 'red'
		paddingBottom: 10,
		// borderBottomWidth: 1,
		// borderBottomColor: "#2665A1",
	},
	pickerConatiner: {
		borderColor: '#2665A1',
		borderWidth: 1,
		borderRadius: 5,
		flex: 3,
		height: 40,
		justifyContent: "center",
		marginRight: 5,
		// alignItems: "flex-end",
	},
	contentContainer: {
		flex: 1,
	},
	picker: {
		// justifyContent: 'flex-end',
		fontSize: 13,
	},
	inputContainer: {
		flex: 5,
		marginRight: 10,
		marginLeft: 5,
	},
	searchInput: {
		fontSize: 13,
		fontWeight: "400",
		justifyContent: 'center',
		borderRadius: 5,
		backgroundColor: '#e5e5e5',
	},
	searchButton: {
		flex: 1,
	},

})