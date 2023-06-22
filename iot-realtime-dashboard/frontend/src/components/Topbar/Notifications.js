/*
  Notifications.js (Base Component)
    Componente base, muestra la campana de Notificaciones

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/


import React, { useEffect } from 'react'
import { NavDropdown, Badge, Spinner } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

import { getAlarms, getShutdowns } from '../../store/actions/notifications'
import moment from 'moment'

import { connect } from 'react-redux'

const Notifications = (props) => {

  const {
    getAlarms,
    getShutdowns,
    all } = props
  const { count, loadingAlarms, loadingShutdowns } = props.notifications

  //const [all, setAll] = useState(null)

  useEffect(() => {
    getAlarms()
    getShutdowns()
  }, [getAlarms, getShutdowns])

  return (
    <NavDropdown
      alignRight
      title={
        <>
          <span
            role="img"
            className="icon"
          aria-label="notification-emoji">
            🔔
          </span>
          {
            (!loadingAlarms && !loadingShutdowns) &&
            <Badge pill variant="danger align-top" className="bubble">
              { count > 0 && count }
            </Badge>
          }
        </>
      }
    >
      {
        (!loadingAlarms && !loadingShutdowns) ?
          (all && all.length) ?
            <>
              {
                all.slice().sort((a,b) => moment(b.date).format('YYYYMMDDHHmmss') - moment(a.date).format('YYYYMMDDHHmmss')).slice(0, 3).map((notification, key) => (
                  <Link
                    key={key}
                    to={`/platform/notifications/${notification.id}/${notification.type === 1 ? 'alarm' : 'shutdown'}`}
                    className="pb-3 dropdown-item"
                  >
                    <NavDropdown.Item as="div" className="p-0 m-0">
                      <FontAwesomeIcon
                        icon={['fas', 'exclamation-circle']}
                        size="lg"
                        className="mr-2 text-danger"
                      />
                      <>
                        {`${notification.message} `}
                        <strong>{ notification?.machine?.name }</strong>
                      </>
                      <br/>
                      <sub className="text-muted">
                        {
                          moment(notification.date).format('DD/MM/YYYY HH:mm:ss')
                        }
                      </sub>
                    </NavDropdown.Item>
                  </Link>
                ))
              }
            </> :
            <div className="text-center text-muted">
              Ninguna notificación pendiente
              <FontAwesomeIcon
                icon={['fas', 'laugh']}
                size="lg"
                className="ml-2 text-warning"
              />
            </div>
        :
        <Spinner animation="border" role="status" variant="danger" className="text-center">
          <span className="sr-only">Loading...</span>
        </Spinner>
      }
      <NavDropdown.Divider />
      <Link to='/platform/notifications/' className="text-center">
        <NavDropdown.Item as="div">
          <u>Ver historial de las notificaciones</u>
        </NavDropdown.Item>
      </Link>
    </NavDropdown>
  )
}

const mapStateToNotifications = (state) => {
  return {
    notifications: state.notifications,
    all: [...state.notifications.alarms, ...state.notifications.shutdowns]
  }
}

const mapDispatchToNotifications = (dispatch) => (
  {
    getAlarms: () => (
      dispatch(getAlarms())
    ),
    getShutdowns: () => (
      dispatch(getShutdowns())
    ),
  }
)

export default connect(mapStateToNotifications, mapDispatchToNotifications)(Notifications)
