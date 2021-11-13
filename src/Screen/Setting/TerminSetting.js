import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    StyleSheet
} from 'react-native';

import { RadioButton } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import BlueDot from '../../Components/BlueDot';
import { commonApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';
import { store } from '../../redux/store';
import { setUser } from '../../redux/actions/user';
import { connect } from 'react-redux';

class TerminSetting extends Component {
    constructor() {
        super();
        this.state = {
            checked: 'today',
            time: '',
            times: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        };

        this.changeTermin = this.changeTermin.bind(this)
    }

    componentDidMount() {
        this.setState({
            time: store.getState().user.pushSetting.split(':')[0]
        })
    }

    changeTermin() {
        const time = `${this.state.time}:00`

        commonApi('PUT', `user/pushSetting/${time}`, {}).then((result) => {
            console.log(result)

            if(result !== undefined) {
                if(result.success) {
                    this.props.setUser({
                        pushSetting: time
                    })
                    SimpleToast.show("알림시간이 변경되었습니다.", SimpleToast.BOTTOM)
                    this.props.navigation.pop()
                } else {
                    SimpleToast.show(result.msg, SimpleToast.BOTTOM)
                }
            }

        // }).catch((err) => console.log(`user/pushSetting/${time}`, err))
        }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <BlueDot />
                    <Text style={styles.title}>기일 알림 설정</Text>
                </View>
                <View style={styles.content}>
                    {/* <View style={styles.radioContainer}>
                        <View style={styles.radioItemContainer}>
                            <RadioButton 
                                value="today"
                                status={ this.state.checked === 'today' ? 'checked' : 'unchecked' }
                                onPress={() => this.setState({ checked: 'today' })}
                                color="#0078d4"
                            />
                            <Text>당일</Text>
                        </View>
                        <View style={styles.radioItemContainer}>
                            <RadioButton 
                                value="yesterday"
                                status={ this.state.checked === 'yesterday' ? 'checked' : 'unchecked' }
                                onPress={() => this.setState({ checked: 'yesterday' })}
                                color="#0078d4"
                            />
                            <Text>전일</Text>
                        </View>
                    </View> */}
                    <View style={styles.pickerContainer}>
                        <Picker 
							selectedValue={this.state.time}
							onValueChange={(val, idx) => {
								this.setState({time: val})
							}}
							style={styles.picker}
						>
							{/* <Picker.Item label="00시" value="00" />
							<Picker.Item label="01시" value="01" />
							<Picker.Item label="02시" value="02" />
							<Picker.Item label="03시" value="03" />
							<Picker.Item label="04시" value="04" />
							<Picker.Item label="05시" value="05" />
							<Picker.Item label="06시" value="06" />
							<Picker.Item label="07시" value="07" />
							<Picker.Item label="08시" value="08" />
							<Picker.Item label="09시" value="09" />
							<Picker.Item label="10시" value="10" />
							<Picker.Item label="11시" value="11" />
							<Picker.Item label="12시" value="12" />
							<Picker.Item label="13시" value="13" />
							<Picker.Item label="14시" value="14" />
							<Picker.Item label="15시" value="15" />
							<Picker.Item label="16시" value="16" />
							<Picker.Item label="17시" value="17" />
							<Picker.Item label="18시" value="18" />
							<Picker.Item label="19시" value="19" />
							<Picker.Item label="20시" value="20" />
							<Picker.Item label="21시" value="21" />
							<Picker.Item label="22시" value="22" />
							<Picker.Item label="23시" value="23" /> */}

                            {
                                this.state.times.map((time) => (
                                    <Picker.Item label={`${time}시`} value={`${time}`} key={time}/>
                                ))
                            }
						</Picker>
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    {/* <TouchableOpacity style={styles.cancel}>
                        <View>
                            <Text style={styles.buttonText}>취소</Text>
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.submit} onPress={() => this.changeTermin()}>
                        <View>
                            <Text style={styles.buttonText}>확인</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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
        margin: 10,
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
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    radioItemContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
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