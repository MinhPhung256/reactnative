import { useContext, useState } from "react";
import Apis, { endpoints, authApis } from "../../configs/Apis";
import { KeyboardAvoidingView, ScrollView, Text} from "react-native"
import { TextInput, Button, HelperText } from "react-native-paper"
import MyStyles from '../../styles/MyStyles';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import qs from 'qs';
import { MyDispatchContext } from "../../configs/UserContext";

const Login = () =>{
    const info = [{
            label: 'Tên đăng nhập',
            field: 'username',
            secureTextEntry: false,
            icon: "account"
        },
        {
            label: 'Mật khẩu',
            field: 'password',
            secureTextEntry: true,
            icon: "lock"
        }];

    const [user, setUser] = useState({});
    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState(false);
    const dispatch = useContext(MyDispatchContext);
    const nav =useNavigation();

    const setState = (value, field) => {
        setUser({...user, [field]: value});
    }


    const validate = () => {
        if (Object.values(user).length === 0) {
            setMsg("Vui lòng nhập thông tin!");
            return false;
        }
    
        for (let i of info) {
            let val = user[i.field] || '';
            if (val.trim() === '') {
                setMsg(`Vui lòng nhập ${i.label}`);
                return false;
            }
    
            if (i.field === 'username' && val.includes(' ')) {
                setMsg("Tên đăng nhập không được chứa khoảng trắng");
                return false;
            }
          }
    
        setMsg("");
        return true;
    };


    const login = async () => {
        if(validate() === true) {
            try{
                setLoading(true);

                let res = await Apis.post(
                  endpoints['login'],
                  qs.stringify({
                  ...user,
                  client_id: "5YvfnA8sN9VjLbzSemy8rogN5ObLK2CaWQbeFPhn",
                  client_secret: "eH0450aIFt6bPZBWQpfbWet8mdDB3cxAPWMwQyOaEhMqPbJUf1VfKRWXN0ofnI8DRNUDfzwukQv56x2Y9qFiUSdTcBYgJt3U9XMsErkNnDj4C9sMC4zPutDfTe6Gahb9",
                  grant_type: "password",
                }),
                {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                }
              );
                await AsyncStorage.setItem('token', res.data.access_token);         
                
                let u = await authApis(res.data.access_token).get(endpoints['current-user']);
                console.info(u.data);

                dispatch({
                  "type": "login",
                  "payload": u.data
                });


                nav.navigate("HomeStack");  // đổi "Home" thành tên màn hình bạn muốn tới

            } catch (ex) {
              setMsg("Đăng nhập thất bại, vui lòng kiểm tra lại thông tin!");
              console.error(ex);
            } finally {
              setLoading(false);
            }
          }
        };
      
        return (
          <KeyboardAvoidingView>
            <ScrollView style={MyStyles.p}>
            <HelperText type="error" visible={!!msg}>{msg}</HelperText>
            {info.map(i => (
              <TextInput
                key={i.field}
                value={user[i.field] || ''}
                onChangeText={t => setState(t, i.field)}
                label={i.label}
                secureTextEntry={i.secureTextEntry}
                right={<TextInput.Icon icon={i.icon} />}
                style={[MyStyles.margin, {
                  backgroundColor: 'white',
                  borderRadius: 10,
                  fontSize: 16
                }]}
                theme={{
                  colors: {
                    text: '#B00000',
                    primary: '#B00000',
                    placeholder: 'gray',
                  }
                }}
              />
            ))}
            <Button
              style={{ backgroundColor: "#B00000" }}
              disabled={loading}
              loading={loading}
              onPress={login}
              mode="contained"
            >
              Đăng nhập
            </Button>
              <HelperText type="info" style={{ textAlign: 'center', marginTop: 20 }}>
                Nếu bạn chưa có tài khoản, hãy{" "}
                <Text
                  style={{ color: '#B00000', fontWeight: 'bold' }}
                  onPress={() => nav.navigate("Register")}  
                >
                  Đăng ký
                </Text>
            </HelperText>
          </ScrollView>
          </KeyboardAvoidingView>
          
        );
      };
      
      export default Login;