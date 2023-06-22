/*
  Machine (View Component)
    Muestra el detalle de una máquina.

  Machine
    + Variables
    + Alarms
    + Shutdowns

Eduardo Muñoz López (eduardo@gestalabs.com)
10/02/2020
*/

import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Breadcrumb,
  Row,
  Col,
  Tabs,
  Tab } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Variables from './Machine/Variables'
import Alarms from './Machine/Alarms'
import Shutdowns from './Machine/Shutdowns'


const Machine = (props) => {

  const { machine } = props

  return (
    <Container fluid>
      { machine &&
        <>
          <Location machine={machine}/>
          <Detail machine={machine} status={props.status ? props.status : '-'}/>
          <hr className="mb-1" />
          <Menu machineID={machine.id} />
        </>
      }
    </Container>
  )
}

const Location = ({ machine }) => (
  <Breadcrumb>
    <Breadcrumb.Item disabled>
      <FontAwesomeIcon
        icon={['fas','home']}
      />
    </Breadcrumb.Item>
    <Breadcrumb.Item disabled>
      { machine.plant }
    </Breadcrumb.Item>
    <Breadcrumb.Item disabled>
      { machine.area }
    </Breadcrumb.Item>
    <Breadcrumb.Item disabled>
      { machine.line }
    </Breadcrumb.Item>
  </Breadcrumb>
)

const Detail = ({ machine, status }) => {
  return (
    <>
      <Row className="pl-1">
        <Col sm={12}>
          <h1 className="display-4">
            { machine.name }
          </h1>
        </Col>
        <Col sm={12}>
          <h3 className="text-muted font-weight-light">
            { machine.family.name }
          </h3>
        </Col>
      </Row>
      <Row>
        <div className="ml-auto mr-1">
          {
            status &&
            <>
              <span className="text-muted">{ 'Estatus:' }</span>
              <strong className="ml-1">
                {
                  status === 1 ?
                    <>
                      En Espera
                      <FontAwesomeIcon
                        icon={['fas', 'circle']}
                        className="ml-2 text-warning"
                      />
                    </>
                  : status === 2 ?
                    <>
                      Detenida
                      <FontAwesomeIcon
                        icon={['fas', 'circle']}
                        className="ml-2 text-danger"
                      />
                    </>
                  : status === 3 &&
                  <>
                    Corriendo
                    <FontAwesomeIcon
                      icon={['fas', 'circle']}
                      className="ml-2 text-success"
                    />
                  </>
                }
              </strong>
            </>
          }
        </div>
      </Row>
    </>
  )
}

const Menu = ({ machineID }) => {
  return (
    <>
      <Tabs id="processes-tabs" >
        <Tab eventKey="General" title="General">
          <hr />
          <Variables
            machineID={machineID}
          />
        </Tab>

        <Tab eventKey="Alarmas" title="Alarmas">
          <hr />
          <Alarms
            machineID={machineID}
          />
        </Tab>

        <Tab eventKey="Paros" title="Paros">
          <hr />
          <Shutdowns
            machineID={machineID}
          />
        </Tab>
      </Tabs>
    </>
  )
}

const mapStateToMachine = (state, machineProps) => {

  const machineID = Number.parseInt(machineProps.match.params.id)

  return {
    machine: state.machines.data ? state.machines.data.find(obj => {
      return obj.id === machineID
    }) : null,
    status: state.machines.status && state.machines.status
  }
}

export default connect(mapStateToMachine)(Machine)
