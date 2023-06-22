/*
  Manage (View Component)
    Vista de Administración de Usuarios.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { Container, Button } from 'react-bootstrap'

import UsersTable from '../components/Tables/Users'
import UserModal from '../components/Modals/User'

import { CREATE } from '../configuration/dictionary'

import { getAllUsers, activeUser } from '../store/actions/manage'

const Manage = (props) => {
  const { getUsers, activeUser } = props

  const [showUser, setShowUser] = useState({ status: false})

  const handleCloseUser = () => setShowUser({ status: false})
  const handleShowUser = (action, userID) => {
    userID && activeUser(userID)
    setShowUser({ status: true, action: action})
  }

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <Container fluid>
      <div className="px-2 pb-3">
        <div className="display-4">
          Administración de Usuarios
        </div>
      </div>
      <div className="mb-2">
        <Button
          variant="danger"
          onClick={() => handleShowUser(CREATE, null)}
        >
          Crear Usuario
        </Button>
      </div>

      <UsersTable
        handleShowUser={handleShowUser}
      />

      <UserModal
        show={showUser.status}
        action={showUser.action}
        handleClose={handleCloseUser}
      />
    </Container>
  )
}

// const mapStateToManage = (state) => {
//   return {
//     manage: state.variables
//   }
// }

const mapDispatchToManage = (dispatch) => (
  {
    getUsers: () => (
      dispatch(getAllUsers())
    ),
    activeUser: (userID) => (
      dispatch(activeUser(userID))
    )
  }
)

export default connect(null, mapDispatchToManage)(Manage)
