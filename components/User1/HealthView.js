import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HealthView = ({ route }) => {
  const { height, weight, age, goal } = route.params;
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  const getBmiStatus = () => {
    const val = parseFloat(bmi);
    if (val < 18.5) return 'Thiếu cân';
    if (val < 24.9) return 'Bình thường';
    if (val < 29.9) return 'Thừa cân';
    return 'Béo phì';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉ số cơ thể (BMI)</Text>
      <Text style={styles.bmi}>{bmi}</Text>
      <Text style={styles.status}>{getBmiStatus()}</Text>

      <Text style={styles.label}>Tuổi: {age}</Text>
      <Text style={styles.label}>Chiều cao: {height} cm</Text>
      <Text style={styles.label}>Cân nặng: {weight} kg</Text>
      <Text style={styles.label}>Mục tiêu sức khỏe: {goal}</Text>
    </View>
  );
}

export default HealthView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bmi: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  status: {
    fontSize: 20,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginTop: 4,
  },
});
