/*
  Resets.js (Table)
    Tabla que se presenta el historial de reseteos de una electroválvula.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React from 'react'

import { Table, Spinner, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'

import moment from 'moment'


const Resets = (props) => {

  const { loadingHistory, valveData: data, error } = props.history

  return (
    <>
      {
        loadingHistory &&
        <div className="d-flex justify-content-center p-2">
          <Spinner animation="border" role="status" variant="danger">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      }
      {
        !loadingHistory && data ?
          <Table responsive bordered>
            <thead className="thead-light">
              <tr>
                <th>Fecha</th>
                <th>Número de Ciclos</th>
                <th>Comentarios</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((log, key) => (
                  <tr key={key}>
                    <td>{ moment(log.date).format('DD/MM/YYYY HH:mm') }</td>
                    <td>{ log.count }</td>
                    <td>{ log.notes ? log.notes : '' }</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        : !loadingHistory && data && !data.length &&
        <Alert
          variant="dark"
          className="text-center h5"
        >
          Aún no existen reinicios
        </Alert>
      }
      {
        error && console.log('Error en Resets', error)
      }
    </>
  )

}

const mapStateToResets = (state) => {
  return {
    history: state.history,
  }
}

export default connect(mapStateToResets)(Resets)
