{
    "users": {
      "data": [
        {
          "id": 1,
          "username": "john_doe",
          "email": "john@example.com",
          "avatar": "https://res.cloudinary.com/demo/image/upload/v1234567890/avatar/john_doe.jpg",
          "role": 1,
          "first_name": "John",
          "last_name": "Doe"
        },
        {
          "id": 2,
          "username": "jane_expert",
          "email": "jane@example.com",
          "avatar": "https://res.cloudinary.com/demo/image/upload/v1234567890/avatar/jane_expert.jpg",
          "role": 2,
          "first_name": "Jane",
          "last_name": "Smith"
        },
        {
          "id": 3,
          "username": "admin_user",
          "email": "admin@example.com",
          "avatar": "",
          "role": 0,
          "first_name": "Admin",
          "last_name": "User"
        }
      ]
    },
    "exercisers": {
      "data": [
        {
          "id": 1,
          "user_id": 1,
          "created_date": "2025-05-01",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "coaches": {
      "data": [
        {
          "id": 1,
          "user_id": 2,
          "created_date": "2025-05-01",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "activities": {
      "data": [
        {
          "id": 1,
          "name": "Chạy bộ",
          "description": "<p>Chạy bộ ngoài trời trong 30 phút</p>",
          "calories_burned": 300.5,
          "image": "https://res.cloudinary.com/demo/image/upload/v1234567890/activity/running.jpg",
          "created_date": "2025-05-01",
          "updated_date": "2025-05-14",
          "active": true
        },
        {
          "id": 2,
          "name": "Yoga",
          "description": "<p>Buổi tập yoga Hatha để tăng độ linh hoạt</p>",
          "calories_burned": 150.0,
          "image": "https://res.cloudinary.com/demo/image/upload/v1234567890/activity/yoga.jpg",
          "created_date": "2025-05-02",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "workout_plans": {
      "data": [
        {
          "id": 1,
          "user_id": 1,
          "name": "Kế hoạch tập luyện hàng tuần",
          "date": "2025-05-15",
          "activities": [1, 2],
          "description": "<p>Kết hợp giữa cardio và độ linh hoạt</p>",
          "sets": 3,
          "reps": 12,
          "created_date": "2025-05-10",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "meal_plans": {
      "data": [
        {
          "id": 1,
          "user_id": 1,
          "name": "Kế hoạch ăn kiêng cân bằng",
          "date": "2025-05-15",
          "description": "<p>Bữa ăn giàu protein, ít carb</p>",
          "calories_intake": 2000.0,
          "created_date": "2025-05-10",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "health_records": {
      "data": [
        {
          "id": 1,
          "user_id": 1,
          "date": "2025-05-14T10:00:00Z",
          "bmi": 22.5,
          "water_intake": 2.5,
          "steps": 10000,
          "heart_rate": 75,
          "height": 1.75,
          "weight": 70.0,
          "sleep_time": 7.5,
          "created_date": "2025-05-14",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "health_diaries": {
      "data": [
    [
        {
          "id": 1,
          "user_id": 1,
          "date": "2025-05-14T12:00:00Z",
          "content": "<p>Cảm thấy tràn đầy năng lượng sau khi chạy bộ buổi sáng</p>",
          "feeling": "Tích cực",
          "created_date": "2025-05-14",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "chat_messages": {
      "data": [
        {
          "id": 1,
          "sender_id": 1,
          "receiver_id": 2,
          "message": "Xin chào, bạn có thể xem lại kế hoạch tập luyện của tôi không?",
          "timestamp": "2025-05-14T10:30:00Z",
          "is_read": false,
          "created_date": "2025-05-14",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "tags": {
      "data": [
        {
          "id": 1,
          "name": "Cardio",
          "created_date": "2025-05-01",
          "updated_date": "2025-05-14",
          "active": true
        },
        {
          "id": 2,
          "name": "Độ linh hoạt",
          "created_date": "2025-05-01",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "user_goals": {
      "data": [
        {
          "id": 1,
          "user_id": 1,
          "goal_type": "weight_loss",
          "target_weight": 65.0,
          "target_date": "2025-08-01",
          "description": "Giảm 5kg trước mùa hè",
          "created_date": "2025-05-01",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "expert_specializations": {
      "data": [
        {
          "id": 1,
          "name": "Dinh dưỡng",
          "description": "Chuyên về lập kế hoạch ăn kiêng",
          "created_date": "2025-05-01",
          "updated_date": "2025-05-14",
          "active": true
        },
        {
          "id": 2,
          "name": "Huấn luyện thể dục",
          "description": "Chuyên gia về sức mạnh và điều kiện",
          "created_date": "2025-05-01",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "expert_profiles": {
      "data": [
        {
          "id": 1,
          "user_id": 2,
          "specializations": [1, 2],
          "bio": "<p>Huấn luyện viên được chứng nhận với 10 năm kinh nghiệm</p>",
          "experience_years": 10,
          "consultation_fee": 50.0,
          "created_date": "2025-05-01",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    },
    "user_connections": {
      "data": [
        {
          "id": 1,
          "user_id": 1,
          "expert_id": 2,
          "status": "accepted",
          "created_date": "2025-05-01",
          "updated_date": "2025-05-14",
          "active": true
        }
      ]
    }
  }