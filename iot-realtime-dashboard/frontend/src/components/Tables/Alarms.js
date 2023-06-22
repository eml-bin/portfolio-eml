/*
  Alarms.js (Table)
    Tabla que muestra el historial de Alarmas.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/


import React, { useState } from 'react'
import moment from 'moment'
import { Table, Spinner, Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { activateAlarm } from '../../store/actions/notifications'

import SolutionModal from '../Modals/Solution'

const Alarms = (props) => {

  const { activateAlarm } = props
  const { loadingAlarms, data } = props
  const [showSolution, setShowSolution] = useState(false)

  const handleCloseSolution = () => setShowSolution(false)
  const handleShowSolution = (alarmID) => {
    setShowSolution(true)
    activateAlarm(alarmID)
  }

  return (
    <>
      {
        loadingAlarms &&
        <div className="d-flex justify-content-center p-2">
          <Spinner animation="border" role="status" variant="danger">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      }
      {
        !loadingAlarms && data && data.length > 0 ?
          <Table responsive bordered>
            <thead className="thead-light">
              <tr>
                <th>Fecha de la Alarma</th>
                <th>Variable</th>
                <th>MAX/MIN Alcanzado</th>
                <th>Notas</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {
                data.sort((a,b) => moment(b.date).format('YYYYMMDDHHmmss') - moment(a.date).format('YYYYMMDDHHmmss')).map((alarm, key) => (
                  <tr key={key}>
                    <td>{ moment(alarm.date).format('DD/MM/YYYY HH:mm:ss') }</td>
                    <td>{ alarm.variableRef }</td>
                    <td>{ alarm.value }</td>
                    <td>{ alarm.notes ? alarm.notes : '' }</td>
                    <td className="align-middle">
                      {
                        alarm.is_active ?
                          <Button
                            variant="warning"
                            className="px-1 py-0"
                            title="Resolver Alarma"
                            onClick={() => handleShowSolution(alarm.id)}
                          >
                            <FontAwesomeIcon
                              icon={['fas','file-signature']}
                              size="sm"
                            />
                          </Button> :
                          <FontAwesomeIcon
                            icon={['fas','check-circle']}
                            className="text-success"
                            size="lg"
                          />
                      }
                      <Link to={`/platform/notifications/${alarm.id}/alarm`}>
                        <Button
                          title="Ver Detalle"
                          className="px-1 py-0 ml-2"
                          variant="dark"
                        >
                          <FontAwesomeIcon
                            icon={['fas','eye']}
                            size="sm"
                          />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        : !loadingAlarms && data && !data.length &&
        <Alert variant="dark" className="text-center">
          Aún <strong>no existen alarmas</strong>
        </Alert>
      }

      <SolutionModal
        show={showSolution}
        handleClose={handleCloseSolution}
      />
    </>
  )

}


const mapStateToAlarms = (state, alarmsProps) => {

  return {
    loadingAlarms: state.notifications.loadingAlarms,
    data: state.notifications.alarms && state.notifications.alarms,
  }
}

const mapDispatchToAlarms = (dispatch) => (
  {
    activateAlarm: (alarmID) => (
      dispatch(activateAlarm(alarmID))
    ),
  }
)

export default connect(mapStateToAlarms, mapDispatchToAlarms)(Alarms)
