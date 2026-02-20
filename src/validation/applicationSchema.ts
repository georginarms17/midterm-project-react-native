import * as Yup from 'yup';
import { nameRegex, phMobileRegex } from '../utils/validators';

export const applicationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters')
    .matches(nameRegex, 'Name must contain letters/spaces only'),

  email: Yup.string()
    .trim()
    .required('Email is required')
    .email('Enter a valid email'),

  contactNumber: Yup.string()
    .trim()
    .required('Contact number is required')
    .matches(phMobileRegex, 'Use 09xxxxxxxxx or +639xxxxxxxxx'),

  reason: Yup.string()
    .trim()
    .required('This field is required')
    .min(20, 'Please write at least 20 characters')
    .max(400, 'Please keep it under 400 characters'),
});
