/*
  Dashboard (View Component)
    Vista inicial,
    renderiza los componentes base
    e incluye las rutas disponibles del app

  Dashboard
    + Variables
    + Alarms
    + Shutdowns

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
*/

import React, { useState, useEffect } from "react"
import { Switch, Route } from "react-router-dom"

import Sidebar from '../components/Sidebar/Sidebar'
import Topbar from '../components/Topbar/Topbar'

import { checkModuleAccess } from '../configuration/permissions'

import { switchRoutes } from '../configuration/routes'

import {
  createClient,
  subscribeTopics
} from '../store/actions/mqtt'
import { connect } from 'react-redux'

import '../assets/css/views/dashboard.css'

const Dashboard = (props) => {

  const { createClient, subscribeTopics, role } = props
  const [sidebarStatus, setSidebarStatus] = useState('toggled')

  useEffect(() => {
    createClient()
  }, [createClient])

  useEffect(() => {
    subscribeTopics()
  }, [subscribeTopics])

  const toggleSidebar = (evt) => {
    evt.preventDefault()
    sidebarStatus ? setSidebarStatus('') : setSidebarStatus('toggled')
  }

  return (
    <div className={`page-wrapper ${sidebarStatus}`}>
      <Sidebar />

      <Main
        sidebarStatus={sidebarStatus}
        handleToggleSidebar={toggleSidebar}
      >
        <Switch>
          { switchRoutes.paths.map((route, key) =>
            checkModuleAccess(role.name, route.moduleName) &&
              <Route
                key={key}
                path={`${switchRoutes.domain}/${route.path}`}
                component={route.component}
              />
          )}
        </Switch>
      </Main>
    </div>
  )
}

const Main = ({sidebarStatus, handleToggleSidebar, children}) => {

  return (
    <main className="page-content">
      <div id="overlay" className="overlay" onClick={handleToggleSidebar}></div>
      <Topbar
        handleToggleSidebar={handleToggleSidebar}
        sidebarStatus={sidebarStatus}
      />
      { children }
    </main>
  )
}

const mapStateToDashboard = (state) => {
  return {
    role: state.auth.user.role
  }
}

const mapDispatchToDashboard = (dispatch) => (
  {
    createClient: () => (
      dispatch(createClient())
    ),
    subscribeTopics: () => (
      dispatch(subscribeTopics())
    )
  }
)


export default connect(mapStateToDashboard, mapDispatchToDashboard)(Dashboard)
