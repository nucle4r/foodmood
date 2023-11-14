import { config } from '@gluestack-ui/config';
import React from "react";
import { Box, GluestackUIProvider, Text, Pressable, Icon } from '@gluestack-ui/themed';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, ActivityIndicator } from "react-native";
import FeedScreen from './screens/BottomBar/FeedScreen';
import NotifyScreen from './screens/Stack/NotifyScreen';
import ProfileScreen from './screens/BottomBar/ProfileScreen';
import ListScreen from './screens/BottomBar/ListScreen';
import AddScreen from './screens/Stack/AddScreen';
import ExploreScreen from './screens/BottomBar/ExploreScreen';
import MyHeader from './components/Page/MyHeader';
import SearchScreen from './screens/Stack/SearchScreen';
import { RootStackParamList } from './components/RouteTypes/Stack';
import { Compass, Home, List, PlusCircle, UserCircle } from 'lucide-react-native';


const Stack = createNativeStackNavigator<RootStackParamList>();
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
          tabBarActiveTintColor: '#FA7070',
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={({ navigation, route }) => ({
            tabBarIcon: ({ color, size }) => (
              <Icon as={Home} color={color} size='xl'/>
            ),
            headerTitle: (props) => <MyHeader {...props} />,
            // Add a placeholder button without the `onPress` to avoid flicker
            headerLeft: () => (
              <Pressable style={{ paddingLeft: 20 }} onPress={() => navigation.navigate('Notifications')}>
                <MaterialCommunityIcons name="bell" color="black" size={22} />
              </Pressable>
            ),
            headerRight: () => (
              <Pressable style={{ paddingRight: 20 }} onPress={() => navigation.navigate('Search')}>
                <MaterialCommunityIcons name="magnify" color="black" size={22} />
              </Pressable>
            ),
          })}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon as={Compass} color={color} size='xl'/>
            ),
          }}
        />
        <Tab.Screen
          name="Add"
          component={AddScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon as={PlusCircle} color={color} size='xl'/>
            ),
          }}
        />
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon as={List} color={color} size='xl'/>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon as={UserCircle} color={color} size='xl'/>
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
              headerShown: true,
            }}
          >
            <Stack.Screen name="Root" component={this.Root} options={{ headerShown: false }} />
            <Stack.Screen name="Notifications" component={NotifyScreen} />
            <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }}/>

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