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
    StyleSheet
} from 'react-native';
import BlueDot from '../../Components/BlueDot';
import * as RNIap from 'react-native-iap';
import { store } from '../../redux/store';
import { setUser } from '../../redux/actions/user';
import { commonApi } from '../../Common/ApiConnector';

class PremiumMembership extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
        }
    }

    async componentDidMount() {
        // 스토어에 등록된 상품 추가
        let items = Platform.select({
            android: [
                'com.hidev.sosongpro.ssproplusmembership',
            ],
        });

        try {
            const result = await RNIap.initConnection();
            // console.log('result', result);
            await RNIap.flushFailedPurchasesCachedAsPendingAndroid().then(async () => {
                await RNIap.getProducts(items).then((products) => {
                    // console.log('get', products)
                }).catch((error) => {
                    console.log(error.message);
                })

            })

        } catch (err) {
            console.warn(err.code, err.message);
        }
    }

    async buyProduct() {

        var subItem = 'com.hidev.sosongpro.ssproplusmembership';

        // this.setState({isFetching: true})

        if (Platform.OS == 'android') {
            await RNIap.requestPurchase(subItem).then((purchase) => {
                RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken).then(() => {
                    RNIap.finishTransaction(purchase, true).catch(err => {
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
                const response = commonApi('post', `/receipt/android`, params); // url 변경해야됨
                response.then(res=>{
                    if(res.success){
                        this.updateAuth(purchase.productId, res.data);
                    }
                })
    
            }).catch((error) => {
                console.log('err', error);
                // this.setState({isFetching: false})
            })
        }

    }

    async updateAuth(productId, receiptIdx){
        const params = {
            userIdx: store.getState().user.userIdx,
            userType: 'member'
        }
        await commonApi('put', `admin/update/user/type`, params)
            .then((result) => {
                if(result.success){
                    SimpleToast.show(('결제가 완료되었습니다.'), SimpleToast.SHORT);
                    // this.setState({isFetching: false});
                    this.props.navigation.state.params.refresh();
                    this.props.navigation.goBack();
                }else{
                    SimpleToast.show(result.message, SimpleToast.SHORT);
                    // this.setState({isFetching: false});
                }
            })
            .catch((error) => {
                console.log(error);
                // this.setState({isFetching: false});
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <BlueDot />
                    <Text style={styles.title}>구독 회원 혜택</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>
                        구독 회원으로 업그레이드 하시면 {'\n'}
                        사건을 최대 90개까지 등록 가능 합니다.
                    </Text>
                </View>
                {/* <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder="4자 이상(한글은 2자 이상)" />
                </View> */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancel} onPress={() => this.props.navigation.pop()}>
                        <View>
                            <Text style={styles.buttonText}>취소</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submit} onPress={() => this.buyProduct()}>
                        <View>
                            <Text style={styles.buttonText}>9,900원/월</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default PremiumMembership;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15,
        flexDirection: 'column',

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomColor: '#C4C4C4',
        borderBottomWidth: 1,
    },
    title: {
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    content: {
        flexDirection: 'column',
        marginTop: 7,
    },
    text: {
        fontSize: 13,
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        backgroundColor: '#2665A1',
        justifyContent: 'center',
        alignItems: 'center',
        width: 150,
        height: 35,
        borderRadius: 3,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
})