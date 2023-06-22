/*
  NoMatch.js (Route)
    Mensaje que se muestra cuando una ruta en la aplicación no es encontrada.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React from 'react'
import { Container, Alert } from 'react-bootstrap'

const NoMatch = ({ location }) => {

  return (
    <Container className="center-in-display" fluid>
      <Alert
        variant="danger"
        className="text-center"
      >
        <div className="animated bounce p-3 display-4">
          ¡Ruta <strong>no</strong> encontrada!
        </div>
        <h1>
          <code>{location.pathname}</code>
        </h1>
      </Alert>
    </Container>
  )
}

export default NoMatch
