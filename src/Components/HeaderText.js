import React, {Component} from 'react';
import {
	Text,
	StyleSheet,
} from 'react-native';

// export default HeaderText = ({title}, {count}) => {
// 	console.log(count)
// 	return (
// 		<Text style={styles.boardHeader}>{title}<Text style={styles.boardCount}>{count}</Text></Text>
// 	);
// }

class HeaderText extends Component {
	render() {
		return (
			<Text style={styles.boardHeader}>
				{this.props.title}
				{
					this.props.count && 
					<Text style={styles.boardCount}>
						{this.props.count}
					</Text>
				}
			</Text>
		)
	}
}

export default HeaderText

const styles = StyleSheet.create({
	boardHeader: {
		fontSize: 20,
		fontWeight: "700",
		marginLeft: "5%",
	},
	boardCount: {
		fontSize: 13,
	},
});