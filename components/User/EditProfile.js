import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Avatar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authApis, endpoints } from '../../configs/Apis';

const EditProfile = ({ userId }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    avatar: null,
  });
  const [loading, setLoading] = useState(false);

  // Load user info từ API khi component mount
  const loadUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('Token không tồn tại');

      const res = await authApis(token).get(`/users/${userId}/`);
      setFormData({
        first_name: res.data.first_name || '',
        last_name: res.data.last_name || '',
        username: res.data.username || '',
        email: res.data.email || '',
        avatar: res.data.avatar || null,
      });
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi', 'Không thể tải thông tin người dùng');
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // Chọn ảnh từ thư viện
  const pickImage = async () => {
    // Hỏi quyền truy cập ảnh (chỉ iOS bắt buộc)
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Cấp quyền', 'Cần quyền truy cập thư viện ảnh để chọn ảnh đại diện');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFormData({ ...formData, avatar: result.assets[0] });
    }
  };

  // Lưu thay đổi
  const handleSave = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      Alert.alert('Lỗi', 'Bạn chưa đăng nhập');
      return;
    }

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        if (key === 'avatar' && value.uri) {
          // Lấy đuôi file ảnh
          const uriParts = value.uri.split('.');
          const ext = uriParts[uriParts.length - 1].toLowerCase();
          const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;

          data.append('avatar', {
            uri: value.uri,
            type: mimeType,
            name: `avatar.${ext}`,
          });
        } else {
          data.append(key, value);
        }
      }
    });

    try {
      setLoading(true);
      await authApis(token).put(endpoints['update-user'](userId), data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Alert.alert('Thành công', 'Thông tin đã được cập nhật.');
      loadUser(); // Tải lại thông tin mới nhất sau khi lưu
    } catch (err) {
      console.error(err);
      Alert.alert('Lỗi', 'Không thể cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text variant="titleLarge" style={styles.header}>Chỉnh sửa hồ sơ</Text>

      <View style={styles.avatarContainer}>
        <Avatar.Image
          size={100}
          source={
            formData.avatar?.uri
              ? { uri: formData.avatar.uri }
              : formData.avatar
              ? { uri: formData.avatar }
              : require('../../assets/Images/default_avatar.jpg')
          }
        />
        <Button mode="outlined" onPress={pickImage} style={styles.avatarButton}>
          Đổi ảnh
        </Button>
      </View>

      <TextInput
        label="Họ"
        value={formData.first_name}
        onChangeText={(v) => setFormData({ ...formData, first_name: v })}
        style={styles.input}
      />
      <TextInput
        label="Tên"
        value={formData.last_name}
        onChangeText={(v) => setFormData({ ...formData, last_name: v })}
        style={styles.input}
      />
      <TextInput
        label="Tên người dùng"
        value={formData.username}
        onChangeText={(v) => setFormData({ ...formData, username: v })}
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={formData.email}
        keyboardType="email-address"
        onChangeText={(v) => setFormData({ ...formData, email: v })}
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSave}
        disabled={loading}
        loading={loading}
        style={styles.button}
      >
        Lưu thay đổi
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#B00000',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarButton: {
    marginTop: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#B00000',
    marginTop: 16,
  },
});

export default EditProfile;
