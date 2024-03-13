import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamList = {
    Login: undefined;
    Signup: undefined;
};

export type AuthStackNavigationProps = NativeStackScreenProps<AuthStackParamList>;