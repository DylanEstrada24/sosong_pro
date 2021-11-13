import React from 'react';
import { View, StyleSheet } from 'react-native';

export default BlueDot = (props) => {

	let dotColor = '#0089d4'
	if(props.color !== undefined) {
		dotColor = props.color
	}

	return (
		<View style={[styles.blueDot, {backgroundColor: dotColor}]}>

		</View>
	)
}

const styles = StyleSheet.create({
	blueDot: {
		width: 5,
        height: 5,
        borderRadius: 2.5,
        // backgroundColor: dotColor,
	}
});