import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon, IconButton } from "react-native-paper";
import { Provider as PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MyDispatchContext, MyUserContext } from "./configs/UserContext";
import { useContext, useReducer } from "react";
import Home from "./components/Home/Home";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Dashboard from "./components/Home/Dashboard";
import ActivityDetail from "./components/ActivityDetail";
import MyUserReducer from "./configs/UserReducer";
import ChooseRole from "./components/User/ChooseRole";
import BMICalculator from "./components/BMI";
import Profile from "./components/User/Profile";
import HealthDiary from "./components/User1/HealthDiary";
import Statistics from "./components/User1/Statistics";
import Reminders from "./components/User1/Reminders"
import PersonalInfoScreen from "./components/User1/HealthDemo";
import MealPlan from "./components/MealPlan";
import WorkoutPlan from "./components/WorkoutPlan";

const Stack = createNativeStackNavigator();

const IndexStack = () => {
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
      <Stack.Screen name="Dashboard" component={Dashboard} options={{  title: "SỔ TAY QUẢN LÝ SỨC KHOẺ" }} />
      <Stack.Screen name="ChooseRole" component={ChooseRole} options={{ title: "CHẾ ĐỘ"}}/>
      <Stack.Screen name="Login" component={Login} options={{ title: "ĐĂNG NHẬP", headerBackTitleVisible: false,}}/>
      <Stack.Screen name="Register" component={Register} options={{ title: "ĐĂNG KÝ"}}/>
    </Stack.Navigator>
  );
}


const HomeStack = () => {
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
      <Stack.Screen name="Home" component={Home} options={{  title: "SỔ TAY QUẢN LÝ SỨC KHOẺ" }} />
      <Stack.Screen name="UserStack" component={UserStack} options={{ title: "CHÀO MỪNG BẠN TRỞ LẠI", headerBackTitleVisible: false,}}/>
      <Stack.Screen name="ChooseRole" component={ChooseRole} options={{ title: "CHẾ ĐỘ"}}/>
      <Stack.Screen name="Login" component={Login} options={{ title: "ĐĂNG NHẬP", headerBackTitleVisible: false,}}/>
      <Stack.Screen name="Register" component={Register} options={{ title: "ĐĂNG KÝ"}}/>
      <Stack.Screen name="BMICalculator" component={BMICalculator} options={{title: "TÍNH BMI"}}/>
      <Stack.Screen name="HealthDemo" component={PersonalInfoScreen} options={{title: "THEO DÕI SỨC KHOẺ"}}/>
      <Stack.Screen name="MealPlan" component={MealPlan} options={{title: "THỰC ĐƠN DINH DƯỠNG"}}/>
      <Stack.Screen name="WorkoutPlan" component={WorkoutPlan} options={{title: "THỰC ĐƠN DINH DƯỠNG"}}/>


    </Stack.Navigator>
  );
}


const ProfileStack = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen name="Profile" component={Profile} options={{ title: 'Tài khoản', headerBackVisible: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Đổi mật khẩu' }} />
      </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen name="HomeStack" component={HomeStack} options={{ title: 'Quản trị', headerBackVisible: false }} />
          <Stack.Screen name="ApproveScreen" component={Approve} options={{ title: 'Duyệt tài khoản' }} />
          <Stack.Screen name="CreateAccountScreen" component={CreateAccount} options={{ title: 'Tạo tài khoản giáo viên' }} />
          <Stack.Screen name="ResetTimerScreen" component={ResetTimer} options={{ title: 'Đặt lại thời gian đổi mật khẩu' }} />
      </Stack.Navigator>
  );
};


const AdminStack = () => {
  return (
      <Stack.Navigator>
          <Stack.Screen name="AdministrationScreen" component={Administration} options={{ title: 'Quản trị', headerBackVisible: false }} />
          <Stack.Screen name="ApproveScreen" component={Approve} options={{ title: 'Duyệt tài khoản' }} />
          <Stack.Screen name="CreateAccountScreen" component={CreateAccount} options={{ title: 'Tạo tài khoản giáo viên' }} />
          <Stack.Screen name="ResetTimerScreen" component={ResetTimer} options={{ title: 'Đặt lại thời gian đổi mật khẩu' }} />
      </Stack.Navigator>
  );
};

const ChatStack = () => {
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
      tabBarShowLabel: true,
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
         {/* <Tab.Screen name="IndexStack" component={IndexStack} options={{headerShown: false, tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} /> }} /> */}
         <Tab.Screen name="HomeStack" component={HomeStack} options={{  headerShown: false, tabBarLabel: 'Trang chủ', tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} /> }} />
         <Tab.Screen name="HealthDiary" component={HealthDiary} options={{ tabBarLabel: 'Nhật kí',tabBarIcon: ({ color, size }) => <Icon source="book" color={color} size={size} /> }} />
         <Tab.Screen name="Reminders" component={Reminders} options={{ tabBarLabel: 'Thông báo', tabBarIcon: ({ color, size }) => <Icon source="bell" color={color} size={size} /> }} />
         <Tab.Screen name="Statistics" component={Statistics} options={{ tabBarLabel: 'Thống kê', tabBarIcon: ({ color, size }) => <Icon source="chart-line" color={color} size={size} /> }} />
         <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Cá nhân', tabBarIcon: ({ color, size }) => <Icon source="account-circle" color={color} size={size} /> }} />

        </>
      ): (
        <>
        <Tab.Screen name="HomeStack" component={HomeStackNavigator} options={{  tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} /> }} />

        
        <Tab.Screen name="ChatStack" component={ChatStackNavigator} options={{ title: 'Chat', tabBarIcon: ({ color, size })  => <Icon source="message" color={color} size={size} /> }} />
        {user.role === 0 && (
            <Tab.Screen name="AdminStack" component={AdminStackNavigator} options={{ title: 'Quản trị', tabBarIcon: ({ color, size }) => <Icon source="shield-account" color={color} size={size} /> }} />
        )}
        <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} options={{ title: 'Tài khoản', tabBarIcon: ({ color, size }) => <Icon source="account-cog" color={color} size={size} /> }} />
        </>
      )}
      </Tab.Navigator>
  );
}


const App = () =>{
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <PaperProvider> {/* ✅ Bọc cả app trong Provider */}
      <MyUserContext.Provider value={user}>
        <MyDispatchContext.Provider value={dispatch}>
          <NavigationContainer>
            <TabNavigator />
          </NavigationContainer>
        </MyDispatchContext.Provider>
      </MyUserContext.Provider>
    </PaperProvider>
    
  );

}

export default App;
