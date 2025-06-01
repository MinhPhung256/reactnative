import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import {  Card, RadioButton } from 'react-native-paper';

const menus = {
  gain: [
    { id: '1', name: 'Ức gà nướng, cơm gạo lứt, rau xanh' },
    { id: '2', name: 'Sinh tố bơ + sữa hạnh nhân' },
    { id: '3', name: 'Trứng ốp la, bánh mì nguyên cám' },
  ],
  lose: [
    { id: '1', name: 'Salad rau củ, cá hồi nướng' },
    { id: '2', name: 'Cháo yến mạch, trái cây tươi' },
    { id: '3', name: 'Súp bí đỏ, ức gà luộc' },
  ],
  maintain: [
    { id: '1', name: 'Cơm gạo lứt, thịt bò, rau luộc' },
    { id: '2', name: 'Canh cải bó xôi, cá hấp' },
    { id: '3', name: 'Trứng hấp, bánh mì đen' },
  ],
};

const MealPlan = () => {
  const [goal, setGoal] = useState('maintain');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🍽️ Gợi ý thực đơn dinh dưỡng</Text>

      <RadioButton.Group onValueChange={setGoal} value={goal}>
        <RadioButton.Item label="Duy trì cân nặng" value="maintain" />
        <RadioButton.Item label="Giảm cân" value="lose" />
        <RadioButton.Item label="Tăng cơ" value="gain" />
      </RadioButton.Group>

      <FlatList
        data={menus[goal]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content>
              <Text>{item.name}</Text>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<Text>Không có món ăn phù hợp</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { marginBottom: 16, color: '#B00000', fontWeight: 'bold', fontSize: 22, textAlign: 'center' },
  card: { marginBottom: 10, borderRadius: 10, elevation: 3 },
});

export default MealPlan;
