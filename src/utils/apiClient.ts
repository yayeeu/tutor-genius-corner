import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://api.aku.com/api'
  : 'http://api.localhost/api';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const fetchStudentGradeLevel = async (userId: string) => {
  const response = await apiClient.get(`/students/${userId}/grade-level`);
  return response.data.gradeLevel;
};

export const fetchAvailableCourses = async (gradeLevel: number) => {
  const response = await apiClient.get(`/courses?gradeLevel=${gradeLevel}`);
  return response.data;
};

export const fetchCourseUnits = async (courseId: string) => {
  const response = await apiClient.get(`/courses/${courseId}/units`);
  return response.data;
};

export const fetchStudentMastery = async (userId: string, unitIds: string[]) => {
  const response = await apiClient.get(`/topic-mastery/${userId}`, {
    params: { unitIds: unitIds.join(',') }
  });
  return response.data;
};

export const updateTopicMastery = async (
  userId: string,
  unitId: string,
  masteryScore: number,
  difficultyPref: string
) => {
  const response = await apiClient.post('/topic-mastery', {
    userId,
    unitId,
    masteryScore,
    difficultyPref
  });
  return response.data;
};

export const fetchAssignments = async (userId: string, courseId?: string, unitId?: string) => {
  const response = await apiClient.get('/assignments', {
    params: { userId, courseId, unitId }
  });
  return response.data;
};

export const createAssignment = async (
  userId: string,
  type: string,
  courseId?: string,
  unitId?: string
) => {
  const response = await apiClient.post('/assignments', {
    userId,
    type,
    courseId,
    unitId
  });
  return response.data;
};

export const updateAssignment = async (
  assignmentId: string,
  completed: boolean,
  score?: number
) => {
  const response = await apiClient.put(`/assignments/${assignmentId}`, {
    completed,
    score
  });
  return response.data;
};

export const fetchLearningActivity = async (userId: string) => {
  const response = await apiClient.get(`/learning-activity/${userId}`);
  return response.data;
};

export const updateLearningActivity = async (
  userId: string,
  unitId: string,
  activityType: string,
  score: number
) => {
  const response = await apiClient.post('/learning-activity', {
    userId,
    unitId,
    activityType,
    score
  });
  return response.data;
};

export default apiClient; 