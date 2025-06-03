import React, { useEffect, useState, useContext } from "react";
import { View, StyleSheet, Image, ActivityIndicator } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { MyDispatchContext, MyUserContext } from "../../configs/UserContext";
import { authApis, endpoints } from "../../configs/Apis";

const Profile = () => {
  const dispatch = useContext(MyDispatchContext);
  const token = useContext(MyUserContext);
  const nav = useNavigation();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    dispatch({ type: "logout" });
    nav.navigate("HomeStack");
  };

  useEffect(() => {
    const loadUser = async () => {
        console.log("Token hiện tại:", token);
      try {
        let res = await authApis(token).get(endpoints["current-user"]);
        setUser(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy thông tin user:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.center}>
        <Text>Không thể tải thông tin người dùng.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Card>
        <View style={styles.avatarContainer}>
          {user.avatar ? (
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
          ) : (
            <Image
              source={require("../../assets/Images/default_avatar.jpg")}
              style={styles.avatar}
            />
          )}
        </View>
        <Card.Content>
          <Text style={styles.label}>Tên người dùng: <Text style={styles.value}>{user.username}</Text></Text>
          <Text style={styles.label}>Email: <Text style={styles.value}>{user.email}</Text></Text>
          <Text style={styles.label}>Họ: <Text style={styles.value}>{user.last_name}</Text></Text>
          <Text style={styles.label}>Tên: <Text style={styles.value}>{user.first_name}</Text></Text>
          <Text style={styles.label}>Vai trò: <Text style={styles.value}>{user.role}</Text></Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button mode="outlined" onPress={() => nav.navigate("EditProfile")}>✏️ Chỉnh sửa</Button>
          <Button mode="contained" onPress={logout}>🔓 Đăng xuất</Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  label: {
    fontWeight: "bold",
    marginTop: 8,
  },
  value: {
    fontWeight: "normal",
  },
  actions: {
    justifyContent: "space-between",
    marginTop: 16,
  },
});
