import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Alert, StyleSheet, View, ActivityIndicator} from 'react-native';
import { TextInput, Button, Text, Card, IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoints, authApis } from '../../configs/Apis';
import { FlatList } from 'react-native';

const HealthDiary = () => {
  const [diary, setDiary] = useState([]);
  const [text, setText] = useState('');
  const [feeling, setFeeling] = useState('');
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nextPage, setNextPage] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const styles = getStyles();

  // Load nhật ký lần đầu hoặc sau khi cập nhật/xóa
  const loadDiary = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await authApis(token).get(endpoints['healthdiary-list']);
      setDiary(Array.isArray(res.data.results) ? res.data.results : []);
      setNextPage(res.data.next);
    } catch (err) {
      console.error("Lỗi khi tải nhật ký:", err);
      if (err.response && err.response.status === 401) {
        Alert.alert('Phiên đăng nhập hết hạn', 'Vui lòng đăng nhập lại.');
      } else {
        Alert.alert('Lỗi', 'Không thể tải nhật ký.');
      }
      setDiary([]);
    } finally {
      setLoading(false);
    }
  };

  // Load thêm khi scroll gần cuối
  const loadMoreDiary = async () => {
    if (!nextPage || loadingMore) return;

    setLoadingMore(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const res = await authApis(token).get(nextPage);
      setDiary((prev) => [...prev, ...(res.data.results || [])]);
      setNextPage(res.data.next);
    } catch (err) {
      console.error("Lỗi khi tải thêm nhật ký:", err);
      Alert.alert('Lỗi', 'Không thể tải thêm nhật ký.');
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        Alert.alert('Bạn chưa đăng nhập', 'Vui lòng đăng nhập lại.');
      } else {
        await loadDiary();
      }
    };
    initialize();
  }, []);

  // Hàm lưu nhật ký (thêm mới hoặc cập nhật)
  const saveEntry = async () => {
    if (!text.trim() || !feeling.trim()) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ cảm nhận và cảm xúc');
      return;
    }
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) throw new Error('No token found');

      if (editId) {
        // Cập nhật nhật ký
        await authApis(token).put(`${endpoints['healthdiary-detail']}${editId}/`, {
          content: text,
          feeling,
        });
        Alert.alert('Thành công', 'Đã cập nhật nhật ký');
      } else {
        // Thêm mới nhật ký
        await authApis(token).post(endpoints['healthdiary-list'], {
          content: text,
          feeling,
        });
        Alert.alert('Thành công', 'Đã lưu nhật ký mới');
      }
      await loadDiary();
      setText('');
      setFeeling('');
      setEditId(null);
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể lưu nhật ký');
    } finally {
      setLoading(false);
    }
  };

  // Xóa nhật ký
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
            Alert.alert('Thành công', 'Đã xoá nhật ký');
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

  // Bắt đầu chỉnh sửa nhật ký
  const startEdit = (id, content, feeling) => {
    setEditId(id);
    setText(content);
    setFeeling(feeling);
  };

  // Render từng item nhật ký
  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.dateText}>
          {item.date ? new Date(item.date).toLocaleString() : 'Không rõ ngày'}
        </Text>
        <View style={styles.cardActions}>
          <IconButton
            icon="pencil"
            size={20}
            onPress={() => startEdit(item.id, item.content, item.feeling)}
            disabled={loading}
          />
          <IconButton
            icon="delete"
            size={20}
            onPress={() => deleteEntry(item.id)}
            disabled={loading}
          />
        </View>
      </View>
      <Text style={styles.cardContent}>{item.content}</Text>
      <Text style={styles.cardFeeling}>Cảm xúc: {item.feeling}</Text>
    </Card>
  );

  // Header component: phần nhập liệu + nút lưu nhật ký
  const ListHeader = () => (
    <>
      <Text variant="titleLarge" style={styles.header}>
        Chia sẻ cảm xúc của bạn
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
        outlineColor="#ccc"
        activeOutlineColor="#B00000"
      />

      <TextInput
        label="Cảm xúc (ví dụ: Tốt, Mệt mỏi, Vui vẻ)"
        mode="outlined"
        value={feeling}
        onChangeText={setFeeling}
        style={styles.input}
        placeholder="Nhập cảm xúc của bạn"
        editable={!loading}
        outlineColor="#ccc"
        activeOutlineColor="#B00000"
      />

      <Button mode="contained" onPress={saveEntry} style={styles.button} disabled={loading}>
        {editId ? 'Cập nhật nhật ký' : 'Lưu nhật ký'}
      </Button>
      {editId && (
        <Button
          mode="outlined"
          onPress={() => {
            setEditId(null);
            setText('');
            setFeeling('');
          }}
          textColor="#B00000"
          style={{ borderColor: '#B00000', borderWidth: 1, marginBottom: 20 }}
        >
          Huỷ chỉnh sửa
        </Button>
      )}
    </>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {loading && !loadingMore ? (
        <ActivityIndicator size="large" style={{ marginVertical: 20 }} />
      ) : (
        <FlatList
          data={diary}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={ListHeader}
          onEndReached={loadMoreDiary}
          onEndReachedThreshold={0.5}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          style={{ flex: 1 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Bạn chưa có nhật ký nào.</Text>
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator style={{ marginVertical: 20 }} /> : null
          }
        />
      )}
    </KeyboardAvoidingView>
  );
};

const getStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
        // thêm margin 2 bên cho toàn bộ container
    },
    header: {
      marginBottom: 15,
      marginTop:10,
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#B00000',
      paddingHorizontal: 20,
    },
    input: {
      marginBottom: 16,
    },
    button: {
      marginBottom: 24,
      backgroundColor: '#B00000',
    },
    emptyText: {
      textAlign: 'center',
      color: '#777',
      marginTop: 20,
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
