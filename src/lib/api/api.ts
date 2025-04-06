// lib/api.ts

import axios from 'axios';
import axiosInstance from '../axiosInstance';

export const login = async (payload: {
  email: string;
  password: string;
  role?: number;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/users/login', payload);
    return data;
  } catch (error) {
    console.error('Login API error:', error);
    throw error;
  }
};

export const refreshAccessToken = async (payload: {
  refresh_token: string;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/renew_access_token/', payload);
    return data;
  } catch (error) {
    console.error('Refresh token API error:', error);
    throw error;
  }
};

export const getUsers = async (name: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/account/user/${name}`);
    return data;
  } catch (error) {
    console.error('Get users API error:', error);
    throw error;
  }
};

export const createUsers = async (
  payload: Record<string, any>,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/account/user/`, payload);
    return data;
  } catch (error) {
    console.error('Get users API error:', error);
    throw error;
  }
};

export const deleteUsersData = async (
  payload: Record<string, any>,
): Promise<any> => {
  try {
    return await axiosInstance.delete(`/account/user/`, {
      data: payload,
    });
  } catch (error) {
    console.error('Get users API error:', error);
    throw error;
  }
};

export const getUserDetails = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.get('/account/userdetails/');
    return data;
  } catch (error) {
    console.error('Get user details API error:', error);
    throw error;
  }
};

export const getUnitBuilderData = async (name: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/curriculum/grade_subject/${name}/modules`);
    return data;
  } catch (error) {
    console.log('Add unit builder key API error:', error);
    throw error;
  }
};

export const addUnitBuilderKey = async (
  payload: Record<string, any>,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/curriculum/module/create', payload);
    return data;
  } catch (error) {
    console.log('Add unit builder key API error:', error);
    throw error;
  }
};

export const addUnitBuilderList = async (
  payload: Record<string, any>,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/curriculum/module/create', payload);
    return data;
  } catch (error) {
    console.log('delete unit builder', error);
    throw error;
  }
};

export const deleteUnitBuilderKeyById = async (payload: {
  id: number;
}): Promise<any> => {
  try {
    const { data } = await axiosInstance.delete('/account/unitbuilder/', {
      data: payload,
    });
    return data;
  } catch (error) {
    console.error('Delete unit builder key API error:', error);
    throw error;
  }
};

export const addcurriculumList = async (payload: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/curriculum/create', payload);
    return data;
  } catch (error) {
    console.error('Add unit builder key API error:', error);
    throw error;
  }
};

export const addcurriculumSubjectList = async (payload: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/curriculum/grade_subject/create', payload);
    return data;
  } catch (error) {
    console.error('Add unit builder key API error:', error);
    throw error;
  }
};

export const getcurriculumList = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.get('/curriculum/all');
    return data;
  } catch (error) {
    console.error('Get user details API error:', error);
    throw error;
  }
};

export const getcurriculumWithSubjectList = async (payload: any): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`curriculum/curriculum/${payload?.curriculumID}/grade_subjects`);
    return data;
  } catch (error) {
    console.error('Get user details API error:', error);
    throw error;
  }
};

/* This is used for to get all school list*/
export const getSchoollists = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.get('/school/all');
    return data;
  } catch (error) {
    console.error('Get user details API error:', error);
    throw error;
  }
};

/* This is used for to add school */
export const addSchool = async (payload: Record<string, any>): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/school/create', payload);
    return data;
  } catch (error) {
    console.error('Refresh token API error:', error);
    throw error;
  }
};

/* This is used for to get class list school wise */
export const getclassList = async (school_id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/school/${school_id}/classes`);
    return data;
  } catch (error) {
    console.error('Get user details API error:', error);
    throw error;
  }
};

export const addclassList = async (
  payload: Record<string, any>,
): Promise<any> => {
  try {
    const response = await axiosInstance.post('/class/create', payload);
    return response.data;
  } catch (err: any) {
    console.error('Error adding class list:', err?.message);
    throw new Error('Failed to add class list. Please try again.');
  }
};

export const getnewtonCurriculums = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.get('/account/curriculums_newton/');
    return data;
  } catch (error) {
    console.error('Get user details API error:', error);
    throw error;
  }
};

export const getmathicaCurriculums = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.get('/account/curriculums_mathica/');
    return data;
  } catch (error) {
    console.error('Get user details API error:', error);
    throw error;
  }
};

export const getmathicaClass = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.get('/account/classes_mathica/');
    return data;
  } catch (error) {
    console.error('Get user details API error:', error);
    throw error;
  }
};

export const getnewtonClass = async (): Promise<any> => {
  try {
    const { data } = await axiosInstance.get('/account/classes_newton/');
    return data;
  } catch (error) {
    console.error('Get user details API error:', error);
    throw error;
  }
};

export const uploadVideo = async (
  payload: Record<string, any>,
): Promise<any> => {
  try {
    const formData = new FormData();

    // Append each key-value pair to the FormData object
    Object.keys(payload).forEach((key) => {
      formData.append(key, payload[key]);
    });

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}account/update_unitbuilder_section/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return data;
  } catch (error) {
    console.error('Video upload API error:', error);
    throw error;
  }
};

export const uploadUrlVideo = async (
  payload: Record<string, any>,
): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(
      'account/update_unitbuilder_section/',
      payload,
    );
    return data;
  } catch (error) {
    console.error('Get user details API error:', error);
    throw error;
  }
};

/* This is used for to get student list school wise */
export const toGetStudentListSchoolWise = async (school_id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/school/${school_id}/students`);
    return data;
  } catch (error) {
    console.error('Get users API error:', error);
    throw error; 
  }
};

/* This is used for to get teacher list school wise */
export const toGetTeacherListSchoolWise = async (school_id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/school/${school_id}/teachers`);
    return data;
  } catch (error) {
    console.error('Get users API error:', error);
    throw error; 
  }
};

/* This function is used for school add student */
export const addStudentSchool = async (payloadData: Record<string, any>): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/school/${payloadData?.school_id}/add_student`, payloadData?.payload);
    return data;
  } catch (error) {
    console.error('Get users API error:', error);
    throw error;
  }
};

/* This function is used for school add teacher */
export const addTeacherSchool = async (payloadData: Record<string, any>): Promise<any> => {
  try {
    const { data } = await axiosInstance.post(`/school/${payloadData?.school_id}/add_teacher`, payloadData?.payload);
    return data;
  } catch (error) {
    console.error('Get users API error:', error);
    throw error;
  }
};

/* This is used for to Assign a curriculum to a school */
export const addCurriculumSchool = async (payload: Record<string, any>): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/school/assign_curriculum', payload);
    return data;
  } catch (error) {
    console.error('Refresh token API error:', error);
    throw error;
  }
};

/* This is used for to curriculum school */
export const toGetCurriculumListSchoolWise = async (school_id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/school/${school_id}/curricula`);
    return data;
  } catch (error) {
    console.error('Get users API error:', error);
    throw error; 
  }
};

/* This is used for to get all student list class wise */
export const toGetClassStudentList = async (class_id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/class/${class_id}/students`);
    return data;
  } catch (error) {
    console.error('Get users API error:', error);
    throw error; 
  }
};

/* This is used for to get all teacher list class wise */
export const toGetClassTeacherList = async (class_id: string): Promise<any> => {
  try {
    const { data } = await axiosInstance.get(`/class/${class_id}/teachers`);
    return data;
  } catch (error) {
    console.error('Get users API error:', error);
    throw error; 
  }
};

/* This is used for to class add students to a school */
export const addClassStudent = async (payload: Record<string, any>): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/class/add_students', payload);
    return data;
  } catch (error) {
    console.error('Refresh token API error:', error);
    throw error;
  }
};

/* This is used for to class add teacher to a school */
export const addClassTeacher = async (payload: Record<string, any>): Promise<any> => {
  try {
    const { data } = await axiosInstance.post('/class/add_teachers', payload);
    return data;
  } catch (error) {
    console.error('Refresh token API error:', error);
    throw error;
  }
};


