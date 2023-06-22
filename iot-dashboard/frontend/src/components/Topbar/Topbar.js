/*
  TopBar.js (Base Component)
    Componente base, muestra el menú superior disponible del app.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Notifications from './Notifications'

const TopBar = ({handleToggleSidebar, sidebarStatus}) => {

  return (
    <Navbar
      className="topbar"
      sticky="top"
      bg="default-op"
    >
      <div
        className="w-100"
      >
        <Nav className="float-left">
          <Nav.Item>
            <Nav.Link
              onClick={handleToggleSidebar}
              className="icon"
            >
              <FontAwesomeIcon icon=
                {
                  (sidebarStatus) ?
                  ['fas', 'chevron-left'] :
                  ['fas', 'chevron-right']
                }
                size="lg"
              />
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav className="float-right">
          <Nav.Item>
            <Notifications />
          </Nav.Item>
        </Nav>
      </div>
    </Navbar>
  )
}

// const User = () => (
//   <NavDropdown
//     alignRight
//     title={
//       <Image
//         className="border border-dark avatar"
//         width="30"
//         height="30"
//         src={avatar}
//       />
//     }
//
//   >
//     <NavDropdown.Item>
//       {` Ajustes `}
//     </NavDropdown.Item>
//     <NavDropdown.Item>
//       {` Cerrar Sesión `}
//     </NavDropdown.Item>
//   </NavDropdown>
// )

export default TopBar
