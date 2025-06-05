import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, View, StyleSheet, ScrollView, Alert, Platform, KeyboardAvoidingView } from "react-native";
import { TextInput, Button, Text, Avatar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { MyDispatchContext, MyUserContext } from "../../configs/UserContext";
import { useNavigation } from "@react-navigation/native";

const EditProfile = () => {
  const user = useContext(MyUserContext);
  const dispatch = useContext(MyDispatchContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    avatar: null,
  });

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        username: user.username || "",
        email: user.email || "",
        avatar: user.avatar || null,
      });
    } else {
      setFormData({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        avatar: null,
      });
    }
  }, [user]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Cấp quyền",
        "Cần quyền truy cập thư viện ảnh để chọn ảnh đại diện"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.7,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFormData({ ...formData, avatar: result.assets[0] });
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await dispatch({
        type: "update-profile",
        payload: formData,
      });

      Alert.alert("Thành công", "Thông tin đã được cập nhật");

      navigation.goBack(); 
    } catch (err) {
      console.error("Update error:", err);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#B00000" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text variant="titleLarge" style={styles.header}>
          Chỉnh sửa hồ sơ
        </Text>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            size={100}
            source={
              formData.avatar?.uri
                ? { uri: formData.avatar.uri }
                : formData.avatar
                ? { uri: formData.avatar }
                : require("../../assets/Images/default_avatar.jpg")
            }
          />
          <Button
            mode="outlined"
            onPress={pickImage}
            style={styles.avatarButton}
            textColor="#B00000"
          >
            Đổi ảnh
          </Button>
        </View>
        <TextInput
          label="Tên"
          value={formData.first_name}
          onChangeText={(v) => setFormData({ ...formData, first_name: v })}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: "#B00000" } }}
        />
        <TextInput
          label="Họ"
          value={formData.last_name}
          onChangeText={(v) => setFormData({ ...formData, last_name: v })}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: "#B00000" } }}
        />
        <TextInput
          label="Tên người dùng"
          value={formData.username}
          onChangeText={(v) => setFormData({ ...formData, username: v })}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: "#B00000" } }}
        />
        <TextInput
          label="Email"
          value={formData.email}
          keyboardType="email-address"
          onChangeText={(v) => setFormData({ ...formData, email: v })}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: "#B00000" } }}
        />
        <Button
          mode="contained"
          onPress={handleSave}
          disabled={loading}
          loading={loading}
          style={styles.button}
          buttonColor="#B00000"
        >
          Lưu thay đổi
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    color: "#B00000",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatarButton: {
    marginTop: 8,
    borderColor: "#B00000",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  button: {
    marginTop: 16,
  },
});

export default EditProfile;