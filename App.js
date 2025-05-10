import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/Home/Home";
import Features from "./components/Home/Features";
import CustomHeader from "./components/Home/Header";
import Login from "./components/User/Login";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SỔ TAY QUẢN LÝ SỨC KHOẺ"
        component={Home}
        options={({ navigation }) => ({
          header: () => <CustomHeader navigation={navigation} title="SỔ TAY QUẢN LÝ SỨC KHOẺ" />,
        })}
      />

      <Stack.Screen name="feature" component={Features} />
      <Stack.Screen name="Login" component={Login} />
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
