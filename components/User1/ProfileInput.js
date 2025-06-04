import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Picker } from 'react-native';

const ProfileInput = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [goal, setGoal] = useState('Giữ dáng');
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (height && weight && age) {
      navigation.navigate('HealthView', {
        height: parseFloat(height),
        weight: parseFloat(weight),
        age: parseInt(age),
        goal,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chiều cao (cm):</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={height} onChangeText={setHeight} />

      <Text style={styles.label}>Cân nặng (kg):</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={weight} onChangeText={setWeight} />

      <Text style={styles.label}>Tuổi:</Text>
      <TextInput style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />

      <Text style={styles.label}>Mục tiêu sức khỏe:</Text>
      <Picker selectedValue={goal} onValueChange={(itemValue) => setGoal(itemValue)} style={styles.input}>
        <Picker.Item label="Giảm cân" value="Giảm cân" />
        <Picker.Item label="Tăng cân" value="Tăng cân" />
        <Picker.Item label="Giữ dáng" value="Giữ dáng" />
        <Picker.Item label="Khác" value="Khác" />
      </Picker>

      <Button title="Lưu thông tin" onPress={handleSubmit} />
    </View>
  );
}

export default ProfileInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
  },
});
