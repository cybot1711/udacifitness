import React, { Component } from 'react';
import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import AddEntry from './components/AddEntry'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { TabNavigator, StackNavigator } from 'react-navigation';
import reducer from './reducers';
import History from './components/History';
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import EntryDetail from './components/EntryDetail';
import Live from './components/Live';

const UdaciStatusbar = ({ backgroundColor, ...props }) =>
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
  </View>;

const Tabs = TabNavigator({
    History: {
      screen: History,
      navigationOptions: {
        tabBarLable: 'History',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>,
      }
    },
    AddEntry: {
      screen: AddEntry,
      navigationOptions: {
        tabBarLable: 'Add Entry',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>,
      }
    },
    Live: {
      screen: Live,
      navigationOptions: {
        tabBarLable: 'Live',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-speedometer' size={30} color={tintColor}/>,
      }
    }
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0,0,0,0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      }
    }
  });

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
});

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={styles.container}>
          <UdaciStatusbar backgroundColor={purple} barStyle='dark-content'/>
          <MainNavigator tintColor={white}/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
  },
});