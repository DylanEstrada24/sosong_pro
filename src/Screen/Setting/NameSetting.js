import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Button,
    StyleSheet
} from 'react-native';
import BlueDot from '../../Components/BlueDot';

class NameSetting extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <BlueDot />
                    <Text style={styles.title}>필명 설정</Text>
                </View>
                <View style={styles.content}>
                    <Text style={styles.text}>
                        게시판에 글을 쓰시려면 필명을 설정하셔야 됩니다. {'\n'}
                        설정에서 닉네임을 수정 하실 수 있습니다.
                    </Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput} placeholder="4자 이상(한글은 2자 이상)" placeholderTextColor="#808080" />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.cancel}>
                        <View>
                            <Text style={styles.buttonText}>취소</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submit}>
                        <View>
                            <Text style={styles.buttonText}>확인</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default NameSetting;

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
        backgroundColor: '#0078d4',
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