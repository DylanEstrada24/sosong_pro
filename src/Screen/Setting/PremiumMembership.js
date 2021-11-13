import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    Platform,
    Alert,
    Dimensions,
    StyleSheet,
    Image,
    ScrollView,
} from 'react-native';
import BlueDot from '../../Components/BlueDot';
import * as RNIap from 'react-native-iap';
import { store } from '../../redux/store';
import { setUser } from '../../redux/actions/user';
import { commonApi } from '../../Common/ApiConnector';
import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';
import { connect } from 'react-redux';

class PremiumMembership extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            tableHead: ['구분', '비구독', '구독'],
            tableData: [
                ['사건수', '5건', '100건'],
                ['전자소송 등록사건 \n가져오기', 'X', 'O'],
                ['사용자일정 등록', 'X', 'O'],
                ['작업ToDo\n자동 프로세스', 'X', 'O']
            ],
            resultText0: {},
            resultText1: {},
            resultText2: {},
        }
    }

    

    async componentDidMount() {
        // 스토어에 등록된 상품 추가
        let items = Platform.select({
            ios: ['com.hidev.sosongpro.ssproplusmembership'],
        android: ['ssproplusmembership'],
        });

        try {
            const result = await RNIap.initConnection();
            console.log('result....', result);
            await RNIap.flushFailedPurchasesCachedAsPendingAndroid().then(async () => {
                console.log("in flush")
                console.log("otem",items)
                await RNIap.getSubscriptions(items).then((products) => {
                    console.log('get', products)
                }).catch((error) => {
                    console.log('err',error.message);
                })
            })
            .catch((e) => {
                console.log("flush err", e)
            })
        } catch (err) {
            console.warn(err.code, err.message);
        }
    }

    async buyProduct() {

        var subItem = 'ssproplusmembership';
        // var subItem = 'android.test.purchased';

        // this.setState({isFetching: true})

        if (Platform.OS == 'android') {
            console.log("request sub")
            await RNIap.requestSubscription(subItem).then((purchase) => {
                console.log("purcahse",purchase)
                this.setState({resultText0: purchase})
                // Alert.alert(purchase)

                RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken).then(() => {
                    // then 확인 해봐야됨.
                    RNIap.finishTransaction(purchase, true).then(() => {
                        this.updateAuth();
                    }).catch(err => {
                        console.log(err.code, err.message);
                    });
                });
    
                const params = {
                    userIdx: store.getState().user.userIdx,
                    kind: purchase.kind,
                    purchaseTimeMillis: purchase.purchaseTimeMillis,
                    purchaseState: purchase.purchaseState,
                    consumptionState: purchase.consumptionState,
                    developerPayload: purchase.developerPayload,
                    orderId: purchase.orderId,
                    purchaseType: purchase.purchaseType,
                    acknowledgementState: purchase.acknowledgementState,
                    purchaseToken: purchase.purchaseToken,
                    productId: purchase.productId,
                    quantity: purchase.quantity,
                    obfuscatedExternalAccountId: purchase.obfuscatedExternalAccountId,
                    obfuscatedExternalProfileId: purchase.obfuscatedExternalProfileId,
                    regionCode: purchase.regionCode
                }

                this.setState({resultText1: params})

                

                // const response = commonApi('post', `purchase/${params.purchaseToken}`, params); // url 변경해야됨
                // const response = commonApi('GET', `purchase/${params.purchaseToken}`, {}); // url 변경해야됨
                // response.then(res=>{
                //     this.setState({resultText2: res})
                //     if(res === 'success'){
                //         this.updateAuth(purchase.productId, res.data);
                //     } else {
                //         SimpleToast.show(res.msg, SimpleToast.BOTTOM)
                //     }
                // }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))
    
            }).catch((error) => {
                console.log('err', error);
                // this.setState({isFetching: false})
            })
        }

    }

    async updateAuth(){
        const params = {
            userIdx: store.getState().user.userIdx,
            userType: 'member'
        }
        await commonApi('POST', `admin/update/user/type`, params)
            .then((result) => {
                if(result.success){
                    SimpleToast.show(('결제가 완료되었습니다.'), SimpleToast.SHORT);
                    // this.setState({isFetching: false});

                    this.props.setUser({
                        userType: 'member'
                    })
                    
                    this.props.navigation.state.params.refresh();
                    this.props.navigation.goBack();
                }else{
                    SimpleToast.show(result.message, SimpleToast.SHORT);
                    // this.setState({isFetching: false});
                }
            })
            .catch((error) => {
                console.log(error);
                SimpleToast.show(error.msg, SimpleToast.BOTTOM)
                // this.setState({isFetching: false});
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{flex: 1,}}>
                    <View style={styles.header}>
                        {/* <BlueDot />
                        <Text style={styles.title}>구독 회원 혜택</Text> */}
                        <View style={styles.title}>
                            <Text style={styles.titleText}>멤버십 관리</Text>
                        </View>
                        <TouchableOpacity style={styles.exit} onPress={() => this.props.navigation.pop()} >
                            <Image source={require('../../assets/images/X.png')} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={styles.content}>
                            <Text style={styles.explanText}>
                                소송프로를 구독하시면 아래 서비스들이 {'\n'}
                                추가로 제공됩니다.
                            </Text>
                        </View>
                        {/* <View style={styles.inputContainer}>
                            <TextInput style={styles.textInput} placeholder="4자 이상(한글은 2자 이상)" placeholderTextColor="#808080" />
                        </View> */}
                        <View style={styles.tableContainer}>
                            <Table borderStyle={{borderWidth: 1, borderColor: "#D8D8D8"}}>
                                <Row data={this.state.tableHead} style={styles.head} flexArr={[4, 3, 3]} textStyle={styles.text}/>
                                <Rows data={this.state.tableData} style={styles.row} flexArr={[4, 3, 3]} textStyle={styles.text}/>
                            </Table>
                        </View>
                        <View style={styles.tableUnderText}>
                            <Text style={{fontSize: 13,}}>· 구독 시 처음 1개월 무료</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            {/* <TouchableOpacity style={styles.cancel} onPress={() => this.props.navigation.pop()}>
                                <View>
                                    <Text style={styles.buttonText}>취소</Text>
                                </View>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styles.submit} onPress={() => this.buyProduct()}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '90%'}}>
                                    <Text style={styles.buttonText}>소송프로 구독</Text>
                                    <Text style={styles.buttonText}>10,000원/1개월</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.warningContainer}>
                            <Text style={styles.warningHeader}>주의사항</Text>
                            <Text style={styles.warningText}>· 본 서비스는 정기결제 상품이며 이용요금은 매월 구글플레이 계정으로 청구됩니다.</Text>
                            <Text style={styles.warningText}>· 결제기간 만료 24시간 전까지 정기결제를 해지하지 않으면 자동으로 다음달 요금이 결제됩니다.</Text>
                            <Text style={styles.warningText}>· 구글플레이 어플 정기결제 메뉴에서 언제든지 정기결제를 해지하실 수 있습니다.</Text>
                            <Text style={styles.warningText}>· 정기결제를 해지하시면 남은 결제기간 동안 구독 서비스가 유지되며 결제하신 금액은 환불되지 않습니다. </Text>
                        </View>

                        {/* <View>
                            <Text style={{fontSize: 16}}>purchase</Text>
                            <Text selectable>{JSON.stringify(this.state.resultText0)}</Text>
                        </View>
                        <View>
                            <Text style={{fontSize: 16}}>params</Text>
                            <Text selectable>{JSON.stringify(this.state.resultText1)}</Text>
                        </View>
                        <View style={{marginBottom: 20}}>
                            <Text style={{fontSize: 16}}>purchase/token API result</Text>
                            <Text selectable>{JSON.stringify(this.state.resultText2)}</Text>
                        </View> */}
                    </ScrollView>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.user.token,
    }
}

const mapDispatchToProps = {
	setUser
}

export default connect(mapStateToProps, mapDispatchToProps)(PremiumMembership);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 15,
        // flexDirection: 'column',

    },
    // header: {
    //     flexDirection: 'row',
    //     justifyContent: 'flex-start',
    //     alignItems: 'center',
    //     borderBottomColor: '#C4C4C4',
    //     borderBottomWidth: 1,
    // },
    // title: {
    //     marginLeft: 10,
    //     fontSize: 15,
    //     fontWeight: 'bold',
    // },
    header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		borderBottomColor: '#808080',
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
    title: {

	},
	titleText: {
		fontSize: 20,
		fontWeight: '700',
		marginLeft: 18,
	},
    exit: {
        marginRight: Dimensions.get('window').width / 20
    },
    content: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 60,
        marginBottom: 20,
        marginLeft: Dimensions.get('window').width / 20,
    },
    explanText: {
        fontSize: 19,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    tableContainer: {
        flexDirection: 'column',
        width: '90%',
        // borderWidth: 1,
        // borderColor: '#D8D8D8',
        marginLeft: Dimensions.get('window').width / 20,
    },
    head: {
        height: 30,
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    wrapper: {
        flexDirection: 'row',
    },
    title: {
        flex: 1,
    },
    row: {
        height: 40,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    },
    tableUnderText: {
        width: '90%',
        marginLeft: Dimensions.get('window').width / 20,
    },
    inputContainer: {
        marginTop: 16,
    },
    textInput: {
        backgroundColor: '#E5E5E5',
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30,
    },
    cancel: {
        backgroundColor: '#C4C4C4',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 35,
        borderRadius: 3,
    },
    submit: {
        backgroundColor: '#0078D4',
        justifyContent: 'center',
        alignItems: 'center',
        // width: 150,
        height: 35,
        borderRadius: 3,
        width: '90%',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    warningContainer: {
        width: '90%',
        marginLeft: Dimensions.get('window').width / 20,
        marginTop: 20,
    },
    warningHeader: {
        fontSize: 16
    },
    warningText: {
        fontSize: 14
    },
})