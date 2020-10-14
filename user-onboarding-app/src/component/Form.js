import React from 'react'
import styled from 'styled-components'

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  label input {
    margin: 0.1%;
    padding: 0.5rem;
    width: 30rem;
  }
  button {
    margin: 0%;
    padding: 0.5rem;
  }
`

export default function Form({values, submit, change, disabled, errors}) {

  const onChange = (event => {
    const {name, value, type, checked} = event.target
    const valueToUse = type === 'checkbox' ? checked : value
    change(name, valueToUse)
  })

  const onSubmit = (event => {
    event.preventDefault()
    submit()
  })

  return (
    <div>
      <StyledForm onSubmit={onSubmit}>
        <h1 style={{margin: '0'}}>Login Page</h1>
        <div className="errors" style={{color: 'red'}}>
          <div>{errors.name}</div>
          <div>{errors.email}</div>
          <div>{errors.password}</div>
          <div>{errors.termsOfService}</div>
        </div>
        <label >Name
          <input 
            name='name'
            type='text'
            value={values.name}
            onChange={onChange}
          />
        </label><br />
        <label>Email
          <input 
            name='email'
            type='text'
            value={values.email}
            onChange={onChange}
          />
        </label><br />
        <label>Password
          <input 
            name='password'
            type='text'
            value={values.password}
            onChange={onChange}
          />
        </label><br />
        <label id='tos'>Terms of Service
          <input 
            name='termsOfService'
            type='checkbox'
            checked={values.termsOfService}
            onChange={onChange}
          />
        </label><br />
        <button disabled={disabled}>Submit</button>
      </StyledForm>
    </div>
  )
}