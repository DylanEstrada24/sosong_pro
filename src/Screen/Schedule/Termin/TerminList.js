import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import Termin from './Termin';

class TerminList extends Component {

    constructor(props) {
        super(props)

        this.state = ({
            progress: {}
        })
    }

    async componentDidMount() {
        this.setState({
            progress: this.props.progress
        })
        console.log('terminList mount', this.props.progress.length)
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    {/* {
                        // console.log(this.props.progress, 'memolist'),
                        this.props.progress.length !== 0 ? (
                            this.props.progress.map((value, index) => {
                                <Termin data={value} key={index} />
                            })
                        ) : (
                            <View style={styles.emptyContainer}>
                            </View>
                        )
                    } */}
                </View>
            </View>
        )
    }
}

export default TerminList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // margin: 15,
    },
});