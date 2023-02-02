import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Screens/Home';
import Detail from './Screens/Detail';
import LoginScreen from './Screens/LoginScreen';
import RegistrationScreen from './Screens/RegistrationScreen';

const Stack=createNativeStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen}    options={{title: 'My home'}}/>
      <Stack.Screen name="Registration" component={RegistrationScreen} />
         <Stack.Screen
          name='Home'
          component={Home}
         />
         <Stack.Screen
          name='Detail'
          component={Detail}
         />
      </Stack.Navigator>
    </NavigationContainer>
  )
}