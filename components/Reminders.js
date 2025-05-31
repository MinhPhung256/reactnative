import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { Switch, Button, Text, Divider } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

const ReminderScreen = () => {
  const [useDefault, setUseDefault] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleUseDefault = async () => {
    setUseDefault(!useDefault);
    if (!useDefault) {
      await scheduleDefaultReminders();
    } else {
      alert('Tắt nhắc nhở mặc định – cần xử lý huỷ thông báo nếu muốn rõ ràng hơn');
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || time;
    setShowPicker(false);
    setTime(currentDate);
  };

  const scheduleCustomReminder = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🔔 Nhắc nhở cá nhân',
        body: 'Đến giờ bạn đã đặt!',
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    });
    alert('Đã đặt nhắc nhở tuỳ chỉnh!');
  };

  const scheduleDefaultReminders = async () => {
    const times = [
      { hour: 8, minute: 0, body: '💧 Nhớ uống nước buổi sáng!' },
      { hour: 10, minute: 0, body: '💧 Uống thêm nước nhé!' },
      { hour: 18, minute: 0, body: '🏃‍♂️ Tập thể dục nào!' },
      { hour: 22, minute: 0, body: '😴 Nghỉ ngơi và đi ngủ sớm nhé!' },
    ];
    for (const t of times) {
      await Notifications.scheduleNotificationAsync({
        content: { title: '🔔 Nhắc nhở mặc định', body: t.body },
        trigger: { hour: t.hour, minute: t.minute, repeats: true },
      });
    }
    alert('Đã bật nhắc nhở mặc định!');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>🔔 Cài đặt Nhắc Nhở</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ flex: 1 }}>Sử dụng nhắc nhở mặc định</Text>
        <Switch value={useDefault} onValueChange={toggleUseDefault} />
      </View>

      <Divider style={{ marginVertical: 20 }} />

      <Text style={{ marginBottom: 8 }}>⏰ Chọn giờ nhắc nhở cá nhân:</Text>
      <Button mode="outlined" onPress={() => setShowPicker(true)}>
        Chọn thời gian
      </Button>

      {showPicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      <Text style={{ marginTop: 12, marginBottom: 12 }}>
        Thời gian đã chọn: {time.getHours()}:{time.getMinutes().toString().padStart(2, '0')}
      </Text>

      <Button mode="contained" onPress={scheduleCustomReminder}>
        Đặt nhắc nhở tuỳ chỉnh
      </Button>
    </View>
  );
};

export default ReminderScreen;
