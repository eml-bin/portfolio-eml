/*
  Notification (View Component)
    Vista del Detalle de una Notificaciones

      + Detalle de Alarma
      + Detalle de Paro No Programado
      + Mostrar Todas las Notificaciones

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
*/

import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'

import AlarmsTable from '../components/Tables/Alarms'
import ShutdownsTable from '../components/Tables/Shutdowns'
import Detail from './Notification/Detail'
//import ShutdownsTable from '../components/Tables/Shutdowns'

import moment from 'moment'

const Notification = (props) => {

  const { activeNotification, showTable, type } = props

  return(
    <Container>
      {
        activeNotification &&
        <>
          <Title
            type={type}
            notification={activeNotification}
          />
          <Detail notification={activeNotification}/>
        </>
      }
      {
        showTable &&
        <div className="text-center">
          <h3>
            Notificaciones de Alarmas
          </h3>
          <hr/>
          <AlarmsTable/>
          <h3>
            Notificaciones de Paros No Programados
          </h3>
          <hr/>
          <ShutdownsTable/>
        </div>
      }
    </Container>
  )
}

const Title = (props) => {

  const { type, notification } = props
  const [title, setTitle] = useState(null)

  console.log('notification', notification)

  useEffect(() => {
    type === 'alarm' ?
      setTitle({legend: notification?.message, machine: notification?.machine?.name}) :
    type === 'shutdown' &&
      setTitle({legend: 'Paro no Programado', machine: notification?.machineRef})
  }, [notification, setTitle, type])

  return (
    <div>
      {
        title &&
        <>
          <div className="h1">
            {title.machine}
          </div>
          <div className="h4 text-muted font-weight-light">
            {title.legend} - {moment(notification?.date).format('DD/MM/YYYY HH:mm:ss')}
          </div>  
        </>
      }
    </div>
  )
}

const mapStateToNotification = (state, notificationProps) => {

  if (notificationProps.match.params.id) {
    const notificationID = Number.parseInt(notificationProps.match.params.id)
    const type = notificationProps.match.params.type

    if (type === 'alarm') {
      return {
        activeNotification: state.notifications.alarms && state.notifications.alarms.find(notification => {
          return notification.id === notificationID
        }),
        type: type
      }
    } else if (type === 'shutdown') {
      return {
        activeNotification: state.notifications.shutdowns && state.notifications.shutdowns.find(notification => {
          return notification.id === notificationID
        }),
        type: type
      }
    }
  } else {
    return {
      showTable: true
    }
  }
}

export default connect(mapStateToNotification)(Notification)
