import React, { Component } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

class Live extends Component {
  state = {
    coords: null,
    direction: '',
    status: null,
  };

  render() {
    const { coords, direction, status } = this.state;

    if (status === null) return <ActivityIndicator style={{ marginTop: 30 }}/>;
    if (status === 'denied') return <View><Text>Denied!!</Text></View>;
    if (status === 'undetermined') return <View><Text>Undetermined!!</Text></View>;
    return (
      <View>
        <Text>Status</Text>
        <Text>{JSON.stringify(this.state)}</Text>
      </View>
    )
  }
}

export default Live;
