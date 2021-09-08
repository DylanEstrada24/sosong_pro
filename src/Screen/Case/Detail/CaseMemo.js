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
import SimpleToast from 'react-native-simple-toast';
import MemoList from './MemoList';
import { store } from '../../../redux/store';
class CaseMemo extends Component {


	render() {
		return (
			<View style={styles.caseContainer}>
				<ScrollView style={{margin: 15,}}>
					<MemoList navigation={this.props.navigation} />
				</ScrollView>
				{
					store.getState().user.userType !== 'common' ? (
						<TouchableOpacity style={styles.write} onPress={() => this.props.navigation.navigate('WriteMemo'), {inCase: true}}>
							<View style={styles.circle}>
								<Image source={require('../../../assets/images/NotePencil.png')} />
							</View>
						</TouchableOpacity>
					// ) : (<></>)
					) : (
						<TouchableOpacity style={styles.write} onPress={() => SimpleToast.show("플랜가입 유저만 가능합니다.", SimpleToast.BOTTOM)}>
							<View style={styles.circle}>
								<Image source={require('../../../assets/images/NotePencil.png')} />
							</View>
						</TouchableOpacity>
					)
				}
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
		backgroundColor: '#2665A1',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 25,
		width: 50,
		height: 50,
	},
})