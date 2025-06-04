import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon} from "react-native-paper";
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
import PersonalInfoScreen from "./components/User1/ProfileInput";
import MealPlan from "./components/MealPlan";
import WorkoutPlan from "./components/WorkoutPlan";
import ForgotPassword from "./components/User/ForgotPassword";
import ChangePassword from "./components/ChangePassword";
import ResetPassword from "./components/User/ResetPassword";
import ExpertInfo from "./components/user2/ExpertInfo";
import ProfileInput from "./components/User1/ProfileInput";
import Water from "./components/User1/Water";
import HealthView from "./components/User1/HealthView";
import Connection from "./components/User1/Connection";

const Stack = createNativeStackNavigator();

const IndexStack = () => {
  return (
    <Stack.Navigator
       screenOptions={{
        headerBackTitleStyle: {
          color: '#B00000',  
        },
        headerStyle: {
          backgroundColor: '#BB0000'
        },
        headerTitleStyle: {
          color: 'white'
        },
        headerTintColor: 'white',
      }}
    >
      <Stack.Screen name="Dashboard" component={Dashboard} options={{title: "SỔ TAY QUẢN LÝ SỨC KHOẺ" }} />
      <Stack.Screen name="ChooseRole" component={ChooseRole} options={{title: "CHẾ ĐỘ"}}/>
      <Stack.Screen name="Login" component={Login} options={{title: "ĐĂNG NHẬP" }}/>
      <Stack.Screen name="Register" component={Register} options={{title: "ĐĂNG KÝ"}}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{title: "XÁC NHẬN EMAIL"}}/>
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{title: "NHẬP MẬT KHẨU MỚI"}}/>

    </Stack.Navigator>
  );
}


const HomeStack = () => {
  return (
    <Stack.Navigator
       screenOptions={{
        headerBackTitleVisible: false,
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
      <Stack.Screen name="UserStack" component={UserStack} options={{ title: "CHÀO MỪNG BẠN TRỞ LẠI"}}/>
      <Stack.Screen name="ChooseRole" component={ChooseRole} options={{ title: "CHẾ ĐỘ"}}/>
      <Stack.Screen name="BMICalculator" component={BMICalculator} options={{title: "TÍNH BMI"}}/>
      <Stack.Screen name="HealthDemo" component={PersonalInfoScreen} options={{title: "THEO DÕI SỨC KHOẺ"}}/>
      <Stack.Screen name="MealPlan" component={MealPlan} options={{title: "THỰC ĐƠN DINH DƯỠNG"}}/>
      <Stack.Screen name="WorkoutPlan" component={WorkoutPlan} options={{title: "LỊCH TẬP LUYỆN"}}/>
      <Stack.Screen name="ActivityDetail" component={ActivityDetail} options={{title: "HOẠT ĐỘNG"}}/>

    </Stack.Navigator>
  );
}


const ProfileStack = () => {
  return (
    <Stack.Navigator
       screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: '#BB0000'
        },
        headerTitleStyle: {
          color: 'white'
        },
        headerTintColor: 'white',
      }}
    >
          <Stack.Screen name="Profile" component={Profile} options={{ title: 'TÀI KHOẢN', headerBackVisible: false }} />
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
    <Tab.Screen name="IndexStack" component={IndexStack} options={{ headerShown: false, tabBarLabel: 'Trang chủ', tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} /> }} />
  ) : user.role === 1 ? (
    <>
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ headerShown: false, tabBarLabel: 'Trang chủ', tabBarIcon: ({ color, size }) => <Icon source="home" color={color} size={size} /> }} />
      <Tab.Screen name="HealthDiary" component={HealthDiary} options={{ tabBarLabel: 'Nhật kí', tabBarIcon: ({ color, size }) => <Icon source="book" color={color} size={size} /> }} />
      <Tab.Screen name="Reminders" component={Reminders} options={{ tabBarLabel: 'Thông báo', tabBarIcon: ({ color, size }) => <Icon source="bell" color={color} size={size} /> }} />
      <Tab.Screen name="Statistics" component={Statistics} options={{ tabBarLabel: 'Thống kê', tabBarIcon: ({ color, size }) => <Icon source="chart-line" color={color} size={size} /> }} />
      <Tab.Screen name="ExpertInfo" component={ExpertInfo} options={{ tabBarLabel: 'Kết nối', tabBarIcon: ({ color, size }) => <Icon source="account-group" color={color} size={size} /> }} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} options={{ headerShown: false, tabBarLabel: 'Người dùng', tabBarIcon: ({ color, size }) => <Icon source="account-cog" color={color} size={size} /> }} /> 
    </>  
    ) : user.role === 2 ? (
      <Tab.Screen name="AdminStack" component={AdminStack} options={{ title: 'Quản trị', tabBarIcon: ({ color, size }) => <Icon source="shield-account" color={color} size={size} /> }} />

    ):null}
      </Tab.Navigator>
  );
}


const App = () =>{
  const [user, dispatch] = useReducer(MyUserReducer, null);
  return (
    <PaperProvider> 
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
