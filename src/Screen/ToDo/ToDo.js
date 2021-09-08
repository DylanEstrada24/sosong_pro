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
        }

        moment().format()

        this.toggleCheckBox = this.toggleCheckBox.bind(this)
        this.checkDiff = this.checkDiff.bind(this)
        this.toggleFavorite = this.toggleFavorite.bind(this)
    }

    toggleCheckBox(newValue) {
        // checkbox 값 업데이트 하는 commonApi 통신 추가해야됨.
        this.setState({checkBox: newValue});

        commonApi('PUT', `user/case/todo/isCheck/${this.props.caseIdx}/${this.props.todoIdx}`, {}).then((result) => {
            console.log(`user/case/todo/isCheck/${this.props.caseIdx}/${this.props.todoIdx}`)
            console.log(result)
        }).catch((err) => console.log(`user/case/todo/isCheck/${this.props.caseIdx}/${this.props.todoIdx}`, err))
    }

    toggleFavorite() {
        this.setState({
            favorite: !this.state.favorite
        })

        commonApi('PUT', `user/case/todo/favorite/${this.props.caseIdx}/${this.props.todoIdx}`, {}).then((result) => {
            console.log(result)
        }).catch((err) => console.log(`user/case/todo/favorite/${this.props.caseIdx}/${this.props.todoIdx}`, err))
    }

    checkDiff() {
        let today = moment().format('YYYY-MM-DD')
        today = moment(today)
        const settingDate = moment(this.props.settingAt)
        let diff = settingDate.diff(today, 'days')

        diff *= -1
        if(diff > 0) {
            diff = `+${diff}`
        } else if(diff === 0) {
            diff = `-0`
        }

        this.setState({
            diff: diff,
        })
    }

    componentDidMount() {
        this.checkDiff()

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
        return (
            <View style={styles.toDoContainer}>
                <View style={styles.checkBox}>
                    <CheckBox tintColors={{ true: '#2665A1', false: '#2665A1' }} style={styles.toDoCheckBox} value={this.state.checkBox} onValueChange={(newValue) => this.toggleCheckBox(newValue)} />
                    <TouchableOpacity style={styles.favorite} onPress={() => this.toggleFavorite()}>
                        {
                            this.state.favorite ? (
                                <Image source={require('../../assets/images/Favorite.png')} />
                            ) : (
                                <Image source={require('../../assets/images/NonFavorite.png')} />
                            )
                        }
                    </TouchableOpacity>
                    {/* <Image source={require('../../assets/images/Gear.png')} /> */}
                </View>
                <View style={styles.toDoTextContainer}>
                    <Text style={styles.toDoTitle}>마감일 : {this.props.settingAt}({day})</Text>
                    <Text style={styles.toDoContent}>{this.props.content}</Text>
                </View>
                <View style={styles.dDayTextContainer}>
                    <Text style={styles.dDayText}>D{this.state.diff}</Text>
                </View>
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
        // height: 80,
        marginLeft: "5%",
        marginRight: "5%",
        justifyContent: "space-around",
        alignItems: "flex-start",
        borderColor: "#2665A1",
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 5,
        paddingTop: 18,
        paddingBottom: 18,
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
    },
    toDoTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#2665A1",
        marginBottom: 5,
    },
    toDoContent: {
        fontSize: 15,
        fontWeight: "400",
    },
    dDayTextContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    dDayText: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 32,
    },
})