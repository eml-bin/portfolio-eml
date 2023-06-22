/*
  Schedules.js (Table)
    Tabla que presenta el historial de Paros Programados.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React from 'react'

import moment from 'moment'

import { Table, Spinner, Alert } from 'react-bootstrap'
import { connect } from 'react-redux'

const Schedule = (props) => {

  const { loadingSchedules, data, error } = props.schedules
  return (
    <>
      {
        loadingSchedules &&
        <div className="d-flex justify-content-center p-2">
          <Spinner animation="border" role="status" variant="danger">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      }
      {
        !loadingSchedules && data && data.length > 0 ?
          <Table responsive bordered>
            <thead className="thead-light">
              <tr>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Línea</th>
                <th>Responsable</th>
                <th>Motivo</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((schedule, key) => (
                  <tr key={key}>
                    <td>
                      <strong>{moment(schedule.start).format('DD/MM/YYYY HH:mm')}</strong>
                    </td>
                    <td>
                      <strong>{moment(schedule.end).format('DD/MM/YYYY HH:mm')}</strong>
                    </td>
                    <td>{schedule.line}</td>
                    <td>{schedule.responsables}</td>
                    <td>{schedule.reason}</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        : !loadingSchedules && data && !data.length &&
        <Alert variant="dark" className="text-center h6">
          Aún no existen <strong>paros programados</strong>.
        </Alert>
      }
      {
        error && console.log('Error en Schedules')
      }
    </>
  )
}

const mapStateToSchedules = (state) => {
  return {
    schedules: state.schedules,
  }
}

export default connect(mapStateToSchedules)(Schedule)
