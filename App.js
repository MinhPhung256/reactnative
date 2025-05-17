import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon, IconButton } from "react-native-paper";
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import ActivityDetail from "./components/ActivityDetail";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyDispatchContext, MyUserContext } from "./configs/UserContext";
import { useReducer } from "react";
import MyUserReducer from "./configs/UserReducer";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
       screenOptions={{
        headerStyle: {
          backgroundColor: '#BB0000'
        },
        headerTitleStyle: {
          color: 'white'
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: "SỔ TAY QUẢN LÝ SỨC KHOẺ", headerBackVisible: false, }} />
      <Stack.Screen name="Login" component={Login} options={{ title: "ĐĂNG NHẬP"}} />
      <Stack.Screen name="Register" component={Register} options={{ title: "ĐĂNG KÝ"}} />
      <Stack.Screen name="ActivityDetail" component={ActivityDetail} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomeStack" 
                  component={HomeStackNavigator} 
                  options={{ title: "Trang chủ",  
                  headerShown: false, tabBarIcon: ({ color, size }) => <Icon source="home" 
                  color={color} size={size} /> }} />
    </Tab.Navigator>
  )
}

const App = () =>{
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <MyUserContext.Provider value = {user}>
      <MyDispatchContext.Provider value = {dispatch }>
        <NavigationContainer>
         <TabNavigator/>
      </NavigationContainer>
      </MyDispatchContext.Provider>
    </MyUserContext.Provider>
    
  );

}

export default App;
