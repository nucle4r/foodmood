import { config } from '@gluestack-ui/config';
import React, { useState, useEffect } from "react";
import { Box, GluestackUIProvider, Text, Pressable, Icon, HStack } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, ActivityIndicator } from "react-native";
import FeedScreen from './screens/BottomBar/FeedScreen';
import NotifyScreen from './screens/Stack/NotifyScreen';
import ProfileScreen from './screens/BottomBar/ProfileScreen';
import ListScreen from './screens/BottomBar/RecipeScreen';
import ExploreScreen from './screens/BottomBar/ExploreScreen';
import ExperienceScreen from './screens/BottomBar/ExperienceScreen';
import LoginScreen from './screens/Auth/LoginScreen';
import SignupScreen from './screens/Auth/SignupScreen';
import MyHeader from './components/Page/MyHeader';
import SearchScreen from './screens/Stack/SearchScreen';
import { RootStackParamList } from './components/RouteTypes/Stack';
import { AuthStackParamList } from './components/RouteTypes/AuthStack';
import { Compass, Home, List, PlusCircle, Soup, UserCircle, UtensilsCrossed } from 'lucide-react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useRecoilState } from 'recoil';
import { userData } from './utils/State';
import RecipeScreen from './screens/BottomBar/RecipeScreen';


const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();


export default function Main() {

    const [initializing, setInitializing] = useState(true);
    const [data, setData] = useRecoilState(userData);
    const [user, setUser] = useState();




    async function onAuthStateChanged(user) {
        setUser(user);
        if (user) {
            await firestore()
                .collection('users')
                .doc(user.uid)
                .get()
                .then(doc => {
                    setData({
                        id: doc.id,
                        email: doc.data().email,
                        fullName: doc.data().fullName,
                        username: doc.data().username,
                        profile_picture: doc.data().profile_picture,
                        gender: doc.data().gender,
                        no_of_posts: doc.data().no_of_posts,
                        followersCount: doc.data().followersCount,
                        followingCount: doc.data().followingCount,
                        
                    })

                })
        }
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const BottomBar = () => {
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
                            <Icon as={Home} color={color} size='xl' />
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
                            <Icon as={Compass} color={color} size='xl' />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Add"
                    component={ExperienceScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon as={UtensilsCrossed} color={color} size='xl' />
                        ),
                        headerShown: false
                    }}
                />
                <Tab.Screen
                    name="Recipe"
                    component={RecipeScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon as={Soup} color={color} size='xl' />
                        ),
                    }}
                />
                <Tab.Screen
                    name='Profile'
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <Icon as={UserCircle} color={color} size='xl' />
                        ),
                        headerTitle: (props) => <Text size='xl' color='black' bold='true'>{data.username}</Text>,
                        headerRight: () => (
                            <Pressable style={{ paddingRight: 20 }} onPress={() => auth().signOut().then(() => console.log('User signed out!'))}>
                                <HStack space='sm'>
                                    <Text color='black'>Logout</Text>
                                    <MaterialCommunityIcons name="logout" color="black" size={22} />
                                </HStack>
                            </Pressable>
                        ),
                    }}
                />
            </Tab.Navigator>

        )
    }

    if (initializing) return <ActivityIndicator style={styles.container} />;
    if (user) {
        return (
            <GluestackUIProvider config={config}>
                <NavigationContainer>
                    <RootStack.Navigator
                        initialRouteName="BottomBar"
                        screenOptions={{
                            headerShown: true,
                        }}
                    >
                        <RootStack.Screen name="BottomBar" component={BottomBar} options={{ headerShown: false }} />
                        <RootStack.Screen name="Notifications" component={NotifyScreen} />
                        <RootStack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />

                    </RootStack.Navigator>
                </NavigationContainer>
            </GluestackUIProvider>
        )
    } else {
        return (
            <GluestackUIProvider config={config}>
                <NavigationContainer>
                    <AuthStack.Navigator
                        initialRouteName="Login"
                        screenOptions={{
                            headerShown: false,
                        }}
                    >
                        <AuthStack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
                        <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    </AuthStack.Navigator>
                </NavigationContainer>
            </GluestackUIProvider>
        )
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