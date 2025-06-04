import React, { useState } from 'react';
import { View, Alert, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../configs/Apis'; // Import API cấu hình
import { useNavigation } from '@react-navigation/native';

const CreateGoal = () => {
  const [goalType, setGoalType] = useState('');
  const [targetWeight, setTargetWeight] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigation = useNavigation();

  // Validate input fields
  const validate = () => {
    if (!goalType || !targetWeight || !targetDate || !description) {
      setErrorMsg('Vui lòng nhập đầy đủ thông tin.');
      return false;
    }
    if (isNaN(targetWeight) || parseFloat(targetWeight) <= 0) {
      setErrorMsg('Cân nặng mục tiêu phải là số dương.');
      return false;
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(targetDate)) {
      setErrorMsg('Ngày mục tiêu phải có định dạng YYYY-MM-DD (VD: 2025-12-31).');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setLoading(true);
      setErrorMsg('');

      const token = await AsyncStorage.getItem('token');
      const userId = await AsyncStorage.getItem('userId');

      if (!token) {
        throw new Error('Chưa đăng nhập. Vui lòng đăng nhập lại.');
      }
      if (!userId) {
        throw new Error('Không tìm thấy ID người dùng.');
      }

      const data = {
        user: parseInt(userId),
        goal_type: 'Weight Loss',  // Cập nhật với giá trị hợp lệ cho goal_type
        target_weight: parseFloat(targetWeight),
        target_date: targetDate,
        description,
      };

      const api = authApis(token);
      const response = await api.post(endpoints['goal-create'], data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        Alert.alert('Thành công', 'Mục tiêu đã được tạo!', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
        // Clear form
        setGoalType('');
        setTargetWeight('');
        setTargetDate('');
        setDescription('');
      }
    } catch (err) {
      console.error('API error:', err);
      if (err.response) {
        const { status, data } = err.response;
        if (status === 400) {
          setErrorMsg('Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.');
        } else if (status === 401) {
          setErrorMsg('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
          navigation.navigate('Login');
        } else if (status === 500) {
          setErrorMsg('Lỗi server. Vui lòng thử lại sau.');
        } else {
          setErrorMsg(`Lỗi: ${JSON.stringify(data)}`);
        }
      } else {
        setErrorMsg('Không thể kết nối đến server. Vui lòng kiểm tra lại mạng.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <HelperText type="error" visible={!!errorMsg}>{errorMsg}</HelperText>

        <TextInput
          label="Loại mục tiêu (VD: Giảm cân)"
          value={goalType}
          onChangeText={setGoalType}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#B00000' } }}
        />
        <TextInput
          label="Cân nặng mục tiêu (kg)"
          value={targetWeight}
          onChangeText={setTargetWeight}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#B00000' } }}
        />
        <TextInput
          label="Ngày mục tiêu (YYYY-MM-DD)"
          value={targetDate}
          onChangeText={setTargetDate}
          placeholder="VD: 2025-12-31"
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#B00000' } }}
        />
        <TextInput
          label="Mô tả"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: '#B00000' } }}
        />
        <Button
          mode="contained"
          loading={loading}
          disabled={loading}
          style={styles.button}
          buttonColor="#B00000"
          onPress={handleSubmit}
        >
          Tạo mục tiêu
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 16,
  },
});

export default CreateGoal;
