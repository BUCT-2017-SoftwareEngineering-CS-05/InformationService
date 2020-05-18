// Import dependencies
import React, { Component } from "react";
import { View, Text } from "react-native";


class MuseumStatisticsHome extends Component{
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>MuseumStatisticsHome!</Text>
            </View>
        );
    }
}


class MuseumStatisticsDetail extends Component{
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>MuseumStatisticsDetail!</Text>
            </View>
        );
    }
}


// Export components
export { MuseumStatisticsHome, MuseumStatisticsDetail };