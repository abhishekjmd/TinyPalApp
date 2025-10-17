import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import DoYouKnow from '../screens/DoYouKnow';
import Flashcard from '../screens/Flashcard';

const Stack = createStackNavigator();

export const AppStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name='doYouKnow' component={DoYouKnow} options={{ headerShown: false }} />
        <Stack.Screen name='flashcard' component={Flashcard} options={{ headerShown: false }} />
    </Stack.Navigator>
);
