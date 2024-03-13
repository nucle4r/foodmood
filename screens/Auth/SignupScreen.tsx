import { HStack, Icon, Text } from "@gluestack-ui/themed";
import { ArrowLeft, Ghost } from "lucide-react-native";
import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import * as SecureStore from 'expo-secure-store';
import Loader from "../../utils/Loader";


export default class SignupScreen extends Component {
  state = {
    fullName: '',
    username: '',
    email: '',
    password: '',
    errorMessage: null,
    isLoading: false,
  };
  avatarThumbnail =
    'https://firebasestorage.googleapis.com/v0/b/foodmood-416307.appspot.com/o/avatar.png?alt=media&token=498430d7-16dd-4bde-a958-11a8f0329fa2'

  storeUser = async (uid: string) => {
    await SecureStore.setItemAsync('USERID', uid)
      .then(() => {
        this.props.navigation.navigate('BottomBar'),
          this.setState({ isLoading: false })
      }
      )
  }
  
  handleSignUp = async () => {
    this.setState({ isLoading: true });
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(async userCredentials => {
        await userCredentials.user.updateProfile({
          displayName: `${this.state.fullName}`,
        }),
          await firestore()
            .collection('users')
            .doc(userCredentials.user.uid)
            .set({
              email: userCredentials.user.email,
              profile_picture: this.avatarThumbnail,
              fullName: this.state.fullName,
              username: this.state.username,
              gender: null,
              no_of_posts: 0,
              followersCount: 0,
              followingCount: 0,
              created_at: firestore.FieldValue.serverTimestamp(),
            }),
          await this.storeUser(userCredentials.user.uid);
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
          <TouchableOpacity
            style={styles.back}
            onPress={() => this.props.navigation.goBack()}>
            <Icon as={ArrowLeft} size="xl" />
          </TouchableOpacity>
          <View
            style={{
              position: 'absolute',
              top: 25,
              alignItems: 'center',
              width: '100%',
            }}>
            <Text
              style={styles.greeting}>{`Hello!\nSign up to get started.`}</Text>
          </View>

          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Full Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={fullName => this.setState({ fullName })}
                value={this.state.fullName}></TextInput>
            </View>
            <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Username</Text>
              <TextInput
                style={styles.input}
                onChangeText={username => this.setState({ username })}
                value={this.state.username}></TextInput>
            </View>

            <View style={{ marginTop: 32 }}>
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

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{ color: '#FFF', fontWeight: '500' }}>Sign up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: 'center', marginTop: 32 }}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={{ color: '#414959', fontSize: 13 }}>
              Already have an account?{' '}
              <Text style={{ fontWeight: '500', color: '#E9446A' }}>Sign in</Text>
            </Text>
          </TouchableOpacity>
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
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
  },
  form: {
    marginVertical: 35,
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
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
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
  back: {
    position: 'absolute',
    top: 32,
    left: 32,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(21, 22, 48, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    backgroundColor: '#E1E2E6',
    borderRadius: 50,
    marginTop: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});