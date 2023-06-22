/*
  Line.js (Card)
    Componente Card de Bootstrap,
    muestra un gráfico de línea en tiempo real para visualizar una variable.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import RealTimeLine from '../Charts/RealTimeLine'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux'

const Variable = (props) => {

  const [alarm, setAlarm] = useState(false)
  const [value, setValue] = useState(null)
  const { variable, handleShowRange, newData, range } = props

  useEffect(() => {
    if (newData && newData.tagName === variable.tag.name) {
      newData.alarm && setAlarm(true)
      setValue(newData.value)
    }
  }, [newData, variable])

  return (
    <Card className="mr-2 mt-2" style={{ width: '25rem', height: '17rem' }}>
      <Card.Header
        className={`bg-${ alarm && 'alert text-white'}`}
      >
        {`${variable.reference} `}
        <div className="float-right">
          <div
            className={alarm ? 'text-white' : 'text-muted'}
            style={{ fontSize: '.55rem'}}>
            {variable.type} Actual
          </div>
          <div
            className='h3 text-right'
          >
            {
              alarm &&
              <FontAwesomeIcon
                icon={['fas','exclamation-circle']}
                className="text-white mr-2"
              />
            }
            { value && value }
            <sup style={{ fontSize: '.9rem'}}>{variable.unit}</sup>
          </div>
        </div>
      </Card.Header>
      <Card.Body className="p-0">
        <RealTimeLine
          tagName={variable.tag.name}
          range={range}
        />
      </Card.Body>
      <Card.Footer>
        <span className="text-muted" style={{ fontSize: '.8rem' }}>
          {variable.process}
        </span>
        <div className="float-right">

          <Button
            variant="secondary"
            className="px-2 py-0"
            title="Alarm"
            onClick={() => handleShowRange(variable.id)}
          >
            <FontAwesomeIcon
              icon={['fas','bell']}
              size="sm"
            />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

const mapStateToVariable = (state, ownProps) => {
  let { variable } = ownProps

  return {
     newData: state.mqtt.streamingVariables,
     range: state.ranges.data &&
     state.ranges.data.find(range => range.tagName === variable.tagName),
  }
}

export default connect(mapStateToVariable)(Variable)
