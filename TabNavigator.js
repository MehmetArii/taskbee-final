// TabNavigator.js

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TaskListScreen from './screens/TaskListScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import ProfileScreen from './screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="TaskList"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#f5c518',
        tabBarInactiveTintColor: '#555',
        tabBarStyle: { backgroundColor: '#fffbea' },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'TaskList') iconName = 'list-outline';
          else if (route.name === 'AddTask') iconName = 'add-circle-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="TaskList" component={TaskListScreen} options={{ tabBarLabel: 'Görevler' }} />
      <Tab.Screen name="AddTask" component={AddTaskScreen} options={{ tabBarLabel: 'Ekle' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profil' }} />

    </Tab.Navigator>
  );
}
