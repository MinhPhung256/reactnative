import axios from "axios";

const BASE_URL = 'http://172.20.10.3:8000/';

export const endpoints = {
  'login': '/o/token/',
  'register': '/users/',

   //activity
   'activity_list': '/activity/',                    
   'activity_create': '/activity/',                  
   'activity_read': (actId) => `/activity/${actId}/`,    
   'activity_update': (actId) => `/activity/${actId}/`,    
   'activity_partial_update': (actId) => `/activity/${actId}/`,  
   'activity_delete': (actId) => `/activity/${actId}/`,  

  // chatmessage
  'chatmessage_list': '/chatmessage/',
  'chatmessage_create': '/chatmessage/',
  'chatmessage_read': (chatId) =>`/chatmessage/${chatId}/`,
  'chatmessage_update': (chatId) =>`/chatmessage/${chatId}/`,
  'chatmessage_partial_update': (chatId) =>`/chatmessage/${chatId}/`,
  'chatmessage_delete': (chatId) =>`/chatmessage/${chatId}/`,

  // connection
  'connection_list': '/connection/',
  'connection_create': '/connection/',
  'connection_read': (conId) =>`/connection/${conId}/`,
  'connection_update': (conId) =>`/connection/${conId}/`,
  'connection_partial_update': (conId) =>`/connection/${conId}/`,
  'connection_delete': (conId) =>`/connection/${conId}/`,

  // goal
  'goal_list': '/goal/',
  'goal_create': '/goal/',
  'goal_read': (goalId) => `/goal/${goalId}/`,
  'goal_update': (goalId) => `/goal/${goalId}/`,
  'goal_partial_update': (goalId) => `/goal/${goalId}/`,
  'goal_delete': (goalId) => `/goal/${goalId}/`,
  
  // healthdiary
  'healthdiary_list': '/healthdiary/',
  'healthdiary_create': '/healthdiary/',
  'healthdiary_read': (diaryId) => `/healthdiary/${diaryId}/`,
  'healthdiary_update': (diaryId) => `/healthdiary/${diaryId}/`,
  'healthdiary_partial_update': (diaryId) => `/healthdiary/${diaryId}/`,
  'healthdiary_delete': (diaryId) => `/healthdiary/${diaryId}/`,

   //healthrecord
    'healthrecord_list': '/healthrecord/',
    'healthrecord_create': '/healthrecord/',
    'healthrecord_read': (recordId) => `/healthrecord/${recordId}/`,
    'healthrecord_update': (recordId) => `/healthrecord/${recordId}/`,
    'healthrecord_partial_update': (recordId) => `/healthrecord/${recordId}/`,
    'healthrecord_delete': (recordId) => `/healthrecord/${recordId}/`,

    //tag
    'tag_list': '/tag/',
    'tag_create': '/tag/',
    'tag_read': (tagId) => `/tag/${tagId}/`,
    'tag_update': (tagId) => `/tag/${tagId}/`,
    'tag_partial_update': (tagId) => `/tag/${tagId}/`,
    'tag_delete': (tagId) => `/tag/${tagId}/`,

    //user
    'users_create': '/users/',
    'get_all_users': '/users/all-users/',
    'change_password': '/users/change-password/',
    'current_user': '/users/current/',
    'update_info': '/users/update-info/',

    //
    'workoutplan_list': '/workoutplan/',
    'workoutplan_create': '/workoutplan/',
    'workoutplan_read': (planId) => `/workoutplan/${planId}/`,
    'workoutplan_update': (planId) => `/workoutplan/${planId}/`,
    'workoutplan_partial_update': (planId) => `/workoutplan/${planId}/`,
    'workoutplan_delete': (planId) => `/workoutplan/${planId}/`,
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
