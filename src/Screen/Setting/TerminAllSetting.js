import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
} from 'react-native';

import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import BlueDot from '../../Components/BlueDot';
import { commonApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
import { store } from '../../redux/store';
import { setUser } from '../../redux/actions/user';
import { connect } from 'react-redux';
import CheckBox from '@react-native-community/checkbox';

class TerminSetting extends Component {
    constructor() {
        super();
        this.state = {
            checked: 'today',
            updateAmCheck: false,
            updatePmCheck: false,
            updateAm: '',
            updatePm: '',
            terminYesterdayCheck: false,
            terminTodayCheck: false,
            terminMinuteCheck: false,
            terminYesterday: '',
            terminToday: '',
            terminMinute: '',
            todoAmCheck: false,
            todoPmCheck: false,
            todoAm: '',
            todoPm: '',
            // times: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
            times: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            minutes: [],
            checkBox: false,
        };

        this.changeTermin = this.changeTermin.bind(this)
    }

    componentDidMount() {
        let minutes = Array(59).fill().map((arr, i) => {
			return 1 + i
		})
        this.setState({
            time: store.getState().user.pushSetting.split(':')[0],
            minutes: minutes,
        })
    }

    changeTermin() {
        // const time = `${this.state.time}:00`

        // commonApi('PUT', `user/pushSetting/${time}`, {}).then((result) => {
        //     console.log(result)

        //     if(result !== undefined) {
        //         if(result.success) {
        //             this.props.setUser({
        //                 pushSetting: time
        //             })
        //             SimpleToast.show("??????????????? ?????????????????????.", SimpleToast.BOTTOM)
        //             this.props.navigation.pop()
        //         } else {
        //             SimpleToast.show(result.msg, SimpleToast.BOTTOM)
        //         }
        //     }

        //     // }).catch((err) => console.log(`user/pushSetting/${time}`, err))
        // }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

        SimpleToast.show("??????????????????.", SimpleToast.BOTTOM)

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.title}>
                        <Text style={styles.titleText}>?????? ?????? ??????</Text>
                    </View>
                    <TouchableOpacity style={styles.exit} onPress={() => this.props.navigation.pop()} >
                        <Image source={require('../../assets/images/X.png')} />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style={styles.content}>
                        <View style={styles.updateContainer}>
                            <Text style={{fontSize: 13,}}>???????????? ???????????? ?????? ??????</Text>
                        </View>
                        <View style={styles.radioContainer}>
                            <View style={styles.radioItemContainer}>
                                <RadioButton
                                    disabled={true} 
                                    value="today"
                                    status={ this.state.updateAmCheck === true ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({ updateAmCheck: !this.state.updateAmCheck })}
                                    color="#0078d4"
                                />
                                <Text>??????</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker 
                                        enabled={false}
                                        selectedValue={this.state.updateAm} 
                                        onValueChange={(val, idx) => {
                                            this.setState({updateAm: val})
                                        }}
                                        style={styles.picker}
                                    >
                                        {
                                            this.state.times.map((time) => (
                                                <Picker.Item label={`${time}???`} value={`${time}`} key={time} style={{fontSize: 14,}}/>
                                            ))
                                        }
                                    </Picker>
                                </View>
                            </View>
                            <View style={[styles.radioItemContainer, {marginLeft: 20,}]}>
                                <RadioButton
                                    disabled={true} 
                                    value="yesterday"
                                    status={ this.state.updatePmCheck === true ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({ updatePmCheck: !this.state.updatePmCheck })}
                                    color="#0078d4"
                                />
                                <Text>??????</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker 
                                        enabled={false}
                                        selectedValue={this.state.updatePm} 
                                        onValueChange={(val, idx) => {
                                            this.setState({updatePm: val})
                                        }}
                                        style={styles.picker}
                                    >
                                        {
                                            this.state.times.map((time) => (
                                                <Picker.Item label={`${time}???`} value={`${time}`} key={time} style={{fontSize: 14,}}/>
                                            ))
                                        }
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <View style={styles.explanContainer}>
                            <Text style={styles.explan}>?? ???????????? ??????</Text>
                            <Text style={styles.explan}>?? ??????????????? ??????????????? ???????????? ?????? ?????? 2???</Text>
                            <Text style={styles.explan}>  ?????????????????? ??????????????????.</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.updateContainer}>
                            <Text style={{fontSize: 13,}}>?????? ??????</Text>
                        </View>
                        <View style={styles.radioContainer2}>
                            <View style={styles.radioItemContainer}>
                                <RadioButton
                                    disabled={true} 
                                    value="today"
                                    status={ this.state.terminYesterdayCheck === true ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({ terminYesterdayCheck: !this.state.terminYesterdayCheck })}
                                    color="#0078d4"
                                />
                                <Text>?????? ?????? ??? ??????</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker 
                                        enabled={false}
                                        selectedValue={this.state.terminYesterday} 
                                        onValueChange={(val, idx) => {
                                            this.setState({terminYesterday: val})
                                        }}
                                        style={styles.picker}
                                    >
                                        {
                                            this.state.times.map((time) => (
                                                <Picker.Item label={`${time}???`} value={`${time}`} key={time} style={{fontSize: 14,}}/>
                                            ))
                                        }
                                    </Picker>
                                </View>
                                <Text>  ?????? ??????</Text>
                            </View>
                            <View style={styles.radioItemContainer}>
                                <RadioButton
                                    disabled={true} 
                                    value="yesterday"
                                    status={ this.state.terminTodayCheck === true ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({ terminTodayCheck: !this.state.terminTodayCheck })}
                                    color="#0078d4"
                                />
                                <Text>?????? ??????     ??????</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker 
                                        enabled={false}
                                        selectedValue={this.state.terminToday} 
                                        onValueChange={(val, idx) => {
                                            this.setState({terminToday: val})
                                        }}
                                        style={styles.picker}
                                    >
                                        {
                                            this.state.times.map((time) => (
                                                <Picker.Item label={`${time}???`} value={`${time}`} key={time} style={{fontSize: 14,}}/>
                                            ))
                                        }
                                    </Picker>
                                </View>
                                <Text>  ?????? ??????</Text>
                            </View>
                            <View style={styles.radioItemContainer}>
                                <RadioButton
                                    disabled={true} 
                                    value="yesterday"
                                    status={ this.state.terminMinuteCheck === true ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({ terminMinuteCheck: !this.state.terminMinuteCheck })}
                                    color="#0078d4"
                                />
                                <Text>?????? ??????  </Text>
                                <View style={styles.pickerContainer}>
                                    <Picker 
                                        enabled={false}
                                        selectedValue={this.state.terminMinute} 
                                        onValueChange={(val, idx) => {
                                            this.setState({terminMinute: val})
                                        }}
                                        style={styles.minutePicker}
                                    >
                                        {
                                            this.state.minutes.map((minute) => (
                                                <Picker.Item label={`${minute}??? ???`} value={`${minute}`} key={minute} style={{fontSize: 14,}}/>
                                            ))
                                        }
                                    </Picker>
                                </View>
                                <Text>  ?????? ??????</Text>
                            </View>
                        </View>
                        <View style={styles.explanContainer}>
                            <Text style={styles.explan}>?? ???????????? ??????</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.updateContainer}>
                            <Text style={{fontSize: 13,}}>??????ToDo ???????????? ??????</Text>
                        </View>
                        <View style={styles.radioContainer}>
                            <View style={styles.radioItemContainer}>
                                <RadioButton
                                    disabled={true} 
                                    value="today"
                                    status={ this.state.todoAmCheck === true ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({ todoAmCheck: !this.state.todoAmCheck })}
                                    color="#0078d4"
                                />
                                <Text>??????</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker 
                                        enabled={false}
                                        selectedValue={this.state.todoAm} 
                                        onValueChange={(val, idx) => {
                                            this.setState({todoAm: val})
                                        }}
                                        style={styles.picker}
                                    >
                                        {
                                            this.state.times.map((time) => (
                                                <Picker.Item label={`${time}???`} value={`${time}`} key={time} style={{fontSize: 14,}}/>
                                            ))
                                        }
                                    </Picker>
                                </View>
                            </View>
                            <View style={[styles.radioItemContainer, {marginLeft: 20,}]}>
                                <RadioButton
                                    disabled={true} 
                                    value="yesterday"
                                    status={ this.state.todoPmCheck === true ? 'checked' : 'unchecked' }
                                    onPress={() => this.setState({ todoPmCheck: !this.state.todoPmCheck })}
                                    color="#0078d4"
                                />
                                <Text>??????</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker 
                                        enabled={false}
                                        selectedValue={this.state.todoPm} 
                                        onValueChange={(val, idx) => {
                                            this.setState({todoPm: val})
                                        }}
                                        style={styles.picker}
                                    >
                                        {
                                            this.state.times.map((time) => (
                                                <Picker.Item label={`${time}???`} value={`${time}`} key={time} style={{fontSize: 14,}}/>
                                            ))
                                        }
                                    </Picker>
                                </View>
                            </View>
                        </View>
                        <View style={styles.explanContainer}>
                            <Text style={styles.explan}>?? ???????????? ??????</Text>
                            <Text style={styles.explan}>?? D????????? ?????? ???????????? ?????? ??????</Text>
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.updateContainer}>
                            <Text style={{fontSize: 13,}}>?????? ??? ????????? ?????? ??????</Text>
                        </View>
                        <View style={styles.checkBoxContainer}>
                            <Text style={styles.checkBoxText}>???????????? ??????, ?????? ?????????/?????? ???</Text>
                            <CheckBox 
                                tintColors={{ true: '#0078d4', false: '#808080' }} 
                                style={styles.checkBox} 
                                value={this.state.checkBox} 
                                onValueChange={(newValue) => this.setState({checkBox: newValue})} 
                                disabled={true}
                            />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        {/* <TouchableOpacity style={styles.cancel}>
                            <View>
                                <Text style={styles.buttonText}>??????</Text>
                            </View>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.submit} onPress={() => this.changeTermin()}>
                            <View>
                                <Text style={styles.buttonText}>??????</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	}
};

const mapDispatchToProps = {
	setUser,
}


export default connect(mapStateToProps, mapDispatchToProps)(TerminSetting);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 15,
        flexDirection: 'column',
    },
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
        width: '100%',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    updateContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '90%',
        marginLeft: Dimensions.get('window').width / 20,
        marginTop: 20,
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 20,
        width: '90%',
        marginLeft: Dimensions.get('window').width / 20,
    },
    radioContainer2: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 20,
        width: '90%',
        marginLeft: Dimensions.get('window').width / 20,
    },
    radioItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioItemContainer2: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickerContainer: {
        borderColor: '#D8D8D8',
        borderWidth: 1,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    picker: {
        width: 110,
        marginLeft: -5,
        marginRight: -10,
    },
    minutePicker: {
        width: 130,
        marginLeft: -5,
        marginRight: -10,
    },
    explanContainer: {
        marginTop: 10,
        width: '90%',
        marginLeft: Dimensions.get('window').width / 20,
    },
    explan: {
        fontSize: 13,
        color: '#808080'
    },
    checkBoxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        marginLeft: Dimensions.get('window').width / 20,
        marginTop: 10,
        borderBottomColor: '#D8D8D8',
        borderBottomWidth: 1,
    },
    checkBoxText: {
        color: '#808080',
        marginLeft: 3,
    },
    checkBox: {

    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 30,
        width: '80%',
        marginLeft: Dimensions.get('window').width / 10
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
        backgroundColor: '#0078d4',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        height: 35,
        borderRadius: 3,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
})