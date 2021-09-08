import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	StyleSheet,
} from 'react-native';
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { store } from '../../../redux/store';

class CaseDetailContent extends Component {

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

        const data = store.getState().cases

		return (
			<ScrollView style={styles.caseContainer}>
                <Collapse onToggle={() => this.toggleCollapse(1)}>
                    <CollapseHeader style={styles.categoryButton}>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.categoryTitle}>기본</Text>
                            {
                                this.state.collapse1 ? (
                                    <Image style={styles.categoryImage, {marginRight: 13}} source={require('../../../assets/images/Minus.png')} />
                                ) : (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretUp.png')} />
                                )
                            }
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={styles.contentContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    사건번호
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.caseNumber}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer_gray}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    사건명
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.caseName}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    원고
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.plaintiff}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer_gray}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    피고
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.defendant}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    재판부
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.judiciary}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer_gray}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    접수일
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {
                                        data.receiptAt.includes('T') ? (
                                            data.receiptAt.split('T')[0]
                                        ) : (
                                            data.receiptAt
                                        )
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    종국결과
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {/* 2017.11.28 이송 */}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer_gray}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    병합구분
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.mergeClassification}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    상소일
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer_gray}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    상소각하일
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    인지액
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.fee}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer_gray}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    판결도달일
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    확정일
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.finalResult}
                                </Text>
                            </View>
                        </View>
                    </CollapseBody>
                </Collapse>
                <Collapse onToggle={() => this.toggleCollapse(2)}>
                    <CollapseHeader style={styles.categoryButton}>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.categoryTitle}>당사자내용</Text>
                            {
                                this.state.collapse2 ? (
                                    <Image style={styles.categoryImage, {marginRight: 13}} source={require('../../../assets/images/Minus.png')} />
                                ) : (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretUp.png')} />
                                )
                            }
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={styles.contentContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    원고
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.plaintiff}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer_gray}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    피고
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.defendant}
                                </Text>
                            </View>
                        </View>
                    </CollapseBody>
                </Collapse>
                <Collapse onToggle={() => this.toggleCollapse(3)}>
                    <CollapseHeader style={styles.categoryButton}>
                        <View style={styles.categoryHeader}>
                            <Text style={styles.categoryTitle}>대리인내용</Text>
                            {
                                this.state.collapse3 ? (
                                    <Image style={styles.categoryImage, {marginRight: 13}} source={require('../../../assets/images/Minus.png')} />
                                ) : (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretUp.png')} />
                                )
                            }
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={styles.contentContainer}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    원고
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.plaintiffDeputy}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer_gray}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    피고
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.defendantDeputy}
                                </Text>
                            </View>
                        </View>
                    </CollapseBody>
                </Collapse>
			</ScrollView>
		);
	}
}

export default CaseDetailContent;

const styles = StyleSheet.create({
	caseContainer: {
		flex: 1,
        margin: 15,
	},
    categoryButton: {
        backgroundColor: "#2665A1",
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
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: "bold",
        paddingLeft: 16,
    },
    categoryImage: {
        marginRight: 10,
        // color: "#FFFFFF",
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 15,
        fontWeight: "bold",
    },
    content: {
        flex: 3,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    contentText: {
        fontSize: 15
    },
})