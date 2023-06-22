import React from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'

import ShutdownsTable from '../../components/Tables/Shutdowns'

const Shutdowns = (props) => {

  return (
    <Container>
      <h3 className="pb-3">
        Paros no Programados
      </h3>
      <ShutdownsTable />
    </Container>
  )
}

export default connect()(Shutdowns)
