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
import SettingItem from '../Setting/SettingItem';
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import CheckBox from '@react-native-community/checkbox';

class CourtSelect extends Component {

	constructor() {
        super();
        this.state = {
            category: 'all',
            collapse1: false,
            collapse2: false,
            collapse3: false,
        }

        this.toggleCollapse = this.toggleCollapse.bind(this);
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

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.Top}>
					<View style={styles.header}>
						<TouchableOpacity style={styles.exit}>
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
						<View style={styles.title}>
							<Text style={styles.titleText}>사건구분 선택</Text>
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
								<TouchableOpacity style={styles.button}>
									<Text style={styles.buttonText}>가단</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button}>
									<Text style={styles.buttonText}>가합</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button}>
									<Text style={styles.buttonText}>가소</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button}>
									<Text style={styles.buttonText}>나</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.buttonBottom}>
								<TouchableOpacity style={styles.button}>
									<Text style={styles.buttonText}>재가단</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button}>
									<Text style={styles.buttonText}>재가합</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
					<View style={styles.listContainer}>
						<Collapse onToggle={() => this.toggleCollapse(1)}>
							<CollapseHeader style={styles.categoryButton, styles.bottomLine}>
								<View style={styles.categoryHeader}>
									<Text style={styles.categoryTitle}>민사사건</Text>
									{
										this.state.collapse1 ? (
											<Image style={styles.categoryImage, {marginRight: 13}} source={require('../../assets/images/Minus.png')} />
										) : (
											<Image style={styles.categoryImage} source={require('../../assets/images/CaretDown.png')} />
										)
									}
								</View>
							</CollapseHeader>
							<CollapseBody></CollapseBody>
						</Collapse>
						<Collapse onToggle={() => this.toggleCollapse(2)}>
							<CollapseHeader style={styles.categoryButton, styles.bottomLine}>
								<View style={styles.categoryHeader}>
									<Text style={styles.categoryTitle}>형사사건</Text>
									{
										this.state.collapse2 ? (
											<Image style={styles.categoryImage, {marginRight: 13}} source={require('../../assets/images/Minus.png')} />
										) : (
											<Image style={styles.categoryImage} source={require('../../assets/images/CaretDown.png')} />
										)
									}
								</View>
							</CollapseHeader>
							<CollapseBody></CollapseBody>
						</Collapse>
						<Collapse onToggle={() => this.toggleCollapse(3)}>
							<CollapseHeader style={styles.categoryButton, styles.bottomLine}>
								<View style={styles.categoryHeader}>
									<Text style={styles.categoryTitle}>가사사건</Text>
									{
										this.state.collapse3 ? (
											<Image style={styles.categoryImage, {marginRight: 13}} source={require('../../assets/images/Minus.png')} />
										) : (
											<Image style={styles.categoryImage} source={require('../../assets/images/CaretDown.png')} />
										)
									}
								</View>
							</CollapseHeader>
							<CollapseBody></CollapseBody>
						</Collapse>
					</View>
				</View>
			</View>
		);
	}
}

export default CourtSelect;

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
		flexDirection: 'column',
		padding: 10,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
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