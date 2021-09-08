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
import Board from './Board';

class BoardList extends Component {
	render() {
		return (
			<View style={{flexDirection: "column", flex: 1, alignItems: "flex-start"}}>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('BoardDetail')}>
					<Board />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('BoardDetail')}>
					<Board />
				</TouchableOpacity>
				{/* 작성이미지 */}
				{/* <Image source={('write.png')} /> */}
			</View>
		);
	}
}

export default BoardList;

const styles = StyleSheet.create({
	
});