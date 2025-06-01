import axios from "axios";

const BASE_URL = 'http://192.168.1.249:8000/';

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
// 'users-create': '/users/',
'get-all-users': '/users/all-users/',
'change-password': '/users/change-password/',
'current-user': '/users/current/',

// workoutplan
'workoutplan-list': '/workoutplan/',
'workoutplan-create': '/workoutplan/',
'workoutplan-read': (planId) => `/workoutplan/${planId}/`,
'workoutplan-update': (planId) => `/workoutplan/${planId}/`,
'workoutplan-partial-update': (planId) => `/workoutplan/${planId}/`,
'workoutplan-delete': (planId) => `/workoutplan/${planId}/`,
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
