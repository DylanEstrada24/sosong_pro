import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';

import Case from './Case';
import { commonApi } from '../../Common/ApiConnector';
import { connect } from 'react-redux';
import { store } from '../../redux/store';
import { setCase, clearCase } from '../../redux/actions/cases';

class CaseList extends Component {
	constructor(props) {
		super(props)
		this.state = ({
			cases: [],
			sort: this.props.sort,
			pageNum: 0,
		})
		this.caseHandle = this.caseHandle.bind(this)
	}


	async componentDidMount() {
		
		this.setState({
			cases: this.props.cases
		})

	}

	componentDidUpdate(prevProps, prevState) {
		if(prevProps.cases[0].userCase.caseIdx !== this.props.cases[0].userCase.caseIdx) {
			this.setState({
				cases: this.props.cases
			})
		} else if(prevProps.cases.length !== this.props.cases.length) {
			this.setState({
				cases: this.props.cases
			})
		}
	}
	

	caseHandle(data) {

        this.props.clearCase()

		let plaintiff = ''
		let defendant = ''
		let plaintiffDeputy = ''
		let defendantDeputy = ''

		if(data.party.length !== 0) {


			data.party.map((item) => {
				if(item.Classification.includes('원고')) {
					plaintiff = item.name
				} else {
					defendant = item.name
				}
			})

			// this.setState({
			// 	plaintiff: data.party[1].name,
			// 	defendant: data.party[0].name,
			// })

			// this.setState({
			// 	plaintiff: plaintiff,
			// 	defendant: defendant
			// })
		}

		if(data.representative.length !== 0) {

			data.representative.map((item) => {
				if(item.Classification.includes('원고')) {
					plaintiffDeputy = item.name
				} else {
					defendantDeputy = item.name
				}
			})

			// this.setState({
			// 	plaintiffDeputy: plaintiffDeputy,
			// 	defendantDeputy: defendantDeputy,
			// })
		}

		// if(data.party[1].name !== undefined) {
		// 	this.setState({
		// 		plaintiff : data.party[1].name
		// 	})
        // }

        // if(data.party[0].name !== undefined) {
		// 	this.setState({
		// 		defendant : data.party[0].name
		// 	})
        // }

		this.props.setCase({
            caseIdx: data.userCase.caseIdx,
            caseNumber: data.userCase.caseNumber,
            title: data.userCase.title,
            court: data.userCase.court,
            caseName: data.userCase.caseName,
            judiciary: data.userCase.judiciary,
            receiptAt: data.userCase.receiptAt,
            mergeClassification: data.userCase.mergeClassification,
            fee: data.userCase.fee,
            finalResult: data.userCase.finalResult,
			plaintiff: plaintiff,
			defendant: defendant,
			plaintiffDeputy: plaintiffDeputy,
			defendantDeputy: defendantDeputy,
        })

        this.props.navigation.navigate('CaseDetail')

    }

	render() {

		const cases = this.state.cases;
																				
		return (
			<View style={styles.caseListContainer}>
				<View>
					{
						// cases.cases.success === undefined ? 
						cases.map((item) => (
							<TouchableOpacity onPress={() => this.caseHandle(item)} key={item.userCase.caseIdx}>
								<Case navigation={this.props.navigation} key={item.userCase.caseIdx} data={item}/>
							</TouchableOpacity>
						))
						// )) : console.log("no cases")
					}
				</View>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		caseIdx: state.cases.caseIdx,
        caseNumber: state.cases.caseNumber,
        title: state.cases.title,
	}
};

const mapDispatchToProps = {
	setCase, clearCase,
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseList);

const styles = StyleSheet.create({
	caseListContainer: {
		flex: 1,
		backgroundColor: "#F4F4F4",
	},
	addCaseContainer: {

    },
});