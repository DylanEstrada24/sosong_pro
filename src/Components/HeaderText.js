import React, {Component} from 'react';
import {
	Text,
	StyleSheet,
} from 'react-native';

export default HeaderText = ({title}) => {
	return (
		<Text style={styles.boardHeader}>{title}</Text>
	);
}

const styles = StyleSheet.create({
	boardHeader: {
		fontSize: 20,
		fontWeight: "700",
		marginLeft: "5%",
	}
});