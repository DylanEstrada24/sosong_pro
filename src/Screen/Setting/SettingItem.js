import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	Button,
	StyleSheet,
	Dimensions,
} from 'react-native';

function SettingItem ({title, content, isMore, topItem, input}) {
	return (
		<View style={styles.itemContainer}>
			<View style={styles.titleContainer}>
				{
					topItem ? (
						<Text style={styles.title2}>{title}<Text style={{fontSize: 13}}>님</Text></Text>
					) : (
						<Text style={styles.title}>{title}</Text>
					)
				}
			</View>
			<View style={styles.contentContainer}>
				{
					input ? (
						<TextInput style={styles.content}></TextInput>
					) : (	
						<Text style={topItem ? styles.content2 : styles.content}>{content}</Text>
					)
				}
			</View>
			<View style={styles.arrowContainer}>
				{isMore && 
					<Image source={require('../../assets/images/CaretRight.png')} style={{width: 8, height: 16}} />
				}
			</View>
		</View>
	)
}

SettingItem.defaultProps = {
	content: '',
	isMore: false,
	topItem: false,
	input: false,
}

SettingItem.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	isMore: PropTypes.bool,
	topItem: PropTypes.bool,
	input: PropTypes.bool,
}

export default SettingItem;

const styles = StyleSheet.create({
	itemContainer: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 8,
		paddingBottom: 8,
	},
	titleContainer: {
		alignItems: "flex-start",
		flex: 8,
	},
	title: {
		fontSize: 15,
		color: "#0078d4",
	},
	title2: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#0078d4",
	},
	contentContainer: {
		alignItems: "flex-end",
		justifyContent: 'flex-end',
		flex: 9,
		marginRight: 5,
	},
	content: {
		fontSize: 15,
		color: "#666666",
	},
	content2: {
		fontSize: 15,
		color: "#000",
		marginTop: 5,
	},
	arrowContainer: {
		alignItems: "center",
		flex: 1,
	},
});