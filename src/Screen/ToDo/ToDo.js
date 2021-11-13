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

import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';
import 'moment/locale/ko';
import { commonApi } from '../../Common/ApiConnector';

class ToDo extends Component {

    constructor() {
        super()
        this.state = {
            checkBox: false,
            diff: 0,
            favorite: false,
            color: '#000',
        }

        moment().format()

        this.toggleCheckBox = this.toggleCheckBox.bind(this)
        this.checkDiff = this.checkDiff.bind(this)
        this.toggleFavorite = this.toggleFavorite.bind(this)
    }

    async toggleCheckBox(newValue) {
        // checkbox 값 업데이트 하는 commonApi 통신 추가해야됨.
        this.setState({checkBox: newValue});

        await commonApi('PUT', `user/case/todo/isCheck/${this.props.caseIdx}/${this.props.todoIdx}`, {}).then((result) => {
            if(result.success) { // 성공
                this.props.sortTodo(this.props.todoIdx, newValue)
            } else {
                SimpleToast.show(result.msg, SimpleToast.BOTTOM)
            }
        // }).catch((err) => console.log(`user/case/todo/isCheck/${this.props.caseIdx}/${this.props.todoIdx}`, err))
        }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))


    }

    async toggleFavorite() {
        this.setState({
            favorite: !this.state.favorite
        })

        await commonApi('PUT', `user/case/todo/favorite/${this.props.caseIdx}/${this.props.todoIdx}`, {}).then((result) => {
            console.log(result)
        // }).catch((err) => console.log(`user/case/todo/favorite/${this.props.caseIdx}/${this.props.todoIdx}`, err))
        }).catch((err) => SimpleToast.show(err.msg, SimpleToast.BOTTOM))

    }

    checkDiff() {
        let today = moment().format('YYYY-MM-DD')
        today = moment(today)
        const settingDate = moment(this.props.settingAt)
        let diff = settingDate.diff(today, 'days')
        let color = '#000'

        diff *= -1
        diff > 0 ? (
            diff = `D+${diff}`,
            color = '#88001b'
        ) : (
            diff === 0 ? (
                diff = `D-0`
            ) : (
                diff = `D${diff}`,
                color = '#23895f'
            )
        )
        // if(diff > 0) {
        //     diff = `+${diff}`
        // } else if(diff === 0) {
        //     diff = `-0`
        // }

        this.setState({
            diff: diff,
            color: color,
        })
    }

    componentDidMount() {
        // this.checkDiff()

        let isCheck = this.props.isCheck
        let favorite = this.props.favorite

        if(this.props.isCheck !== null) {

            if(typeof isCheck === 'boolean') {
                this.setState({
                    checkBox: this.props.isCheck
                })
            } else if(typeof isCheck === 'string') {
                if(isCheck === 'false') {
                    this.setState({
                        checkBox: false
                    })
                } else if(isCheck === 'true') {
                    this.setState({
                        checkBox: true
                    })
                }
            }

        }


        if(this.props.favorite !== null) {

            if(typeof favorite === 'boolean') {
                this.setState({
                    favorite: this.props.favorite
                })
            } else if(typeof favorite === 'string') {
                if(favorite === 'false') {
                    this.setState({
                        favorite: false
                    })
                } else if(favorite === 'true') {
                    this.setState({
                        favorite: true
                    })
                }
            }

            // this.setState({
            //     favorite: this.props.favorite
            // })
        }
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevProps !== this.props) {

            
            let isCheckType = typeof this.props.isCheck
            let favoriteType = typeof this.props.favorite
            
            let isCheck = false
            let favorite = false
            
            if(isCheckType === 'string') {
                if(this.props.isCheck === 'true') {
                    isCheck = true
                }
            } else if(isCheckType === 'boolean') {
                isCheck = this.props.isCheck
            }
            
            if(favoriteType === 'string') {
                if(this.props.favorite === 'true') {
                    favorite = true
                }
            } else if(favoriteType === 'boolean') {
                favorite = this.props.favorite
            }
            
            this.setState({
                favorite: favorite,
                checkBox: isCheck
            })
            
        }
    }

    render() {
        moment.locale('ko');
        const day = moment(this.props.settingAt).format('dddd').charAt(0)
        let diff = ''
        if(this.props.diff !== undefined && this.props.diff !== null) {
            diff = this.props.diff
        }
        return (
            <View style={styles.toDoContainer}>
                <View style={styles.checkBox}>
                    <CheckBox 
                        tintColors={{ true: '#0078d4', false: '#0078d4' }} 
                        style={styles.toDoCheckBox} 
                        value={this.state.checkBox} 
                        onValueChange={(newValue) => this.toggleCheckBox(newValue)} 
                    />
                    {/* <TouchableOpacity style={styles.favorite} onPress={() => this.toggleFavorite()}>
                        {
                            this.state.favorite ? (
                                <Image source={require('../../assets/images/Favorite.png')} />
                            ) : (
                                <Image source={require('../../assets/images/NonFavorite.png')} />
                            )
                        }
                    </TouchableOpacity> */}
                    {/* <Image source={require('../../assets/images/Gear.png')} /> */}
                </View>
                <View style={styles.toDoTextContainer}>
                    <Text style={styles.toDoTitle}>{this.props.title}</Text>
                    {/* <Text style={styles.toDoContent}>{this.props.settingAt}({day})</Text> */}
                    <Text style={styles.toDoContent}>{this.props.settingAt}</Text>
                    {/* <Text style={styles.toDoContent}>마감일 : {this.props.settingAt}({day})</Text> */}
                </View>
                {
                    this.state.checkBox ? (
                        <View style={styles.dDayTextContainer}></View>
                    ) : (
                        <View style={styles.dDayTextContainer}>
                            <Text
                                style={[
                                    styles.dDayText, {
                                        color: this.props.color, 
                                        fontSize: diff.length > 4 ? 20 : 25
                                    }
                                ]}
                            >
                                {this.props.diff}
                            </Text>
                            {/* <Text style={{color: this.state.color, fontWeight: "bold", fontSize: 30, alignItems: 'center', justifyContent: 'center'}}>{this.state.diff}</Text> */}
                        </View>
                    )
                }
			</View>
        );
    }
}

export default ToDo;

const styles = StyleSheet.create({
	toDoContainer: {
        flex: 1,
        flexDirection: "row",
        width: "90%",
        marginLeft: "5%",
        marginRight: "5%",
        justifyContent: "space-around",
        alignItems: "flex-start",
        borderColor: "#0078d4",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 5,
        paddingBottom: 10,
    },
    checkBox: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    toDoCheckBox: {

    },
    toDoTextContainer: {
        flex: 3,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    toDoTitle: {
        fontSize: 18,
        // fontWeight: "bold",
        marginTop: 4,
    },
    toDoContent: {
        fontSize: 15,
        fontWeight: "400",
        color: '#808080',
    },
    dDayTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    dDayText: {
        // fontWeight: "bold", 
        alignItems: 'center', 
        justifyContent: 'center'
    },
})