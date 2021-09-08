import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	StyleSheet,
	Dimensions,
} from 'react-native';

// import BlueDot from '../../Components/BlueDot';
// import SettingItem from '../Setting/SettingItem';
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
// import CheckBox from '@react-native-community/checkbox';
import { store } from '../../redux/store';
import { connect } from 'react-redux';
import { setCase } from '../../redux/actions/cases';

class CourtSelect extends Component {

	constructor() {
        super();
        this.state = {
            collapse1: false,
            collapse2: false,
            collapse3: false,
			court: '',
        }

        this.toggleCollapse = this.toggleCollapse.bind(this);
		() => this.selectHandler = () => this.selectHandler.bind(this)
    }

    toggleCollapse(num) {
        if(num === 1) {
            this.setState({collapse1: !this.state.collapse1})
        } else if(num === 2) {
            this.setState({collapse2: !this.state.collapse2})
        } else if(num === 3) {
            this.setState({collapse3: !this.state.collapse3})
        }
    }

	selectHandler(courtName) {
		const cases = {
			court: courtName
		}

		this.props.setCase({
			court: cases.court
		});
		// this.props.courtCallback();
		this.props.navigation.pop();

	}

	render() {

		const high = ['대법원', '서울고등법원', '수원고등법원', '대전고등법원', '대구고등법원', '부산고등법원',
					'광주고등법원', '특허법원', '서울가정법원', '수원가정법원', '대구가정법원', '대전가정법원', 
					'광주가정법원', '부산가정법원', '인천가정법원', '울산가정법원', '서울행정법원', '서울회생법원']

		const seoul = ['대법원', '서울고등법원', '서울중앙지방법원', '서울동부지방법원', '서울남부지방법원', '서울북부지방법원',
					 '서울서부지방법원', '서울가정법원', '서울행정법원', '서울회생법원', 
					 '의정부지방법원', '의정부지방법원 고양지원', '의정부지방법원 남양주지원', 
					 '인천지방법원', '인천지방법원 부천지원',
					 '춘천지방법원', '춘천지방법원 강릉지원', '춘천지방법원 원주지원', '춘천지방법원 속초지원', '춘천지방법원 영월지원']

		const gyeonggi = ['수원지방법원', '수원지방법원 성남지원', '수원지방법원 안산지원', '수원지방법원 평택지원', '수원지방법원 여주지원', '수원지방법원 안양지원']

		return (
			<View style={styles.container}>
				<View style={styles.Top}>
					<View style={styles.header}>
						<TouchableOpacity style={styles.exit} onPress={() => this.props.navigation.pop()} >
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
						<View style={styles.title}>
							<Text style={styles.titleText}>법원 선택</Text>
						</View>
					</View>
					<View style={styles.contentContainer}>
                        {/* 검색창 */}
						<View style={styles.content}>
                            <TextInput style={styles.textInput} placeholder="검색어를 입력하세요." />
							<TouchableOpacity>
								<Image source={require('../../assets/images/MagnifyingGlass.png')} />
							</TouchableOpacity>
						</View>
						<View style={styles.buttonContainer}>
							<View style={styles.buttonTop}>
								<TouchableOpacity style={styles.button} key={"서울중앙지방법원"} onPress={() => this.selectHandler("서울중앙지방법원")}>
									<Text style={styles.buttonText}>서울중앙지방법원</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button} key="특허법원" onPress={() => this.selectHandler("특허법원")}>
									<Text style={styles.buttonText}>특허법원</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button} key="대법원" onPress={() => this.selectHandler("대법원")}>
									<Text style={styles.buttonText}>대법원</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.buttonBottom}>
								<TouchableOpacity style={styles.button} key="서울동부지방법원" onPress={() => this.selectHandler("서울동부지방법원")}>
									<Text style={styles.buttonText}>서울동부지방법원</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button} key="대전지방법원" onPress={() => this.selectHandler("대전지방법원")}>
									<Text style={styles.buttonText}>대전지방법원</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={styles.listContainer}>
						<Collapse onToggle={() => this.toggleCollapse(1)}>
							<CollapseHeader style={styles.categoryButton, styles.bottomLine}>
								<View style={styles.categoryHeader}>
									<Text style={styles.categoryTitle}>대법 / 고법 / 특수</Text>
									{
										this.state.collapse1 ? (
											<Image style={styles.categoryImage, {marginRight: 13}} source={require('../../assets/images/Minus.png')} />
										) : (
											<Image style={styles.categoryImage} source={require('../../assets/images/CaretDown.png')} />
										)
									}
								</View>
							</CollapseHeader>
							<CollapseBody>
								<View style={styles.buttonContainer}>
									{
										high.map((court) => (
											<TouchableOpacity style={styles.button} key={`${court}`} onPress={() => this.selectHandler(`${court}`)}>
												<Text style={styles.buttonText}>{court}</Text>
											</TouchableOpacity>
										))
									}
								</View>
							</CollapseBody>
						</Collapse>
						<Collapse onToggle={() => this.toggleCollapse(2)}>
							<CollapseHeader style={styles.categoryButton, styles.bottomLine}>
								<View style={styles.categoryHeader}>
									<Text style={styles.categoryTitle}>서울지역</Text>
									{
										this.state.collapse2 ? (
											<Image style={styles.categoryImage, {marginRight: 13}} source={require('../../assets/images/Minus.png')} />
										) : (
											<Image style={styles.categoryImage} source={require('../../assets/images/CaretDown.png')} />
										)
									}
								</View>
							</CollapseHeader>
							<CollapseBody>
								<View style={styles.buttonContainer}>
									{
										seoul.map((court) => (
											<TouchableOpacity style={styles.button} key={`${court}`} onPress={() => this.selectHandler(`${court}`)}>
												<Text style={styles.buttonText}>{court}</Text>
											</TouchableOpacity>
										))
									}
								</View>
							</CollapseBody>
						</Collapse>
						<Collapse onToggle={() => this.toggleCollapse(3)}>
							<CollapseHeader style={styles.categoryButton, styles.bottomLine}>
								<View style={styles.categoryHeader}>
									<Text style={styles.categoryTitle}>경기지역</Text>
									{
										this.state.collapse3 ? (
											<Image style={styles.categoryImage, {marginRight: 13}} source={require('../../assets/images/Minus.png')} />
										) : (
											<Image style={styles.categoryImage} source={require('../../assets/images/CaretDown.png')} />
										)
									}
								</View>
							</CollapseHeader>
							<CollapseBody>
								<View style={styles.buttonContainer}>
									{
										gyeonggi.map((court) => (
											<TouchableOpacity style={styles.button} key={`${court}`} onPress={() => this.selectHandler(`${court}`)}>
												<Text style={styles.buttonText}>{court}</Text>
											</TouchableOpacity>
										))
									}
								</View>
							</CollapseBody>
						</Collapse>
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		court: state.cases.court
	}
};

const mapDispatchToProps = {
	setCase,
}

export default connect(mapStateToProps, mapDispatchToProps)(CourtSelect);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
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
		width: '90%',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: Dimensions.get('window').width / 20,
		marginRight: Dimensions.get('window').width / 20,
		marginTop: 12,
	},
	content: {
		flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
		// marginBottom: 10,
		paddingBottom: 10,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		width: '100%',
	},
	textInput: {
		backgroundColor: '#E5E5E5',
		borderRadius: 5,
		// height: 32,
		paddingLeft: 19,
		width: '90%',
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
		borderColor: '#2665A1',
		borderWidth: 1,
		borderRadius: 10,
		margin: 3,
	},
	buttonText: {
		fontSize: 13,
		fontWeight: 'bold',
		color: '#2665A1',
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
        // backgroundColor: "#2665A1",
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
        color: '#2665A1',
        fontSize: 15,
        fontWeight: "bold",
        // paddingLeft: 16,
    },
    categoryImage: {
        marginRight: 10,
        // color: "#FFFFFF",
    },
})