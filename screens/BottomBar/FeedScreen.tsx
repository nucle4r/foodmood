import React, { Component } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ForYouFeed from '../../components/Page/ForYou';
import FollowingFeed from '../../components/Page/Following';

const Tab = createMaterialTopTabNavigator();

export default class FeedScreen extends Component {

    render() {
        return (
            <Tab.Navigator
                initialRouteName="For You"
                screenOptions={{
                    tabBarActiveTintColor: '#FA7070',
                    tabBarLabelStyle: { fontSize: 14, textTransform: 'none', fontStyle: 'italic', fontWeight: "bold" },
                }}
            >
                <Tab.Screen
                    name="For You"
                    component={ForYouFeed}
                    options={{ tabBarLabel: 'for you' }}
                />
                <Tab.Screen
                    name="Following"
                    component={FollowingFeed}
                    options={{ tabBarLabel: 'following' }}
                />
            </Tab.Navigator>
        );
    }
}
