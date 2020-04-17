// Import dependencies
import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import {Button} from 'react-native-elements'
import { useRoute } from '@react-navigation/native';


class MuseumListHome extends Component{
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>MuseumListHome!</Text>
                <Button
                    title={`Go to Detail and change num to 999`}
                    onPress={() => this.props.navigation.navigate('MuseumListDetail',{num:999})}
                />
            </View>
        );
    }
}


class MuseumListDetail extends Component{
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>{this.props.route.params.num}</Text>
            </View>
        );
    }
}

// Export components
export { MuseumListHome, MuseumListDetail };