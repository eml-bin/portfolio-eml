/*
  Counter.js (Card)
    Componente Card de Bootstrap,
    muestra un contador de ciclos de las electroválvulas en tiempo real.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { connect } from 'react-redux'

const Valve = ({
  variable,
  newData,
  handleShowRange,
  handleShowHistory,
  handleShowReset }) => {

  const [alarm, setAlarm] = useState(false)
  const [valve, setValve] = useState(null)
  // const [recentReset, setValve] = useState(null)

  useEffect(() => {
    if (newData && newData.tagName === variable.tag.name) {
      setValve(newData.value)
      setAlarm(newData.alarm)
    }
  }, [newData, variable])

  return (
    <Card className="mr-2 mt-2" style={{ width: '16rem', maxHeight: '250px' }}>
      <Card.Header
        className={`bg-${ alarm && 'alert text-white'}`}
      >
        <strong>{`${variable.reference}`}</strong>

        {alarm &&
          <FontAwesomeIcon
            icon={['fas','exclamation-circle']}
            size="2x"
            className="text-white float-right"
          />
        }
      </Card.Header>
      <Card.Body className="">
        { valve &&
          <div>
            <span
              className="text-muted"
              style={{ fontSize: '1rem'}}
            >
              Número de Ciclos
            </span>
            <div className="h2 font-weight-light">
              { valve.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') }
            </div>
            <div>
              <span className="text-muted" style={{fontSize: '.7rem'}}>
                Último Reseteo
              </span>
              <br/>
              {
                variable.valveDetail ? variable.valveDetail.date : '-'
              }
            </div>
          </div>
        }
      </Card.Body>
      <Card.Footer>
        <span className="text-muted" style={{ fontSize: '.8rem' }}>
          {variable.process}
        </span>
        <div className="float-right">
          <Button
            variant="secondary"
            className="px-2 py-0 mr-2"
            title="Historial"
            onClick={() => handleShowHistory(variable.id)}
          >
            <FontAwesomeIcon
              icon={['fas','history']}
              size="sm"
            />
          </Button>
          <Button
            variant="secondary"
            className="px-2 py-0 mr-2"
            title="Alarm"
            onClick={() => handleShowRange(variable.id)}
          >
            <FontAwesomeIcon
              icon={['fas','bell']}
              size="sm"
            />
          </Button>
          <Button
            variant="secondary"
            className="px-2 py-0"
            title="Reiniciar Válvula"
            onClick={() => handleShowReset(variable.id)}
          >
            <FontAwesomeIcon
              icon={['fas','sync-alt']}
              size="sm"
            />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  )
}

const mapStateToRealTimeValve = (state) => {
  return {
     newData: state.mqtt.streamingVariables
  }
}

export default connect(mapStateToRealTimeValve)(Valve)
