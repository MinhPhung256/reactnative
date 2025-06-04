import React, { useState } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { Text, Button, TextInput, Dialog, Portal, List } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';

const WorkoutPlan = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [workouts, setWorkouts] = useState({});
  const [customWorkout, setCustomWorkout] = useState('');
  
  const [dialogVisible, setDialogVisible] = useState(false);

  const suggestedWorkouts = ['Chạy bộ 30 phút', 'Chống đẩy 3 hiệp', 'Gập bụng 15 phút'];

  const addWorkout = (workout) => {
    if (!selectedDate) return Alert.alert('Chọn ngày trước');
    const current = workouts[selectedDate] || [];
    setWorkouts({
      ...workouts,
      [selectedDate]: [...current, workout],
    });
    setCustomWorkout('');
    setDialogVisible(false);
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      <Text variant="titleLarge" style={{textAlign: 'center',fontSize:18, marginBottom: 16, color:'#B00000', fontWeight:'bold'}}>Lịch tập luyện cá nhân</Text>

      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#BB0000' },
        }}
      />

      {selectedDate ? (
        <View style={{ marginTop: 16 }}>
          <Text variant="titleMedium" style={{ marginBottom: 8 }}>Ngày: {selectedDate}</Text>

          <Text style={{ fontWeight: 'bold', marginBottom: 8, color:'#B00000' }}>Gợi ý bài tập:</Text>
          {suggestedWorkouts.map((workout, index) => (
            <Button
              key={index}
              mode="outlined"
              onPress={() => addWorkout(workout)}
              textColor="#B00000"
              style={{ borderColor: '#B00000', borderWidth: 1, marginBottom: 8 }}
            >
              {workout}
            </Button>
          ))}

          <Button buttonColor="#B00000" textColor="white" mode="contained" onPress={() => setDialogVisible(true)} style={{ marginTop: 12 }}>
            ➕ Tự thêm bài tập
          </Button>

          <Text style={{ fontWeight: 'bold', marginTop: 20, color:'#B00000' }}>Danh sách bài tập:</Text>
          {(workouts[selectedDate] || []).map((item, idx) => (
            <List.Item key={idx} title={item} left={props => <List.Icon {...props} icon="check" />} />
          ))}
        </View>
      ) : (
        <View>
            <Text style={{ marginTop: 20, color: 'gray' }}>Vui lòng chọn ngày để xem hoặc thêm bài tập</Text>
        </View>
        
      )}

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} style={{ backgroundColor: '#FFEBEE' }}>
          <Dialog.Title>Thêm bài tập</Dialog.Title>
          <Dialog.Content>
            <TextInput
              label="Tên bài tập"
              value={customWorkout}
              onChangeText={setCustomWorkout}
              mode="outlined"
              outlineColor="#ccc"          
              activeOutlineColor="#B00000" 
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)} textColor='#B00000'>Huỷ</Button>
            <Button onPress={() => addWorkout(customWorkout)} textColor='#B00000'>Lưu</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

export default WorkoutPlan;
