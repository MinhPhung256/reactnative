import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Alert, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Card, IconButton } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoints, authApis } from '../../configs/Apis';

const HealthDiary = () => {
  const [entries, setEntries] = useState([]);
  const [text, setText] = useState('');
  const [feeling, setFeeling] = useState('');
  const [editId, setEditId] = useState(null);
  const styles = getStyles();
  const [diary, setDiary]= useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('access_token');
  //       const res = await authApis(token).get(endpoints['healthdiary-list']);
  //       setEntries(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get('http://192.168.3.22:8000/healthdiary/');
  //       setEntries(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  const loadDiary = async () =>{
    try {
      const token = await AsyncStorage.getItem('access_token');
      if(!token) {
        throw new Error('No token found');
      }

      let res = await authApis(token).get(endpoints["healthdiary-list"])
      console.log("Diary:", res.data);
      if (res.data) {
        setDiary(res.data);
      }
    } catch (ex) {
      console.error("Error loading diarys:", ex);
      console.log("Error details:", ex.response?.data);
      setDiary([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDiary();
  }, []);



  const addEntry = () => {
    if (!text.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập nội dung nhật ký!');
      return;
    }

    if (!feeling.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập cảm xúc của bạn!');
      return;
    }

    if (editId) {
      const updated = entries.map(e =>
        e.id === editId
          ? { ...e, content: text.trim(), feeling: feeling.trim(), date: new Date().toISOString() }
          : e
      );
      setEntries(updated);
      setEditId(null);
      setText('');
      setFeeling('');
      return;
    }

    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      content: text.trim(),
      feeling: feeling.trim(),
    };
    setEntries([newEntry, ...entries]);
    setText('');
    setFeeling('');
  };

  const startEdit = (id, content, feelingValue) => {
    setEditId(id);
    setText(content);
    setFeeling(feelingValue);
  };

  const deleteEntry = (id) => {
    Alert.alert('Xoá nhật ký', 'Bạn có chắc muốn xoá nhật ký này?', [
      { text: 'Huỷ', style: 'cancel' },
      {
        text: 'Xoá',
        style: 'destructive',
        onPress: () => {
          setEntries(entries.filter(e => e.id !== id));
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text variant="titleLarge" style={styles.header}>📔 Nhật ký sức khỏe</Text>

        <TextInput
          label="Viết cảm nhận sau buổi tập..."
          mode="outlined"
          multiline
          numberOfLines={5}
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Hôm nay bạn cảm thấy thế nào?"
        />

        <TextInput
          label="Cảm xúc (ví dụ: Tốt, Mệt mỏi, Vui vẻ)"
          mode="outlined"
          value={feeling}
          onChangeText={setFeeling}
          style={styles.input}
          placeholder="Nhập cảm xúc của bạn"
        />

        <Button mode="contained" onPress={addEntry} style={styles.button}>
          {editId ? 'Cập nhật nhật ký' : 'Lưu nhật ký'}
        </Button>

        {entries.length === 0 && (
          <Text style={styles.emptyText}>Bạn chưa có nhật ký nào.</Text>
        )}

        {/* {entries.map(({ id, date, content, feeling }) => (
          <Card key={id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.dateText}>{new Date(date).toLocaleString()}</Text>
              <View style={styles.cardActions}>
                <IconButton icon="pencil" size={20} onPress={() => startEdit(id, content, feeling)} />
                <IconButton icon="delete" size={20} onPress={() => deleteEntry(id)} />
              </View>
            </View>
            <Text style={styles.cardContent}>{content}</Text>
            <Text style={styles.cardFeeling}>Cảm xúc: {feeling}</Text>
          </Card>
        ))} */}
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
