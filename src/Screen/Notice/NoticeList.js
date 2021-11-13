import React, {Component} from 'react';
import {
	View,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import Notice from './Notice';
import { connect } from 'react-redux';
import { setNotice, clearNotice } from '../../redux/actions/notice'

class NoticeList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			notices: []
		}
		this.noticeHandle = this.noticeHandle.bind(this)
	}

	async componentDidMount() {
		this.setState({
			notices: this.props.notices
		})
	}

	noticeHandle(item) {

		this.props.clearNotice()

		this.props.setNotice({
			idx: item.idx,
			title: item.title,
			createAt: item.createAt,
			content: item.content,
			updateAt: item.updateAt,
		})

		this.props.navigation.navigate('NoticeDetail')

	}
	
	render() {
		return (
			<View style={styles.container}>
				{
					this.state.notices && this.state.notices.map((notice, idx) => (
						<TouchableOpacity onPress={() => this.noticeHandle(notice)} key={idx}>
							<Notice title={notice.title} createAt={notice.createAt} key={idx} />
						</TouchableOpacity>
					))
				}
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		noticeIdx: state.notice.noticeIdx,
        date: state.notice.date,
        title: state.notice.title,
		content: state.notice.content,
	}
};

const mapDispatchToProps = {
	setNotice, clearNotice,
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeList)

const styles = StyleSheet.create({
	container: {
	},
})