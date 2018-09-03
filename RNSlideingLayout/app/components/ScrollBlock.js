/**
 * Created by aolei-liliang on 2018/9/3.
 */
import React from 'react';
import {View, Text, Animated, PanResponder, TouchableOpacity, ScrollView} from 'react-native'
import PropTypes from 'prop-types';

// 选号区高度
let fheight = 0
// 往期高度
let bheight = 0
// 容器高度
let boxheight = 0
// 当前位置
let currentPosition = 0

let startLocation = 0

let ftarget = 0
export default class ScrollBlock extends React.Component {

    constructor(props) {
        super(props)
    }

    static propTypes = {
        backgroundColor: PropTypes.string
    }

    static defaultProps = {
        backgroundColor: 'white'
    }

    positionValue = 0
    _AnimatedValue = new Animated.Value(0)

    componentWillMount() {
        this._panResponder = PanResponder.create({

            onStartShouldSetPanResponder: (evt, gestureState) => {

                startLocation = evt.nativeEvent.pageY
                return false

            },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                startLocation = evt.nativeEvent.pageY
                return false
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                if (evt.nativeEvent.pageY - startLocation > -5 && evt.nativeEvent.pageY - startLocation < 5) {
                    return false
                } else {
                    return true
                }

            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {

                if (evt.nativeEvent.pageY - startLocation > -5 && evt.nativeEvent.pageY - startLocation < 5) {
                    return false
                } else {
                    return true
                }
            },
            onStartShouldSetResponder: (evt, gestureState) => false,
            onPanResponderGrant: (evt, gestureState) => {
                this._AnimatedValue.setOffset(this.positionValue)
                this._AnimatedValue.setValue(0)
            },
            onPanResponderMove: (evt, gestureState) => {
                const {dx, dy, moveY} = gestureState
                const _current = currentPosition + dy
                // console.log(`currentPosition:${currentPosition}===_current:${_current}===dy:${dy}`);
                // console.log(this._AnimatedValue);
                if (_current < 0 && fheight <= boxheight) {
                    return
                }
                if (fheight > boxheight && boxheight - _current >= fheight) {
                    return
                }
                if (_current < 0 && boxheight > fheight) {
                    return
                }
                if (_current < bheight) {
                    this._AnimatedValue.setValue(dy)
                }
            },
            onPanResponderTerminationRequest: (evt, gestureState) => false,
            onPanResponderRelease: (evt, gestureState) => {
                //移动结束后 offset 了 当前位置 （开始滑动的位置 为 0）currentPosition 为开始滑动的位置
                const {vy} = gestureState
                const dy = this._AnimatedValue._value

                //当前位置 滑动后的位置
                const _current = currentPosition + dy

                // 位置 1 条件 （当前位置超过1/2，&& 滑动方向（正下方），||  滑动前位置 >= 0 && 速度达到要求）而且当前位置一定在下方
                if (
                    (
                        (_current > bheight / 2 && vy >= 0 )
                        ||
                        ( currentPosition >= 0 && (vy > 0.5) )
                    )
                    && _current > 0
                ) {

                    Animated.spring(
                        this._AnimatedValue,
                        {
                            // 需要移动到下方，展开 当前位置可能是 bheight 和 0
                            toValue: bheight - currentPosition
                        }
                    ).start()
                    currentPosition = bheight;
                    // console.log(`currentPosition:${currentPosition} bheight:${bheight}  dy:${dy}`);
                }

                // 位置 2 条件 （当前位置 在 0 到 1/2 之间，||  滑动前位置 >= 0 && 速度方向达到要求）而且 当前位置一定在下方
                else if (
                    (
                        ( _current < bheight / 2 && _current > 0 )
                        ||
                        (currentPosition > 0 && vy < -0.5)
                    )

                ) {
                    Animated.spring(
                        this._AnimatedValue,
                        {
                            // 需要移动到最上方，关闭 当前位置可能是 bheight 和 0
                            toValue: -currentPosition
                        }
                    ).start()
                    currentPosition = 0;
                    // console.log(`currentPosition:${currentPosition} bheight:${bheight} dy:${dy}`);
                }

                //其他情况 也就是 当前位置在正上方 _current < 0
                else {
                    // 判断滑动有没有超出底部 && 选号区高度比容器大
                    if ((fheight + _current) < boxheight && fheight > boxheight) {
                        Animated.spring(
                            this._AnimatedValue,
                            {
                                // 这个情况是超出后 需要移动到尽头 （开始位置 到 尽头的距离）
                                toValue: boxheight - fheight - currentPosition
                            }
                        ).start()
                        currentPosition = boxheight - fheight
                    }
                    // 选号区高度比容器小
                    else if (fheight <= boxheight) {

                        Animated.spring(
                            this._AnimatedValue,
                            {
                                // 在区域内，移动回原位 0 currentPosition === 0 另一种情况是 打开状态往上啦到超过顶部的时候
                                toValue: currentPosition > 0 ? -currentPosition : 0
                            }
                        ).start()
                        currentPosition = 0
                    } else {

                        if (vy < -0.1) {
                            Animated.spring(
                                this._AnimatedValue,
                                {
                                    // 这个情况是超出后 需要移动到尽头 （开始位置 到 尽头的距离）
                                    toValue: boxheight - fheight - currentPosition
                                }
                            ).start()
                            currentPosition = boxheight - fheight
                        } else if (vy > 0.1) {
                            Animated.spring(
                                this._AnimatedValue,
                                {
                                    // 这个情况是超出后 需要移动到尽头 （开始位置 到 尽头的距离）
                                    toValue: -currentPosition
                                }
                            ).start()
                            currentPosition = 0
                        } else {
                            currentPosition = currentPosition + dy
                        }
                    }
                }

                this.positionValue = currentPosition;




            },
            onPanResponderTerminate: (evt, gestureState) => {
                // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
            },
            onShouldBlockNativeResponder: (evt, gestureState) => {
                // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
                // 默认返回true。目前暂时只支持android。
                return false;
            },
        });
    }


    get_fheight(event) {
        ftarget = event.nativeEvent.target
        //使用大括号是为了限制let结构赋值得到的变量的作用域，因为接来下还要结构解构赋值一次
        {
            //获取根View的宽高，以及左上角的坐标值
            let {x, y, width, height} = event.nativeEvent.layout;
            fheight = height
        }
    }

    get_bHeight(event) {

        let {x, y, width, height} = event.nativeEvent.layout;
        bheight = height
    }

    get_boxHeight(event) {

        let {x, y, width, height} = event.nativeEvent.layout;
        boxheight = height
    }


    /***
     * 关闭或者打开
     */
    openOrClose = () => {
        // console.log(`bheight:${bheight}==currentPosition:${currentPosition} ${flag?'关闭':'打开'}  positionValue：${this.positionValue} boxheight:${boxheight}`);
        let flag = currentPosition > 0;
        // console.log(`_AnimatedValue._value:${this._AnimatedValue._value}== currentPosition: ${currentPosition} ${flag?'关闭':'打开'}`);
        // console.log(this._AnimatedValue);
        this._AnimatedValue.setOffset(0);
        this._AnimatedValue.setValue(this.positionValue);
        Animated.spring(
            this._AnimatedValue,
            {
                // 需要移动到最上方，关闭 当前位置可能是 bheight 和 0
                toValue: flag ? 0 : bheight
            }
        ).start()
        currentPosition = flag ? 0 : bheight;
        this.positionValue = currentPosition;
    }

    /**
     * 关闭
     */
    close=()=>{
        this._AnimatedValue.setValue(currentPosition);
        Animated.spring(
            this._AnimatedValue,
            {
                // 需要移动到最上方，关闭 当前位置可能是 bheight 和 0
                toValue: 0,
            }
        ).start();
        currentPosition = 0;
        this.positionValue = currentPosition;
    }

    render() {
        return (
            <View
                onLayout={this.get_boxHeight}
                style={{flex: 1, position: 'relative', backgroundColor: this.props.backgroundColor, overflow: 'hidden'}}
                {...this._panResponder.panHandlers}
            >

                <View
                    onLayout={this.get_bHeight}
                    style={{zIndex: -1, position: 'absolute', width: '100%', top: 0,}}
                >
                    {this.props.renderInside()}
                </View>
                <Animated.View
                    style={{
                        zIndex: -1, position: 'absolute', width: '100%', top: 0,
                        transform: [
                            {translateY: this._AnimatedValue}
                        ],
                    }}
                    onLayout={this.get_fheight}

                >
                    {React.Children.map(this.props.children, child => child) }
                </Animated.View>

            </View>
        )
    }
}