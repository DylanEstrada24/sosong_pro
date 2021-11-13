import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	StyleSheet,
	Dimensions,
	ScrollView,
	Keyboard,
} from 'react-native';

import { store } from '../../redux/store';
import { connect } from 'react-redux';
import { setLatest } from '../../redux/actions/latest';
import { setCase } from '../../redux/actions/cases';
import Accordion from '../../Components/Accordion';
import SimpleToast from 'react-native-simple-toast';

class MarkSelect extends Component {

	constructor(props) {
        super(props);
        this.state = {
			mark: '',
			latestMarks: [],
			minsa: ['가합', '가단', '가소', '나', '다', '라', '마', '그', '바', '머', '자', '차', '러', 
                    '재가합', '재가단', '재가소', '재나', '재다', '재라', '재마', '재그', '재머', '재자', '재차', 
                    '준재가합', '준재가단', '준재가소', '준재나', '준재다', '준재라', '준재자', '준재머'],

			sincheong: ['카', '카공', '카구', '카기', '카기전', '카단', '카담', '카명', '카조', '카합', '카확', '재카기', '카열', '카불', '카임', '카정', '카경', '카소'],

			jibhang: ['타채', '타기', '타인', '타배'],
			
			bisong: ['비합', '비단', '파', '과', '책', '재비합', '재비단'],
			
			dosan: ['회합', '회단', '회확', '회기', '하합', '하단', '하확', '하면', '하기', '개회', '개확', '개기', '개보', '국승', '국지', '간회단', '간회합'],

			hyeongsa: ['고합', '고단', '고정', '고약', '노', '도', '로', '모', '오', '보', '코', '초', '초적', 
						'초보', '초기', '감고', '감노', '감도', '감로', '감모', '감오', '감초', '재고합', '재고단', '재고정', 
						'재고약', '재노', '재도', '재감고', '재감노', '재감도', '고약전', '초사', '전로', '전초', '전모', 
						'치고', '치노', '치도', '치오', '치초', '초치', '치로', '치모', '초재', '전고', '저노', '전도', '전오'],

			boho: ['푸', '크', '트', '푸초', '버', '서', '어', '저', '성', '성로', '성모', '성초', '처'],

			gasa: ['드', '드합', '드단', '르', '므', '브', '스', '으', '너', '즈합', '즈단', '즈기', '느합', '느단', 
						'재드', '재드합', '재드단', '재르', '재므', '재브', '재스', '재너', '재느합', '재느단', '준재드', 
						'준재드합', '준재드단', '준재르', '준재므', '준재스', '준재느합', '준재느단', '인', '인라', '인마', '인카', '재으'],

			haengjeong: ['구', '구합', '구단', '누', '두', '루', '무', '부', '사', '아', '재구', '재구합', '재구단', '재누', '재두', '재루', '재무', '재아', '준재구', '준재누', '재부'],

			teukheo: ['허', '후', '흐', '히', '카허', '재허', '재후'],

			seongeo: ['수', '수흐', '주'],

			teuksu: ['추'],

			gamchi: ['정명', '정드', '정브', '정스'],

			hojeok: ['호기', '호명'],

			marks: [],
			searchValue: '',
			searching: false,
			result: [],
        }

		this.selectHandler = this.selectHandler.bind(this)

		this.searchHandle = this.searchHandle.bind(this)
		this.searchItem = this.searchItem.bind(this)
		this.cancelSearch = this.cancelSearch.bind(this)
    }


	selectHandler(markName) {

		this.props.setCase({
			mark: markName
		});

		// 최근 선택한 항목에 넣기
		let latestMarks = []
		latestMarks = this.state.latestMarks

		// 먼저 중복값 체크, 중복된 값이면 위치만 0번 인덱스로 바꾸고 넘어감
		if(latestMarks.includes(markName)) {

			// 먼저 없앰
			latestMarks = latestMarks.filter((value) => value !== markName)

			// 그리고 배열 앞에 추가
			latestMarks.splice(0, 0, markName)


		} else {
			// 배열길이 10이상인지 체크 (삭제 판단)
			if(latestMarks.length >= 10) {
				latestMarks.splice(latestMarks.length - 1, 1)
			}

			// 배열 앞에 추가함
			latestMarks.splice(0, 0, markName)

		}

		this.props.setLatest({
			marks: latestMarks
		})

		this.props.navigation.pop();

	}

	searchHandle(value) {
		this.setState({searchValue: value})
	}

	searchItem() {
		Keyboard.dismiss()

		const searchValue = this.state.searchValue

		// 예외처리
		if(searchValue.trim() === '') {
			SimpleToast.show("검색어를 입력해주세요.", SimpleToast.BOTTOM)
			return false
		}

		let result = []

		this.state.marks.map((outerValue) => {
			
			outerValue.map((innerValue) => {
				
				if(innerValue.includes(this.state.searchValue)) {
					result.push(innerValue)
				} else {
					return false
				}

			})

		})

		if(result.length !== 0) {
			this.setState({
				result: result,
				searching: true,
				// cases: filterCases,
			})
		} else {
			SimpleToast.show("일치하는 사건구분이 없습니다.", SimpleToast.BOTTOM)
		}
	}

	cancelSearch() {
		this.setState({
			result: [],
			searching: false,
			searchValue: '',
		})
	}

	componentDidMount() {

		const latestMarks = store.getState().latest.marks

		this.setState({
			latestMarks: latestMarks,
			marks: [
				this.state.minsa,
				this.state.sincheong,
				this.state.jibhang,
				this.state.bisong,
				this.state.dosan,
				this.state.hyeongsa,
				this.state.boho,
				this.state.gasa,
				this.state.haengjeong,
				this.state.teukheo,
				this.state.seongeo,
				this.state.teuksu,
				this.state.gamchi,
				this.state.hojeok,
			],
		})
	}


	render() {
		return (
			<View style={styles.container}>
				<View style={styles.Top}>
					<View style={styles.header}>
						<View style={styles.title}>
							<Text style={styles.titleText}>사건구분 선택</Text>
						</View>
						<TouchableOpacity style={styles.exit} onPress={() => this.props.navigation.pop()} >
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
					</View>
					<View style={styles.contentContainer}>
					<View style={styles.content}>
                            <TextInput 
								style={styles.textInput} 
								placeholder="검색어를 입력하세요." 
								placeholderTextColor="#808080"
								value={this.state.searchValue} 
								onChangeText={(value) => this.searchHandle(value)}
							/>
							{
								this.state.searching ? (
									<TouchableOpacity style={{flex: 1}} onPress={() => this.cancelSearch()}>
										<Image source={require('../../assets/images/X.png')} />
									</TouchableOpacity>
								) : (
									<TouchableOpacity onPress={() => this.searchItem()}>
										<Image source={require('../../assets/images/MagnifyingGlass.png')} />
									</TouchableOpacity>
								)
							}
						</View>
					</View>
					<ScrollView>
						{
							this.state.searching ? (
								<>
									<View style={styles.listContainer}>
										<View style={styles.buttonContainer}>
											{
												this.state.result.map((mark) => (
													<TouchableOpacity style={styles.button} key={`${mark}`} onPress={() => this.selectHandler(`${mark}`)}>
														<Text style={styles.buttonText}>{mark}</Text>
													</TouchableOpacity>
												))
											}
										</View>
									</View>
								</>
							) : (
								<>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="기존검색 (10개)" data={this.state.latestMarks} expanded />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="민사" data={this.state.minsa} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="신청" data={this.state.sincheong} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="집항" data={this.state.jibhang} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="비송" data={this.state.bisong} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="도산" data={this.state.dosan} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="형사" data={this.state.hyeongsa} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="보호" data={this.state.boho} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="가사" data={this.state.gasa} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="행정" data={this.state.haengjeong} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="특허" data={this.state.teukheo} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="선거" data={this.state.seongeo} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="특수" data={this.state.teuksu} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="감치" data={this.state.gamchi} />
									</View>
									<View style={styles.listContainer}>
										<Accordion selectHandler={this.selectHandler} title="호적" data={this.state.hojeok} />
									</View>
								</>
							)
						}
					</ScrollView>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		mark: state.cases.mark,
		latestMarks: state.latest.marks
	}
};

const mapDispatchToProps = {
	setCase, setLatest,
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkSelect);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	exit: {
		marginRight: 10,
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
		alignItems: 'center',
	},
	content: {
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
		paddingBottom: 10,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		width: '100%',
	},
	textInput: {
		backgroundColor: '#E5E5E5',
		borderRadius: 5,
		height: 36,
		fontSize: 13,
		paddingLeft: 19,
		width: '85%',
		color: '#000',
		textAlignVertical: 'center',
		marginRight: 5,
	},
	buttonContainer: {
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
	},
	buttonTop: {
		flexDirection: 'row',
	},
	buttonBottom: {
		flexDirection: 'row',
	},
	button: {
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 5,
		paddingBottom: 5,
		borderColor: '#0078d4',
		borderWidth: 1,
		borderRadius: 10,
		margin: 3,
	},
	buttonText: {
		fontSize: 13,
		fontWeight: 'bold',
		color: '#0078d4',
	},
	bottomLine: {
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
	listContainer: {
		width: '90%',
		marginLeft: Dimensions.get('window').width / 20,
		marginRight: Dimensions.get('window').width / 20,
	},
	categoryButton: {

    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        height: 30,
    },
    categoryTitle: {
        color: '#0078d4',
        fontSize: 15,
        fontWeight: "bold",
    },
    categoryImage: {
        marginRight: 10,
    },
})