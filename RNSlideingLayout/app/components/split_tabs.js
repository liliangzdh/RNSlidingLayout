import React from 'react';
import {View, Text, Animated, TouchableOpacity} from 'react-native'
import {ApplicationStyles, Colors, Metrics} from '../themes';


class SplitTabs extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            selectedTab: this.props.selectedTab || 0,
        }
    }

    _changeTabs = (index) => {
        this.setState({
            selectedTab: index
        })
    }

    _AnimatedVal = new Animated.Value(0)

    componentDidMount() {
        if (this.state.selectedTab > 0) {
            Animated.timing(
                this._AnimatedVal,
                {
                    toValue: this.state.selectedTab,
                    duration: 100,
                    useNativeDriver: true
                }
            ).start();
        }
    }


    changeTab = (index) => {
        this._changeTabs(index);
        Animated.timing(
            this._AnimatedVal,
            {
                toValue: index,
                duration: 100,
                useNativeDriver: true
            }
        ).start();
        const {
            changeTabs = () => {
            }
        } = this.props;
        changeTabs(index)
    }

    render() {
        const {
            tabs = [],
            tabsCount,
            height = 45,
            activeTabColor = Colors.baseColor,
            defaultColor=Colors.color_66,
            underLineWidth = 70,
            underLineHeight = 3,
            backgroundColor = 'white',
            changeTabs = () => {
            }

        } = this.props

        const _UnderLineWidth = tabs.length > 0 ? Metrics.screenWidth / tabs.length : 0;
        return (
            <View
                ref="rendViewBg"
                style={[ApplicationStyles.flexRow, {
                    borderBottomWidth: underLineHeight,
                    borderColor: Colors.color_ef,
                    backgroundColor: backgroundColor,
                }]}>
                {
                    tabs.map((i, index) => {
                        if (i) {
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        this.changeTab(index);
                                    }}
                                    key={index}
                                    style={[{flex: 1, height: height}, ApplicationStyles.middle]}>

                                    {tabsCount ?
                                        <Text
                                            style={[{
                                                fontSize: 16,
                                                color: this.state.selectedTab === index ? activeTabColor : defaultColor
                                            }]}>
                                            {tabsCount[index]}
                                        </Text> : null
                                    }

                                    <Text
                                        style={[{
                                            fontSize: 16,
                                            color: this.state.selectedTab === index ? activeTabColor : defaultColor
                                        }]}>
                                        {i}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }

                    })
                }
                <Animated.View
                    style={
                        {
                            alignItems: 'center',
                            width: _UnderLineWidth,
                            height: underLineHeight,
                            position: 'absolute',
                            bottom: -2,
                            transform: [
                                {
                                    translateX: this._AnimatedVal.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, _UnderLineWidth]
                                    })
                                }
                            ]
                        }
                    }>
                    <View style={{width: underLineWidth, backgroundColor: activeTabColor, height: '100%'}}/>
                </Animated.View>
            </View>
        )
    }


    setBgColor = (color) => {
        this.refs['rendViewBg'].setNativeProps({
            style: {
                backgroundColor: color,
            }
        });
    }
}

class ScrollContent extends React.PureComponent {
    render() {
        const {children, AnimatedVal = new Animated.Value(0), currentPage = 0} = this.props
        return (
            <Animated.View style={[
                ApplicationStyles.flexRow,
                {
                    width: Metrics.screenWidth * children.length,
                    height: '100%',
                    transform: [
                        {
                            translateX: AnimatedVal.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, -Metrics.screenWidth]
                            })
                        }
                    ]
                }
            ]}>
                {React.Children.map(children, (child, index) => {

                        if (child) {
                            return (
                                <View style={[
                                    ApplicationStyles.flexRow,
                                    {
                                        flex: 1,
                                    },

                                ]}>
                                    {
                                        currentPage === index ?
                                            child
                                            : null
                                    }
                                </View>
                            )
                        }
                    }
                )}
            </Animated.View>
        )
    }
}

export {
    SplitTabs,
    ScrollContent
}
