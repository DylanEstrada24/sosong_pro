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
			tempProgresses: [], // 검색
			pickerProgresses: [], // 
		})

		this.textHandle = this.textHandle.bind(this)
        this.searchItem = this.searchItem.bind(this)
        this.cancelSearch = this.cancelSearch.bind(this)
		this.pickerHandler = this.pickerHandler.bind(this)
	}

	async componentDidMount() {
		const cases = store.getState().cases;

		this.setState({
			cases: cases,
		})

		let url = `user/case/progress/caseNumber/${cases.caseNumber}`
		let sortData = []
		let date_1
		let date_2

        await commonApi('GET', url, {}).then((data) => {

            data.success === undefined ? (
				// sortData = data.sort(function(a, b) {
				// 	return b.idx - a.idx
				// }),

				sortData = data.sort(function(a,b ) {
					date_1 = new Date(a.date)
					date_2 = new Date(b.date)
					if(date_1 > date_2) {
						return -1
					} else if(date_1 === date_2) {
						return 0
					} else {
						return 1
					}
				}),

                this.setState({
					progresses: sortData,
                })
				
				// console.log(sortData)
            ) : (
                console.log(data.msg),
				SimpleToast.show(data.msg, SimpleToast.BOTTOM)
            )
        // }).catch((err) => console.log("user/case/progress/", this.state.caseNumber, " ::: ", err))
        }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
	}

	textHandle(value) {
        this.setState({
            searchValue: value,
        })
    }

	searchItem() {
        Keyboard.dismiss()

		const searchValue = this.state.searchValue
		let disclosure = ''
		let result = ''

		// 예외처리
		if(searchValue.trim() === '') {
			SimpleToast.show("검색어를 입력해주세요.", SimpleToast.BOTTOM)
			return false
		}

		let filterProgresses = this.state.progresses.filter((value) => {

			if(value.disclosure !== undefined) {
				if(value.disclosure !== null) {
					disclosure = value.disclosure
				}
			}

			if(value.result !== undefined) {
				if(value.result !== null) {
					result = value.result
				}
			}

			if(value.date.includes(searchValue) || value.content.includes(searchValue)) {
					return true
			}

			if(result !== '') {
				if(result.includes(searchValue)) {
					return true
				}
			}

			if(disclosure !== '') {
				if(disclosure.includes(searchValue)) {
					return true
				}
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

	pickerHandler(value) {

		if(value === 'all' && this.state.pickerProgresses === []) {
			this.setState({
				category: value
			})
			return false
		} else if(value === 'all' && this.state.pickerProgresses !== []) {
			this.setState({
				category: value,
				progresses: this.state.pickerProgresses,
				pickerProgresses: [],
			})
			return false
		}

		if(this.state.category === 'all') {

			let pickerProgresses = this.state.progresses.filter((val) => val.type.toString() === value)

			this.setState({
				pickerProgresses: this.state.progresses,
				progresses: pickerProgresses,
				category: value,
			})

		} else if(this.state.category !== 'all') {

			let pickerProgresses = this.state.pickerProgresses.filter((val) => val.type.toString() === value)

			this.setState({
				// pickerProgresses: this.state.progresses,
				progresses: pickerProgresses,
				category: value,
			})

		}

		
	}

	render() {

		return (
			<View style={styles.caseContainer}>
				<View style={styles.contentHeader}>
					{/* <View style={styles.pickerConatiner}>
						<Picker 
							selectedValue={this.state.category}
							onValueChange={(val, idx) => {
								this.pickerHandler(val)
							}}
							style={styles.picker}
						>
							<Picker.Item style={styles.pickerItem} label="전체" value="all" />
							<Picker.Item style={styles.pickerItem} label="기일" value="1" />
							<Picker.Item style={styles.pickerItem} label="명령" value="2" />
							<Picker.Item style={styles.pickerItem} label="제출서류" value="3" />
							<Picker.Item style={styles.pickerItem} label="송달" value="4" />
						</Picker>
					</View> */}
					<View style={styles.inputContainer}>
						<TextInput 
							style={styles.searchInput} 
							placeholder="검색어를 입력하세요." 
							placeholderTextColor="#808080"
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
		margin: 10,
	},
	contentHeader: {
		flexDirection: 'row',
		height: 50,
		justifyContent: 'space-around',
		alignItems: "center",
		paddingBottom: 10,
	},
	pickerConatiner: {
		borderColor: '#0078d4',
		borderWidth: 1,
		borderRadius: 5,
		flex: 3,
		height: 40,
		justifyContent: "center",
		alignItems: 'center',
		marginRight: 5,
	},
	picker: {
		fontSize: 12,
		width: 120,
	},
	pickerItem: {
		fontSize: 12,
		
	},
	contentContainer: {
		flex: 1,
	},
	inputContainer: {
		flex: 8,
		marginRight: 10,
		marginLeft: 5,
	},
	searchInput: {
		fontSize: 13,
		fontWeight: "400",
		justifyContent: 'center',
		borderRadius: 5,
		backgroundColor: '#e5e5e5',
		color: '#000',
	},
	searchButton: {
		flex: 1,
	},

})