import { Text } from "@gluestack-ui/themed";
import React, { Component } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as SecureStore from 'expo-secure-store';
import Loader from "../../utils/Loader";


export default class LoginScreen extends Component {
    state = {
        email: '',
        password: '',
        errorMessage: null,
        loggedUID: null,
        isLoading: false,
    };
    storeUser = async (uid: string) => {
        await SecureStore.setItemAsync('USERID', uid)
            .then(() => {
                this.props.navigation.navigate('BottomBar'),
                    this.setState({ isLoading: false })
            }
            )

    }

    handleLogin = () => {
        const { email, password } = this.state;
        this.setState({ isLoading: true });
        auth()
            .signInWithEmailAndPassword(email, password)
            .then(async result => {
                await firestore()
                    .collection('users')
                    .doc(result.user.uid)
                    .update({
                        last_logged_in: Date.now(),
                    }),
                    await this.storeUser(result.user.uid);
            })
            .catch(error =>
                this.setState({ errorMessage: error.message, isLoading: false }),
            );
    };
    render() {
        return (

            <SafeAreaView>
                <Loader isLoading={this.state.isLoading} color="#ff66be" />
                <ScrollView>
                    <Text style={styles.greeting}>{`Hello again.\nWelcome back.`}</Text>

                    <View style={styles.errorMessage}>
                        {this.state.errorMessage && (
                            <Text style={styles.error}>{this.state.errorMessage}</Text>
                        )}
                    </View>

                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Email Address</Text>
                            <TextInput
                                style={styles.input}
                                autoCapitalize="none"
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}></TextInput>
                        </View>

                        <View style={{ marginTop: 32 }}>
                            <Text style={styles.inputTitle}>Password</Text>
                            <TextInput
                                style={styles.input}
                                secureTextEntry
                                autoCapitalize="none"
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}></TextInput>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                        <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign in</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ alignSelf: 'center', marginTop: 32 }}
                        onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={{ color: '#414959', fontSize: 13 }}>
                            New to FoodMood?{' '}
                            <Text style={{ fontWeight: '500', color: '#E9446A' }}>Sign up</Text>
                        </Text>
                    </TouchableOpacity>
                    <View style={{ alignSelf: 'center', marginTop: 16 }}>
                        <Text style={{ color: '#414959', fontSize: 13 }}>OR</Text>
                    </View>
                    <View style={{ alignSelf: 'center', marginTop: 16 }}>

                    </View>
                </ScrollView>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    greeting: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
    errorMessage: {
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30,
    },
    error: {
        color: '#E9446A',
        fontSize: 13,
        fontWeight: '600',
        textAlign: 'center',
    },
    form: {
        marginBottom: 28,
        marginHorizontal: 30,
    },
    inputTitle: {
        color: '#8A8F9E',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    input: {
        borderBottomColor: '#8A8F9E',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#161F3D',
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#E9446A',
        borderRadius: 4,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
    },
});