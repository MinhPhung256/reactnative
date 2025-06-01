import React, { useState } from 'react';
import { View, Platform, ScrollView } from 'react-native';
import { Switch, Button, Text, Divider, RadioButton, Card, IconButton } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';

const ReminderScreen = () => {
  const [useDefault, setUseDefault] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [reminderType, setReminderType] = useState('water');
  const [customReminders, setCustomReminders] = useState([]);

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

  const getReminderLabel = (type) => {
    switch (type) {
      case 'water': return '💧 Nhắc nhở uống nước';
      case 'workout': return '🏃 Nhắc nhở tập luyện';
      case 'rest': return '😴 Nhắc nhở nghỉ ngơi';
      default: return '';
    }
  };

  const scheduleCustomReminder = async () => {
    const title = getReminderLabel(reminderType);

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body: `Đến giờ cho: ${title}`,
      },
      trigger: {
        hour: time.getHours(),
        minute: time.getMinutes(),
        repeats: true,
      },
    });

    const newReminder = {
      id: Date.now(),
      type: reminderType,
      time: `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`,
      notificationId,
    };
    setCustomReminders([...customReminders, newReminder]);

    alert('Đã đặt nhắc nhở tuỳ chỉnh!');
  };

  const deleteReminder = async (id, notificationId) => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
    setCustomReminders(customReminders.filter((r) => r.id !== id));
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
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Text variant="titleLarge" style={{ marginBottom: 16 }}>🔔 Cài đặt Nhắc Nhở</Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
        <Text style={{ flex: 1 }}>Sử dụng nhắc nhở mặc định</Text>
        <Switch value={useDefault} onValueChange={toggleUseDefault} />
      </View>

      <Divider style={{ marginVertical: 20 }} />

      <Text style={{ marginBottom: 8 }}>🔧 Loại nhắc nhở:</Text>
      <RadioButton.Group onValueChange={setReminderType} value={reminderType}>
        <RadioButton.Item label="💧 Uống nước" value="water" />
        <RadioButton.Item label="🏃 Tập luyện" value="workout" />
        <RadioButton.Item label="😴 Nghỉ ngơi" value="rest" />
      </RadioButton.Group>

      <Text style={{ marginTop: 16 }}>⏰ Chọn giờ nhắc nhở:</Text>
      <Button mode="outlined" onPress={() => setShowPicker(true)} style={{ marginTop: 8 }}>
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

      <Divider style={{ marginVertical: 24 }} />

      <Text variant="titleMedium" style={{ marginBottom: 12 }}>📋 Danh sách nhắc nhở đã đặt</Text>
      {customReminders.map((reminder) => (
        <Card key={reminder.id} style={{ marginBottom: 12, padding: 12 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text>{getReminderLabel(reminder.type)}</Text>
              <Text>🕒 Lúc: {reminder.time}</Text>
            </View>
            <IconButton
              icon="delete"
              onPress={() => deleteReminder(reminder.id, reminder.notificationId)}
            />
          </View>
        </Card>
      ))}
    </ScrollView>
  );
};

export default ReminderScreen;
