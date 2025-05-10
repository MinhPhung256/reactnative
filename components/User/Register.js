import { useState } from "react";
import { View, TouchableOpacity} from "react-native"
import { TextInput } from "react-native-paper"
import * as ImagePicker from "expo-image-picker"
import MyStyles from '../../styles/MyStyles';
import { Text } from "react-native";

const register = () =>{
    const info = [{
        label: 'Tên',
        field: 'first_name',
        secureTextEntry: false,
        icon: "text"
    }, {
        label: 'Họ và tên lót',
        field: 'last_name',
        secureTextEntry: false,
        icon: "text"
    }, {
        label: 'Tên đăng nhập',
        field: 'username',
        secureTextEntry: false,
        icon: "account"
    }, {
        label: 'Mật khẩu',
        field: 'password',
        secureTextEntry: true,
        icon: "eye"
    }, {
        label: 'Xác nhận mật khẩu',
        field: 'confirm',
        secureTextEntry: true,
        icon: "eye"
    }];

    const [user, setUser] = useState({});

    const setState = (value, field) => {
        setUser({...user, [field]: value});
    }

   
    return (
        <View>
            {info.map(i => <TextInput value={user[i.field]} onChangeText={t => setState(t, i.field)}
                                label={i.label} style ={MyStyles.margin}
                                secureTextEntry={i.secureTextEntry}
                                right={<TextInput.Icon icon={i.icon} />}
            />)}
            <TouchableOpacity>
                <Text>Chọn ảnh đại diện...</Text>
            </TouchableOpacity>
            
        </View>
    )
}

export default register;