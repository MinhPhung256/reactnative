import React from 'react';
// import { Card, Button } from 'react-native-paper';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Alert} from 'react-native';
import MyStyles from '../../styles/MyStyles';
import { Icon } from 'react-native-paper';
import { iconItems } from '../constant/Icon';
import ActivityList from '../ActivityList';
// import { StyleSheet } from 'react-native';


const Home = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View style={MyStyles.logoContainer}>
          <Image source={require('../../assets/Images/logo1.jpg')} style={MyStyles.logo} />
          <Text style={MyStyles.title}>HEALIO</Text>
          <Text style={MyStyles.subtitle}>Chào mừng bạn đã quay trở lại</Text>
          <View style={MyStyles.buttonContainer}>
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
        
        <View>
          <Text style={{ color: '#B00000', textAlign: 'center', margin: 20 }}>
            ------- Gợi ý các hoạt động -------
          </Text>
          <ActivityList navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

