/*
  Reset.js (Modal)
    Modal que se muestra para resetear una electroválvula.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React from 'react'

import { Modal } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux'

import ResetForm from '../Forms/Reset'

const Reset = (props) => {

  const { show,
    handleClose,
    activeVariable } = props

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
    >
      {
        activeVariable &&
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              Reinicio de Electroválvula
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center pb-4">
              <FontAwesomeIcon
                icon={['fas','exclamation-triangle']}
                className="text-warning mb-3 animated shake"
                size="6x"
              />
              <h5 className="font-weight-bold">
                ¿Estás seguro de reiniciar la electroválvula
                {
                  <span className="px-1">
                    {activeVariable.reference}
                  </span>
                }
                ?
              </h5>
            </div>

            <ResetForm
              handleClose={handleClose}
              activeVariable={activeVariable}
            />
          </Modal.Body>
        </>
      }
    </Modal>
  )
}

const mapStateToReset = (state) => {
  return {
     activeVariable: state.variables.activeVariable,
  }
}

export default connect(mapStateToReset)(Reset)
