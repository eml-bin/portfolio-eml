/*
  Variables (View Component)
    Muestra las variables de la máquina seleccionada.

  Variables
    + Variable o Valve
    + Range (Configuración de Alarmas)
    + History (Histórico de una Variable)

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/


import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner, Form } from 'react-bootstrap'

import Variable from '../../components/Cards/Variable'
import Valve from '../../components/Cards/Valve'
import Range from '../../components/Modals/Range'
import ResetsHistory from '../../components/Modals/ResetsHistory'
import Reset from '../../components/Modals/Reset'

import { connect } from 'react-redux'
import { getVariables,
         updateVariable,
         activeVariable } from '../../store/actions/variables'

import { activeRange } from '../../store/actions/ranges'

import History from './History'

import {
  CURRENT_TYPE,
  TEMPERATURE_TYPE,
  VALVE_TYPE
} from '../../configuration/dictionary'

const Variables = (props) => {

  const { getVariables, machineID, activeVariable, activeRange } = props
  const { loadingVariables, data: variables, error } = props.variables
  const [live, setLive] = useState(true)

  useEffect(() => {
    getVariables(machineID)
  }, [getVariables, machineID])

  const handleShowVariablesHistory = (event) => {
    setLive(event.target.value === "true" ? true : false)
  }

  return (
    <Container fluid>

      <Filter
        handleShowHistory={handleShowVariablesHistory}
      />

      {
        loadingVariables &&
        <div className="d-flex justify-content-center p-2">
          <Spinner animation="border" role="status" variant="danger">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      }

      {
        variables && live &&
        <Types
          variables={variables}
          activeVariable={activeVariable}
          activeRange={activeRange}
        />
      }

      {
        !live &&
        <History
          machineID={machineID}
        />
      }

      {
        error &&
        console.log(error)
      }
    </Container>
  )
}

const Filter = ({ handleShowHistory }) => {

  return (
    <Row className="justify-content-end mb-3">
      <Col xs="12" md="6" lg="4">
        <Form.Control
          as="select"
          className="ml-auto"
          onChange={handleShowHistory}
        >
          <option value="true">Tiempo Real</option>
          <option value="false">Ver Histórico</option>
        </Form.Control>
      </Col>
    </Row>
  )

}

const Types = ({ variables, activeVariable, activeRange }) => {

  const [sortVariables, setVariables] = useState([{}])

  useEffect(() => {
    variables &&
    setVariables({
      temperatures: variables.filter(variable => variable.type === TEMPERATURE_TYPE),
      currents: variables.filter(variable => variable.type === CURRENT_TYPE),
      valves: variables.filter(variable => variable.type === VALVE_TYPE),
    })
  }, [variables])

  const [showRange, setShowRange] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showReset, setShowReset] = useState(false)

  const handleCloseRange = () => setShowRange(false)
  const handleShowRange = (variableID) => {
    activeRange(variableID)
    activeVariable(variableID)
    setShowRange(true)
  }

  const handleCloseHistory = () => setShowHistory(false)
  const handleShowHistory = (variableID) => {
    activeVariable(variableID)
    setShowHistory(true)
  }

  const handleCloseReset = () => setShowReset(false)
  const handleShowReset = (variableID) => {
    activeVariable(variableID)
    setShowReset(true)
  }

  return (
    <>
      {
        sortVariables.temperatures && sortVariables.temperatures.length > 0 &&
        <div className="mb-5">
          <h3>Temperatura</h3>
          <div className="d-flex flex-wrap">
            {
              sortVariables.temperatures.map((variable) => {
                return (
                  <Variable
                    key={variable.tag.name}
                    variable={variable}
                    handleShowRange={handleShowRange}
                    handleShowHistory={handleShowHistory}
                  />
                )
              })
            }
          </div>
        </div>
      }

      {
        sortVariables.currents && sortVariables.currents.length > 0 &&
        <div className="mb-5">
          <h3>Corriente</h3>
          <div className="d-flex flex-wrap">
            {
              sortVariables.currents.map((variable) => {
                return (
                  <Variable
                    key={variable.tag.name}
                    variable={variable}
                    handleShowRange={handleShowRange}
                  />
                )
              })
            }
          </div>
        </div>
      }

      {
        sortVariables.valves && sortVariables.valves.length > 0 &&
        <div className="mb-5">
          <h3>Electroválvulas</h3>
          <div className="d-flex flex-wrap">
            {
              sortVariables.valves.map((variable) => {
                return (
                  <Valve
                    key={variable.tag.name}
                    variable={variable}
                    handleShowRange={handleShowRange}
                    handleShowReset={handleShowReset}
                    handleShowHistory={handleShowHistory}
                  />
                )
              })
            }
          </div>
        </div>
      }

      {
        sortVariables &&
        <Range
          show={showRange}
          handleClose={handleCloseRange}
        />
      }

      <ResetsHistory
        show={showHistory}
        handleClose={handleCloseHistory}
      />

      {
        sortVariables.valves &&
        <Reset
          show={showReset}
          handleClose={handleCloseReset}
        />
      }
    </>
  )
}

const mapStateToVariables = (state) => {

  return {
    variables: state.variables
  }
}

const mapDispatchToVariables = (dispatch) => (
  {
    getVariables: (machineID) => (
      dispatch(getVariables(machineID))
    ),
    updateVariable: (newData) => (
      dispatch(updateVariable(newData))
    ),
    activeVariable: (variableID) => (
      dispatch(activeVariable(variableID))
    ),
    activeRange: (variableID) => (
      dispatch(activeRange(variableID))
    ),
  }
)

export default connect(mapStateToVariables, mapDispatchToVariables)(Variables)
