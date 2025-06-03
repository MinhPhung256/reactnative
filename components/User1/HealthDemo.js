import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { TextInput, Text, Menu, Button } from 'react-native-paper';
import { endpoints, authApis } from '../../configs/Apis'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 

const goals = [
  { label: 'Duy trì cân nặng', value: 'maintain' },
  { label: 'Giảm cân', value: 'lose' },
  { label: 'Tăng cân', value: 'gain' },
];

const PersonalBMIInfoScreen = () => {
  const [height, setHeight] = useState(''); // cm
  const [weight, setWeight] = useState(''); // kg
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('maintain'); // maintain, lose, gain

  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [menuVisible, setMenuVisible] = useState(false);

  // Tự động tính BMI khi height hoặc weight thay đổi
  useEffect(() => {
    if (height && weight) {
      calculateBMI();
    } else {
      setBmi(null);
      setBmiStatus('');
    }
  }, [height, weight]);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;

    if (!w || !h || h === 0) {
      setBmi(null);
      setBmiStatus('');
      setErrorMsg('Vui lòng nhập chiều cao và cân nặng hợp lệ.');
      return false;
    }

    const bmiValue = w / (h * h);
    setBmi(bmiValue.toFixed(1));
    setErrorMsg('');

    let status = '';
    if (bmiValue < 18.5) status = 'Thiếu cân';
    else if (bmiValue < 24.9) status = 'Bình thường';
    else if (bmiValue < 29.9) status = 'Thừa cân';
    else status = 'Béo phì';

    setBmiStatus(status);
    return true;
  };

  const saveInfo = async () => {
    if (!height || !weight || !age) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ chiều cao, cân nặng và tuổi!');
      return;
    }

    const h = parseFloat(height);
    const w = parseFloat(weight);
    const a = parseInt(age, 10);
    if (isNaN(h) || isNaN(w) || isNaN(a) || h <= 0 || w <= 0 || a <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập số hợp lệ cho chiều cao, cân nặng và tuổi!');
      return;
    }

    if (!calculateBMI()) {
      return;
    }

    try {
      // Lấy token và userId (giả sử bạn lưu trong AsyncStorage)
      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');
      if (!token || !userId) {
        Alert.alert('Lỗi', 'Bạn chưa đăng nhập!');
        return;
      }

      const api = authApis(token);
      const url = endpoints['update-user'](userId);

      const payload = {
        height: h,
        weight: w,
        age: a,
        goal,
        bmi: parseFloat(bmi),
      };

      const response = await api.put(url, payload);
      Alert.alert('Thành công', 'Thông tin cá nhân đã được cập nhật!');
    } catch (error) {
      console.error('Lỗi lưu thông tin:', error);
      Alert.alert('Lỗi', 'Không thể lưu thông tin. Vui lòng thử lại sau.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge" style={styles.title}>
          🧍 Thông tin cá nhân & BMI
        </Text>

        <TextInput
          label="Chiều cao (cm)"
          value={height}
          onChangeText={setHeight}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          placeholder="VD: 170"
        />

        <TextInput
          label="Cân nặng (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          placeholder="VD: 65"
        />

        <TextInput
          label="Tuổi"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          mode="outlined"
          style={styles.input}
          placeholder="VD: 30"
        />

        {!!bmi && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>BMI của bạn: {bmi}</Text>
            <Text style={styles.resultText}>Phân loại: {bmiStatus}</Text>
          </View>
        )}

        {!!errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        <Text style={[styles.goalTitle, { marginTop: 24 }]}>🎯 Mục tiêu sức khỏe</Text>

        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Button mode="outlined" onPress={() => setMenuVisible(true)}>
              {goals.find(g => g.value === goal)?.label || 'Chọn mục tiêu'}
            </Button>
          }
        >
          {goals.map((item) => (
            <Menu.Item
              key={item.value}
              onPress={() => {
                setGoal(item.value);
                setMenuVisible(false);
              }}
              title={item.label}
            />
          ))}
        </Menu>

        <TouchableOpacity style={styles.saveButton} onPress={saveInfo}>
          <Text style={styles.saveButtonText}>Lưu thông tin</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 22,
    color: '#B00000',
  },
  input: {
    marginBottom: 16,
  },
  resultContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    color: '#424242',
    marginVertical: 4,
  },
  errorText: {
    marginTop: 10,
    color: '#B00000',
    textAlign: 'center',
  },
  goalTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  saveButton: {
    backgroundColor: '#B00000',
    borderRadius: 25,
    paddingVertical: 14,
    marginTop: 16,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PersonalBMIInfoScreen;
