import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

class Detail extends Component {

    constructor(props) {
        super(props)
        this.state = ({
            color: 'black'
        })
    }

    componentDidMount() {
        const type = this.props.type
        let color = 'black'
        switch(type) {
            case 1: 
                color = '#5884B6' // 청색
                break
            case 2: 
                color = '#618861' // 녹색
                break
            case 3:
                color = '#701111' // 적색? 갈색?
                break
            case 4:
                color = '#D2791F' // 주황?
                break
            default: 
                color = 'black'
                break
        }

        this.setState({
            color: color
        })

    }

    render() {
        return (
            <View style={[styles.detailContainer, this.props.style]}>
                <View style={styles.topContainer}>
                    <View style={this.props.divisionStyle}>
                        <Text style={[styles.date, this.props.divisionStyle]}>{this.props.date}</Text>
                        {/* <Text style={[styles.date, {color: this.state.color}]}>{this.props.date}</Text> */}
                    </View>
                    <View>
                        <Text style={{fontSize: 14, color: this.state.color}}>{this.props.result}</Text>
                    </View>
                </View>
                <View style={styles.bottomContainer}>
                    <View>
                        <Text 
                            style={{
                                fontSize: this.props.select ? 18 : 14, 
                                color: this.props.select ? '#000' : this.state.color,
                                fontWeight: this.props.select ? 'bold' : null
                            }}
                        >{this.props.content}</Text>
                    </View>
                    {
                        this.props.select && this.props.party !== undefined && this.props.party !== '' ? (
                            <View style={{justifyContent: 'center'}}>
                                <Text style={{
                                    fontSize: this.props.party.length > 10 ? 10 : 14,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>{this.props.party}</Text>
                            </View>
                        ) : null
                    }
                </View>
            </View>
        )
    }
}

export default Detail;

const styles = StyleSheet.create({
    detailContainer: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: "space-between",
        paddingRight: 5,
        backgroundColor: '#FFF'
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    date: {
        fontSize: 14,
    },
    content: {
        fontSize: 14,
    },
    bottomContainer: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: 'row'
    },
    result: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#582F8C',
    },
});