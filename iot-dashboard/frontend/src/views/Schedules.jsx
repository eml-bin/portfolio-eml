/*
  Schedules.js (View Component)
    Vista de Paros Programados

# 05/03/2020
@ Eduardo Muñoz (eduardo@gestalabs.com)
*/

import React, { useState, useEffect } from 'react'
import { Container, Button } from 'react-bootstrap'

import ScheduleTable from '../components/Tables/Schedules'
import ScheduleModal from '../components/Modals/Schedule'
import Can from '../components/Permissions/Can'
import { getSchedules } from '../store/actions/schedules'

import { connect } from 'react-redux'


const Schedules = (props) => {

  const [showAction, setShowAction] = useState(false)

  const { getData, role } = props

  const handleCloseAction = () => setShowAction(false)
  const handleShowReset = () => {
    setShowAction(true)
  }

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <Container fluid>
      <div className="display-4 mb-1">
        Paros Programados
      </div>
      <Can
        role={role.name}
        perform="schedules:create"
        yes={() => (
          <Button
            variant="danger"
            className="my-3"
            title="ProgramarNuevoParo"
            onClick={() => handleShowReset()}
          >
            Programar Nuevo Paro
          </Button>
        )}
      />
      <ScheduleTable/>

      <ScheduleModal
        show={showAction}
        handleClose={handleCloseAction}
      />
    </Container>
  )
}

const mapStateToSchedule = (state) => {
  return {
    role: state.auth.user.role
  }
}


const mapDispatchToSchedule = (dispatch) => (
  {
    getData: () => (
      dispatch(getSchedules())
    )
  }
)

export default connect(mapStateToSchedule, mapDispatchToSchedule)(Schedules)
