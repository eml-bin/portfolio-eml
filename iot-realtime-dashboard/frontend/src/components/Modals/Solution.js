/*
  Solution.js (Modal)
    Modal que se muestra para atender una Alarma o Paro.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React from 'react'

import { Modal } from 'react-bootstrap'

import { connect } from 'react-redux'

import SolutionForm from '../Forms/Solution'

const Solution = (props) => {

  const { show,
    handleClose,
    activeAlarm,
    activeShutdown } = props

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
    >
      {
        (activeAlarm || activeShutdown) &&
        <>
          { activeAlarm ?
            <>
              <Modal.Header closeButton>
                <Modal.Title>
                  Resolver Alarma
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <SolutionForm
                  handleClose={handleClose}
                  type={'alarm'}
                  notificationID={activeAlarm}
                />
              </Modal.Body>
            </> :
            activeShutdown &&
            <>
              <Modal.Header closeButton>
                <Modal.Title>
                  Resolver Paro No Programado
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <SolutionForm
                  handleClose={handleClose}
                  type={'shutdown'}
                  notificationID={activeShutdown}
                />
              </Modal.Body>
            </>
          }
        </>
      }
    </Modal>
  )
}

const mapStateToSolution = (state) => {
  return {
     activeAlarm: state.notifications.activeAlarm,
     activeShutdown: state.notifications.activeShutdown,
  }
}

export default connect(mapStateToSolution)(Solution)
