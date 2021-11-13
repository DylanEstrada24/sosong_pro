import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class Termin extends Component {
    render() {

        let content = ''
        content = this.props.data.content

        if(content !== undefined && content !== '') {
            content = content.trim()
            content = content.replace('(', '')
            content = content.substr(0, content.lastIndexOf(')'))
            content = content.substr(0, content.lastIndexOf(':'))
            content = content.slice(0, -2)
            console.log(content)
        }

        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.leftCategory}>
                        <Text style={styles.title}>
                            {this.props.data.title}
                        </Text>
                    </View>
                    <View style={styles.rightCategory}>
                        <Text style={styles.time}>
                            {/* {this.props.data.date.split('T')[1].substring(0, 5)} */}
                            {/* {this.props.data.content.split(":")[0].slice(-2)}:{this.props.data.content.split(":")[1].slice(0, 2)} */}
                            {
                                this.props.data.content.split(':').length !== 0 ? 
                                (
                                    `${this.props.data.content.split(":")[0].slice(-2)}:${this.props.data.content.split(":")[1].slice(0, 2)}`
                                ) : (
                                    ''
                                )
                            }
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.contentTitle}>
                        {this.props.data.content.split("기일")[0].trim()}기일
                    </Text>
                    <Text style={styles.content}>
                        {
                            content !== undefined ? 
                            (
                                `${this.props.data.court}, ${content.split("기일")[1].trim()}`
                            ) : (
                                content
                            )
                        }
                    </Text>
                </View>
            </View>
        )
    }
}

export default Termin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        borderColor: '#0078d4',
        borderRadius: 5,
        borderWidth: 1,
        marginTop: 5,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftCategory: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    category: {
        backgroundColor: '#0078d4',
        borderRadius: 10,
        height: 24,
        paddingLeft: 5,
        paddingRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryText: {
        fontSize: 13,
        color: '#FFFFFF',
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    rightCategory: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#0078d4',
    },
    content: {
        fontSize: 15,
    },
    bottomContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    time: {
        fontSize: 15,
    },
});