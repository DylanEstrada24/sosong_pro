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
import {Collapse, CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import BlueDot from './BlueDot';

class Accordion extends Component {
    constructor(props) {
        super(props)
        
        this.state = ({
            collapse: false,
        })
    }

    toggleCollapse() {
        this.setState({collapse: !this.state.collapse})
    }

    componentDidMount() {
        if(this.props.expanded) {
            this.setState({
                collapse: true
            })
        }
    }

    render() {
        return (
            <Collapse onToggle={() => this.toggleCollapse()} isExpanded={this.props.expanded}>
                <CollapseHeader style={styles.categoryButton, styles.bottomLine}>
                    <View style={styles.categoryHeader}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
                            <BlueDot color={'#1CAA99'} />
                            <Text style={styles.categoryTitle}>{this.props.title}</Text>
                        </View>
                        {
                            this.state.collapse ? (
                                <Image style={styles.categoryImage} source={require('../assets/images/CaretUp.png')} />
                            ) : (
                                <Image style={styles.categoryImage} source={require('../assets/images/CaretDown.png')} />
                            )
                        }
                    </View>
                </CollapseHeader>
                <CollapseBody>
                    <View style={styles.buttonContainer}>
                        {
                            this.props.data && 
                            this.props.data.map((mark) => (
                                <TouchableOpacity style={styles.button} key={`${mark}`} onPress={() => this.props.selectHandler(`${mark}`)}>
                                    <Text style={styles.buttonText}>{mark}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </CollapseBody>
            </Collapse>
        )
    }
}

export default Accordion

const styles = StyleSheet.create({
    categoryButton: {
        // backgroundColor: "#0078d4",
    },
    categoryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        // margin: 15,
        marginTop: 5,
        marginBottom: 5,
        height: 30,
        borderBottomColor: '#C4C4C4',
		borderBottomWidth: 1,
    },
    categoryTitle: {
        marginLeft: 5,
        color: '#000',
        fontSize: 15,
        // fontWeight: "bold",
        // paddingLeft: 16,
    },
    categoryImage: {
        marginRight: 10,
        // color: "#FFFFFF",
    },
    buttonContainer: {
		flexDirection: 'row',
		padding: 10,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		flexWrap: 'wrap',
	},
    button: {
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 3,
		paddingBottom: 3,
		borderColor: '#0078d4',
		borderWidth: 1,
		borderRadius: 5,
		margin: 3,
	},
    buttonText: {
		fontSize: 13,
		// fontWeight: 'bold',
		color: '#000',
	},
})