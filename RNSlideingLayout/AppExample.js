/**
 * Created by aolei-liliang on 2018/9/3.
 *
 *
 */


import React, {Component} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import ScrollBlock from "./app/components/ScrollBlock";
import {ApplicationStyles} from './app/themes';


export default class AppExample extends Component {


    componentWillMount() {
        this.data = [];
        for (let i = 0; i < 100; i++) {
            this.data.push(i);
        }
    }

    render() {

        return (
            <ScrollBlock
                ref={'ScrollBlock'}
                innerHeight={290}
                style={[{flex: 1}]}
                backgroundColor={'red'}
                renderInside={() => {
                    return (
                        <View style={{height: 290, paddingTop: 20, backgroundColor: '#ff6600'}}>
                            {
                                this.data.slice(0, 9).map((item, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{height: 30}}>
                                            <Text style={{color: 'white'}}>{`${index}-里面固定的组件`}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                }}>
                <View
                    style={{
                        width: '100%',
                        justifyContent: 'center',
                        backgroundColor: 'red'
                    }}>

                    <TouchableOpacity
                        style={[ApplicationStyles.middle, {height: 40}]}
                        onPress={() => {
                            this.refs['ScrollBlock'].openOrClose();
                        }}>
                        <Text style={{color: 'white'}}>点击关闭</Text>
                    </TouchableOpacity>

                    {
                        this.data.map((item, index) => {
                            return (
                                <View
                                    key={index}
                                    style={[
                                        ApplicationStyles.middle,
                                        {backgroundColor: index % 2 === 0 ? "green" : 'blue'}]}>
                                    <Text style={{color: 'white'}}>{index}</Text>
                                </View>
                            )
                        })
                    }

                </View>
            </ScrollBlock>);

    }


}