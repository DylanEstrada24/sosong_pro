import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
    Image,
	StyleSheet,
} from 'react-native';

import HeaderText from '../../Components/HeaderText';
import BoardList from './BoardList';

class Board extends Component {
	render() {
		return (
			<View style={{flexDirection: "column", flex: 1}}>
				{/* <View style={{flex: 0.1}}/> */}
				<View style={styles.header}>
					<HeaderText title="변호사 게시판" />
				</View>
				<ScrollView style={{flex: 0.9}}>
					<BoardList navigation={this.props.navigation} />
				</ScrollView>
				<TouchableOpacity style={styles.write} onPress={() => this.props.navigation.navigate('BoardWrite')}>
					<View style={styles.circle}>
						<Image source={require('../../assets/images/NotePencil.png')} />
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Board;

const styles = StyleSheet.create({
	header: {
		flex: 0.1,
		marginTop: 20,
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
});