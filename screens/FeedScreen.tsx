import React, { Component } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ForYouFeed from '../components/ForYou';
import FollowingFeed from '../components/Following';

const Tab = createMaterialTopTabNavigator();

export default class FeedScreen extends Component {

    render() {
        return (
            <Tab.Navigator
                initialRouteName="For You"
                screenOptions={{
                    tabBarActiveTintColor: '#e91e63',
                    tabBarLabelStyle: { fontSize: 12 },
                }}
            >
                <Tab.Screen
                    name="For You"
                    component={ForYouFeed}
                    options={{ tabBarLabel: 'For You' }}
                />
                <Tab.Screen
                    name="Following"
                    component={FollowingFeed}
                    options={{ tabBarLabel: 'Following' }}
                />
            </Tab.Navigator>
        );
    }
}
