/*
  Schedule.js (Modal)
    Modal que se muestra para guardar/actualizar un Paro Programado.

# 10/02/2020
@ Eduardo Muñoz (eduardo@gestalabs.com)
*/

import React from 'react'

import { Modal } from 'react-bootstrap'

import ScheduleForm from '../Forms/Schedule'

const Schedule = (props) => {

  const { show, handleClose } = props

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Programar Nuevo Paro
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ScheduleForm
          handleClose={handleClose}
        />
      </Modal.Body>
    </Modal>
  )
}

export default Schedule
