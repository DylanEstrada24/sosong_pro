import React from 'react';
import {Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import LoadingScreen from '../LoadingScreen';
import {connect} from 'react-redux';
import { store } from '../../redux/store';
import { setUser } from '../../redux/actions/user';
import NavigationService from '../../Navigation/NavigationService';
import { commonApi } from '../../Common/ApiConnector';
import SimpleToast from 'react-native-simple-toast';

class SplashScreen extends React.PureComponent {
  async componentDidMount() {

    if(this.props.autoLogin === true) {
      const param = {
        email: this.props.email,
        password: this.props.password,
        fbToken: 'string',
      }

      await commonApi('POST', 'auth/signin', param).then((data) => {
        let receipt = '' // 구독여부 확인용

				let loggedinUser = data.data

				// 가입승인단계 사용자
				if(loggedinUser.status === 'request') {
          // 가입승인이 되지 않았는대 자동로그인이 됐을때 SplashScreen에서 LoginScreen으로
          SimpleToast.show("가입승인이 되지 않았습니다.", SimpleToast.BOTTOM)
					NavigationService.navigate('LoginScreen')
				}

				this.props.setUser({
					email: loggedinUser.email,
					password: this.props.password,
					gender: loggedinUser.gender,
					joinAt: loggedinUser.joinAt,
					maxCase: loggedinUser.maxCase,
					modifyAt: loggedinUser.modifyAt,
					nickName: loggedinUser.nickName,
					phoneNumber: loggedinUser.phoneNumber,
					status: loggedinUser.status,
					token: loggedinUser.token,
					webToken: loggedinUser.webToken,
					goodchAccessToken: loggedinUser.token,
					saveId: true,
					savePassword: true,
					userType: loggedinUser.userType,
					name: loggedinUser.name,
					userIdx: loggedinUser.idx,
					autoLogin: true,
					receipt: receipt,
				});

				NavigationService.navigate("TabNavigator")
      }).catch((err) => {
        SimpleToast.show("로그인 중 에러가 발생했습니다.", SimpleToast.BOTTOM)
        NavigationService.navigate('LoginScreen')
      })
    } else {
      NavigationService.navigate('LoginScreen')
    }
  }

  render() {
    return <LoadingScreen />;
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.user.email,
    password: state.user.password,
    autoLogin: state.user.autoLogin,
    token: state.user.token,
    user: state.user,
  };
};

const mapDispatchToProps = {
	setUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
