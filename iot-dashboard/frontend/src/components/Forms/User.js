/*
  User.js (Form)
    Form para guardar/actualizar Usuarios

# 13/03/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useState, useEffect } from 'react'
// import axios from 'axios'

import { Form, Button, Spinner, Col } from 'react-bootstrap'

import { resetForm } from '../../store/actions/processing'
import { saveUser } from '../../store/actions/manage'

import { CREATE, UPDATE, UPDATE_PASSWORD } from '../../configuration/dictionary'

import { connect } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HOSTS } from '../../constants'
import { HttpClient } from '../../utils/HttpClient'


const User = (props) => {

  const initialFormData = {
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    role: 2,
    family: null
  }

  const {
    pending,
    success,
    error: saveError } = props.processing

  const {
    handleClose,
    resetForm,
    activeUser,
    action } = props

  const [formData, setFormData] = useState(initialFormData)
  const [families, setFamilies] = useState({
    show: false,
    loading: true,
    data: null,
    error: null
  })

  const fetchFamilies = async () => {

    try {
      const { response, data } = await HttpClient(
        HOSTS.API.FAMILIES
      ) 
  
      if (!response) throw 500
  
      setFamilies({
        ...families,
        loading: false,
        data: data
      })
    } catch {
      setFamilies({
        loading: false,
        error: true
      })
    }


    // axios.get(HOSTS.API.FAMILIES).then(response => {
    //   setFamilies({
    //     ...families,
    //     loading: false,
    //     data: response.data,
    //   })
    // }).catch(error => {
    //   setFamilies({
    //     loading: false,
    //     error: error
    //   })
    // })
  }

  useEffect(fetchFamilies, [])

  useEffect(() => {
    if (activeUser) {
      setFormData({
        id: activeUser.id,
        email: activeUser.email,
        first_name: activeUser.first_name,
        last_name: activeUser.last_name,
        role: activeUser.user_profile.role,
        family: activeUser.user_profile.family
      })
    }

    resetForm()
  }, [activeUser, resetForm])

  const showFamilies = (status) => {
    setFamilies({...families, show: status})
  }

  const handleValueChange = event => {

    if (event.target.name === 'role') {
      event.target.value === "1" ? showFamilies(true) : showFamilies(false)
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })

  }

  const handleSubmit = event => {
    const { submitUser } = props

    event.preventDefault()

    const newUser = {
      "action": action,
      "id": formData.id ? formData.id : null,
      "email": formData.email,
      "first_name": formData.first_name,
      "last_name": formData.last_name,
      "password": formData.password,
      "user_profile": {
        "role": Number(formData.role),
        "family": Number(formData.role) !== 1 ? null : Number(formData.family)
      }
    }

    submitUser(newUser)
  }

  return (
    <>
      {
        <Form
          onSubmit={handleSubmit}
        >
          {
            action === UPDATE_PASSWORD &&
            <Form.Label
              className="h6"
            >
              { formData.email }
            </Form.Label>
          }
          { (action === CREATE || action === UPDATE) &&
            <>
              <Form.Row>

                <Form.Group
                  as={Col}
                  controlId="formName"
                >
                  <Form.Control
                    name="first_name"
                    placeholder="Nombre"
                    onChange={handleValueChange}
                    value={formData.first_name || ''}
                    required
                  />
                </Form.Group>
                <Form.Group
                  as={Col}
                  controlId="formLastNames"
                >
                  <Form.Control
                    name="last_name"
                    placeholder="Apellido/s"
                    onChange={handleValueChange}
                    value={formData.last_name || ''}
                    required
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="formEmail">
                <Form.Label
                  className="h6"
                >
                  Email
                </Form.Label>
                <Form.Control
                  name="email"
                  placeholder="user@mail.com"
                  onChange={handleValueChange}
                  value={formData.email || ''}
                  required
                />
              </Form.Group>
            </>
          }

          { (action === CREATE || action === UPDATE_PASSWORD) &&
            <Form.Group controlId="formPassword">
              <Form.Label
                className="h6"
              >
                Password
              </Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleValueChange}
                value={formData.password || ''}
                required
              />
            </Form.Group>
          }

          { (action === CREATE || action === UPDATE) &&

            <Form.Group controlId="formRole">
              <Form.Label
                className="h6"
              >
                Rol
              </Form.Label>
              <Form.Control
                as="select"
                name="role"
                onChange={handleValueChange}
                value={formData.role || 2}
              >
                <option value="2">Operador</option>
                <option value="3">Administrador</option>
                <option value="1">Proveedor</option>
              </Form.Control>
            </Form.Group>
          }

          {
            (families.show || formData.family) && (action !== UPDATE_PASSWORD) &&
            <Form.Group controlId="formFamily">
              <Form.Label
                className="h6"
              >
                Empresa
              </Form.Label>
              {
                families.loading ?
                  <Spinner variant="warning" animation="grow"/> :
                  <Form.Control
                    as="select"
                    name="family"
                    onChange={handleValueChange}
                    value={formData.family || ""}
                    required
                  >
                    <option value="">
                      Seleccione una empresa
                    </option>
                    {
                      families.data.map((family, key) => (
                        <option key={key} value={family.id}>
                          {family.name}
                        </option>
                      ))
                    }
                  </Form.Control>
              }
            </Form.Group>
          }
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
                    {
                      action === CREATE ? 'Crear' :
                      action === UPDATE ? 'Actualizar' :
                      "Cambiar Password"
                    }
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

const mapStateToUser = (state) => {
  return {
     processing: state.processing,
  }
}

const mapDispatchToUser = (dispatch) => (
  {
    submitUser: (newUser) => (
      dispatch(saveUser(newUser))
    ),
    resetForm: () => (
      dispatch(resetForm())
    )
  }
)

export default connect(mapStateToUser, mapDispatchToUser)(User)
