import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';

const devices = [
  { id: '1', name: 'Fitbit' },
  { id: '2', name: 'Apple Watch' },
  { id: '3', name: 'Xiaomi Mi Band' },
  { id: '4', name: 'Samsung Galaxy Watch' },
];

const Connection = () => {
  const [connectedDevice, setConnectedDevice] = useState(null);

  const toggleConnection = (deviceName) => {
    if (connectedDevice === deviceName) {
      setConnectedDevice(null);
    } else {
      setConnectedDevice(deviceName);
    }
  };

  const renderItem = ({ item }) => {
    const isConnected = connectedDevice === item.name;
    return (
      <View style={styles.deviceCard}>
        <Text style={styles.deviceName}>{item.name}</Text>
        <Text style={{ color: isConnected ? 'green' : 'gray' }}>
          {isConnected ? 'Đã kết nối' : 'Chưa kết nối'}
        </Text>
        <Button
          title={isConnected ? 'Ngắt kết nối' : 'Kết nối'}
          onPress={() => toggleConnection(item.name)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thiết bị đeo hỗ trợ</Text>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}

export default Connection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  deviceCard: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  deviceName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
});
