import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import MyStyles from '../../styles/MyStyles';
import { Ionicons } from '@expo/vector-icons';
import { iconItems } from '../constant/Icon';

const Home = ({ navigation }) => {
  return (
    <View style={{flex:1}}>
     <StatusBar barStyle="light-content"/>

        <ScrollView style={{ marginBottom:80}}>
          <View style={MyStyles.logoContainer}>
            <Image source={require("../../assets/Images/logo1.jpg")} style={MyStyles.logo} />
            <Text style={MyStyles.title}>HEALIO</Text>
            <Text style={MyStyles.subtitle}>Sổ tay quản lý sức khoẻ</Text>
            <View style={MyStyles.buttonContainer}>
              <TouchableOpacity style={[MyStyles.button, MyStyles.registerButton]} onPress={() => navigation.navigate('Register')}>
                <Text style={MyStyles.buttonText}>Đăng ký</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[MyStyles.button, MyStyles.loginButton]} onPress={() => navigation.navigate('Login')}>
                <Text style={MyStyles.buttonText2}>Đăng nhập</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={MyStyles.featuresContainer}>
            {iconItems.map((item, index) => (
              <TouchableOpacity key={index} style={MyStyles.featureItem}>
                <View style={[MyStyles.iconCircle, { backgroundColor: '#FFEBEE' }]}>
                  <Ionicons name={item.icon} size={30} color="#BB0000" />
                </View>
                <Text style={MyStyles.featureText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
    

 
      <View style={MyStyles.bottomNav}>
        <TouchableOpacity style={MyStyles.navItem}>
          <Ionicons name="call" size={30} color="#BB0000" />
          <Text style={MyStyles.navText}>Liên hệ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={MyStyles.navItem}>
          <Ionicons name="calendar" size={30} color="#757575" />
          <Text style={MyStyles.navText}>Lịch hẹn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={MyStyles.navItem}>
          <Ionicons name="home" size={30} style={MyStyles.callIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={MyStyles.navItem}>
          <Ionicons name="notifications" size={30} color="#757575" />
          <Text style={MyStyles.navText}>Thông báo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={MyStyles.navItem}>
          <Ionicons name="person" size={30} color="#757575" />
          <Text style={MyStyles.navText}>Cá nhân</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Home;