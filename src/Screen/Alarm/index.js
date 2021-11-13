import React, {Component} from 'react';
import {
	View,
	StyleSheet,
    Dimensions,
    TouchableOpacity,
	Image,
	ScrollView,
} from 'react-native';

import HeaderText from '../../Components/HeaderText';
import AlarmList from './AlarmList'

class Alarm extends Component {

	constructor(props) {
		super(props)

	}


	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        <HeaderText title="사건진행 업데이트 내역" />
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                            <Image source={require('../../assets/images/X.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
				<ScrollView style={{flex: 1}}>
					<AlarmList />
				</ScrollView>
			</View>
		);
	}
}

export default Alarm;

const styles = StyleSheet.create({
	headerContainer: {
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: 'flex-start',
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	headerLeft: {
        marginLeft: Dimensions.get('window').width / 20
	},
	headerRight: {
        marginRight: Dimensions.get('window').width / 20
	},
	itemContainer: {
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	contentContainer: {
		width: "95%",
		justifyContent: "flex-start",
		alignItems: "center",
		marginTop: 16,
		marginLeft: "auto",
		marginRight: "auto",
		paddingBottom: 20,
	},
	contentText: {
		fontSize: 13,
	},
	bold: {
		color: '#0078D4', 
		fontWeight: 'bold'
	},
    buttonContainer: {
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		marginTop: 50,
	},
	button: {
		width: '100%',
		backgroundColor: '#0078d4',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		height: 35,
	},
	enroll: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF',
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
        fontWeight: "bold",
        marginLeft: 5,
    },
    categoryImage: {
        marginRight: 10,
    },
});