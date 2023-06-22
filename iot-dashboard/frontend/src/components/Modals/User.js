/*
  User.js (Modal)
    Modal que muestra el Formulario para Usuarios.

# 13/03/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React from 'react'

import { Modal } from 'react-bootstrap'

import { connect } from 'react-redux'
import { CREATE } from '../../configuration/dictionary'

import UserForm from '../Forms/User'

const User = (props) => {

  const { show, handleClose, activeUser, action } = props

  return (
    <Modal
      show={show}
      onHide={handleClose}
    >
      {
        show &&
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              {
                action === CREATE ? 'Nuevo ' : 'Actualizar '
              }
              Usuario
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <UserForm
              handleClose={handleClose}
              action={action}
              activeUser={activeUser}
            />
          </Modal.Body>
        </>
      }
    </Modal>
  )
}

const mapStateToUser = (state) => {
  return {
     activeUser: state.manage.activeUser,
  }
}


export default connect(mapStateToUser)(User)
