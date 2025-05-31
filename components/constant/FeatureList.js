import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon, IconButton } from "react-native-paper";
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import ActivityDetail from "./components/ActivityDetail";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyDispatchContext, MyUserContext } from "./configs/UserContext";
import { useContext, useReducer } from "react";
import MyUserReducer from "./configs/UserReducer";
import ChooseRole from "./components/User/ChooseRole";

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
      <Stack.Screen name="Home" component={Home} options={{  headerShown: false, }} />
      <Stack.Screen name="ActivityDetail" component={ActivityDetail} options={{ title: "HOẠT ĐỘNG"}}/>
      <Stack.Screen name="ChooseRole" component={ChooseRole} options={{ title: "CHẾ ĐỘ"}}/>

    </Stack.Navigator>
  );
}


const ProfileStackNavigator = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen name="Profile" component={UserProfile} options={{ title: 'Tài khoản', headerBackVisible: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Đổi mật khẩu' }} />
      </Stack.Navigator>
  );
};

const AdminStackNavigator = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen name="AdministrationScreen" component={Administration} options={{ title: 'Quản trị', headerBackVisible: false }} />
          <Stack.Screen name="ApproveScreen" component={Approve} options={{ title: 'Duyệt tài khoản' }} />
          <Stack.Screen name="CreateAccountScreen" component={CreateAccount} options={{ title: 'Tạo tài khoản giáo viên' }} />
          <Stack.Screen name="ResetTimerScreen" component={ResetTimer} options={{ title: 'Đặt lại thời gian đổi mật khẩu' }} />
      </Stack.Navigator>
  );
};

const ChatStackNavigator = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen name="UserListScreen" component={UsersList} options={{ title: 'Chọn tin nhắn', headerBackVisible: false }} />
          <Stack.Screen name="ChatScreen" component={Chat} options={{ title: 'Tin nhắn' }} />
      </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  const user = useContext(MyUserContext);

  return (
    <Tab.Navigator screenOptions={{
      tabBarShowLabel: false,
      headerStyle: {
        backgroundColor: '#BB0000'
      },
      tabBarActiveTintColor:  '#BB0000',
      headerTitleStyle: {
        color: 'white'
      },
      headerTintColor: 'white',}}>
      {user === null ? (
        <>
         <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{ title: "SỔ TAY QUẢN LÝ SỨC KHOẺ",tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} /> }} />
         <Tab.Screen name="LoginScreen" component={Login} options={{ title: 'ĐĂNG NHẬP', tabBarIcon: ({ color, size }) => <Icon source="account" color={color} size={size} /> }} />
         <Tab.Screen name="RegisterScreen" component={Register} options={{ title: 'ĐĂNG KÝ', tabBarIcon: ({ color, size }) => <Icon source="account-plus" color={color} size={size} /> }} />
        </>
      ): (
        <>
        <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{ tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} /> }} />
        <Tab.Screen name="ChatStack" component={ChatStackNavigator} options={{ title: 'Chat', tabBarIcon: ({ color, size }) => <Icon source="message" color={color} size={size} /> }} />
        {user.role === 0 && (
            <Tab.Screen name="AdminStack" component={AdminStackNavigator} options={{ title: 'Quản trị', tabBarIcon: ({ color, size }) => <Icon source="shield-account" color={color} size={size} /> }} />
        )}
        <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} options={{ title: 'Tài khoản', tabBarIcon: ({ color, size }) => <Icon source="account-cog" color={color} size={size} /> }} />
        </>
      )}
      </Tab.Navigator>
  );
}

import TestModalScreen from './components/data/TestModalScreen'; // đúng đường dẫn

<Stack.Screen name="TestModal" component={TestModalScreen} />


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
