import React, { useState } from 'react';
import { View, Button } from 'react-native';
import ChooseRole from '../User/ChooseRole'; // đường dẫn đúng với project của bạn

const TestModalScreen = () => {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Hiện modal" onPress={() => setVisible(true)} />
      <ChooseRole visible={visible} onClose={() => setVisible(false)} />
    </View>
  );
};

export default TestModalScreen;
