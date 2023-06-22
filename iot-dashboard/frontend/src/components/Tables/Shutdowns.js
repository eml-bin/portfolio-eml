/*
  Shutdowns.js (Table)
    Tabla que presenta el historial de Paros no Programados.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/


import React, { useState } from 'react'
import moment from 'moment'
import { Table, Spinner, Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { activateShutdown } from '../../store/actions/notifications'

import SolutionModal from '../Modals/Solution'

const Shutdowns = (props) => {

  const { activateShutdown } = props
  const { loadingShutdowns, shutdowns: data } = props.shutdowns
  const [showSolution, setShowSolution] = useState(false)

  const handleCloseSolution = () => setShowSolution(false)
  const handleShowSolution = (shutdownID) => {
    setShowSolution(true)
    activateShutdown(shutdownID)
  }

  return (
    <>
      {
        loadingShutdowns &&
        <div className="d-flex justify-content-center p-2">
          <Spinner animation="border" role="status" variant="danger">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      }
      {
        !loadingShutdowns && data && data.length > 0 ?
          <Table responsive bordered>
            <thead className="thead-light">
              <tr>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Notas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {
                data.sort((a,b) => moment(b.date).format('YYYYMMDDHHmmss') - moment(a.date).format('YYYYMMDDHHmmss')).map((shutdown, key) => (
                  <tr key={key}>
                    <td>{ moment(shutdown.date).format('DD/MM/YYYY HH:mm:ss') }</td>
                    <td>{ shutdown.end && moment(shutdown.end).format('DD/MM/YYYY HH:mm:ss') }</td>
                    <td>{ shutdown.notes ? shutdown.notes : '' }</td>
                    <td className="align-middle">
                      {
                        shutdown.is_active ?
                          <Button
                            variant="warning"
                            className="px-1 py-0"
                            title="Resolver Alarma"
                            onClick={() => handleShowSolution(shutdown.id)}
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
                      <Link
                        to={`/platform/notifications/${shutdown.id}/shutdown`}
                      >
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
        : !loadingShutdowns && data && !data.length &&
        <Alert variant="dark">
          Aún <strong>no existen paros no programados</strong>
        </Alert>
      }

      <SolutionModal
        show={showSolution}
        handleClose={handleCloseSolution}
      />
    </>
  )

}


const mapStateToShutdowns = (state) => {
  return {
    shutdowns: state.notifications,
  }
}

const mapDispatchToShutdowns = (dispatch) => (
  {
    activateShutdown: (shutdownID) => (
      dispatch(activateShutdown(shutdownID))
    ),
  }
)

export default connect(mapStateToShutdowns, mapDispatchToShutdowns)(Shutdowns)
