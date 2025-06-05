import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Avatar, Button, Card, Text, ActivityIndicator } from 'react-native-paper';
import { getCurrentUser, connectExpert, disconnectExpert, authApis, endpoints } from '../../configs/Apis'; // Đường dẫn tuỳ vào project của bạn

const ExpertInfo = ({ navigation, token }) => {
  const [currentExpert, setCurrentExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableExperts, setAvailableExperts] = useState([]);
  const [connectionId, setConnectionId] = useState(null);

 

  const loadExpert = async () => {
    setLoading(true);
    try {
      const api = authApis(token);
      const res = await api.get(endpoints['connection-list']);
      if (res.data.length > 0) {
        const connection = res.data[0];
        setCurrentExpert(connection.expert);
        setConnectionId(connection.id);
      } else {
        // 2. Nếu chưa có → lấy danh sách user role Coach
        const resUsers = await api.get(endpoints['get-all-users']);
        const coaches = resUsers.data.filter(user => user.role === 3); // Coach = 2
        setAvailableExperts(coaches);
      }
    } catch (err) {
      console.error('Lỗi khi lấy chuyên gia:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpert();
  }, []);

  const handleDisconnect = () => {
    Alert.alert('Xác nhận', 'Bạn muốn ngắt kết nối với chuyên gia?', [
      { text: 'Hủy' },
      {
        text: 'Ngắt kết nối',
        onPress: async () => {
          try {
            await disconnectExpert(token, connectionId);
            setCurrentExpert(null);
            setConnectionId(null);
            loadExpert();
          } catch (err) {
            Alert.alert('Lỗi', 'Không thể ngắt kết nối');
          }
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
          try {
            const connection = await connectExpert(token, expert.id);
            setCurrentExpert(connection.expert);
            setConnectionId(connection.id);
            setAvailableExperts([]);
          } catch (err) {
            Alert.alert('Lỗi', 'Không thể kết nối');
          }
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
            subtitle={currentExpert.specialty || 'Chuyên gia'}
            left={() => (
              <Avatar.Image size={60} source={{ uri: currentExpert.avatar_url || 'https://i.pravatar.cc/150' }} />
            )}
          />
          <Card.Content>
            <Text>Mô tả:</Text>
            <Text>{currentExpert.description || 'Không có mô tả'}</Text>
            <Text style={{ marginTop: 5 }}>
              💼 Kinh nghiệm: {currentExpert.experience || 0} năm
            </Text>
          </Card.Content>
          <Card.Actions style={styles.actions}>
            <Button mode="contained" onPress={() => navigation.navigate('ChatScreen')}>
              💬 Nhắn tin
            </Button>
            <Button onPress={handleDisconnect} textColor="red">
              ❌ Ngắt kết nối
            </Button>
          </Card.Actions>
        </Card>
      ) : (
        <View>
          <Text style={styles.noExpertText}>
            Bạn chưa kết nối với chuyên gia nào. Hãy chọn 1 chuyên gia bên dưới:
          </Text>
          {availableExperts.map((expert) => (
            <Card key={expert.id} style={styles.card}>
              <Card.Title
                title={expert.name}
                subtitle={expert.specialty || 'Chuyên gia'}
                left={() => (
                  <Avatar.Image size={50} source={{ uri: expert.avatar_url || 'https://i.pravatar.cc/150' }} />
                )}
              />
              <Card.Content>
                <Text>{expert.description || 'Không có mô tả'}</Text>
                <Text style={{ marginTop: 4 }}>
                  Kinh nghiệm: {expert.experience || 0} năm
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" onPress={() => handleConnect(expert)}>
                  Kết nối
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
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
    color:'#B00000'
  },
});

export default ExpertInfo;
