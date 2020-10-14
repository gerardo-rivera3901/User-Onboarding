import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './component/Form'
import * as yup from 'yup'
import schema from './validation/formSchema'
import axios from 'axios'

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  termsOfService: false
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  termsOfService: '',
}

function App() {
  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    const getUsers = () => {
      axios.get('https://reqres.in/api/users')
        .then((res) => {
          setUsers(res.data.data)
          console.log(res.data.data)
      })
      .catch((err) => {debugger})
    }
    getUsers()
  }, [])

  const postNewUser = (newUser) => {
    axios.post("https://reqres.in/api/users", newUser)
      .then((res) => {
        setUsers([res.data, ...users])
        setFormValues(initialFormValues)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const inputChange = (name, value) => {
    yup.reach(schema, name).validate(value)
      .then(() => {
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch((err) => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })
    setFormValues({...formValues, [name]: value})
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      termsOfService: formValues.termsOfService
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <div className="App">
      <header className="App-header">
        <Form 
          values={formValues}
          change={inputChange}
          submit={formSubmit}
          disabled={disabled}
          errors={formErrors}
        />
        <pre>{JSON.stringify(users, null, 1)}</pre>
      </header>
    </div>
  );
}

export default App;
