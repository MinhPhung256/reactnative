import AsyncStorage from "@react-native-async-storage/async-storage";

export default (current, action) => {
    switch(action.type){
        case 'login':
            return action.payload;
        case 'logout':
            AsyncStorage.removeItem('token');
            return null;
        case 'update-profile':
                return {
                  ...current,
                  ...action.payload,
                  avatar_url: action.payload.avatar?.uri || current.avatar_url,
                }
        }
    return current;
}