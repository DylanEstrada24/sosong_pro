import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Image,
	Linking
} from 'react-native';

import SettingItem from './SettingItem';

import HeaderText from '../../Components/HeaderText';

class CustomerService extends Component {
	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				<View style={styles.headerContainer}>
					<View style={styles.headerLeft}>
						<HeaderText title="고객센터" />
					</View>
					<View style={styles.headerRight}>
						<TouchableOpacity onPress={() => this.props.navigation.pop()}>
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={{flex: 0.85, width: "90%", marginLeft: "5%", marginRight: "5%", marginBottom: 5,}}>
					<View style={styles.itemContainer}>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>소송프로는 언제나 사용자님의 의견에 귀를 기울이며 더 나은 서비스 이용 경험을 제공하고자 노력하고 있습니다.</Text>
							</View>
						</View>
						<View>
							<View style={styles.contentContainer}>
								<Text style={styles.contentText}>궁금하신 사항이 있거나 문제를 해결하는데 도움이 필요하신 경우 아래 이메일 문의를 통해 문의하시면 도움을 받으실 수 있습니다. </Text>
							</View>
						</View>
					</View>
					<View style={styles.itemListContainer}>
						<TouchableOpacity style={styles.itemContainer, styles.bottomLine} onPress={() => Linking.openURL('mailto:sosongpro@gmail.com')}>
							<SettingItem title="이메일 문의" isMore />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		);
	}
}

export default CustomerService;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
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
		marginLeft: "auto",
		marginRight: "auto",
		paddingBottom: 20,
	},
	contentText: {
		fontSize: 16,
	},
	itemListContainer: {
		width: "90%",
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 15,
		paddingBottom: 15,
		marginLeft: Dimensions.get('window').width / 20,
		marginRight: Dimensions.get('window').width / 20,
	},
	buttonContainer: {
		justifyContent: 'center',
		width: "80%",
	},
	logout: {
		width: '100%',
		borderRadius: 5,
		textAlign: 'center',
		fontWeight: "600",
		fontSize: 15,
	},
	itemContainer: {

	},
	bottomLine: {
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
});