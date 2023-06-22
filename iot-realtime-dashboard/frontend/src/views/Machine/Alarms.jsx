import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'

import AlarmsTable from '../../components/Tables/Alarms'
import RangesTable from '../../components/Tables/Ranges'

import { getAllRanges } from '../../store/actions/ranges'

const Alarms = (props) => {

  const { machineID, getAlarmsConfigurations } = props

  useEffect(() => {
    getAlarmsConfigurations(machineID)
  }, [machineID, getAlarmsConfigurations])

  return (
    <Container>
      <h3 className="pb-3">
        Historial de Alarmas
      </h3>
      <AlarmsTable
        machineID={machineID}
      />
      <hr/>
      <h3 className="pb-3">
        Alarmas Configuradas
      </h3>
      <RangesTable />
    </Container>
  )
}

const mapDispatchToAlarms = (dispatch) => (
  {
    getAlarmsConfigurations: (machineID) => (
      dispatch(getAllRanges(machineID))
    ),
  }
)

export default connect(null, mapDispatchToAlarms)(Alarms)
