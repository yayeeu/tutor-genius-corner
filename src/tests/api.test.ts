import { 
  fetchStudentGradeLevel,
  fetchAvailableCourses,
  fetchCourseUnits,
  fetchStudentMastery,
  updateTopicMastery,
  fetchAssignments,
  createAssignment,
  updateAssignment,
  fetchLearningActivity,
  updateLearningActivity
} from '@/utils/apiClient';
import axios from 'axios';

// Mock axios instance
const mockAxios = axios.create as jest.Mock;
const mockGet = jest.fn();
const mockPost = jest.fn();
const mockPut = jest.fn();

mockAxios.mockReturnValue({
  get: mockGet,
  post: mockPost,
  put: mockPut,
});

describe('API Integration Tests', () => {
  const testUserId = 'test-user-id';
  const testCourseId = 'test-course-id';
  const testUnitId = 'test-unit-id';
  const testAssignmentId = 'test-assignment-id';

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock responses
    mockGet.mockResolvedValue({ data: { gradeLevel: 9 } });
    mockPost.mockResolvedValue({ data: { success: true } });
    mockPut.mockResolvedValue({ data: { success: true } });
  });

  it('should fetch student grade level', async () => {
    const gradeLevel = await fetchStudentGradeLevel(testUserId);
    expect(gradeLevel).toBe(9);
    expect(mockGet).toHaveBeenCalledWith(`/api/students/${testUserId}/grade-level`);
  });

  it('should fetch available courses', async () => {
    const mockCourses = [
      { id: '1', name: 'Math', grade_level: 9 },
      { id: '2', name: 'Science', grade_level: 9 }
    ];
    mockGet.mockResolvedValueOnce({ data: mockCourses });

    const courses = await fetchAvailableCourses(9);
    expect(courses).toEqual(mockCourses);
    expect(mockGet).toHaveBeenCalledWith('/api/courses', { params: { gradeLevel: 9 } });
  });

  it('should fetch course units', async () => {
    const mockUnits = [
      { id: '1', name: 'Unit 1' },
      { id: '2', name: 'Unit 2' }
    ];
    mockGet.mockResolvedValueOnce({ data: mockUnits });

    const units = await fetchCourseUnits(testCourseId);
    expect(units).toEqual(mockUnits);
    expect(mockGet).toHaveBeenCalledWith(`/api/courses/${testCourseId}/units`);
  });

  it('should fetch student mastery', async () => {
    const mockMastery = [
      { unit_id: testUnitId, mastery_score: 0.8 }
    ];
    mockGet.mockResolvedValueOnce({ data: mockMastery });

    const mastery = await fetchStudentMastery(testUserId, [testUnitId]);
    expect(mastery).toEqual(mockMastery);
    expect(mockGet).toHaveBeenCalledWith(`/api/topic-mastery/${testUserId}`, {
      params: { unitIds: testUnitId }
    });
  });

  it('should update topic mastery', async () => {
    const result = await updateTopicMastery(testUserId, testUnitId, 0.8, 'medium');
    expect(result).toEqual({ success: true });
    expect(mockPost).toHaveBeenCalledWith('/api/topic-mastery', {
      userId: testUserId,
      unitId: testUnitId,
      masteryScore: 0.8,
      difficultyPref: 'medium'
    });
  });

  it('should fetch assignments', async () => {
    const mockAssignments = [
      { id: '1', user_id: testUserId, type: 'quiz' }
    ];
    mockGet.mockResolvedValueOnce({ data: mockAssignments });

    const assignments = await fetchAssignments(testUserId);
    expect(assignments).toEqual(mockAssignments);
    expect(mockGet).toHaveBeenCalledWith('/api/assignments', {
      params: { userId: testUserId }
    });
  });

  it('should create and update assignment', async () => {
    const mockAssignment = { id: testAssignmentId, user_id: testUserId, type: 'quiz' };
    mockPost.mockResolvedValueOnce({ data: mockAssignment });
    mockPut.mockResolvedValueOnce({ data: { ...mockAssignment, completed: true, score: 85 } });

    // Create assignment
    const newAssignment = await createAssignment(testUserId, 'quiz', testCourseId, testUnitId);
    expect(newAssignment).toEqual(mockAssignment);
    expect(mockPost).toHaveBeenCalledWith('/api/assignments', {
      userId: testUserId,
      type: 'quiz',
      courseId: testCourseId,
      unitId: testUnitId
    });

    // Update assignment
    const updatedAssignment = await updateAssignment(testAssignmentId, true, 85);
    expect(updatedAssignment).toEqual({ ...mockAssignment, completed: true, score: 85 });
    expect(mockPut).toHaveBeenCalledWith(`/api/assignments/${testAssignmentId}`, {
      completed: true,
      score: 85
    });
  });

  it('should fetch and update learning activity', async () => {
    const mockActivities = [
      { user_id: testUserId, date: '2024-03-20', score: 90 }
    ];
    mockGet.mockResolvedValueOnce({ data: mockActivities });
    mockPost.mockResolvedValueOnce({ data: { success: true } });

    // Fetch learning activity
    const activities = await fetchLearningActivity(testUserId);
    expect(activities).toEqual(mockActivities);
    expect(mockGet).toHaveBeenCalledWith(`/api/learning-activity/${testUserId}`);

    // Update learning activity
    const today = new Date().toISOString().split('T')[0];
    const result = await updateLearningActivity(testUserId, testUnitId, 'quiz', 90);
    expect(result).toEqual({ success: true });
    expect(mockPost).toHaveBeenCalledWith('/api/learning-activity', {
      userId: testUserId,
      unitId: testUnitId,
      activityType: 'quiz',
      score: 90
    });
  });
}); 