import React, {Component} from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TextInput,
	ScrollView,
    Image,
	Button,
	StyleSheet,
	Dimensions,
} from 'react-native';

import Reply from './Reply';

class ReplyList extends Component {
	render() {
		return (
			<View style={{flexDirection: "column"}}>
				<Reply />
                <Reply />
                <Reply />
                <Reply />
                <Reply />
                <Reply />
                <Reply />
			</View>
		);
	}
}

export default ReplyList;

const styles = StyleSheet.create({
	
});