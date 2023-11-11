import { config } from '@gluestack-ui/config';
import React from "react";
import { Box, GluestackUIProvider, Text, Pressable } from '@gluestack-ui/themed';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, ActivityIndicator } from "react-native";
import FeedScreen from './screens/FeedScreen';
import NotifyScreen from './screens/NotifyScreen';
import ProfileScreen from './screens/ProfileScreen';
import ListScreen from './screens/ListScreen';
import AddScreen from './screens/AddScreen';
import ExploreScreen from './screens/ExploreScreen';
import MyHeader from './components/MyHeader';
import SearchScreen from './screens/SearchScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default class App extends React.Component {
  state = {
    isReady: false,
  };
  componentDidMount = async () => {
    this.setState({ isReady: true });
  };

  Root = () => {
    return (
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarShowLabel: false
        }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={({ navigation, route }) => ({
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
            headerTitle: (props) => <MyHeader {...props} />,
            // Add a placeholder button without the `onPress` to avoid flicker
            headerLeft: () => (
              <Pressable style={{paddingLeft:20}} onPress={() => navigation.navigate('Notifications')}>
                <MaterialCommunityIcons name="bell" color="gray" size={22} />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable style={{paddingRight:20}} onPress={() => navigation.navigate('Search')}>
                <MaterialCommunityIcons name="magnify" color="gray" size={22} />
              </Pressable>
            ),
          })}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="compass" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-circle" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="playlist-edit" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
  render() {
    if (!this.state.isReady) {
      return <ActivityIndicator size="large" style={styles.container} />;
    }

    return (
      <GluestackUIProvider config={config}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Root"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Root" component={this.Root} />
            <Stack.Screen name="Notifications" component={NotifyScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />

          </Stack.Navigator>
        </NavigationContainer>
      </GluestackUIProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});