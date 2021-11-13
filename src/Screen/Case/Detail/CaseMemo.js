import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	StyleSheet,
} from 'react-native';

import SimpleToast from 'react-native-simple-toast';
import MemoList from './MemoList';
import Modal from 'react-native-modal';
import { store } from '../../../redux/store';
import NavigationService from '../../../Navigation/NavigationService';
class CaseMemo extends Component {

	constructor(props) {
		super(props)
		this.state = ({
			isVisible: false,
		})
	}

	toggleIsVisible = () => this.setState({isVisible: !this.state.isVisible})

	render() {
		return (
			<View style={styles.caseContainer}>
				<ScrollView style={{margin: 10,}}>
					<MemoList navigation={this.props.navigation} />
				</ScrollView>
				{
					// 상용할때 체크해야함 ... JY
					store.getState().user.userType === 'common' ? (
						<TouchableOpacity style={styles.write} onPress={() => NavigationService.navigate('WriteMemo', {inCase: true})}>
							<View style={styles.circle}>
								<Image source={require('../../../assets/images/NotePencil.png')} />
							</View>
						</TouchableOpacity>
					) : (
						<TouchableOpacity style={styles.write} onPress={() => this.toggleIsVisible()}>
							<View style={styles.circle}>
								<Image source={require('../../../assets/images/NotePencil.png')} />
							</View>
						</TouchableOpacity>
					)
				}
				<Modal isVisible={this.state.isVisible}>
					<View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF'}}>
						<View style={{marginTop: 20, marginBottom: 20,}}>
							<View style={{justifyContent: 'flex-start', alignItems: 'flex-start', maginTop: 10, marginBottom: 10,}}>
								<Text style={{fontSize: 16, fontWeight: 'bold'}}>알림</Text>
							</View>
							<View style={{justifyContent: 'center', alignItems: 'center', maginTop: 10, marginBottom: 10,}}>
								<Text style={{fontSize: 16}}>멤버십(구독) 회원에게 제공되는 서비스입니다.</Text>
							</View>
							<TouchableOpacity style={{justifyContent: 'flex-end', alignItems: 'flex-end', maginTop: 10, marginBottom: 10,}} onPress={() => this.toggleIsVisible()}>
								<Text style={{fontSize: 16, fontWeight: 'bold', color: '#0078D4'}}>확인</Text>
							</TouchableOpacity>
						</View>
					</View>
				</Modal>
			</View>
		);
	}
}

export default CaseMemo;

const styles = StyleSheet.create({
    caseContainer: {
        flex: 1,
    },
	write: {
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
		marginRight: 30,
		marginBottom: 30,
		position: 'absolute',
		bottom: 0,
		right: 0,
	},
	circle: {
		backgroundColor: '#0078d4',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		width: 50,
		height: 50,
	},
})