/*
  Range.js (Form)
    Form para guardar/actualizar la Configuración de Alarma.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useState, useEffect } from 'react'

import { Form, Button, Spinner } from 'react-bootstrap'

import { resetForm } from '../../store/actions/processing'
import { saveRange } from '../../store/actions/ranges'

import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Range = (props) => {

  const initialFormData = {
    action: 'CREATE',
    tag_name: null,
    min: null,
    max: null,
    tolerance: null,
    notify_to: null,
    is_active: null
  }

  const {
    pending,
    success,
    error: saveError } = props.processing

  const {
    handleClose,
    resetForm,
    activeRange,
    activeVariable } = props   

  const [ max, setMax ] = useState(false)
  const [ min, setMin ] = useState(false)
  const [ active, setActive ] = useState(false)

  const [ formData, setFormData ] = useState(initialFormData)

  useEffect(() => {
    if (activeRange) {
      activeRange.min && setMin(true)
      activeRange.max && setMax(true)
      activeRange.is_active && setActive(true)

      setFormData({
        id: activeRange.id,
        action: 'UPDATE',
        min: activeRange.min,
        max: activeRange.max,
        tolerance: activeRange.tolerance,
        notify_to: activeRange.notify_to,
        is_active: active
      })
    }

    resetForm()

  }, [activeRange, resetForm, active])

  const handleValueChange = event => {

    if (event.target.name === 'is_active') {
      event.target.value = setActive(!active)
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleOnOff = event => {
    event.target.name === 'min' ? setMin(!min) : setMax(!max)

    setFormData({
      ...formData,
      [event.target.name]: null
    })
  }

  const handleSubmit = event => {
    const { submitRange } = props

    event.preventDefault()

    const newRange = {
      "id": formData.id ? formData.id : null,
      "variable": activeVariable.id,
      "action": formData.action,
      "min": isNaN(parseFloat(formData.min)) ? null : parseFloat(formData.min),
      "max": isNaN(parseFloat(formData.max)) ? null : parseFloat(formData.max),
      "tolerance": isNaN(parseFloat(formData.tolerance)) ? null : parseFloat(formData.tolerance),
      "notify_to": formData.notify_to,
      "is_active": active
    }

    submitRange(newRange)
  }

  return (
    <>
      {
        <Form
          onSubmit={handleSubmit}
        >
          <h5 className="text-secondary pb-3">
            { activeVariable.reference }
          </h5>

          <Form.Group controlId="formSwitch">
            <Form.Check 
              type="switch"
              id="isActiveSwitch"
              name="is_active"
              label={ active ? 'Activa' : 'Apagada'}
              onChange={handleValueChange}
              checked={ active ? true : false}
              value={ active ? true : false }
            />
          </Form.Group>

          <Form.Group controlId="formRanges">
            {
              !activeVariable.isValve &&
              <>
                <div className="form-inline">
                  <Form.Check
                    id="minCheck"
                    type="checkbox"
                    label="Menor que"
                    checked={min}
                    name="min"
                    onChange={handleOnOff}
                  />
                  <Form.Control
                    disabled={!min}
                    name="min"
                    type="number"
                    placeholder="-"
                    step="0.01"
                    className="mx-2"
                    onChange={handleValueChange}
                    value={Number(formData.min) || ''}
                  />
                  { activeVariable.unit }
                </div>
                <br/>
              </>
            }
            <div className="form-inline">
              <Form.Check
                id="maxCheck"
                type="checkbox"
                label="Mayor que"
                checked={max}
                name="max"
                onChange={handleOnOff}
              />
              <Form.Control
                disabled={!max}
                name="max"
                type="number"
                step="0.01"
                placeholder="-"
                className="mx-2"
                onChange={handleValueChange}
                value={formData.max || ''}
              />
              { activeVariable.unit }
            </div>
          </Form.Group>

          {
            !activeVariable.isValve &&
            <Form.Group controlId="formTolerancia">
              <Form.Label
                className="h6"
              >
                Tiempo de Tolerancia (segundos)
              </Form.Label>
              <Form.Control
                type="number"
                name="tolerance"
                placeholder="0"
                onChange={handleValueChange}
                value={formData.tolerance || ''}
              />
            </Form.Group>
          }

          <Form.Group controlId="formEmails">
            <Form.Label
              className="h6"
            >
              Notificar a
            </Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              name="notify_to"
              placeholder="Asigne los correos electrónicos separados por coma"
              onChange={handleValueChange}
              value={formData.notify_to || ''}
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
                    {activeRange ? 'Actualizar' : 'Crear'}
                  </Button>
                }

              </>
            }
          </div>
        </Form>
      }
    </>
  )
}

const mapStateToRange = (state) => {
  return {
     processing: state.processing,
     activeVariable: state.variables.activeVariable
  }
}

const mapDispatchToRange = (dispatch) => (
  {
    submitRange: (newRange) => (
      dispatch(saveRange(newRange))
    ),
    resetForm: () => (
      dispatch(resetForm())
    )
  }
)

export default connect(mapStateToRange, mapDispatchToRange)(Range)
