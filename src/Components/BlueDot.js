import React from 'react';
import { View, StyleSheet } from 'react-native';

export default BlueDot = () => {
	return (
		<View style={styles.blueDot}>

		</View>
	)
}

const styles = StyleSheet.create({
	blueDot: {
		width: 5,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: "#2665A1",
	}
});