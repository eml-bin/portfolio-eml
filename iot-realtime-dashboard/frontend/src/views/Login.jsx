/*
  Login (View Component)
    Vista de login del usuario.

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
*/

import React, { useContext, useEffect } from 'react'

import { useHistory, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

import { Container, Card, Image } from 'react-bootstrap'
import FormLogin from '../components/Forms/Login'
import { verifyToken } from '../store/actions/auth'

import logo from '../assets/logo.png'

import ThemeContext from '../assets/ThemeContext'
import '../assets/css/views/login.css'

const Login = ({ user, verification, token }) => {
  let { push } = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: "/platform" } }

  let { color } = useContext(ThemeContext)

  useEffect(() => {
    if (localStorage.getItem("tkn") !== null) {
      verification(localStorage.getItem("tkn"))
    }
  }, [verification])

  useEffect(() => {
    token && push(from)
  }, [token, from, push])

  return (
    <>
      {
        localStorage.getItem("tkn") ?
          <></>
        :
        (
          <Container className={`center-in-display bg-${color}`} fluid>
            <Card
              bg="light"
              border="white"
              style={{ width: '30rem' }}
              className="login"
            >
              <Card.Body>
                <div className="animated zoomIn text-center py-5">
                  <Image src={logo} fluid width="180"/>
                </div>
                <FormLogin />
              </Card.Body>
            </Card>
          </Container>
        )
      }
    </>
  )
}

let mapStateToLogin = (state) => {
  return {
     token: state.auth.token,
  }
}

let mapDispatchToLogin = (dispatch) => (
  {
    verification: (token) => (
      dispatch(verifyToken(token))
    )
  }
)

export default connect(mapStateToLogin, mapDispatchToLogin)(Login)
