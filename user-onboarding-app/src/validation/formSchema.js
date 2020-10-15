import React from 'react'
import * as yup from 'yup'

export default yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be 3+ characters'),
  email: yup.string().email('Must be a valid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be 8+ characters'),
  termsOfService: yup.boolean().oneOf([true], 'Must agree with Terms of Service')
})