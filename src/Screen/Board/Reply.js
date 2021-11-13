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

class Reply extends Component {
	render() {
		return (
			<View style={styles.replyContainer}>
				<View style={styles.writer}>
                    <View style={styles.name}>
                        <Text style={styles.nameText}>김해임 변호사</Text>
                    </View>
                    <View style={styles.date}>
                        <Text style={styles.dateText}>2021.07.30 19:12</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={styles.contentText}>
                        동의해요
                    </Text>
                </View>
			</View>
		);
	}
}

export default Reply;

const styles = StyleSheet.create({
	replyContainer: {
        borderTopColor: "#0078d4",
        borderTopWidth: 1,
        width: "100%",
        height: 'auto',
        paddingLeft: 14,
        paddingRight: 14,
        paddingTop: 11,
        paddingBottom: 7,
    },
    writer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 9,
    },
    name: {

    },
    nameText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    date: {

    },
    dateText: {
        fontSize: 15,
        color: "#0078d4"
    },
    content: {

    },
    contentText: {
        fontSize: 13
    },
});