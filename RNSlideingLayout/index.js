/** @format */

import {AppRegistry} from 'react-native';
import AppExample1 from './App';
import AppExample2 from './AppExample';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppExample2);
