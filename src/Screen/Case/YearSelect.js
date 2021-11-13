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

import { connect } from 'react-redux';
import { setCase } from '../../redux/actions/cases';
import moment from 'moment';

class YearSelect extends Component {

	constructor(props) {
        super(props)
        this.state = {
			year: '',
        }

		this.yearHandler = this.yearHandler.bind(this)
    }

	yearHandler(year) {
		this.props.setCase({
			year: year,
		})

		this.props.navigation.pop()
	}

	render() {
		let years = Array(28).fill().map((arr, i) => {
			return 2025 - i
		})


		let thisYear = moment(new Date())
		let year2025 = moment([2025, 0, 1])

		let diff = thisYear.diff(year2025, 'years')

		if(diff > 0) {
			for(let i = 1; i <= diff; i++) {
				years = [2025 + i, ...years]
			}
		}

		return (
			<View style={styles.container}>
				<View style={styles.Top}>
					<View style={styles.header}>
						<View style={styles.title}>
							<Text style={styles.titleText}>사건년도 선택</Text>
						</View>
						<TouchableOpacity style={styles.exit} onPress={() => this.props.navigation.pop()} >
							<Image source={require('../../assets/images/X.png')} />
						</TouchableOpacity>
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
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
		borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
		paddingBottom: 5,
	},
	exit: {
		// marginLeft: 15,
		marginRight: 10,
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
		marginTop: 20,
	},
	buttonContainer: {

	},
	button: {
		borderColor: '#0078d4',
		borderWidth: 1,
		// padding: (20, 10),
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 18,
		paddingRight: 18,
		borderRadius: 5,
		margin: 8,
	},
	buttonText: {
		fontSize: 15,
		// fontWeight: 'bold',
		// color: '#0078d4',
	},
	buttonSelected: {
		backgroundColor: '#0078d4',
		borderColor: '#0078d4',
		borderWidth: 1,
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 18,
		paddingRight: 18,
		borderRadius: 5,
		margin: 8,
	},
	buttonSelectedText: {
		fontSize: 15,
		fontWeight: 'bold',
		color: '#FFFFFF'
	},
})