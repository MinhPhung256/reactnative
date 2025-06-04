import React, { useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Platform, Alert, StyleSheet, View, ActivityIndicator } from 'react-native';
import { TextInput, Button, Text, Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoints, authApis } from '../../configs/Apis';

const HealthDiary = () => {
  const [diary, setDiary] = useState([]);
  const [text, setText] = useState('');
  const [feeling, setFeeling] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const styles = getStyles();

  // Load nhật ký từ API
  const loadDiary = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await authApis(token).get(endpoints['healthdiary-list']);
      setDiary(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Lỗi khi tải nhật ký:", err);

      // Nếu lỗi do token hết hạn hoặc không hợp lệ
      if (err.response && err.response.status === 401) {
        Alert.alert('Phiên đăng nhập hết hạn', 'Vui lòng đăng nhập lại.');
        // TODO: chuyển hướng về màn hình đăng nhập nếu có điều hướng
      } else {
        Alert.alert('Lỗi', 'Không thể tải nhật ký.');
      }
      setDiary([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Bạn chưa đăng nhập', 'Vui lòng đăng nhập lại.');
      }
    };
    checkLogin();
  }, []);

  // Thêm hoặc cập nhật nhật ký
  const saveEntry = async () => {
    if (!text.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung nhật ký!');
      return;
    }

    if (!feeling.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập cảm xúc của bạn!');
      return;
    }

    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      if (editId) {
        await authApis(token).put(`${endpoints['healthdiary-list']}${editId}/`, {
          content: text.trim(),
          feeling: feeling.trim(),
        });
        Alert.alert('✅ Cập nhật thành công');
      } else {
        await authApis(token).post(endpoints['healthdiary-list'], {
          content: text.trim(),
          feeling: feeling.trim(),
        });
        Alert.alert('✅ Đã lưu nhật ký');
      }

      setText('');
      setFeeling('');
      setEditId(null);
      await loadDiary();
    } catch (err) {
      console.error("Lỗi khi lưu nhật ký:", err);
      Alert.alert('Lỗi', 'Không thể lưu nhật ký');
    } finally {
      setLoading(false);
    }
  };

  // Xoá nhật ký
  const deleteEntry = async (id) => {
    Alert.alert('Xoá nhật ký', 'Bạn có chắc muốn xoá nhật ký này?', [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            const token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('No token found');

            await authApis(token).delete(`${endpoints['healthdiary-list']}${id}/`);
            await loadDiary();
          } catch (err) {
            console.error("Lỗi xoá nhật ký:", err);
            Alert.alert('Lỗi', 'Không thể xoá nhật ký');
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  // Bắt đầu chỉnh sửa
  const startEdit = (id, content, feelingValue) => {
    setEditId(id);
    setText(content);
    setFeeling(feelingValue);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="titleLarge" style={styles.header}>
          📔 Nhật ký sức khỏe
        </Text>

        <TextInput
          label="Viết cảm nhận sau buổi tập..."
          mode="outlined"
          multiline
          numberOfLines={5}
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Hôm nay bạn cảm thấy thế nào?"
          editable={!loading}
        />

        <TextInput
          label="Cảm xúc (ví dụ: Tốt, Mệt mỏi, Vui vẻ)"
          mode="outlined"
          value={feeling}
          onChangeText={setFeeling}
          style={styles.input}
          placeholder="Nhập cảm xúc của bạn"
          editable={!loading}
        />

        <Button mode="contained" onPress={saveEntry} style={styles.button} disabled={loading}>
          {editId ? 'Cập nhật nhật ký' : 'Lưu nhật ký'}
        </Button>

        {loading && <ActivityIndicator size="large" style={{ marginVertical: 20 }} />}

        {!loading && (diary.length === 0 ? (
          <Text style={styles.emptyText}>Bạn chưa có nhật ký nào.</Text>
        ) : (
          diary.map(({ id, date, content, feeling }) => (
            <Card key={id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.dateText}>
                  {date ? new Date(date).toLocaleString() : 'Không rõ ngày'}
                </Text>
                <View style={styles.cardActions}>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => startEdit(id, content, feeling)}
                    disabled={loading}
                  />
                  <IconButton
                    icon="delete"
                    size={20}
                    onPress={() => deleteEntry(id)}
                    disabled={loading}
                  />
                </View>
              </View>
              <Text style={styles.cardContent}>{content}</Text>
              <Text style={styles.cardFeeling}>Cảm xúc: {feeling}</Text>
            </Card>
          ))
        ))}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      padding: 20,
    },
    header: {
      marginBottom: 20,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    input: {
      marginBottom: 16,
    },
    button: {
      marginBottom: 24,
    },
    emptyText: {
      textAlign: 'center',
      color: '#777',
    },
    card: {
      marginBottom: 12,
      padding: 12,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    dateText: {
      fontSize: 12,
      color: '#555',
    },
    cardActions: {
      flexDirection: 'row',
    },
    cardContent: {
      marginBottom: 8,
    },
    cardFeeling: {
      fontStyle: 'italic',
      color: '#666',
    },
  });

export default HealthDiary;
