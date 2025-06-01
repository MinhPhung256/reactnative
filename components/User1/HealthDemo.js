import React, { useState } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, View, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { TextInput, Text, RadioButton } from 'react-native-paper';

const PersonalBMIInfoScreen = () => {
  const [height, setHeight] = useState(''); // cm
  const [weight, setWeight] = useState(''); // kg
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('maintain'); // maintain, lose, gain

  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm -> m

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

  const saveInfo = () => {
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
      // nếu BMI không hợp lệ thì không lưu
      return;
    }

    // Thay bằng gọi API lưu dữ liệu ở đây
    Alert.alert(
      'Thông tin đã lưu',
      `Chiều cao: ${h} cm\nCân nặng: ${w} kg\nTuổi: ${a}\nMục tiêu: ${goal}\n\nBMI của bạn: ${bmi}\nPhân loại: ${bmiStatus}`
    );
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

        <TouchableOpacity style={styles.bmiButton} onPress={calculateBMI}>
          <Text style={styles.bmiButtonText}>Tính BMI</Text>
        </TouchableOpacity>

        {!!bmi && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>BMI của bạn: {bmi}</Text>
            <Text style={styles.resultText}>Phân loại: {bmiStatus}</Text>
          </View>
        )}

        {!!errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

        <Text style={[styles.goalTitle, { marginTop: 24 }]}>🎯 Mục tiêu sức khỏe</Text>
        <RadioButton.Group onValueChange={setGoal} value={goal}>
          <RadioButton.Item label="Duy trì cân nặng" value="maintain" />
          <RadioButton.Item label="Giảm cân" value="lose" />
          <RadioButton.Item label="Tăng cân" value="gain" />
        </RadioButton.Group>

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
  bmiButton: {
    backgroundColor: '#B00000',
    borderRadius: 25,
    paddingVertical: 12,
    marginTop: 10,
    marginBottom: 10,
  },
  bmiButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
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
