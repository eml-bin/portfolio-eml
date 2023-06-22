/*
  Users.js (Table)
    Tabla que muestra los Usuarios del sistema.

# 10/03/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/


import React from 'react'
import { connect } from 'react-redux'

import { Table, Spinner, Alert, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UPDATE, UPDATE_PASSWORD } from '../../configuration/dictionary'

const Users = (props) => {
  const { handleShowUser } = props
  const { loadingUsers, data, error } = props.manage

  return (
    <>
      {
        loadingUsers &&
        <div className="d-flex justify-content-center p-2">
          <Spinner animation="border" role="status" variant="danger">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      }
      {
        !loadingUsers && data && data.length > 0 ?
          <Table responsive bordered >
            <thead className="thead-light">
              <tr>
                <th>Nombre</th>
                <th>Apellidos</th>
                <th>Email</th>
                <th>Activo</th>
                <th>Rol</th>
                <th>Familia</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((user, key) => (
                  <tr key={key}>

                    <td> { user.first_name } </td>
                    <td> { user.last_name } </td>
                    <td> <strong> { user.email } </strong> </td>
                    <td>
                      {
                        user.is_active ?
                          <FontAwesomeIcon
                            icon={['fas','check-circle']}
                            className="text-success"
                            size="sm"
                          /> :
                          <FontAwesomeIcon
                            icon={['fas','times-circle']}
                            className="text-danger"
                            size="sm"
                          />
                      }
                    </td>
                    <td> { user.role.name } </td>
                    <td> { user.role.family } </td>
                    <td className="align-middle">
                      <Button
                        variant="warning"
                        className="px-1 py-0 m-1"
                        title="Actualizar Información"
                        onClick={() => handleShowUser(UPDATE, user.id)}
                      >
                        <FontAwesomeIcon
                          icon={['fas','user-edit']}
                          size="sm"
                        />
                      </Button>

                      <Button
                        variant="secondary"
                        className="px-1 py-0 m-1"
                        title="Cambiar Password"
                        onClick={() => handleShowUser(UPDATE_PASSWORD, user.id)}
                      >
                        <FontAwesomeIcon
                          icon={['fas','key']}
                          size="sm"
                        />
                      </Button>
                    </td>

                  </tr>
                ))
              }
            </tbody>
          </Table>
        : !loadingUsers && data && !data.length &&
        <Alert variant="dark" className="text-center">
          Aún <strong>no existen usuarios</strong>
        </Alert>
      }
      {
        error && console.log(error)
      }
    </>
  )
}

const mapStateToUsers = (state) => {
  return {
    manage: state.manage
  }
}

export default connect(mapStateToUsers)(Users)
