import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	Image,
} from 'react-native'
import CheckBox from '@react-native-community/checkbox';

import SimpleToast from 'react-native-simple-toast';

class Enroll extends Component {
	constructor(props) {
		super(props);
		this.state = ({
			allCheck: false, // 모두 동의
			age: false, // 14세이상
			service: false, // 서비스약관 동의
			termin: false, // 정보수집 동의
			term: false, // 유효기간 탈퇴까지 동의
			alarmAgree: false, // 알림 수신 동의
		})

		this.allCheck = this.allCheck.bind(this)
		this.checkHandler = this.checkHandler.bind(this)

	}

	allCheck(bool) {
		this.setState({
			allCheck: bool, 
			age: bool, 
			service: bool, 
			termin: bool, 
			term: bool, 
			alarmAgree: bool, 
		})
	}

	checkHandler() {
		if(this.state.age === false) {
			SimpleToast.show("필수 약관에 동의해주세요.", SimpleToast.BOTTOM)
			return
		}
		if(this.state.service === false) {
			SimpleToast.show("필수 약관에 동의해주세요.", SimpleToast.BOTTOM)
			return
		}
		if(this.state.termin === false) {
			SimpleToast.show("필수 약관에 동의해주세요.", SimpleToast.BOTTOM)
			return
		}

		this.props.navigation.navigate("EnrollForm")

	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.contentContainer}>
					<View style={styles.headerContainer}>
						<View style={styles.header}>
							<View style={styles.headerLeft}/>
							<View style={styles.headerRight}>
								<TouchableOpacity onPress={() => this.props.navigation.pop()}>
									<Image source={require('../../assets/images/X.png')} />
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.enrollTitleContainer}>
							<View style={styles.enrollTitle}>
								<Text style={styles.enrollText}>회원가입을 위해</Text>
								<Text style={styles.enrollText}>약관에 동의해주세요</Text>
							</View>
						</View>
					</View>
					<View style={styles.itemContainer}>
						<View style={styles.checkBoxContainer}>
							<CheckBox
								value={this.state.allCheck} 
								style={styles.checkBox} 
								tintColors={{ true: '#0078d4', false: '#808080' }} 
								onValueChange={(newValue) => this.allCheck(newValue)}
							/>
							<View style={styles.checkBoxExplan}>
								<Text style={[styles.explanText, {fontSize: 20, color: '#000'}]}>모두 동의합니다</Text>
							</View>
							<View style={styles.linkButton} />
						</View>
						<View style={styles.horizonLine}/>
						<View style={styles.checkBoxContainer}>
							<CheckBox
								value={this.state.age} 
								style={styles.checkBox}
								tintColors={{ true: '#0078d4', false: '#808080' }} 
								onValueChange={(newValue) => this.setState({age: newValue})} 
							/>
							<View style={styles.checkBoxExplan}>
								<Text style={styles.explanText}>만 14세 이상입니다 (필수)</Text>
							</View>
							<TouchableOpacity style={styles.linkButton} onPress={() => this.props.navigation.navigate("AgeInfo")}>
								<Text style={styles.link}>보기</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.checkBoxContainer}>
							<CheckBox
								value={this.state.service} 
								style={styles.checkBox} 
								tintColors={{ true: '#0078d4', false: '#808080' }} 
								onValueChange={(newValue) => this.setState({service: newValue})}
							/>
							<View style={styles.checkBoxExplan}>
								<Text style={styles.explanText}>서비스 이용약관 (필수)</Text>
							</View>
							<TouchableOpacity style={styles.linkButton} onPress={() => this.props.navigation.navigate('Service', {url: ''})}>
								<Text style={styles.link}>보기</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.checkBoxContainer}>
							<CheckBox
								value={this.state.termin} 
								style={styles.checkBox} 
								tintColors={{ true: '#0078d4', false: '#808080' }} 
								onValueChange={(newValue) => this.setState({termin: newValue})}
							/>
							<View style={styles.checkBoxExplan}>
								<Text style={styles.explanText}>개인정보처리방침 (필수)</Text>
							</View>
							<TouchableOpacity style={styles.linkButton} onPress={() => this.props.navigation.navigate('Termin', {url: ''})}>
								<Text style={styles.link}>보기</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.checkBoxContainer}>
							<CheckBox
								value={this.state.term} 
								style={styles.checkBox} 
								tintColors={{ true: '#0078d4', false: '#808080' }} 
								onValueChange={(newValue) => this.setState({term: newValue})}
							/>
							<View style={styles.checkBoxExplan}>
								<Text style={styles.explanText}>개인정보 유효기간을 탈퇴시까지로 설정 (선택)</Text>
							</View>
							<TouchableOpacity style={styles.linkButton} onPress={() => this.props.navigation.navigate('Term')}>
								<Text style={styles.link}>보기</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.checkBoxContainer}>
							<View style={styles.checkBox} />
							<View style={styles.checkBoxExplan}>
								<Text style={styles.explanSubText}>별도 설정하지 않는 경우 1년 미이용 시 휴면 전환</Text>
							</View>
							<View style={styles.linkButton} />
						</View>
						<View style={styles.checkBoxContainer}>
							<CheckBox
								value={this.state.alarmAgree} 
								style={styles.checkBox} 
								tintColors={{ true: '#0078d4', false: '#808080' }} 
								onValueChange={(newValue) => this.setState({alarmAgree: newValue})}
							/>
							<View style={styles.checkBoxExplan}>
								<Text style={styles.explanText}>소송프로 혜택 알림 수신 동의 (선택)</Text>
							</View>
							<View style={styles.linkButton}/>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<TouchableOpacity style={styles.button} onPress={() => this.checkHandler()}>
							<Text style={styles.enroll}>다음</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.promoteContainer}>
						<Text style={styles.promote}>회원가입 시 1개월간 전체기능 오픈!</Text>
						<Text style={styles.promote}>구독 시 추가 1개월 무료!</Text>
					</View>
				</View>
			</View>
		);
	}
}

export default Enroll;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerContainer: {
		marginTop: 10,
        marginBottom: 30,
		flexDirection: 'column',
		justifyContent: "space-between",
		alignItems: 'flex-start',
		paddingBottom: 5,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
	},
	headerLeft: {

	},
	headerRight: {

	},
	enrollTitleContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	enrollTitle: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	enrollText: {
		fontSize: 24,
        color: '#0078D4'
	},
	itemContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
	},
	checkBoxContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		textAlign: 'left',
		marginTop: 8,
		marginBottom: 8,
	},
	checkBox: {
		width: '10%',
	},
	checkBoxExplan: {
		textAlign: 'left',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		width: '80%',
		fontSize: 16,
	},
	explanText: {
		fontSize: 16,
		color: '#808080',
	},
	explanSubText: {
		fontSize: 12,
		color: '#808080',
	},
	linkButton: {
		width: '10%',
	},
	horizonLine: {
		height: 1,
		width: '100%',
		backgroundColor: '#D8D8D8'
	},
	link: {
		fontSize: 13,
		textDecorationLine: 'underline',
	},
	titleText: {
		fontSize: 20,
		fontWeight: '700',
	},
	contentContainer: {
		flexDirection: 'column',
		width: '90%',
		marginLeft: "5%",
        marginRight: "5%",
		justifyContent: 'center',
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
	promoteContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		marginTop: 20,
	},
	promote: {
		color: '#0078D4',
		marginBottom: 3,
	},
})