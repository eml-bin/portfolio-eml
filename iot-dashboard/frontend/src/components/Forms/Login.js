/*
  Login.js (Form)

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useState } from 'react'
import { Form, Button, Spinner, InputGroup, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { authUser } from '../../store/actions/auth'

const Login = (props) => {

  const { login } = props
  const { loadingLogin, error } = props.auth
  const [ formData, setFormData ] = useState({
    user: '',
    password: ''
  })

  const handleSubmit = event => {
    event.preventDefault()
    const userInfo = {
      "email": formData.email,
      "password": formData.password,
    }

    login(userInfo)
  }

  const handleValueChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup className="mb-1">
          <InputGroup.Prepend>
            <InputGroup.Text>
              <FontAwesomeIcon icon={['far', 'envelope']}/>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name="email"
            placeholder="Email"
            aria-label="Email"
            onChange={handleValueChange}
            value={formData.notes}
            required
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>
              <FontAwesomeIcon icon={['fas', 'key']}/>
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            aria-label="Password"
            onChange={handleValueChange}
            value={formData.notes}
            required
          />
        </InputGroup>
        {
          (error) &&
          <Alert variant="danger" className="mt-2 text-center">
            ¡Password/Email Incorrectos!
          </Alert>
        }
      </Form.Group>
      {
        (loadingLogin) ?
          <div className="d-flex justify-content-center p-2">
            <Spinner variant="danger" animation="grow" size="sm" className="mx-2"/>
            <Spinner variant="danger" animation="grow" size="sm" className="mx-2"/>
            <Spinner variant="danger" animation="grow" size="sm" className="mx-2"/>
          </div>
        :
        <Button
          variant="danger"
          block
          className="mt-3"
          type="submit"
        >
          Iniciar Sesión
        </Button>
      }
    </Form>
  )
}

const mapStateToLogin = (state) => {
  return {
     auth: state.auth,
  }
}

const mapDispatchToLogin = (dispatch) => (
  {
    login: (userInfo) => (
      dispatch(authUser(userInfo))
    )
  }
)


export default connect(mapStateToLogin, mapDispatchToLogin)(Login)
