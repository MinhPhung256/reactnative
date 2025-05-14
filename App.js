import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/home/Home";
import Login from "./components/user/Login";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{ 
          title: "SỔ TAY QUẢN LÝ SỨC KHOẺ",
          headerStyle: {
            backgroundColor: '#BB0000'
          },
          headerTitleStyle: {
            color: 'white'
          }}}/>
      <Stack.Screen name="Login" component={Login} options={{ title: "ĐĂNG NHẬP"}}/>

    </Stack.Navigator>
  );
}

const App = () =>{
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );

}

export default App;
