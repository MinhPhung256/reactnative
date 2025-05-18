import { useState } from "react";
import Apis, { endpoints } from "../../configs/Apis";
import { TouchableOpacity, Image, ScrollView, Text} from "react-native"
import { TextInput, Button, HelperText, RadioButton } from "react-native-paper"
import MyStyles from '../../styles/MyStyles';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from "@react-navigation/native";


const Register = () =>{
    const info = [{
            label: 'Tên',
            field: 'first_name',
            secureTextEntry: false,
            icon: "text"
        },
        {
            label: 'Họ và tên lót',
            field: 'last_name',
            secureTextEntry: false,
            icon: "text"
        },
        {
            label: 'Email',
            field: 'email',
            secureTextEntry: false,
            icon: "email"
        },
        {
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
        },
        {
            label: 'Xác nhận mật khẩu',
            field: 'confirm_password',
            secureTextEntry: true,
            icon: "lock-check"

        }];

    const [user, setUser] = useState({});
    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState(false);
    const nav =useNavigation();

    const setState = (value, field) => {
        setUser({...user, [field]: value});
    }

    const picker = async () => {
        let { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert("Permissions denied!");
        } else {
            const result =
                await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled)
                setState(result.assets[0], 'avatar');
            }
    }

    const validate = () => {
        if (Object.values(user).length === 0) {
            setMsg("Vui lòng nhập thông tin!");
            return false;
        }
    
        for (let i of info) {
            const val = user[i.field]; 
            if (!user[i.field]) {
                setMsg(`Vui lòng nhập ${i.label}`);
                return false;
            }

            if(user.password !== user.confirm_password){
                setMsg('Mật khẩu và xác nhận mật khẩu không khớp!');
                return false;
            }
    
            if (i.field === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(val)) {
                    setMsg("Email không hợp lệ");
                    return false;
                }
            }
    
            if (i.field === 'password' && val.length < 6) {
                setMsg("Mật khẩu phải có ít nhất 6 ký tự");
                return false;
            }

            if (i.field === 'username' && val.includes(' ')) {
                setMsg("Tên đăng nhập không được chứa khoảng trắng");
                return false;
            }
        }
    
        // if (user.role !== '0' && user.role !== '1') {
        //     setMsg("Vui lòng chọn vai trò");
        //     return false;
        // }
    
        setMsg("");
        return true;
    };


    const register = async () => {
        if(validate() === true) {
            try{
                setLoading(true);

                let form = new FormData();
                for (let key in user) {
                    if (key === 'confirm_password') continue;
                    if (key === 'avatar' && user.avatar?.uri) {
                        form.append('avatar', {
                            uri: user.avatar.uri,
                            name: user.avatar.fileName || 'avatar.jpg',
                            type: user.avatar.type || 'image/jpeg'
                          });                      
                    } else if (key === 'role') {
                        form.append('role', parseInt(user.role)); 
                    } else {
                        form.append(key, user[key]);
                    }
                }
                
                // console.log("Form Data:", form);
                for (let pair of form.entries()) {
                    console.log(`${pair[0]}: ${pair[1]}`);
                  }

                let res = await Apis.post(endpoints['register'], form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (res.status === 200 || res.status === 201)
                    nav.navigate('login');
                  



            }catch (ex) {
                console.error(ex);
            
                const err = ex.response?.data;
            
                setMsg(
                    err?.username?.[0] ||
                    err?.email?.[0] ||
                    err?.non_field_errors?.[0] ||
                    err?.message ||
                    (ex.message === 'Network Error' ? 'Không thể kết nối đến máy chủ!' : 'Đăng ký thất bại!')
                );
            }finally{
                setLoading(false);

            }

        }

    }
   
    return (
        <ScrollView style={MyStyles.p}>
            <HelperText type ="error" visible={msg}>{msg}</HelperText>
            {info.map(i => <TextInput
                                          key={i.field}
                                          value={user[i.field]}
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
                                              text: '#B00000',            // chữ người nhập
                                              primary: '#B00000',         // viền khi focus + label khi focus
                                              placeholder: 'gray',    // gợi ý khi chưa nhập
                                            }
                                          }}
                          />)}
            <TouchableOpacity style={MyStyles.margin} onPress={picker}>
                <Text style={{color: '#B00000'}}>Chọn ảnh đại diện...</Text>
            </TouchableOpacity>

            {user?.avatar && <Image source={{uri: user.avatar.uri}} style={[MyStyles.logo, MyStyles.margin]}/>}
                <RadioButton.Group value={user.role} onValueChange={value => setState(value, 'role')}>
                    <RadioButton.Item label="Người dùng" value="0" color='#B00000'/>
                    <RadioButton.Item label="Chuyên gia dinh dưỡng" value="1" color='#B00000'/>
                </RadioButton.Group>
            <Button style={{backgroundColor:"#B00000"}} disabled={loading} loading ={loading} onPress={register}mode="contained">Đăng ký</Button>
            
        </ScrollView>
    );
}
export default Register;