import { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import MyStyles from '../../styles/MyStyles';
import Apis, { endpoints } from '../../configs/Apis';
import { useNavigation, useRoute } from '@react-navigation/native';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;

  const handleReset = async () => {
    if (password.length < 6) {
      setMsg("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (password !== confirm) {
      setMsg("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setLoading(true);
      setMsg('');

      const res = await Apis.post(endpoints['reset-password'], { email, password });

      Alert.alert("Thành công", "Đặt lại mật khẩu thành công!");
      navigation.navigate("Login");

    } catch (err) {
      console.error(err);
      setMsg("Đặt lại mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={MyStyles.p}>
      <HelperText type="error" visible={!!msg}>{msg}</HelperText>

      <TextInput
        label="Mật khẩu mới"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={[MyStyles.margin, { backgroundColor: 'white', borderRadius: 10 }]}
        theme={{ colors: { primary: '#B00000' } }}
      />
      <TextInput
        label="Xác nhận mật khẩu"
        value={confirm}
        secureTextEntry
        onChangeText={setConfirm}
        style={[MyStyles.margin, { backgroundColor: 'white', borderRadius: 10 }]}
        theme={{ colors: { primary: '#B00000' } }}
      />
      <Button
        mode="contained"
        style={{ backgroundColor: '#B00000' }}
        loading={loading}
        disabled={loading}
        onPress={handleReset}
      >
        Đặt lại mật khẩu
      </Button>
    </View>
  );
};

export default ResetPassword;
