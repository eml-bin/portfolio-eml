/*
  Schedule.js (Form)
    Form para registrar un Paro Programado.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Form, Button, Spinner } from 'react-bootstrap'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { resetForm } from '../../store/actions/processing'
import { saveSchedule } from '../../store/actions/schedules'

import { connect } from 'react-redux'
import moment from 'moment'

const Schedule = (props) => {

  const { handleClose, submitSchedule, resetForm } = props
  const { pending, success, error: saveError } = props.processing

  const [ formData, setFormData ] = useState({
    start: new Date(),
    end: new Date(),
    responsables : '',
    reason: ''
  })

  useEffect(() => {
    resetForm()
  }, [resetForm])

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date
    })
  }

  const handleValueChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    const newSchedule = {
      action: 'CREATE',
      start: moment(formData.start).format("YYYY-MM-DD HH:mm"),
      end: moment(formData.end).format("YYYY-MM-DD HH:mm"),
      responsables : formData.responsables,
      reason: formData.reason
    }

    submitSchedule(newSchedule)
  }

  return (
    <Form
      onSubmit={handleSubmit}
    >
      <Form.Group controlId="formDuracion">
        <div className="form-inline">
          <Form.Label
            className="h6 pr-2 mr-3"
          >
            Inicio
          </Form.Label>
          <DatePicker
            selected={formData.start}
            onChange={date => handleDateChange(date, 'start')}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="d/MM/yyyy h:mm aa"
            className="form-control"
          />
        </div>
        <br/>
        <div className="form-inline">
          <Form.Label
            className="h6 p-2 pr-3 mr-3"
          >
            Fin
          </Form.Label>
          <DatePicker
            selected={formData.end}
            onChange={date => handleDateChange(date, 'end')}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="d/MM/yyyy h:mm aa"
            className="form-control"
          />
        </div>
      </Form.Group>

      <hr/>
      <Form.Group controlId="formMotivo">
        <Form.Label
          className="h6"
        >
          Motivo
        </Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          name="reason"
          placeholder="Incluya el motivo del paro"
          onChange={handleValueChange}
          value={formData.reason}
          required
        />
      </Form.Group>

      <Form.Group controlId="formResponsables">
        <Form.Label
          className="h6"
        >
          Responsables
        </Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          name="responsables"
          placeholder="Asigne los correos electrónicos separados por coma"
          onChange={handleValueChange}
          value={formData.responsables}
          required
        />
      </Form.Group>
      <div className="text-right">
        <h5 className="pb-1">
          {
            (success && !saveError) ?
              <>
                ¡Guardado Correctamente!
                <FontAwesomeIcon
                  icon={['fas','check-circle']}
                  className="text-success ml-2"
                  size="lg"
                />
              </>
            : (!success && saveError) &&
            <>
              ¡Error al guardar!
              <FontAwesomeIcon
                icon={['fas','times-circle']}
                className="text-danger ml-2"
                size="lg"
              />
              <p className="text-muted" style={{fontSize: '.9rem'}}>
                Verifique que los datos sean los correctos. Gracias
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
                Crear
              </Button>
            }

          </>
        }
      </div>
    </Form>
  )
}

const mapStateToSchedule = (state) => {
  return {
     processing: state.processing,
  }
}

const mapDispatchToSchedule = (dispatch) => (
  {
    submitSchedule: (newSchedule) => (
      dispatch(saveSchedule(newSchedule))
    ),
    resetForm: () => (
      dispatch(resetForm())
    )
  }
)

export default connect(mapStateToSchedule, mapDispatchToSchedule)(Schedule)
