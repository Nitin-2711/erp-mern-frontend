import api from './api';

/**
 * @description Authentication Matrix Hub. 
 * Orchestrates login and registration shards across the 80,000 node network.
 */
export const login = async (credentials: any) => {
    return api.post('/auth/login', credentials);
};

export const logout = async () => {
    return api.post('/auth/logout');
};

export const refresh = async () => {
    return api.post('/auth/refresh-token');
};

export const getCurrentUser = async () => {
    return api.get('/users/me');
};

/**
 * @description Academic Shard Hub.
 * Optimized fetches for massive student/faculty datasets.
 */
export const getMyAttendance = async (studentId: string) => {
    return api.get(`/attendance/student-report?studentId=${studentId}`);
};

export const getMyResults = async (studentId: string) => {
    return api.get(`/academic?studentId=${studentId}`);
};

export const getMyFees = async (studentId: string) => {
    return api.get(`/academic/fees?studentId=${studentId}`);
};

/**
 * @description Scheduling/Broadcast Matrix.
 */
export const getNotices = async () => {
    return api.get('/scheduling/notice/active');
};

export const getTimetable = async () => {
    return api.get('/scheduling/timetable/me');
};
