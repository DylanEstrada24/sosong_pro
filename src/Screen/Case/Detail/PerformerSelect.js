import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	StyleSheet,
	Image,
} from 'react-native';
import BlueDot from '../../../Components/BlueDot';
import { RadioButton } from 'react-native-paper';
import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class PreformerSelect extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			searchValue: '',
			category: 'party',
			name: '',
		})

		this.searchItem = this.searchItem.bind(this)

	}

	searchItem() {
		return
	}

	render() {
		return (
			<View style={styles.container}>
				<KeyboardAwareScrollView style={{flex: 1, flexDirection: 'column', margin: 10,}} scrollEnabled={true}>
					<View>
						<View style={styles.headerContainer}>
							<View>
								<TouchableOpacity style={styles.titleText} onPress={() => this.props.toggleModal()}>
									<Image source={require("../../../assets/images/X.png")} />
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.content}>
							<View style={styles.contentTop}>
								<View style={styles.inputContainer}>
									<View style={styles.inputTop}>
										<View style={styles.inputTopLeft}>
											<BlueDot />
											<Text style={styles.inputHeader}>작업ToDo 수행자 선택</Text>
										</View>
									</View>
									<View style={styles.inputBottom}>
										<Text style={styles.headerText}>본 사건의 당사자 / 대리인에서 사용자의 성함을 찾을 수 없거나 중복됩니다.</Text>
										<Text style={styles.headerText}>
											본 사건에서 사용자가 작업ToDo의 실수행자로서 작업ToDo 사용을 원하시면 
											아래에서 <Text style={{color: '#0078D4', fontWeight: 'bold'}}>사용자 또는 사용자의 소속을 선택</Text>하여 주시기 바랍니다.
										</Text>
									</View>
								</View>
							</View>
						</View>
						<View style={styles.tabButtonContainer}>
							<TouchableOpacity 
								style={[styles.tabButton, this.state.category === 'party' ? styles.active : styles.disable]}
								onPress={() => this.setState({category: 'party', name: ''})}
							>
								<View style={styles.tabButtonView}>
									<Text style={styles.enroll}>당사자</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity 
								style={[styles.tabButton, this.state.category === 'representative' ? styles.active : styles.disable]}
								onPress={() => this.setState({category: 'representative', name: ''})}
							>
								<View style={styles.tabButtonView}>
									<Text style={styles.enroll}>대리인</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity 
								style={[styles.tabButton, this.state.category === 'no' ? styles.active : styles.disable]}
								onPress={() => this.setState({category: 'no', name: ''})}
							>
								<View style={styles.tabButtonView}>
									<Text style={styles.enroll}>사용안함</Text>
								</View>
							</TouchableOpacity>
						</View>
						{
							this.state.category !== 'no' ? (
								<View style={styles.content}>
									<View style={styles.contentContainer_gray}>
										<View style={styles.title}>
											<Text style={styles.titleText}>
												구분
											</Text>
										</View>
										<View style={styles.content}>
											<Text style={styles.contentText}>
												이름
											</Text>
										</View>
									</View>
									{
										this.state.category === 'party' ? (
											this.props.party !== undefined ? (
												this.props.party.map((value) => {
													return (
														<View style={styles.contentContainer}>
															<View style={styles.title}>
																<RadioButton 
																	value={value.name}
																	status={ this.state.name === value.name ? 'checked' : 'unchecked' }
																	onPress={() => this.setState({ name: value.name })}
																	color="#0078d4"
																/>
																<Text style={styles.titleText}>
																	{value.Classification}
																</Text>
															</View>
															<View style={styles.content}>
																<Text style={styles.contentText}>
																	{value.name}
																</Text>
															</View>
														</View>
													)
												})
											) : (
												<View>
													<Text>당사자가 없습니다.</Text>
												</View>
											)
										) : (
											this.props.representative !== undefined ? (
												this.props.representative.map((value) => {
													return (
														<View style={styles.contentContainer}>
															<View style={styles.title}>
																<RadioButton 
																	value={value.name}
																	status={ this.state.name === value.name ? 'checked' : 'unchecked' }
																	onPress={() => this.setState({ name: value.name })}
																	color="#0078d4"
																/>
																<Text style={styles.titleText}>
																	{value.Classification}
																</Text>
															</View>
															<View style={styles.content}>
																<Text style={styles.contentText}>
																	{value.name}
																</Text>
															</View>
														</View>
													)
												})
											) : (
												<View>
													<Text>대리인이 없습니다.</Text>
												</View>
											)
										)
									}
								</View>
							) : (
								<></>
							)
						}
						{
							this.state.category !== 'no' ? (
								<View style={styles.content2}>
									<View style={styles.contentTop}>
										<View style={styles.inputContainer}>
											<View style={styles.searchContainer}>
												<TextInput 
													style={styles.input} 
													value={this.state.searchValue}
													onChangeText={(value) => this.setState({searchValue: value})}
													placeholder="검색어를 입력하세요."
													placeholderTextColor="#808080"
												/>
												<TouchableOpacity onPress={() => this.searchItem()}>
													<Image source={require('../../../assets/images/MagnifyingGlass.png')} />
												</TouchableOpacity>
											</View>
										</View>
									</View>
								</View>
							) : (<></>)
						}
						<View style={styles.buttonContainer}>
							<TouchableOpacity 
								style={styles.button} 
								onPress={() => this.props.setPerformer(this.state.category, this.state.name)} 
							>
								<Text style={styles.enroll}>확인</Text>
							</TouchableOpacity>
							<Text style={{color: '#808080'}}>· ToDo 탭에서 수행자 재설정이 가능합니다.</Text>
						</View>
					</View>
				</KeyboardAwareScrollView>
			</View>
		);
	}
}

export default PreformerSelect;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',

	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	headerLeft: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: "center",
	},
	contentContainer: {
		flexDirection: 'column',
		width: '90%',
		justifyContent: 'center',
	},
	content2: {
		width: '100%',
		marginTop: 28,
		marginBottom: 14,
	},
	contentTop: {
		
	},
	inputContainer: {

	},
	tabButtonContainer: {
		justifyContent: 'space-around',
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 10,
		marginBottom: 10,
	},
	inputTop: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		paddingLeft: 7,
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	inputTopLeft: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	inputTopRight: {

	},
	inputHeader: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	inputBottom: {
		marginTop: 7,
	},
	headerText: {
		fontSize: 14,
	},
	searchContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		width: '100%',
	},
	input: {
		backgroundColor: '#E5E5E5',
		borderRadius: 5,
		paddingLeft: 23,
		width: '80%',
		color: '#000',
	},
	buttonContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'flex-start',
		marginTop: 20,
	},
	button: {
		width: '100%',
		backgroundColor: '#0078d4',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		height: 35,
	},
	tabButton: {
		borderRadius: 5,
	},
	active: {
		backgroundColor: '#0078D4'
	},
	disable: {
		backgroundColor: '#808080'
	},
	tabButtonView: {
		marginTop: 5,
		marginBottom: 5,
		marginLeft: 20,
		marginRight: 20,
	},
	enroll: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	contentContainer: {
        flexDirection: "row",
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: '#FFFFFF',
    },
    contentContainer_gray: {
        flexDirection: 'row',
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: '#F4F4F4',
    },
    title: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
		flexDirection: 'row',
    },
    titleText: {
        fontSize: 13,
        fontWeight: "bold",
        color: '#808080'
    },
    content: {
        flex: 4,
        justifyContent: "center",
        alignItems: "center",
    },
    contentText: {
        fontSize: 13
    },
})