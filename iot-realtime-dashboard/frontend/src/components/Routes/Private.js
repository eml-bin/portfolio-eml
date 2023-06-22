/*
  Private.js (Route)
    Ruta que protege vistas que necesitan autenticación válida.

# 26/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React from "react"
import { Route, Redirect } from "react-router-dom"
import { connect } from 'react-redux'


const Private = ({ children, token, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ path, location }) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

const mapStateToPrivate = (state) => {
  return {
     token: state.auth.token,
  }
}

export default connect(mapStateToPrivate)(Private)
