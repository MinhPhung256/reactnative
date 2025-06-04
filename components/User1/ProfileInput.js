import React, { useState } from 'react';
import {View, StyleSheet, TextInput, Text, Button, ActivityIndicator, Platform, KeyboardAvoidingView, FlatList, Alert,
} from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton, HelperText } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../configs/Apis';

const devices = [
  { id: '1', name: 'Fitbit' },
  { id: '2', name: 'Apple Watch' },
  { id: '3', name: 'Xiaomi Mi Band' },
  { id: '4', name: 'Samsung Galaxy Watch' },
];

const HealthTracker = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('Giữ dáng');
  const [steps, setSteps] = useState(0);
  const [water, setWater] = useState(0);
  const [heartRate, setHeartRate] = useState('');
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [msg, setMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const navigation = useNavigation();

  const bmi = height && weight && !isNaN(height) && !isNaN(weight)
    ? (weight / ((height / 100) ** 2)).toFixed(1)
    : 'N/A';

  const getBmiStatus = () => {
    const val = parseFloat(bmi);
    if (isNaN(val)) return 'Chưa tính được';
    if (val < 18.5) return 'Thiếu cân';
    if (val < 24.9) return 'Bình thường';
    if (val < 29.9) return 'Thừa cân';
    return 'Béo phì';
  };

  const validate = () => {
    if (!height || !weight || !age) {
      setMsg('Vui lòng nhập đầy đủ thông tin cá nhân!');
      return false;
    }
    if (isNaN(height) || isNaN(weight) || isNaN(age)) {
      setMsg('Chiều cao, cân nặng hoặc tuổi không hợp lệ!');
      return false;
    }
    setMsg(null);
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const data = {
        height: parseFloat(height),
        weight: parseFloat(weight),
        age: parseInt(age),
        goal,
        steps,
        water,
        heart_rate: connectedDevice && heartRate ? parseInt(heartRate) : null,
        connected_device: connectedDevice,
        bmi: parseFloat(bmi),
      };

      if (editId) {
        await authApis(token).put(endpoints['healthrecord-update'](editId), data);
        Alert.alert('Thành công', 'Đã cập nhật thông tin!');
      } else {
        await authApis(token).post(endpoints['healthrecord-create'], data);
        Alert.alert('Thành công', 'Đã lưu thông tin!');
      }

      setHeight('');
      setWeight('');
      setAge('');
      setGoal('Giữ dáng');
      setSteps(0);
      setWater(0);
      setHeartRate('');
      setConnectedDevice(null);
      setEditId(null);
      navigation.navigate('HealthView');
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi', 'Không thể lưu dữ liệu!');
    } finally {
      setLoading(false);
    }
  };

  const renderDeviceItem = ({ item }) => {
    const isConnected = connectedDevice === item.name;
    return (
      <View style={styles.deviceCard}>
        <Text style={styles.deviceName}>{item.name}</Text>
        <Text style={{ color: isConnected ? 'green' : 'gray' }}>
          {isConnected ? 'Đã kết nối' : 'Chưa kết nối'}
        </Text>
        <Button
          title={isConnected ? 'Ngắt kết nối' : 'Kết nối'}
          onPress={() => {
            setConnectedDevice(isConnected ? null : item.name);
            setHeartRate(isConnected ? '' : '80');
          }}
        />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderDeviceItem}
        ListHeaderComponent={
          <View style={styles.content}>
            <Text style={styles.title}>Theo dõi sức khỏe</Text>

            <View style={styles.bmiContainer}>
              <Text style={styles.bmiTitle}>Chỉ số cơ thể (BMI)</Text>
              <Text style={styles.bmi}>{bmi}</Text>
              <Text style={styles.bmiStatus}>{getBmiStatus()}</Text>
            </View>

            <HelperText type="error" visible={msg}>{msg}</HelperText>

            <PaperTextInput label="Chiều cao (cm)" keyboardType="numeric" value={height} onChangeText={setHeight}
              mode="outlined" style={styles.input} theme={{ colors: { primary: '#B00000' } }} />
            <PaperTextInput label="Cân nặng (kg)" keyboardType="numeric" value={weight} onChangeText={setWeight}
              mode="outlined" style={styles.input} theme={{ colors: { primary: '#B00000' } }} />
            <PaperTextInput label="Tuổi" keyboardType="numeric" value={age} onChangeText={setAge}
              mode="outlined" style={styles.input} theme={{ colors: { primary: '#B00000' } }} />

            <Text style={{ marginTop: 12, marginBottom: 4, fontSize: 16 }}>Mục tiêu sức khỏe:</Text>
            <View style={[styles.input, { borderWidth: 1, borderColor: '#ccc', borderRadius: 10 }]}>
              <Picker selectedValue={goal} onValueChange={setGoal} style={{ height: 50 }}>
                <Picker.Item label="Giảm cân" value="Giảm cân" />
                <Picker.Item label="Tăng cân" value="Tăng cân" />
                <Picker.Item label="Giữ dáng" value="Giữ dáng" />
                <Picker.Item label="Khác" value="Khác" />
              </Picker>
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Bước chân hôm nay: {steps}</Text>
              <Button title="+100 bước" onPress={() => setSteps((prev) => prev + 100)} />
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Nước đã uống: {water} ml</Text>
              <Button title="+250ml" onPress={() => setWater((prev) => prev + 250)} />
            </View>

            <View style={styles.card}>
              <Text style={styles.label}>Nhịp tim:</Text>
              <TextInput
                style={styles.textInput}
                value={heartRate}
                onChangeText={setHeartRate}
                editable={connectedDevice !== null}
                placeholder="VD: 80"
                keyboardType="numeric"
              />
            </View>

            <Text style={[styles.title, { marginTop: 24 }]}>Thiết bị đeo hỗ trợ</Text>
          </View>
        }
        ListFooterComponent={
          <>
            <PaperButton
              mode="contained"
              onPress={handleSubmit}
              style={{ margin: 20, backgroundColor: '#B00000' }}
              disabled={loading}
            >
              {editId ? 'Cập nhật' : 'Lưu thông tin'}
            </PaperButton>
            {loading && <ActivityIndicator style={{ marginBottom: 20 }} />}
          </>
        }
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B00000',
    textAlign: 'center',
    marginBottom: 16,
  },
  bmiContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  bmiTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bmi: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  bmiStatus: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
  input: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  label: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
  deviceCard: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HealthTracker;
