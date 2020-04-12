// Import dependencies
import * as React from 'react';
import { View, Text, AsyncStorage } from "react-native";


function MuseumListHome({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>MuseumListHome!</Text>
        </View>
    );
}


function MuseumListDetail({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>MuseumListDetail!</Text>
        </View>
    );
}


// Export components
export { MuseumListHome, MuseumListDetail };