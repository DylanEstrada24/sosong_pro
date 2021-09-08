import React, {Component} from 'react';
import {
	View,
	Text,
	Button,
	TouchableOpacity,
	StyleSheet,
	BackHandler,
} from 'react-native';

import SettingItem from '../Setting/SettingItem';

import { store } from '../../redux/store';
import { commonApi } from '../../Common/ApiConnector';
import { setUser, clearUser } from '../../redux/actions/user';
import { connect } from 'react-redux';
import SimpleToast from 'react-native-simple-toast';

class AdminMenu extends Component {

	constructor(props) {
		super(props)
		this.state = ({
			info: {
				email: '',
				gender: '',
				joinAt: '',
				maxCase: '',
				nickName: '',
				phoneNumber: '',
				pushSetting: '',
				status: '',
				name: '',
				userType: '',
			}
		})

		this.logout = this.logout.bind(this)
	}

	componentDidMount() {
		BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
	}

	componentWillUnmount() {
		this.exitApp = false;
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}

	logout() {
		this.props.clearUser()
		this.props.navigation.replace('LoginScreen')
	}

	handleBackButton = () => {

		if (!this.props.navigation.isFocused()) {
			// The screen is not focused, so don't do anything
			return false;
		}
        // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
        if (this.exitApp == undefined || !this.exitApp) {
            SimpleToast.show('한번 더 누르시면 종료됩니다.', SimpleToast.BOTTOM);
            this.exitApp = true;

            this.timeout = setTimeout(
                () => {
                    this.exitApp = false;
                },
                2000    // 2초
            );
        } else {
            clearTimeout(this.timeout);

            BackHandler.exitApp();  // 앱 종료
        }
        return true;
    }

	render() {
		return (
			<View style={styles.settingContainer}>
				<View style={styles.itemListContainer}>
					<View style={styles.itemContainer, styles.bottomLine}>
						{/* <SettingItem title={this.state.info.email + "님"} content="일반회원" topItem /> */}
						<SettingItem title={`관리자`} topItem />
					</View>
					{/* <TouchableOpacity style={styles.itemContainer}>
						<SettingItem title="업무관련직 인증" content="인증하기" isMore />
					</TouchableOpacity> */}
					{/* <TouchableOpacity style={styles.itemContainer}>
						<SettingItem title="변호사 인증" content="인증하기" isMore />
					</TouchableOpacity> */}
				</View>
				<View style={styles.itemListContainer}>
					<TouchableOpacity style={styles.itemContainer, styles.bottomLine} onPress={() => this.props.navigation.navigate('UserPermission')}>
						<SettingItem title="회원가입 승인/거절" isMore />
					</TouchableOpacity>
					<TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.navigate('Notice')}>
						<SettingItem title="공지사항 관리" isMore />
					</TouchableOpacity>
				</View>
				<TouchableOpacity style={styles.buttonContainer} onPress={() => this.logout()}>
					<Button style={styles.logout} color="#2665A1" title="로그아웃" onPress={() => this.logout()}/>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.user,
	}
};

const mapDispatchToProps = {
	setUser, clearUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminMenu)

const styles = StyleSheet.create({
	settingContainer: {
		flex: 1,
		width: '100%',
		justifyContent: "center",
		alignItems: "center",
	},
	itemListContainer: {
		width: "80%",
		justifyContent: "center",
		alignItems: "flex-start",
		paddingTop: 15,
		paddingBottom: 15,
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
		// marginTop: 30,
	},
	itemContainer: {
		// marginLeft: Dimensions.get('window').width / 10,
		// marginRight: Dimensions.get('window').width / 10,
	},
	bottomLine: {
		borderBottomColor: "#C4C4C4",
		borderBottomWidth: 1,
	},
});