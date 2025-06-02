import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RoleSelectionModal = ({ visible, onClose }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigation = useNavigation();

  const handleConfirm = () => {
    if (!selectedRole) return;

    onClose();

    // Điều hướng theo vai trò
    if (selectedRole === 'user') {
      navigation.navigate('UserTabs');
    } else if (selectedRole === 'expert') {
      navigation.navigate('ExpertTabs');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Chọn vai trò của bạn</Text>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedRole === 'user' && styles.selectedButton
            ]}
            onPress={() => setSelectedRole('user')}
          >
            <Text
              style={[
                styles.optionText,
                selectedRole === 'user' && styles.selectedText
              ]}
            >
              Tự theo dõi
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              selectedRole === 'expert' && styles.selectedButton
            ]}
            onPress={() => setSelectedRole('expert')}
          >
            <Text
              style={[
                styles.optionText,
                selectedRole === 'expert' && styles.selectedText
              ]}
            >
              Kết nối chuyên gia
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.confirmButton,
              !selectedRole && styles.confirmButtonDisabled  // thêm style khi disable
            ]}
            onPress={handleConfirm}
            disabled={!selectedRole}  // disable khi chưa chọn
          >
            <Text style={styles.confirmText}>Xác nhận</Text>
          </TouchableOpacity>


        </View>
      </View>
    </Modal>
  );
};

export default RoleSelectionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 300,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#B00000',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
  confirmButton: {
    backgroundColor: '#B00000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#a0c4ff',  // màu sáng hơn, báo disable
    color: 'black'
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },

});
