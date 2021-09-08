import React, {Component} from 'react';
import {
	View,
} from 'react-native';
import {WebView} from 'react-native-webview';

class WebViewPage extends Component {
	render() {
		const url = this.props.navigation.getParam('url')
		return (
			<View style={{flex: 1}}>
				<WebView 
					source={{ uri: url}}
				/>
			</View>
		);
	}
}

export default WebViewPage;
