/**
 * Created by aolei-liliang on 2018/8/21.
 */


import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {ApplicationStyles} from "./themes";

export default class TalkView2 extends Component {


    constructor() {
        super();
        let data = [];
        for (let i = 0; i < 10; i++) {
            data.push(i);
        }
        this.state = {data: data}
    }

    render() {
        return (
            <View style={[ApplicationStyles.flex1]}>

                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => {
                        return index.toString()
                    }}
                    getItemLayout={(data, index) => (
                        {length: 50, offset: 50 * index, index}
                    )}
                    renderItem={({item, index}) => {
                        return (
                            <View
                                style={[
                                    {
                                        height: 50,
                                        backgroundColor: item % 2 === 0 ? "green" : 'blue'
                                    }]}>

                                <Text
                                    style={{color: 'white', fontSize: 20}}>
                                    {index}
                                </Text>
                            </View>
                        )
                    }}
                />
            </View>);

    }


    loadNet = (flag) => {
        let data = this.state.data;
        for (let i = 0; i < 10; i++) {
            data.push(i);
        }
       this.setState({data:data});

    }
}
