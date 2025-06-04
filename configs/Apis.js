import axios from "axios";

const BASE_URL = 'http:// 192.168.82.143:8000/';

export const endpoints = {
  'login': '/o/token/', 
  'register': '/users/',

   // activity
'activity-list': '/activity/',
'activity-create': '/activity/',
'activity-read': (actId) => `/activity/${actId}/`,
'activity-update': (actId) => `/activity/${actId}/`,
'activity-partial-update': (actId) => `/activity/${actId}/`,
'activity-delete': (actId) => `/activity/${actId}/`,  

// chatmessage
'chatmessage-list': '/chatmessage/',
'chatmessage-create': '/chatmessage/',
'chatmessage-read': (chatId) => `/chatmessage/${chatId}/`,
'chatmessage-update': (chatId) => `/chatmessage/${chatId}/`,
'chatmessage-partial-update': (chatId) => `/chatmessage/${chatId}/`,
'chatmessage-delete': (chatId) => `/chatmessage/${chatId}/`,

// connection
'connection-list': '/connection/',
'connection-create': '/connection/',
'connection-read': (conId) => `/connection/${conId}/`,
'connection-update': (conId) => `/connection/${conId}/`,
'connection-partial-update': (conId) => `/connection/${conId}/`,
'connection-delete': (conId) => `/connection/${conId}/`,

// goal
'goal-list': '/goal/',
'goal-create': '/goal/',
'goal-read': (goalId) => `/goal/${goalId}/`,
'goal-update': (goalId) => `/goal/${goalId}/`,
'goal-partial-update': (goalId) => `/goal/${goalId}/`,
'goal-delete': (goalId) => `/goal/${goalId}/`,

// healthdiary
'healthdiary-list': '/healthdiary/',
'healthdiary-create': '/healthdiary/',
'healthdiary-read': (diaryId) => `/healthdiary/${diaryId}/`,
'healthdiary-update': (diaryId) => `/healthdiary/${diaryId}/`,
'healthdiary-partial-update': (diaryId) => `/healthdiary/${diaryId}/`,
'healthdiary-delete': (diaryId) => `/healthdiary/${diaryId}/`,

// healthrecord
'healthrecord-list': '/healthrecord/',
'healthrecord-create': '/healthrecord/',
'healthrecord-read': (recordId) => `/healthrecord/${recordId}/`,
'healthrecord-update': (recordId) => `/healthrecord/${recordId}/`,
'healthrecord-partial-update': (recordId) => `/healthrecord/${recordId}/`,
'healthrecord-delete': (recordId) => `/healthrecord/${recordId}/`,

// tag
'tag-list': '/tag/',
'tag-create': '/tag/',
'tag-read': (tagId) => `/tag/${tagId}/`,
'tag-update': (tagId) => `/tag/${tagId}/`,
'tag-partial-update': (tagId) => `/tag/${tagId}/`,
'tag-delete': (tagId) => `/tag/${tagId}/`,

// user
'get-all-users': '/users/all-users/',
'change-password': '/users/change-password/',
'current-user': '/users/current/',
'read-user': (userId) => `/users/${userId}/`,
'update-user': (userId) => `/users/${userId}/update-info/`,

// workoutplan
'workoutplan-list': '/workoutplan/',
'workoutplan-create': '/workoutplan/',
'workoutplan-read': (planId) => `/workoutplan/${planId}/`,
'workoutplan-update': (planId) => `/workoutplan/${planId}/`,
'workoutplan-partial-update': (planId) => `/workoutplan/${planId}/`,
'workoutplan-delete': (planId) => `/workoutplan/${planId}/`,
};



// 1. Lấy thông tin user hiện tại
export const getCurrentUser = async (token) => {
  try {
    const api = authApis(token);
    const response = await api.get(endpoints['current-user']);
    return response.data;  // trả về object user
  } catch (error) {
    console.error('Lỗi lấy profile:', error);
    throw error;
  }
};

// 2. Kết nối chuyên gia (tạo connection mới)
export const connectExpert = async (token, expertId) => {
  try {
    const api = authApis(token);
    // giả sử API connection-create nhận { expert_id }
    const response = await api.post(endpoints['connection-create'], { expert_id: expertId });
    return response.data;  // trả về connection mới
  } catch (error) {
    console.error('Lỗi kết nối chuyên gia:', error);
    throw error;
  }
};

// 3. Ngắt kết nối chuyên gia (xóa connection theo id)
export const disconnectExpert = async (token, connectionId) => {
  try {
    const api = authApis(token);
    const url = endpoints['connection-delete'](connectionId);
    await api.delete(url);
    return true;
  } catch (error) {
    console.error('Lỗi ngắt kết nối chuyên gia:', error);
    throw error;
  }
};

export const authApis = (token) => {
  return axios.create({
      baseURL: BASE_URL,
      headers: {
          'Authorization': `Bearer ${token}`
      }
  })
}


export default axios.create({
  baseURL: BASE_URL
});
