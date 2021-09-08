import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	TextInput,
	Image,
	StyleSheet,
	Dimensions,
} from 'react-native';

// import BlueDot from '../../Components/BlueDot';
import SettingItem from '../Setting/SettingItem';

import CheckBox from '@react-native-community/checkbox';
import { connect } from 'react-redux';
import { setCase } from '../../redux/actions/cases';
import moment from 'moment';

class YearSelect extends Component {

	constructor() {
        super()
        this.state = {
			year: '',
        }

		this.yearHandler = this.yearHandler.bind(this)
    }

	yearHandler(year) {
		// const cases = {
		// 	year: year,
		// }

		this.props.setCase({
			year: year,
		})

		this.props.navigation.pop()
	}

	render() {

		let years = Array(23).fill().map((arr, i) => {
			return i + 1998
		})

		console.log(years)

		let thisYear = moment(new Date())
		let year2020 = moment([2020, 0, 1])

		let diff = thisYear.diff(year2020, 'years')

		if(diff > 0) {
			for(let i = 1; i <= diff; i++) {
				years = years.concat(2020 + i)
			}
		}

		return (
			<View style={styles.container}>
				<View style={styles.Top}>
					<View style={styles.header}>
						<TouchableOpacity style={styles.exit} onPress={() => this.props.navigation.pop()} >
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
						<View style={styles.title}>
							<Text style={styles.titleText}>사건년도 선택</Text>
						</View>
					</View>
					<View style={styles.contentContainer}>
						{
							years.map((year) => (
								<TouchableOpacity style={styles.button} key={year} onPress={() => {this.yearHandler(year)}} >
									<Text style={styles.buttonText}>{year}</Text>
								</TouchableOpacity>
							))
						}
					</View>
				</View>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		year: state.cases.year
	}
};

const mapDispatchToProps = {
	setCase,
}

export default connect(mapStateToProps, mapDispatchToProps)(YearSelect);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	header: {
		width: '100%',
		flexDirection: 'column',
		marginTop: 20,
		borderBottomColor: '#2665A1',
		borderBottomWidth: 1,
		paddingBottom: 5,
		marginBottom: 8,
	},
	exit: {
		marginLeft: 15,
	},
	title: {

	},
	titleText: {
		fontSize: 20,
		fontWeight: '700',
		marginLeft: 18,
	},
	contentContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		flexWrap: 'wrap',
		// alignItems: 'center',
		// marginLeft: Dimensions.get('window').width / 20,
		// marginRight: Dimensions.get('window').width / 20,
		// marginTop: 3,
	},
	buttonContainer: {

	},
	button: {
		borderColor: '#2665A1',
		borderWidth: 2,
		// padding: (20, 10),
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 18,
		paddingRight: 18,
		borderRadius: 3,
		margin: 8,
	},
	buttonText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#2665A1',
	},
	buttonSelected: {
		backgroundColor: '#2665A1',
		borderColor: '#2665A1',
		borderWidth: 2,
		paddingTop: 8,
		paddingBottom: 8,
		paddingLeft: 18,
		paddingRight: 18,
		borderRadius: 3,
		margin: 8,
	},
	buttonSelectedText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF'
	},
})