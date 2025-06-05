import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StatusBar, SafeAreaView} from 'react-native';
import MyStyles from '../../styles/MyStyles';
import ChooseRole from '../User/ChooseRole';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { iconItems } from '../constant/Icon';
import ActivityList from '../ActivityList';
import { authApis, endpoints } from "../../configs/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";


const HomeUser = ({ navigation }) => {
  const [showRole, setShowRole] = useState(false);
  const currentRole = 'user';

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useFocusEffect(
      useCallback(() => {
        let isActive = true;
  
        const loadUser = async () => {
          try {
            setLoading(true);
            const token = await AsyncStorage.getItem("token");
            console.log("Token hiện tại:", token);
            let res = await authApis(token).get(endpoints["current-user"]);
            if (isActive) {
              setUser(res.data);
            }
          } catch (err) {
            console.error("Lỗi khi lấy thông tin user:", err);
            if (isActive) setUser(null);
          } finally {
            if (isActive) setLoading(false);
          }
        };
  
        loadUser();
  
        return () => {
          isActive = false; // cleanup tránh setState khi unmounted
        };
      }, [])
    );

    if (loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      );
    }
  
    if (!user) {
      return (
        <View style={styles.center}>
          <Text>Không thể tải thông tin người dùng.</Text>
        </View>
      );
    }
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar barStyle="light-content" />
      <ScrollView>
        <View style={MyStyles.logoContainer}>
          <Image source={require('../../assets/Images/logo1.jpg')} style={MyStyles.logo} />
          <Text style={MyStyles.title}>HEALIO</Text>
          <Text style={MyStyles.subtitle}>Chào mừng bạn đã quay trở lại!</Text>
          <Text style={MyStyles.subtitle}>Chế độ kết nối với chuyên gia</Text>
          <View style={MyStyles.buttonContainer}>
            <TouchableOpacity
              style={[MyStyles.button, MyStyles.registerButton]}
              onPress={() => setShowRole(true)}
            >
              <Text style={MyStyles.buttonText}>Đổi chế độ</Text>
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
              <MaterialCommunityIcons name={item.icon} size={30} color="#BB0000" />
              </View>
              <Text style={MyStyles.featureText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View>
          <Text style={{ color: '#B00000', textAlign: 'center', margin: 20,  fontWeight: 'bold' }}>
            ------- Gợi ý các hoạt động -------
          </Text>
          <ActivityList navigation={navigation} />
        </View>
      </ScrollView>

      <ChooseRole
        visible={showRole}
        onClose={() => setShowRole(false)}
        currentRole={currentRole}
      />
    </SafeAreaView>
  );
};

export default HomeUser;

