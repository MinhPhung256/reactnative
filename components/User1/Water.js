import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

const Water = () => {
  const [steps, setSteps] = useState(0);
  const [water, setWater] = useState(0); // ml
  const [heartRate, setHeartRate] = useState('');

  const addWater = (ml) => setWater((prev) => prev + ml);
  const addSteps = (count) => setSteps((prev) => prev + count);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Theo dõi hằng ngày</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Số bước hôm nay:</Text>
        <Text style={styles.value}>{steps} bước</Text>
        <Button title="+100 bước" onPress={() => addSteps(100)} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Lượng nước đã uống:</Text>
        <Text style={styles.value}>{water} ml</Text>
        <Button title="+250ml (1 ly)" onPress={() => addWater(250)} />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Nhịp tim hiện tại (bpm):</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={heartRate}
          onChangeText={setHeartRate}
          placeholder="Nhập thủ công"
        />
      </View>

      <Button title="Kết nối thiết bị đeo" onPress={() => navigation.navigate('Connection')} />
    </View>
  );
}

export default Water;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
  },
});
