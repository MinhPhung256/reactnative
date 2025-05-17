import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView } from 'react-native';
import MyStyles from '../../styles/MyStyles';
import { Icon } from 'react-native-paper';
import { iconItems } from '../constant/Icon';
import ActivityList from '../ActivityList';

const Home = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={{ marginBottom: 80 }}>
        <View style={MyStyles.logoContainer}>
          <Image source={require('../../assets/Images/logo1.jpg')} style={MyStyles.logo} />
          <Text style={MyStyles.title}>HEALIO</Text>
          <Text style={MyStyles.subtitle}>Sổ tay quản lý sức khoẻ</Text>
          <View style={MyStyles.buttonContainer}>
            <TouchableOpacity
              style={[MyStyles.button, MyStyles.registerButton]}
              onPress={() => navigation.navigate('Register')}
            >
              <Text style={MyStyles.buttonText}>Đăng ký</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[MyStyles.button, MyStyles.loginButton]}
              onPress={() => navigation.navigate('Login')}
            >
              <Text style={MyStyles.buttonText2}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={MyStyles.featuresContainer}>
          {iconItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={MyStyles.featureItem}
              onPress={() => navigation.navigate(item.screen)}
            >
              <View style={[MyStyles.iconCircle, { backgroundColor: '#FFEBEE' }]}>
                <Icon source={item.icon} size={30} color="#BB0000" />
              </View>
              <Text style={MyStyles.featureText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ActivityList navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
