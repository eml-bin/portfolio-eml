/*
  Ranges.js (Table)
    Tabla que presenta las Alarmas Configuradas.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React from 'react'

import { Table, Spinner, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'


const Ranges = (props) => {

  const { loadingRange, data, error } = props.ranges

  return (
    <>
      {
        loadingRange &&
        <div className="d-flex justify-content-center p-2">
          <Spinner animation="border" role="status" variant="danger">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      }
      {
        !loadingRange && data && data.length > 0 ?
          <Table responsive bordered>
            <thead className="thead-light">
              <tr>
                <th>Variable</th>
                <th>Tipo</th>
                <th>MIN</th>
                <th>MAX</th>
                <th>Tolerancia</th>
                <th>Notificaciones</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((range, key) => (
                  <tr key={key}>
                    <td>{ range.variableDetail.name }</td>
                    <td>{ range.variableDetail.type }</td>
                    <td>
                      {
                        range.min ?
                        `${range.min} ${range.variableDetail.unit}`:
                        '-'
                      }
                    </td>
                    <td>
                      {
                        range.max ?
                        `${range.max} ${range.variableDetail.unit}` :
                        '-'
                      }
                    </td>
                    <td>
                      {
                        range.tolerance ?
                        `${range.tolerance} seg`:
                        '-'
                      }
                    </td>
                    <td>{ range.notify_to }</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        : !loadingRange && data && !data.length &&
        <Alert
          variant="dark"
          className="text-center"
        >
          Aún <strong>no existen alarmas configuradas</strong>.
        </Alert>
      }
      {
        error && console.log('Error en ranges', error)
      }
    </>
  )

}

const mapStateToRanges = (state) => {
  return {
    ranges: state.ranges,
  }
}

export default connect(mapStateToRanges)(Ranges)
