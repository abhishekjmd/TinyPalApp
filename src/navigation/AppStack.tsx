import { createStackNavigator } from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import Cart from '../screens/Cart';
import Order from '../screens/Order';

const Stack = createStackNavigator();

export const AppStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Orders" component={Order} />
    </Stack.Navigator>
);
