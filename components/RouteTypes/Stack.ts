import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    AuthLoading: undefined;
    Root: undefined;
    Auth: undefined;
    BottomBar: undefined;
    Notifications: undefined;
    Search: undefined;


};

export type RootStackNavigationProps = NativeStackScreenProps<RootStackParamList>;