import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
    Dimensions,
    TouchableOpacity,
	Image,
} from 'react-native';

import BlueDot from '../../Components/BlueDot';
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import HeaderText from '../../Components/HeaderText';

class ToDoExplan extends Component {

	constructor(props) {
		super(props)
		this.state = ({
			collapse1: true,
            collapse2: false,
		})

	}

	toggleCollapse = (num) => {
		if(num === 1) {
            this.setState({collapse1: !this.state.collapse1})
        } else if(num === 2) {
            this.setState({collapse2: !this.state.collapse2})
        }
	}

	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        <HeaderText title="작업ToDo 작동방식 설명" />
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                            <Image source={require('../../assets/images/X.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
				<View style={{flex: 0.85, width: "90%", marginLeft: "5%", marginRight: "5%", marginBottom: 5,}}>
					<View style={styles.itemContainer}>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>· 작업ToDo는 소송 진행내용을 분석하여 사용자가 소송 진행을 위해 <Text style={styles.bold}>작성해야 하는 서면과 마감일을 예측</Text>하여 정보를 제공해드리는 프로세스입니다. (특허출원 중)</Text>
							</View>
						</View>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>· <Text style={styles.bold}>작업ToDo의 자동 예측 결과는 참고용</Text>으로써 사용자의 실제 해야 할 업무 및 실제 마감일과 차이가 발생할 수 있음을 말씀드리며, <Text style={styles.bold}>이를 확인할 책임은 사용자에게 있습니다.</Text></Text>
							</View>
						</View>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>· 작업ToDo의 프로세스는 아래와 같습니다. </Text>
							</View>
						</View>
					</View>
					<View style={styles.collapseContainer}>
						<Collapse onToggle={() => this.toggleCollapse(1)} isExpanded={true} style={styles.collapse}>
							<CollapseHeader style={styles.categoryButton}>
								<View style={styles.categoryHeader}>
									<View style={styles.categoryHeaderLeft}>
										<BlueDot color={'#1CAA99'}/>
										<Text style={styles.categoryTitle}>기본 프로세스</Text>
									</View>
									{
										this.state.collapse1 ? (
											<Image style={styles.categoryImage} source={require('../../assets/images/CaretUp.png')} />
										) : (
											<Image style={styles.categoryImage} source={require('../../assets/images/CaretDown.png')} />
										)
									}
								</View>
							</CollapseHeader>
							<CollapseBody>
								<View style={styles.collapseBodyContainer}>

								</View>
							</CollapseBody>
						</Collapse>
						<Collapse onToggle={() => this.toggleCollapse(2)} style={styles.collapse}>
							<CollapseHeader style={styles.categoryButton}>
								<View style={styles.categoryHeader}>
									<View style={styles.categoryHeaderLeft}>
										<BlueDot color={'#1CAA99'}/>
										<Text style={styles.categoryTitle}>구독 시 추가 프로세스</Text>
									</View>
									{
										this.state.collapse2 ? (
											<Image style={styles.categoryImage} source={require('../../assets/images/CaretUp.png')} />
										) : (
											<Image style={styles.categoryImage} source={require('../../assets/images/CaretDown.png')} />
										)
									}
								</View>
							</CollapseHeader>
							<CollapseBody>
								<View style={styles.collapseBodyContainer}>

								</View>
							</CollapseBody>
						</Collapse>
					</View>
				</View>
			</View>
		);
	}
}

export default ToDoExplan;

const styles = StyleSheet.create({
	headerContainer: {
		marginTop: 10,
        marginBottom: 30,
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: 'flex-start',
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	headerLeft: {
        marginLeft: Dimensions.get('window').width / 20
	},
	headerRight: {
        marginRight: Dimensions.get('window').width / 20
	},
	itemContainer: {
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	contentContainer: {
		width: "95%",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 16,
		marginLeft: "auto",
		marginRight: "auto",
		paddingBottom: 20,
	},
	contentText: {
		fontSize: 13,
	},
	bold: {
		color: '#0078D4', 
		fontWeight: 'bold'
	},
    buttonContainer: {
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		marginTop: 50,
	},
	button: {
		width: '100%',
		backgroundColor: '#0078d4',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		height: 35,
	},
	enroll: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	collapse: {
        marginTop: 10,
    },
    categoryButton: {
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: 5,
        marginBottom: 5,
        height: 30,
    },
    categoryHeaderLeft: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginLeft: 5,
    },
    categoryTitle: {
        color: '#000',
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 5,
    },
    categoryImage: {
        marginRight: 10,
    },
});