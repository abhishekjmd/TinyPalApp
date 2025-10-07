import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Splash from '../screens/Splash';
import BottomTabs from './BottomTabs';

const Stack = createStackNavigator();

export const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
            </Stack.Navigator>
);
