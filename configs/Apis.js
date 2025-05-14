import {
    mockUser,
    homeUtilities,
    bmiRecords,
    waterReminders,
    healthStats,
    workoutPlans,
    mealPlans,
    healthRecords,
    healthDiaries,
    chatMessages,
    userGoals,
    expertProfiles,
    expertSpecializations,
    userConnections,
  } from "../data/mockData";
  
  export const fetchUserProfile = () => Promise.resolve(mockUser);
  export const fetchHomeUtilities = () => Promise.resolve(homeUtilities);
  export const fetchBMIRecords = () => Promise.resolve(bmiRecords);
  export const fetchWaterReminders = () => Promise.resolve(waterReminders);
  export const fetchHealthStats = () => Promise.resolve(healthStats);
  export const fetchWorkoutPlans = () => Promise.resolve(workoutPlans);
  export const fetchMealPlans = () => Promise.resolve(mealPlans);
  export const fetchHealthRecords = () => Promise.resolve(healthRecords);
  export const fetchHealthDiaries = () => Promise.resolve(healthDiaries);
  export const fetchChatMessages = () => Promise.resolve(chatMessages);
  export const fetchUserGoals = () => Promise.resolve(userGoals);
  export const fetchExpertProfiles = () => Promise.resolve(expertProfiles);
  export const fetchExpertSpecializations = () => Promise.resolve(expertSpecializations);
  export const fetchUserConnections = () => Promise.resolve(userConnections);
