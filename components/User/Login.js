import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Menu, Provider, TextInput as PaperInput } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('personal');
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleLogin = () => {
    if (username && password) {
      const user = {
        id: '123',
        username,
        role: 'user',
        isConnectedToExpert: mode === 'connect',
      };
      navigation.navigate('Home', { user });
    } else {
      alert('Vui lòng nhập đầy đủ thông tin');
    }
  };

  return (
    <Provider>
      <View style={styles.logoContainer}>
                  <Image source={require("../../assets/Images/logo1.jpg")} style={styles.logo} />
                  <Text style={styles.title}>HEALIO</Text>
                  <Text style={styles.subtitle}>Chào mừng bạn đến với chúng tôi</Text>
     
      <View style={styles.container}>

        <TextInput
          style={styles.input}
          placeholder="Tên người dùng"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Chế độ sử dụng:</Text>

        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <PaperInput
                mode="outlined"
                label="Chọn chế độ"
                value={mode === 'personal' ? 'Tự theo dõi' : 'Kết nối với chuyên gia'}
                editable={false}
                right={<PaperInput.Icon icon="menu-down" />}
              />
            </TouchableOpacity>
          }
        >
          <Menu.Item
            onPress={() => {
              setMode('personal');
              closeMenu();
            }}
            title="Tự theo dõi"
          />
          <Menu.Item
            onPress={() => {
              setMode('connect');
              closeMenu();
            }}
            title="Kết nối với chuyên gia"
          />
        </Menu>

        <Button title="Đăng nhập" onPress={handleLogin} />
      </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderColor: '#B00000',
  },
  label: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  logoContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    margin:20,
    borderColor: '#BB0000',
    borderWidth:1,
  },
  subtitle: {
    fontSize: 20,
    color: '#757575',
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 50,
  },
});
