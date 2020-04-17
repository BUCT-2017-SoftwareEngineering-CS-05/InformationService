// Import dependencies
import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";

class UserHome extends Component{
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>UserHome!</Text>
            </View>
        );
    }
}


// Export components
export { UserHome };