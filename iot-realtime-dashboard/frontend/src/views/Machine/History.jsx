/*
  History (View Component)
    Muestra la sección 'Ver Histórico' de una máquina.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/


import React from 'react'
import { Alert, Spinner } from 'react-bootstrap'

import HistoryForm from '../../components/Forms/History'
import Intervals from '../../components/Forms/Intervals'
import HistoryChart from '../../components/Charts/History'

import { connect } from 'react-redux'

const History = (props) => {

  const { machineID } = props

  const { loadingHistory,
          variablesData,
          distinctTypes } = props.history

  return (
    <>
      <HistoryForm
        machineID={machineID}
      />

      {
        !variablesData && loadingHistory &&
        <div className="d-flex justify-content-center p-2">
          <Spinner animation="border" role="status" variant="danger">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      }

      {
        variablesData && 
          <Intervals 
            machineID={machineID}
          />
      }
  
      {
        (variablesData && distinctTypes) &&
        distinctTypes.map((type, key) =>
          <HistoryChart
            key={key}
            data={variablesData}
            type={type}
          />
        )
      }

      {
        (variablesData && variablesData.length === 0) &&
        <Alert variant="info">
          No se ha encontrado el histórico solicitado.
        </Alert>
      }
    </>
  )
}

const mapStateToDetail = (state) => {
  return {
     history: state.history
  }
}

export default connect(mapStateToDetail)(History)
