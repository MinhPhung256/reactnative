import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './components/Home/Home';
import Features from './components/Home/Features'; // Thêm các màn khác nếu có

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Features" component={Features} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
