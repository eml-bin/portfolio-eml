import React, { useState } from 'react'

import { getVariablesHistory } from '../../store/actions/history'

import { Form, Button, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { connect } from 'react-redux'
import moment from 'moment'

const History = (props) => {

  const [ formData, setFormData ] = useState({
    end: new Date(),
  })

  const handleDateChange = (date, name) => {
    setFormData({
      ...formData,
      [name]: date
    })
  }

  const handleSubmit = event => {
    event.preventDefault()

    let { searchHistory, machineID } = props
    let dateEnd = moment(formData.end).format("YYYY-MM-DD HH:mm:ss")

    searchHistory(machineID, dateEnd)
  }

  return (
    <>
      <h6 className="text-center">Fecha Límite</h6>
      <Form
        onSubmit={handleSubmit}
        className="mt-2 justify-content-center"
        inline
      >
        <Form.Group>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text>
                <FontAwesomeIcon 
                  icon={['far', 'calendar-alt']}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              as={DatePicker}
              selected={formData.end}
              onChange={date => handleDateChange(date, 'end')}
              showTimeSelect
              todayButton="Hoy"
              timeFormat="HH:mm"
              timeIntervals={60}
              timeCaption="hora"
              dateFormat="d/MM/yyyy h:mm aa"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group>
          <Button
            variant="danger"
            type="submit"
            className="ml-2"
          >
            Buscar
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

const mapDispatchToHistory = (dispatch) => (
  {
    searchHistory: (machineID, endDate) => (
      dispatch(getVariablesHistory(machineID, endDate))
    )
  }
)

export default connect(null, mapDispatchToHistory)(History)
