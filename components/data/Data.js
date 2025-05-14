export const mockUser = {
    id: 1,
    username: "user123",
    first_name: "Hoàng",
    last_name: "Nguyễn",
    email: "hoang@example.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    birthday: "1995-05-20",
    height: 1.70, // in meters
    weight: 65,
    role: 1,
  };
  
  export const homeUtilities = [
    { id: 1, name: "Hồ sơ cá nhân", icon: "account", route: "ProfileScreen", description: "Xem và chỉnh sửa thông tin cá nhân" },
    { id: 2, name: "Tính BMI", icon: "scale-bathroom", route: "BMIScreen", description: "Tính chỉ số khối cơ thể" },
    { id: 3, name: "Thống kê sức khỏe", icon: "chart-bar", route: "StatsScreen", description: "Xem biểu đồ cân nặng, BMI, v.v." },
    { id: 4, name: "Nhắc uống nước", icon: "cup-water", route: "WaterReminderScreen", description: "Thiết lập nhắc nhở uống nước" },
  ];
  
  export const bmiRecords = [
    { date: "2025-05-01", height: 1.70, weight: 65, bmi: 22.49, status: "Bình thường" },
    { date: "2025-04-01", height: 1.70, weight: 68, bmi: 23.53, status: "Bình thường" },
    { date: "2025-03-01", height: 1.70, weight: 72, bmi: 24.91, status: "Tiền béo phì" },
  ];
  
  export const waterReminders = [
    { id: 1, time: "08:00", enabled: true },
    { id: 2, time: "10:00", enabled: true },
    { id: 3, time: "14:00", enabled: false },
    { id: 4, time: "17:00", enabled: true },
  ];
  
  export const healthStats = {
    weightHistory: [72, 68, 65],
    bmiHistory: [24.91, 23.53, 22.49],
    dates: ["2025-03", "2025-04", "2025-05"]
  };
  
  export const workoutPlans = [
    {
      id: 1,
      name: "Tập chân buổi sáng",
      date: "2025-05-01",
      sets: 3,
      reps: 12,
      description: "Bài tập giúp tăng cơ chân",
      activities: [1, 2]
    }
  ];
  
  export const mealPlans = [
    {
      id: 1,
      name: "Ăn sáng ít carb",
      date: "2025-05-01",
      description: "Chế độ ăn sáng lành mạnh, ít tinh bột",
      calories_intake: 400,
    }
  ];
  
  export const healthRecords = [
    {
      id: 1,
      date: "2025-05-01T08:00:00",
      bmi: 22.5,
      water_intake: 2.0,
      steps: 5000,
      heart_rate: 75,
      height: 1.70,
      weight: 65,
      sleep_time: 7.5,
    }
  ];
  
  export const healthDiaries = [
    {
      id: 1,
      date: "2025-05-01T20:00:00",
      content: "Hôm nay cảm thấy rất khỏe sau khi tập gym",
      feeling: "Tích cực"
    }
  ];
  
  export const chatMessages = [
    {
      id: 1,
      sender: 1,
      receiver: 2,
      message: "Chào bạn, tôi có thể hỗ trợ gì không?",
      timestamp: "2025-05-01T10:00:00",
      is_read: false,
    }
  ];
  
  export const userGoals = [
    {
      user: 1,
      goal_type: "weight_loss",
      target_weight: 60,
      target_date: "2025-08-01",
      description: "Giảm cân để khỏe hơn"
    }
  ];
  
  export const expertProfiles = [
    {
      user: 2,
      bio: "Huấn luyện viên thể hình chuyên nghiệp",
      experience_years: 5,
      consultation_fee: 200,
      specializations: [1, 2]
    }
  ];
  
  export const expertSpecializations = [
    { id: 1, name: "Dinh dưỡng", description: "Tư vấn chế độ ăn uống lành mạnh" },
    { id: 2, name: "Thể hình", description: "Tăng cơ, giảm mỡ" }
  ];
  
  export const userConnections = [
    {
      user: 1,
      expert: 2,
      status: "accepted"
    }
  ];

  