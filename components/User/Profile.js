import { useContext } from "react"
import { MyDispatchContext, MyUserContext } from "../../configs/UserContext"
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import MyStyles from "../../styles/MyStyles";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
    const user = useContext(MyUserContext);
    const dispatch = useContext(MyDispatchContext);
    const nav = useNavigation();

    const logout = () => {
        dispatch({
            "type": "logout",
        });
        nav.navigate("HomeStack")
    }

    return (
        <View>
            <Text>Chao {user.username}</Text>
            <Button onPress={logout} mode="contained" style={MyStyles.margin} >Dang xuat</Button>

        </View>    
    )
}

export default Profile;