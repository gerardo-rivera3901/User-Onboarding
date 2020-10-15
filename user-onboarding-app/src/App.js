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
  const [newPup, setNewPup] = useState('')

  useEffect(() => {
    const getPupper = () => {
      axios.get('https://dog.ceo/api/breed/pug/images/random')
        .then(res => {
          console.log(res.data.message)
          setNewPup(res.data.message)
        })
        .catch(err => {debugger})
    }
    getPupper()
  }, [])


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
        {users.map(user => (
          <div key={user.id}>
            <div style={{borderTop: '1px solid white', width: '30rem', marginTop: '10%'}}></div>
            <h2>{user.first_name} {user.last_name}</h2>
            <h2>{user.name}</h2>
            {user.avatar != undefined ? <img src={user.avatar} alt='Cool Person' /> : <img src={newPup} style={{maxWidth: '150px'}} alt='Cool Person' /> }
            <h4>Email: {user.email}</h4>
          </div>
          ))
        }
      </header>
    </div>
  );
}

export default App;
