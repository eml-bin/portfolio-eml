/*
  Sidebar.js (Base Component)
    Componente base, muestra el menú lateral disponible de la aplicación.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useContext, useEffect } from 'react'
import ThemeContext from '../../assets/ThemeContext'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Dropdown, Image, Spinner } from 'react-bootstrap'

import { connect } from 'react-redux'
import { getMachines } from '../../store/actions/machines'
import { logout } from '../../store/actions/auth'

import Can from '../Permissions/Can'

import logo from '../../assets/logo.png'
import '../../assets/css/components/sidebar.css'
import { Images } from '../../constants'

const Sidebar = (props) => {
  const { color } = useContext(ThemeContext)
  const { paths, getMachines, logout } = props
  const user = props.user
  const { loadingMachines, data: machines, error } = props.machines

  useEffect(() => {
    getMachines()
  }, [getMachines])

  return (
    <nav
      className={`sidebar-wrapper bg-${color}`}
    >
      <div className="sidebar-content">
        <Brand/>
        <Menu
          loadingMachines={loadingMachines}
          machines={machines}
          error={error}
          paths={paths}
        />
      </div>

      <div className="sidebar-footer animated slideInUp">
        <Can
          role={user.role.name}
          perform="settings"
          yes={() => (
            <Settings
              paths={paths}
            />
          )}
        />

        <User
          handleLogout={logout}
          user={user}
        />
      </div>
    </nav>
  )
}

const Brand = () => (
  <div className="animated fadeIn slow py-3 px-5 text-center">
    <img src={logo} alt="Vaisor Logo" width="120" />
  </div>
)

const Menu = ({ loadingMachines, machines, error, paths }) => {
  return (
    <div className="sidebar-menu font-weight-light">
      <ul>
        <li className={`${loadingMachines ? "text-center p-2" : ""}`}>
          {
            loadingMachines ?
                <Spinner animation="border" variant="danger" />
            : machines && machines.map((machine, key) => {
              return (
                  <NavLink
                    key={key}
                    to={`${paths.machinesPath}${machine.id}`}
                    activeClassName="active"
                  >
                    <Image 
                      src={machine?.family?.name === "Weber" ? Images.Icons.WEBER_ICON : Images.Icons.MULTIVAC_ICON}
                      width="30"
                      height={30}
                      className="mr-4"
                    />
                    { machine.name }
                  </NavLink>
              )
            })
          }

          <NavLink
            to={`${paths.shutdownsPath}`}
            activeClassName="active"
          >
            <FontAwesomeIcon
              className="mr-4"
              size="lg"
              icon={['fas', 'clock']}
            />
            Paros Programados
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

const Settings = ({paths}) => (
  <Dropdown>
    <Dropdown.Toggle
      variant="secondary"
      id="dropdown-settings"
      data-toggle="dropdown"
    >
      <FontAwesomeIcon icon={['fas', 'cogs']}/>
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Link
        className="dropdown-item"
        to={`${paths.managePath}`}
      >
        Usuarios
      </Link>
    </Dropdown.Menu>
  </Dropdown>
)

const User = ({ handleLogout, user }) => {


  const buildUserInfo = () => {
    return (
      <div>
        <h6>
          <strong>{ user.name }</strong>
        </h6>
        <sub className="align-middle">
          <FontAwesomeIcon
            className="mr-1"
            size="lg"
            icon={['fas', 'address-card']}
          />
          {
            <span className="text-muted">
              {user.role.name}
            </span>
          }
        </sub>
        <br/>
        <sub className="align-middle">
          <FontAwesomeIcon
            className="mr-1"
            size="lg"
            icon={['fas', 'envelope']}
          />
          <span className="text-muted">
            { user.email }
          </span>
        </sub>
      </div>
    )
  }

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="danger"
        id="dropdown-user"
        data-toggle="dropdown"
      >
        <FontAwesomeIcon icon={['fas', 'user-circle']}/>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <div
          className="p-2 px-3 mb-2 text-right"
          style={{ lineHeight: '90%' }}
        >
          {
            user && buildUserInfo()
          }
        </div>
        <hr className="m-0"/>
        <Dropdown.Item
          as="button"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

const mapStateToSidebar = (state) => {
  return {
    machines: state.machines,
    paths: state.paths,
    user: state.auth.user
  }
}

const mapDispatchToSidebar = (dispatch) => (
  {
    getMachines: () => (
      dispatch(getMachines())
    ),
    logout: () => (
      dispatch(logout())
    )
  }
)

export default connect(mapStateToSidebar, mapDispatchToSidebar)(Sidebar)
