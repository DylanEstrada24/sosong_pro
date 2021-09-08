import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	StyleSheet,
	Dimensions,
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import BlueDot from '../../Components/BlueDot';

class CaseAddSubstitute extends Component {
	render() {

		// TabNavigator로 돌아가고싶음.
		const resetAction = StackActions.reset({
			index: 1,
			actions: [NavigationActions.navigate({
				routeName: 'TabNavigator',
			})],
		})

		return (
			<View style={styles.container}>
				<View style={styles.Top}>
					<View style={styles.header}>
						<TouchableOpacity style={styles.exit}>
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
						<View style={styles.title}>
							<Text style={styles.titleText}>사건 추가</Text>
						</View>
					</View>
					<View style={styles.contentContainer}>
						<View style={styles.content}>
							<View style={styles.contentHeader}>
								<BlueDot />
								<Text style={styles.contentTitle}>대리인 선택</Text>
							</View>
							<View style={styles.textContainer}>
								<Text style={styles.contentText}>본 사건에서 귀하측 변호사(대리인)을 선택해주세요.</Text>
								<Text style={styles.contentText}>귀하측 변호사(로펌)이 다수인 경우 임의로 1인을 선택하세요.</Text>
								<Text style={styles.contentText}>직접 소송을 진행중이시면 본인을 선택해주세요.</Text>
							</View>
							<View style={styles.buttonContainer}>
								<TouchableOpacity style={styles.button1}>
									<Text style={styles.buttonText}>대리인</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button2}>
									<Text style={styles.buttonText}>당사자</Text>
								</TouchableOpacity>
								<TouchableOpacity style={styles.button2}>
									<Text style={styles.buttonText}>다음에 선택</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.bottom}>
					<TouchableOpacity style={styles.nextButton}>
						<Text style={styles.nextButtonText}>등록</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

export default CaseAddSubstitute;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	header: {
		width: '100%',
		flexDirection: 'column',
		marginTop: 20,
		borderBottomColor: '#2665A1',
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	exit: {
		marginLeft: 15,
	},
	title: {

	},
	titleText: {
		fontSize: 20,
		fontWeight: '700',
		marginLeft: 18,
	},
	contentContainer: {
		flexDirection: 'column',
		width: '90%',
		justifyContent: 'center',
		// alignItems: 'center',
		marginLeft: Dimensions.get('window').width / 20,
		marginRight: Dimensions.get('window').width / 20,
		marginTop: 11,
	},
	content: {
		
	},
	contentHeader: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		paddingBottom: 2,
		// width: '100%',
	},
	contentTitle: {
		fontSize: 15,
		fontWeight: 'bold',
		marginLeft: 9,
	},
	textContainer: {
		flexDirection: 'column',
		padding: 10,
	},
	contentText: {
		fontSize: 13,
	},
	buttonTop: {
		flexDirection: 'row',
	},
	buttonBottom: {
		flexDirection: 'row',
	},
	buttonContainer: {
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		marginLeft: Dimensions.get('window').width / 50,
		marginRight: Dimensions.get('window').width / 50,
	},
	button1: {
		width: 95,
		height: 35,
		backgroundColor: '#2665A1',
		margin: 3,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
	},
	button2: {
		width: 95,
		height: 35,
		backgroundColor: '#C4C4C4',
		margin: 3,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
	},
	buttonText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	nextButton: {
		backgroundColor: '#2665A1',
		borderRadius: 5,
		width: '80%',
		marginLeft: Dimensions.get('window').width / 10,
		marginRight: Dimensions.get('window').width / 10,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30,
	},
	nextButtonText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF',
		margin: 9,
	},
})