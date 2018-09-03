/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from "react";
import {Animated, ScrollView, View} from "react-native";
import {ScrollContent, SplitTabs} from "./app/components/split_tabs";
import TalkView from "./app/TalkView";
import {Colors} from "./app/themes";
import TalkView2 from "./app/TalkView2";

type Props = {};
export default class App extends Component {


    AnimatedVal = new Animated.Value(0);

    constructor(props) {
        super(props)
        this.state = {
            // animating: true,
            isShow: false,
            currentPage: 0,
            hidehead: false
            // _AnimatedVal:  new Animated.Value(0)
        }
    }

    render() {
        return (
            <View style={[{flex:1}]}>

                <ScrollView
                    stickyHeaderIndices={[1]}
                    scrollEventThrottle={1}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    onScroll={this.scroll}>


                    {/*<Image*/}
                    {/*resizeMode="stretch"*/}
                    {/*style={{position: 'absolute', width: '100%', height: 150}}*/}
                    {/*source={Images.user_center_bg}/>*/}

                    <View style={[
                        {
                            height: 200,
                            alignItems: 'center',
                            backgroundColor: 'red',
                            flexDirection:"row"
                        }]}>


                    </View>


                    <SplitTabs
                        ref="SplitTabs"
                        tabs={['栏目1', '栏目2'] }
                        backgroundColor={Colors.baseColor}
                        activeTabColor={Colors.color_white}
                        defaultColor={'#ffffff82'}
                        underLineWidth={0}
                        selectedTab={this.state.currentPage}
                        changeTabs={ (index) => {
                            Animated.timing(
                                this.AnimatedVal,
                                {
                                    toValue: index,
                                    duration: 100,
                                    useNativeDriver: true
                                }
                            ).start();
                            this.setState({
                                currentPage: index
                            })
                        }}/>


                    <ScrollContent
                        AnimatedVal={this.AnimatedVal}
                        currentPage={this.state.currentPage}>

                        <TalkView
                            ref={'TalkView'}
                            tabLabel="栏目1"
                            onScroll={this.scroll}/>


                        <TalkView2
                            ref={'TalkView'}
                            tabLabel="栏目2"
                            onScroll={this.scroll}/>



                    </ScrollContent>


                </ScrollView>
            </View>
        );
    }


    scroll = (event) => {
        let y = event.nativeEvent.contentOffset.y;
        let height = event.nativeEvent.layoutMeasurement.height;
        let contentHeight = event.nativeEvent.contentSize.height;
        if (y + height >= contentHeight - 20) {
            this.refs['TalkView'].loadNet(true);
        }
        if (y > 100) {
            //设置颜色
            //this.refs['SplitTabs'].setBgColor(Colors.baseColor);
        } else {
            //设置透明
            //this.refs['SplitTabs'].setBgColor('#ffffff00');
        }
    }
}

