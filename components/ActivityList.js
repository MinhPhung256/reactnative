import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, Text, Button, Avatar } from 'react-native-paper';

const activitiesData = [
  {
    id: 1,
    title: 'Chạy bộ buổi sáng',
    subtitle: '6:00 AM - 7:00 AM',
    description: 'Bài tập cardio nhẹ nhàng giúp khởi động ngày mới.',
    image: 'https://picsum.photos/700',
    icon:'run'
  },
  {
    id: 2,
    title: 'Yoga thư giãn',
    subtitle: '7:30 AM - 8:30 AM',
    description: 'Giúp tinh thần thư thái, tăng sức bền.',
    image: 'https://picsum.photos/701',
    icon:'yoga'
  },
  {
    id: 3,
    title: 'Bơi lội',
    subtitle: '5:00 PM - 6:00 PM',
    description: 'Tăng cường sức khỏe tim mạch và cơ bắp.',
    image: 'https://picsum.photos/702',
    icon:'swim'
  },
];

const LeftContent = icon => props => <Avatar.Icon {...props} icon={icon} backgroundColor="#B00000" />;

const ActivityCard = ({ activity, onPress }) => (
  <TouchableOpacity onPress={() => onPress(activity)}>
    <Card style={{ marginBlock: 8, marginInline: 16, backgroundColor:'#FFEBEE' }}>
      <Card.Title title={activity.title} subtitle={activity.subtitle} left={LeftContent(activity.icon)} style={{color:'#B00000'}}/>
      <Card.Content>
        <Text variant="titleLarge">{activity.title}</Text>
        <Text variant="bodyMedium">{activity.description}</Text>
      </Card.Content>
      <Card.Cover source={{ uri: activity.image }} />
      <Card.Actions>
        {/* <Button onPress={() => console.log('Cancel clicked')} labelStyle={{ color: '#B00000' }}>Cancel</Button> */}
        <Button style={{backgroundColor:'#B00000'}} labelStyle={{ color: 'white' }} onPress={() => onPress(activity)}>Xem</Button>
      </Card.Actions>
    </Card>
  </TouchableOpacity>
);

const ActivityList = ({ navigation }) => {
    const [activities, setActivities] = React.useState([]);
  
    React.useEffect(() => {
      setActivities(activitiesData);
    }, []);
  
    const onActivityPress = activity => {
      navigation.navigate('ActivityDetail', { activity });
    };
  
    return (
      <View style={{  }}>
        {activities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} onPress={onActivityPress} />
        ))}
      </View>
    );
  };
export default ActivityList;
