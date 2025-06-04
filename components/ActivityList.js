import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Text, Button, Avatar } from 'react-native-paper';
import { authApis, endpoints } from '../configs/Apis'; // Đảm bảo import đúng đường dẫn API của bạn

// Hàm tạo Icon trái cho mỗi activity
const LeftContent = (icon) => (props) => <Avatar.Icon {...props} icon={icon} backgroundColor="#B00000" />;

const ActivityCard = ({ activity, onPress }) => (
  <TouchableOpacity onPress={() => onPress(activity)}>
    <Card style={{ marginBlock: 8, marginInline: 16, backgroundColor: '#FFEBEE' }}>
      <Card.Title title={activity.name} subtitle={activity.calories_burned ? `${activity.calories_burned} calo` : ''} left={LeftContent('run')} style={{ color: '#B00000' }} />
      <Card.Content>
        <Text variant="titleLarge">{activity.name}</Text>
        <Text variant="bodyMedium">{activity.description}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: activity.image }} />
      <Card.Actions>
        <Button style={{ backgroundColor: '#B00000' }} labelStyle={{ color: 'white' }} onPress={() => onPress(activity)}>Xem</Button>
      </Card.Actions>
    </Card>
  </TouchableOpacity>
);

const ActivityList = ({ navigation, token }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch activities from API
  useEffect(() => {
    const loadActivities = async () => {
      try {
        const api = authApis(token);  // Sử dụng authApis đã tạo để gửi yêu cầu API
        const response = await api.get(endpoints['activity-list']);  // Gọi API activity-list
        setActivities(response.data.results);  // Lưu dữ liệu hoạt động vào state
      } catch (err) {
        setError('Lỗi khi tải hoạt động.');
        console.error(err);
      } finally {
        setLoading(false);  // Đóng trạng thái loading khi nhận được dữ liệu
      }
    };

    loadActivities();
  }, [token]);  // Chạy lại khi token thay đổi

  // Điều hướng đến màn hình chi tiết của hoạt động
  const onActivityPress = (activity) => {
    navigation.navigate('ActivityDetail', { activity });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#B00000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text variant="bodyLarge" style={{ color: 'red' }}>
          {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} onPress={onActivityPress} />
      ))}
    </View>
  );
};

export default ActivityList;
