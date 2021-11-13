import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';

import HeaderText from '../../../Components/HeaderText';
import WebViewPage from '../../WebViewPage';

class Termin extends Component {
	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<View style={styles.headerContainer}>
                    <View style={styles.headerLeft}>
                        <HeaderText title="개인정보처리방침" />
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                            <Image source={require('../../../assets/images/X.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
				<View style={{flex: 1, marginLeft: "5%", marginRight: "5%", marginBottom: 5,}}>
					<WebViewPage url='https://sspro.rhodolite.org/api/v1/terms/4' enroll/>
				</View>
			</View>
		);
	}
}

export default Termin;

const styles = StyleSheet.create({
	headerContainer: {
		marginTop: 10,
        marginBottom: 30,
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
});