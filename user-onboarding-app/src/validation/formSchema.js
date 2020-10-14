import React from 'react'
import * as yup from 'yup'

export default yup.object().shape({
  name: yup.string().required('name is required').min(3, 'name must be 3+ chars'),
  email: yup.string().email('must be a valid email address')
    .required('email is required'),
  password: yup.string().required('password is required'),
  termsOfService: yup.boolean().oneOf([true]),
})