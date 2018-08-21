/**
 * Created by xmw on 2017/8/29.
 */
import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window')

const metrics = {
    marginHorizontal: 10,
    marginVertical: 10,
    section: 25,
    baseRadius: 4,
    borderLine: 1,
    inputHeight: 45,
    smallLine: 0.5,
    baseSpace: 10,
    baseMargin: 10,
    doubleBaseMargin: 20,
    smallMargin: 5,
    doubleSection: 50,
    horizontalLineHeight: 1,
    searchBarHeight: 30,
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
    buttonRadius: 4,
}

export default metrics