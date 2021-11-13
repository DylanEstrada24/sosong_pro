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
import { setCase } from '../../redux/actions/cases';
import { setLatest } from '../../redux/actions/latest';
import Accordion from '../../Components/Accordion';
import SimpleToast from 'react-native-simple-toast';

class CourtSelect extends Component {

	constructor() {
        super();
        this.state = ({
			court: '',
			latestCourts: [],
			high: ['대법원','서울고등법원','서울고법(춘천)','서울고법(인천)','대전고등법원','대전고법(청주)',
					'대구고등법원','부산고등법원','부산고법(창원)','부산고법(울산)','광주고등법원','광주고법(제주)',
					'광주고법(전주)','수원고등법원','특허법원'],
			seoul: ['서울중앙지법', '서울동부지법', '서울남부지법', '서울북부지법', '서울서부지법', '서울가정법원', '서울행정법원', '서울회생법원'],


			gyeonggi: ['의정부지법', '고양지원', '인천지법', '부천지원', '인천가정법원', '부천지원(가정)', '수원지방법원', 
					'성남지원', '여주지원', '평택지원', '안산지원', '안양지원', '수원가정법원', '성남지원(가정)', '여주지원(가정)', 
					'평택지원(가정)', '안산지원(가정)', '안양지원(가정)', '포천시법원', '가평군법원', '남양주시법원', '연천군법원', 
					'동두천시법원', '파주시법원', '강화군법원', '김포시법원', '오산시법원', '용인시법원', '광주시법원', '양평군법원', 
					'이천시법원', '안성시법원', '광명시법원'],
		
			gangwon: ['춘천지방법원', '강릉지원', '원주지원', '속초지원', '영월지원', '철원군법원', '인제군법원', '홍천군법원', '양구군법원', 
					'화천군법원', '삼척시법원', '동해시법원', '횡성군법원', '고성군법원', '양양군법원', '정선군법원', '태백시법원', '평창군법원'],
		
			chungbug: ['청주지방법원', '충주지원', '제천지원', '영동지원', '보은군법원', '괴산군법원', '진천군법원', '음성군법원', '단양군법원', '옥천군법원'],

			daejeon: ['대전지방법원', '홍성지원', '공주지원', '논산지원', '서산지원', '천안지원', '대전가정법원', '홍성지원(가정)', 
					'공주지원(가정)', '논산지원(가정)', '서산지원(가정)', '천안지원(가정)', '세종시법원', '금산군법원', '서천군법원', 
					'보령시법원', '예산군법원', '청양군법원', '부여군법원', '태안군법원', '당진시법원', '아산시법원'],

			daegu: ['대구지방법원', '대구서부지원', '안동지원', '경주지원', '포항지원', '김천지원', '상주지원', '의성지원', 
					'영덕지원', '대구가정법원', '안동지원(가정)', '경주지원(가정)', '포항지원(가정)', '김천지원(가정)', 
					'상주지원(가정)', '의성지원(가정)', '영덕지원(가정)', '청도군법원', '영천시법원', '칠곡군법원', '경산시법원', 
					'성주군법원', '고령군법원', '영주시법원', '봉화군법원', '구미시법원', '문경시법원', '예천군법원', '군위군법원', 
					'청송군법원', '영양군법원', '울진군법원'],

			busan: ['부산지방법원', '부산동부지원', '부산서부지원', '부산가정법원', '울산지방법원', '울산가정법원', '창원지방법원', 
					'마산지원', '진주지원', '통영지원', '밀양지원', '거창지원', '양산시법원', '창원남부시법원', '김해시법원', 
					'함안군법원', '의령군법원', '하동군법원', '사천시법원', '남해군법원', '산청군법원', '거제시법원', '고성군법원', 
					'창녕군법원', '합천군법원', '함양군법원'],

			gwangju: ['광주지방법원', '목포지원', '장흥지원', '순천지원', '해남지원', '광주가정법원', '목포지원(가정)', '장흥지원(가정)', 
					'순천지원(가정)', '해남지원(가정)', '담양군법원', '곡성군법원', '화순군법원', '나주시법원', '영광군법원', '장성군법원', 
					'함평군법원', '영암군법원', '무안군법원', '강진군법원', '고흥군법원', '광양시법원', '구례군법원', '보성군법원', 
					'여수시법원', '완도군법원', '진도군법원'],

			jeonju: ['전주지방법원', '군산지원', '정읍지원', '남원지원', '김제시법원', '진안군법원', '무주군법원', 
					'임실군법원', '익산시법원', '고창군법원', '부안군법원', '장수군법원', '순창군법원'],

			jeju: ['제주지방법원', '서귀포시법원'],

			// etc: ['법원행정처'],

			courts: [],

			searchValue: '',
			searching: false,
			result: [],
        })

		this.selectHandler = this.selectHandler.bind(this)

		this.searchHandle = this.searchHandle.bind(this)
		this.searchItem = this.searchItem.bind(this)
		this.cancelSearch = this.cancelSearch.bind(this)
    }


	selectHandler(courtName) {

		this.props.setCase({
			court: courtName
		});

		// 최근 선택한 항목에 넣기
		let latestCourts = []
		latestCourts = this.state.latestCourts

		// 먼저 중복값 체크, 중복된 값이면 위치만 0번 인덱스로 바꾸고 넘어감
		if(latestCourts.includes(courtName)) {

			// 먼저 없앰
			latestCourts = latestCourts.filter((value) => value !== courtName)

			// 그리고 배열 앞에 추가
			latestCourts.splice(0, 0, courtName)


		} else {
			// 배열길이 10이상인지 체크 (삭제 판단)
			if(latestCourts.length >= 10) {
				latestCourts.splice(latestCourts.length - 1, 1)
			}

			// 배열 앞에 추가함
			latestCourts.splice(0, 0, courtName)

		}

		this.props.setLatest({
			courts: latestCourts
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

		this.state.courts.map((outerValue) => {
			
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
			})
		} else {
			SimpleToast.show("일치하는 법원이 없습니다.", SimpleToast.BOTTOM)
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

		const latestCourts = store.getState().latest.courts

		this.setState({
			latestCourts: latestCourts,
			courts: [
				this.state.high,
				this.state.seoul,
				this.state.gyeonggi,
				this.state.gangwon,
				this.state.chungbug,
				this.state.daejeon,
				this.state.daegu,
				this.state.busan,
				this.state.gwangju,
				this.state.jeonju,
				this.state.jeju
			],
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.Top}>
					<View style={styles.header}>
						<View style={styles.title}>
							<Text style={styles.titleText}>법원 선택</Text>
						</View>
						<TouchableOpacity style={styles.exit} onPress={() => this.props.navigation.pop()} >
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
					</View>
					<View style={styles.contentContainer}>
                        {/* 검색창 */}
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
									<TouchableOpacity style={{flex: 1}}  onPress={() => this.cancelSearch()}>
										<Image source={require('../../assets/images/X.png')} />
									</TouchableOpacity>
								) : (
									<TouchableOpacity  onPress={() => this.searchItem()}>
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
											this.state.result.map((court) => (
												<TouchableOpacity style={styles.button} key={`${court}`} onPress={() => this.selectHandler(`${court}`)}>
													<Text style={styles.buttonText}>{court}</Text>
												</TouchableOpacity>
											))
										}
									</View>
								</View>
							</>
						) : (
							<>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="기존검색 (10개)" data={this.state.latestCourts} expanded />
								</View>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="대법/고법/특허" data={this.state.high} />
								</View>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="서울" data={this.state.seoul} />
								</View>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="인천/경기" data={this.state.gyeonggi} />
								</View>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="강원" data={this.state.gangwon} />
								</View>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="충북" data={this.state.chungbug} />
								</View>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="대전/세종/충남" data={this.state.daejeon} />
								</View>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="대구/경북" data={this.state.daegu} />
								</View>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="부산/울산/경남" data={this.state.busan} />
								</View>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="광주/전남" data={this.state.gwangju} />
								</View>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="전주" data={this.state.jeonju} />
								</View>
								<View style={styles.listContainer}>
									<Accordion selectHandler={this.selectHandler} title="제주" data={this.state.jeju} />
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
		court: state.cases.court,
		latestCourts: state.latest.courts,
	}
};

const mapDispatchToProps = {
	setCase, setLatest
}

export default connect(mapStateToProps, mapDispatchToProps)(CourtSelect);

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
        // margin: 15,
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