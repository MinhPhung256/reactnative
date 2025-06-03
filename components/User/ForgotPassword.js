import { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import MyStyles from '../../styles/MyStyles';
import Apis, { endpoints } from '../../configs/Apis';
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email.trim() === '') {
      setMsg("Vui lòng nhập email");
      return;
    }

    try {
      setLoading(true);
      setMsg('');

      // Gửi email lên server để xác thực
      const res = await Apis.post(endpoints['forgot-password'], { email });

      Alert.alert("Thành công", "Email hợp lệ. Hãy đặt lại mật khẩu.");
      navigation.navigate("ResetPassword", { email });  // chuyển sang màn reset và truyền email

    } catch (err) {
      console.error(err);
      setMsg("Không tìm thấy email hoặc có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={MyStyles.p}>
      <HelperText type="error" visible={!!msg}>{msg}</HelperText>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={[MyStyles.margin, { backgroundColor: 'white', borderRadius: 10 }]}
        theme={{ colors: { primary: '#B00000' } }}
      />
      <Button
        mode="contained"
        style={{ backgroundColor: '#B00000' }}
        loading={loading}
        disabled={loading}
        onPress={handleSubmit}
      >
        Tiếp tục
      </Button>
    </View>
  );
};

export default ForgotPassword;
