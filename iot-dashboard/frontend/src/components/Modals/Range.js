/*
  Range.js (Modal)
    Modal que se muestra para la Configuración de Alarma de una variable.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useEffect } from 'react'

import { Modal } from 'react-bootstrap'

import { connect } from 'react-redux'

import { activeRange } from '../../store/actions/ranges'

import RangeForm from '../Forms/Range'

const Range = (props) => {

  const { show, handleClose, activeRange } = props

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
              Configuración de Alarma
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RangeForm
              handleClose={handleClose}
              activeRange={activeRange}
            />
          </Modal.Body>
        </>
      }
    </Modal>
  )
}

const mapStateToRange = (state) => {
  return {
     activeRange: state.ranges.activeRange,
  }
}

export default connect(mapStateToRange)(Range)
