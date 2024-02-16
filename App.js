import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './Screens/HomeScreen';
import DetailPageCategory from './Screens/DetailPageCategory';
import DetailsPageRecipe from './Screens/DetailsPageRecipe';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <StatusBar animated={true} style='auto' />
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DetailPageCategory" component={DetailPageCategory} options={{ headerShown: false }} />
          <Stack.Screen name="DetailsPageRecipe" component={DetailsPageRecipe} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}


