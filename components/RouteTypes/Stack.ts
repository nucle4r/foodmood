import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Root: undefined;
    Explore: undefined;
    Notifications: undefined;
    Search: undefined;


};

export type RootStackNavigationProps = NativeStackScreenProps<RootStackParamList>;