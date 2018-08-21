/**
 * Created by aolei-liliang on 2018/8/21.
 */


import React, {Component} from 'react';
import {Text, View, FlatList} from 'react-native';
import {ApplicationStyles} from "./themes";

export default class TalkView extends Component {


    constructor() {
        super();
        let data = [];
        for (let i = 0; i < 20; i++) {
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
                                    {item}
                                </Text>
                            </View>
                        )
                    }}
                />
            </View>);

    }


    loadNet = (flag) => {

    }
}
