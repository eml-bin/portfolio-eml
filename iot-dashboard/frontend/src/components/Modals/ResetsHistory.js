/*
  ResetHistory.js (Modal)
    Modal que se muestra cuando,
    se consulta el historial de los reseteos de una electroválvula.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useEffect } from 'react'

import { Button, Modal } from 'react-bootstrap'

import { getValveHistory } from '../../store/actions/history'
import { connect } from 'react-redux'
import ResetsTable from '../Tables/Resets'

const History = (props) => {
  const { show,
    handleClose,
    activeVariable,
    getData } = props

  useEffect(() => {
    activeVariable && show &&
      getData(activeVariable.tag.id)
  }, [activeVariable, show, getData])

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      size={"lg"}
    >
      {
        activeVariable &&
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              Historial de Reinicios
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4 className="text-muted text-center mb-3">
              { activeVariable.type } { activeVariable.reference }
            </h4>
            <ResetsTable />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </>
      }
    </Modal>
  )

}

const mapStateToHistory = (state) => {
  return {
     activeVariable: state.variables.activeVariable
  }
}

const mapDispatchToHistory = (dispatch) => (
  {
    getData: (tagID) => (
      dispatch(getValveHistory(tagID))
    ),
  }
)

export default connect(mapStateToHistory, mapDispatchToHistory)(History)


























// const HistoryPlotly = (props) => {
//
//   const [plotly, setPlotly] = useState(null)
//
//   const { show,
//     handleClose,
//     activeVariable,
//     getData,
//     data } = props
//
//   useEffect(() => {
//     activeVariable && show &&
//       getData(activeVariable.tag.id)
//   }, [activeVariable, show, getData])
//
//   useEffect(() => {
//     data &&
//     setPlotly({
//       line: {
//         x: data.map(variable => variable.date),
//         y: data.map(variable => variable.value),
//         fill: 'tonexty',
//         line: {
//           shape: 'spline',
//         }
//       },
//     })
//   }, [data])
//
//   return (
//     <Modal
//       show={show}
//       onHide={handleClose}
//       animation={false}
//       size={"lg"}
//     >
//       {
//         activeVariable &&
//         <>
//           <Modal.Header closeButton>
//             <Modal.Title>
//               Historial de { activeVariable.reference }
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {
//               data && plotly ?
//                 <>
//                   <Plot
//                     className="h-100 w-100"
//                     data={[plotly.line]}
//                     graphDiv="graph"
//                     useResizeHandler={true}
//                   />
//                 </>
//               :
//               <div>
//                 <Spinner animation="border" variant="danger" />
//               </div>
//             }
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//               Close
//             </Button>
//             <Button variant="primary" onClick={handleClose}>
//               Save Changes
//             </Button>
//           </Modal.Footer>
//         </>
//       }
//     </Modal>
//   )
// }
