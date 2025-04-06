import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .strict(true)
    .matches(/^\S.*$/, 'Name should not start with a space')
    .min(1, 'Name must be at least 1 character')
    .max(50, 'Name cannot exceed 50 characters')
    .required('Curriculum name is required'),
});

export const validationSchema1 = Yup.object().shape({
  curriculum_id: Yup.string().required('Curriculum name is required'),
  grade: Yup.string().required('Grade is required'),
  subject_name: Yup.string().required('Subject name is required'),
});

export const studentvalidationSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  curriculum_name: Yup.string().required('Curriculum name is required'),
  email: Yup.string().required('Email is required'),
});

export const validationVideoSchema = Yup.object().shape({
  video_file: Yup.mixed()
    .required('A video file is required')
    .test(
      'fileType',
      'Only video files are allowed',
      (value: any) =>
        value && ['video/mp4', 'video/webm', 'video/ogg'].includes(value.type),
    ),
});
