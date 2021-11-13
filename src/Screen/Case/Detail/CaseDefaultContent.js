import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	StyleSheet,
    Dimensions,
} from 'react-native';
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import { store } from '../../../redux/store';
import moment from 'moment';
import WebView from 'react-native-webview';
import { commonApi } from '../../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
import WebViewInline from '../../WebViewInline';


class CaseDetailContent extends Component {

    constructor() {
        super();
        this.state = {
            category: 'all',
            collapse1: true,
            collapse2: false,
            collapse3: false,
            content: '',
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

    componentDidMount() {

        let data = store.getState().cases

        if(data.content === undefined || data.content === null || data.content === '') {
            commonApi('GET', `user/case/caseIdx/${data.caseIdx}`, {}).then((result) => {
                if(result.success === undefined) {
                    this.setState({
                        content: result[0].content
                    })
                    data.content = result[0].content
                } else {
                    SimpleToast.show(result.msg, SimpleToast.BOTTOM)
                }
            }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
        } else {
            this.setState({
                content: data.content
            })
        }

    }

	render() {
		return (
			<ScrollView style={styles.caseContainer}>
                {/* 웹뷰 */}
                <View>
                    <WebViewInline 
                        html={this.state.content} 
                        style={{ 
                            flex:1 , height: Dimensions.get('window').height
                        }} 
                    />
                </View>
                {/* 웹뷰 아닌형식 */}
                {/* <Collapse onToggle={() => this.toggleCollapse(1)} isExpanded={true} style={styles.collapse}>
                    <CollapseHeader style={styles.categoryButton}>
                        <View style={styles.categoryHeader}>
                            <View style={styles.categoryHeaderLeft}>
                                <BlueDot color={'#1CAA99'} />
                                <Text style={styles.categoryTitle}>기본</Text>
                            </View>
                            {
                                this.state.collapse1 ? (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretUp.png')} />
                                ) : (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretDown.png')} />
                                )
                            }
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        <View style={styles.contentContainer_underline}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    법원
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {data.court}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer_underline}>
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
                        <View style={styles.contentContainer_underline}>
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
                        <View style={styles.contentContainer_underline}>
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
                        <View style={styles.contentContainer_underline}>
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
                        <View style={styles.contentContainer_underline}>
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
                        <View style={styles.contentContainer_underline}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    접수일
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                    {
                                        data.receiptAt.includes('T') ? (
                                            moment.tz(data.receiptAt, 'Asia/Seoul').utc(9).format("YYYY-MM-DD")
                                        ) : (
                                            data.receiptAt
                                        )
                                    }
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer_underline}>
                            <View style={styles.title}>
                                <Text style={styles.titleText}>
                                    종국결과
                                </Text>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.contentText}>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer_underline}>
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
                        <View style={styles.contentContainer_underline}>
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
                        <View style={styles.contentContainer_underline}>
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
                        <View style={styles.contentContainer_underline}>
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
                        <View style={styles.contentContainer_underline}>
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
                        <View style={styles.contentContainer_underline}>
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
                <Collapse onToggle={() => this.toggleCollapse(2)} style={styles.collapse}>
                    <CollapseHeader style={styles.categoryButton}>
                        <View style={styles.categoryHeader}>
                            <View style={styles.categoryHeaderLeft}>
                                <BlueDot color={'#1CAA99'} />
                                <Text style={styles.categoryTitle}>당사자내용</Text>
                            </View>
                            {
                                this.state.collapse2 ? (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretUp.png')} />
                                ) : (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretDown.png')} />
                                )
                            }
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        {
                            data.party && 
                            data.party.map((value, index) => {
                                return (
                                    // <View style={
                                    //     index % 2 === 0 ? styles.contentContainer : styles.contentContainer_gray
                                    // }>
                                    <View style={styles.contentContainer_underline}>
                                        <View style={styles.title}>
                                            <Text style={styles.titleText}>
                                                {value.Classification.trim()}
                                            </Text>
                                        </View>
                                        <View style={styles.content}>
                                            <Text style={styles.contentText}>
                                                {value.name.trim()}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </CollapseBody>
                </Collapse>
                <Collapse onToggle={() => this.toggleCollapse(3)} style={styles.collapse}>
                    <CollapseHeader style={styles.categoryButton}>
                        <View style={styles.categoryHeader}>
                            <View style={styles.categoryHeaderLeft}>
                                <BlueDot color={'#1CAA99'} />
                                <Text style={styles.categoryTitle}>대리인내용</Text>
                            </View>
                            {
                                this.state.collapse3 ? (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretUp.png')} />
                                ) : (
                                    <Image style={styles.categoryImage} source={require('../../../assets/images/CaretDown.png')} />
                                )
                            }
                        </View>
                    </CollapseHeader>
                    <CollapseBody>
                        {
                            data.representative && 
                            data.representative.map((value, index) => {
                                return (
                                    // <View style={
                                    //     index % 2 === 0 ? styles.contentContainer : styles.contentContainer_gray
                                    // }>
                                    <View style={styles.contentContainer_underline}>
                                        <View style={styles.title}>
                                            <Text style={styles.titleText}>
                                                {value.Classification.trim()}
                                            </Text>
                                        </View>
                                        <View style={styles.content}>
                                            <Text style={styles.contentText}>
                                                {value.name.trim()}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })
                        }
                    </CollapseBody>
                </Collapse> */}
			</ScrollView>
		);
	}
}

export default CaseDetailContent;

const styles = StyleSheet.create({
	caseContainer: {
		flex: 1,
        margin: 10,
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
        marginLeft: 5,
    },
    categoryImage: {
        marginRight: 10,
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
    contentContainer_underline: {
        flexDirection: 'row',
        paddingTop: 7,
        paddingBottom: 7,
        backgroundColor: '#FFF',
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
    },
    title: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 13,
        color: '#808080',
        flexWrap: "wrap",
    },
    content: {
        flex: 3,
        justifyContent: "center",
        alignItems: "flex-start",
    },
    contentText: {
        fontSize: 13,
        flexWrap: "wrap",
    },
})