// Import dependencies
import * as React from 'react';
import { View, Text, AsyncStorage } from "react-native";


function MuseumStatisticsHome({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>MuseumStatisticsHome!</Text>
        </View>
    );
}


function MuseumStatisticsDetail({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>MuseumStatisticsDetail!</Text>
        </View>
    );
}


// Export components
export { MuseumStatisticsHome, MuseumStatisticsDetail };