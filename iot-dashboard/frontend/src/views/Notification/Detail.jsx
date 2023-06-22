/*
  Detail.jsx (View Component)
    Detalle de una notificación

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useEffect } from 'react'

import { Spinner, Alert } from 'react-bootstrap'

import { getNotificationHistory, resetHistory } from '../../store/actions/history'
import HistoryChart from '../../components/Charts/History'
import { connect } from 'react-redux'
import moment from 'moment'


const Detail = (props) => {
  const { notification, getData, resetHistory } = props
  const { loadingHistory,
          variablesData,
          distinctTypes } = props.history

  console.log('notification', notification)

  useEffect(() => {
    notification &&
      getData((notification?.type === 1) ? notification?.machine_id : (notification?.type === 2) && notification.machine, moment(notification.date).format('YYYY-MM-DD HH:mm:ss'))

    return () => {
      resetHistory()
    }
  }, [notification, getData, resetHistory])

  return (
    <>
      {
        !variablesData && loadingHistory &&
        <div className="d-flex justify-content-center p-2">
          <Spinner animation="border" role="status" variant="danger">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
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

const mapDispatchToDetail = (dispatch) => (
  {
    getData: (machineID, endDate) => (
      dispatch(getNotificationHistory(machineID, endDate))
    ),
    resetHistory: () => (
      dispatch(resetHistory())
    )
  }
)

export default connect(mapStateToDetail, mapDispatchToDetail)(Detail)
