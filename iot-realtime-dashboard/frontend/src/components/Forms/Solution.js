/*
  Solution.js (Form)
    Form para registrar la solución de una Notificación.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { resetForm } from '../../store/actions/processing'
import { attendAlarm, attendShutdown } from '../../store/actions/notifications'

const Solution = (props) => {

  const {
    attendAlarm,
    attendShutdown,
    handleClose,
    resetForm,
    notificationID,
    type } = props
  const { pending, success, error } = props.processing
  const [ formData, setFormData ] = useState({
    notes: ''
  })

  useEffect(() => {
    resetForm()
  }, [resetForm])

  const handleSubmit = event => {
    event.preventDefault()
    const data = {
      "id": notificationID,
      "is_active": false,
      "notes": formData.notes,
    }
    type === 'alarm' ?
      attendAlarm(data) :
    type === 'shutdown' &&
      attendShutdown(data)
  }

  const handleValueChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNotes">
        <Form.Label
          className="h6"
        >
          Comentarios
        </Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          name="notes"
          placeholder="Agregue un comentario, por favor."
          required
          onChange={handleValueChange}
          value={formData.notes}
        />
      </Form.Group>


      <div className="text-right">
        <h5 className="pb-1">
          {
            (success && !error) ?
              <>
                ¡Solución guardada correctamente!
                <FontAwesomeIcon
                  icon={['fas','check-circle']}
                  className="text-success ml-2"
                  size="lg"
                />
              </>
            : (!success && error) &&
            <>
              ¡Error al guardar!
              <FontAwesomeIcon
                icon={['fas','times-circle']}
                className="text-danger ml-2"
                size="lg"
              />
              <p className="text-muted" style={{fontSize: '.9rem'}}>
                Vuelva a intentarlo. Gracias
              </p>
            </>
          }
        </h5>
        {
          pending ?
            <Spinner variant="warning" animation="grow" className="mr-2"/>
          :
          <>
            <Button
              className="mr-2"
              variant="secondary"
              onClick={handleClose}
            >
              Cerrar
            </Button>

            { !success &&
              <Button variant="danger" type="submit">
                Resolver
              </Button>
            }

          </>
        }
      </div>

    </Form>
  )

}


const mapStateToSolution = (state) => {
  return {
     processing: state.processing,
  }
}

const mapDispatchToSolution = (dispatch) => (
  {
    attendAlarm: (alarmData) => (
      dispatch(attendAlarm(alarmData))
    ),
    attendShutdown: (shutdownData) => (
      dispatch(attendShutdown(shutdownData))
    ),
    resetForm: () => (
      dispatch(resetForm())
    )
  }
)


export default connect(mapStateToSolution, mapDispatchToSolution)(Solution)
