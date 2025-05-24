import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import CompletedTasksScreen from './screens/CompletedTasksScreen';
import { auth } from './firebaseConfig';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
       <>
       <Stack.Screen name="Main" component={TabNavigator} />
       <Stack.Screen name="CompletedTasks" component={CompletedTasksScreen} />
       </>
       ) : (
       <>
       <Stack.Screen name="LoginScreen" component={LoginScreen} />
       <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
       </>
       )}
      </Stack.Navigator>

    </NavigationContainer>
  );
}
