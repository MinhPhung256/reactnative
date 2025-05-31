import React, { useState } from 'react';
import { KeyboardAvoidingView, View, Platform, TouchableOpacity } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const BMICalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [result, setResult] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm -> m

    if (!w || !h || h === 0) {
      setBmi(null);
      setResult('');
      setErrorMsg('Vui lòng nhập chiều cao và cân nặng hợp lệ.');
      return;
    }

    const bmiValue = w / (h * h);
    setBmi(bmiValue.toFixed(1));
    setErrorMsg('');

    let status = '';
    if (bmiValue < 18.5) status = 'Thiếu cân';
    else if (bmiValue < 24.9) status = 'Bình thường';
    else if (bmiValue < 29.9) status = 'Thừa cân';
    else status = 'Béo phì';

    setResult(status);
  };

  return (
    <KeyboardAvoidingView
      style={styles.p}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >

      <TextInput
        style={styles.m}
        label="Cân nặng (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        theme={{
            colors: {
              text: '#B00000',
              primary: '#B00000',
              placeholder: 'gray',
            }
          }}
      />

      <TextInput
        style={styles.m}
        label="Chiều cao (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        theme={{
            colors: {
              text: '#B00000',
              primary: '#B00000',
              placeholder: 'gray',
            }
          }}
      />

      <TouchableOpacity style={styles.button} onPress={calculateBMI}>
        <Text style={styles.buttonText}>Tính BMI</Text>
      </TouchableOpacity>

      {!!bmi && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>BMI của bạn: {bmi}</Text>
          <Text style={styles.resultText}>Phân loại: {result}</Text>
        </View>
      )}

      {!!errorMsg && (
        <Text style={styles.errorText}>{errorMsg}</Text>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#BB0000',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#BB0000',
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    color: '#424242',
    marginVertical: 4,
  },
  errorText: {
    marginTop: 20,
    color: '#B00000',
    textAlign: 'center',
  },
  p:{
    padding:20
  },
  m:{
    margin:20,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 16
  }
});

export default BMICalculator;
