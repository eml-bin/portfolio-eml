/*
  Reset.js (Form)
    Form para reiniciar una Electroválvula.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useState, useEffect } from 'react'
import { Form, Button, Spinner } from 'react-bootstrap'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

import { resetForm } from '../../store/actions/processing'
import { resetValve } from '../../store/actions/variables'

const Reset = (props) => {

  const { activeVariable, resetValve, handleClose, resetForm } = props
  const { pending, success, error } = props.processing
  const [ formData, setFormData ] = useState({
    notes: ''
  })

  useEffect(() => {
    resetForm()
  }, [resetForm])

  const handleSubmit = event => {
    event.preventDefault()
    const valveData = {
      "tagName": activeVariable.tag.name,
      "tag_name": activeVariable.tag.name,
      "action": 1, // RESET
      "count": 0,
      "notes": formData.notes,
      "date": moment().format("YYYY-MM-DD HH:mm")
    }
    resetValve(valveData)
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
          Comentarios (Opcional)
        </Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          name="notes"
          placeholder="Agregar un comentario"
          onChange={handleValueChange}
          value={formData.notes}
        />
      </Form.Group>


      <div className="text-right">
        <h5 className="pb-1">
          {
            (success && !error) ?
              <>
                ¡Reinicio Correcto!
                <FontAwesomeIcon
                  icon={['fas','check-circle']}
                  className="text-success ml-2"
                  size="lg"
                />
              </>
            : (!success && error) &&
            <>
              ¡Error al reiniciar!
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
                Resetear
              </Button>
            }

          </>
        }
      </div>

    </Form>
  )

}


const mapStateToReset = (state) => {
  return {
     processing: state.processing,
  }
}

const mapDispatchToReset = (dispatch) => (
  {
    resetValve: (valveData) => (
      dispatch(resetValve(valveData))
    ),
    resetForm: () => (
      dispatch(resetForm())
    )
  }
)


export default connect(mapStateToReset, mapDispatchToReset)(Reset)
