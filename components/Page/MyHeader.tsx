import React, { Component } from "react";
import {
    HStack,
    SearchIcon,
    Pressable,
    Icon,
    Text,
    Box,
    View,
    Center,
} from '@gluestack-ui/themed';
import { Image } from "react-native";
export default class MyHeader extends Component {

    render() {

        return (

            <Image
                source={require("../../assets/foodmood-logo.png")}
                style={{ height: 25, width: 100 }}
                resizeMode="contain"
                resizeMethod="resize"
            />

        );
    }
}