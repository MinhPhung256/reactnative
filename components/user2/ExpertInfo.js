import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Button, Card, Text, ActivityIndicator, List } from 'react-native-paper';
import axios from 'axios';

const MOCK_EXPERTS = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    specialty: 'Huấn luyện viên thể hình',
    experience: 5,
    description: 'Chuyên giảm mỡ, tăng cơ và thiết kế bài tập phù hợp.',
    avatar_url: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Trần Thị B',
    specialty: 'Chuyên gia dinh dưỡng',
    experience: 3,
    description: 'Tư vấn thực đơn giảm cân, tăng cân khoa học.',
    avatar_url: 'https://i.pravatar.cc/150?img=2',
  },
];

const ExpertInfo = ({ navigation }) => {
  const [currentExpert, setCurrentExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableExperts, setAvailableExperts] = useState([]);

  useEffect(() => {
    fetchExpert();
  }, []);

  const fetchExpert = async () => {
    try {
      // Giả lập API
      const res = await axios.get('https://your-api.com/api/current-expert', {
        headers: {
          Authorization: `Bearer YOUR_ACCESS_TOKEN`,
        },
      });
      setCurrentExpert(res.data);
    } catch (error) {
      // Nếu không có chuyên gia hiện tại → dùng danh sách mẫu
      setCurrentExpert(null);
      setAvailableExperts(MOCK_EXPERTS);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    Alert.alert('Xác nhận', 'Bạn muốn ngắt kết nối với chuyên gia?', [
      { text: 'Hủy' },
      {
        text: 'Ngắt kết nối',
        onPress: async () => {
          await axios.post('https://your-api.com/api/disconnect-expert', {}, {
            headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` },
          });
          fetchExpert();
        },
      },
    ]);
  };

  const handleConnect = async (expert) => {
    Alert.alert('Kết nối', `Bạn muốn kết nối với ${expert.name}?`, [
      { text: 'Hủy' },
      {
        text: 'Kết nối',
        onPress: async () => {
          await axios.post('https://your-api.com/api/connect-expert', {
            expert_id: expert.id,
          }, {
            headers: { Authorization: `Bearer YOUR_ACCESS_TOKEN` },
          });
          setCurrentExpert(expert);
          setAvailableExperts([]);
        },
      },
    ]);
  };

  if (loading) return <ActivityIndicator style={{ marginTop: 50 }} />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {currentExpert ? (
        <Card style={styles.card}>
          <Card.Title
            title={currentExpert.name}
            subtitle={currentExpert.specialty}
            left={() => (
              <Avatar.Image size={60} source={{ uri: currentExpert.avatar_url }} />
            )}
          />
          <Card.Content>
            <Text>Mô tả:</Text>
            <Text>{currentExpert.description}</Text>
            <Text style={{ marginTop: 5 }}>
              💼 Kinh nghiệm: {currentExpert.experience} năm
            </Text>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button mode="contained" onPress={() => navigation.navigate('ChatScreen')}>
              💬 Nhắn tin
            </Button>
            <Button onPress={() => setCurrentExpert(null)}>🔁 Đổi</Button>
            <Button onPress={handleDisconnect} textColor="red">
              ❌ Ngắt kết nối
            </Button>
          </Card.Actions>
        </Card>
      ) : (
        <View>
          <Text style={styles.noExpertText}>
            Bạn chưa kết nối với chuyên gia nào. Chọn 1 chuyên gia bên dưới:
          </Text>
          {availableExperts.map((expert) => (
            <Card key={expert.id} style={styles.card}>
              <Card.Title
                title={expert.name}
                subtitle={expert.specialty}
                left={() => (
                  <Avatar.Image size={50} source={{ uri: expert.avatar_url }} />
                )}
              />
              <Card.Content>
                <Text>{expert.description}</Text>
                <Text style={{ marginTop: 4 }}>Kinh nghiệm: {expert.experience} năm</Text>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" onPress={() => handleConnect(expert)}>
                  🔗 Kết nối
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginBottom: 20,
  },
  actions: {
    justifyContent: 'space-between',
    marginTop: 10,
  },
  noExpertText: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default ExpertInfo;
