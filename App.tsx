import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ProfileScreen from './src/screens/ProfileScreen';


const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{title: 'Task Manager'}}
        />
        <Stack.Screen 
          name="Details" 
          component={DetailsScreen} 
          options={{title: 'Task Details'}}
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{title: 'My Profile'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;