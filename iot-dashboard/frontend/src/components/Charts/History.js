/*
  History.js (Chart)
    Gráfica el histórico de las variables.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useEffect, useState } from 'react'

import { Card } from 'react-bootstrap'

import { Plot } from './Plotly'

const History = (props) => {

  const { type, data } = props
  const [filterData] = useState(props.data.filter(value => value.type === type))
  const [distinctNames] = useState([...new Set(filterData.map(value => value.reference))])

  const [plotly, setPlotly]  = useState()
  const [layout]  = useState({
    showlegend: true,
	  legend: {
      "orientation": "h"
    },
    xaxis: {
      autorange: true,
      showline: true,
      side: 'top',
      showgrid: false,
      automargin: true,
      rangeslider: {
        visible: true,
        yaxis: {
          rangemode: 'match'
        },
        autorange: true,
        borderwidth: 1,
        bordercolor: 'black',
        thickness: '0.1'
      }
    }
  })

  useEffect(() => {
    filterData && distinctNames &&
      setPlotly(distinctNames.map(name => {
        return {
          x: filterData.filter(value => value.reference === name).map(historic => historic.date),
          y: filterData.filter(value => value.reference === name).map(historic => historic.value),
          name: name,
          type: 'scattergl',
          mode: 'lines+markers',
          marker: {
            symbol: 'circle',
            size: 9,
            line: {
              width: 1,
              color: 'black'
            }
          },
          line: {
            shape: 'spline',
            smoothing: 1.3,
          },
        }
      }))
  }, [data, distinctNames, filterData])

  return (
    <Card className="my-3">
      <Card.Header>
        { type }
      </Card.Header>
      <Card.Body>
        {
          plotly &&
          <Plot
            className="h-100 w-100"
            data={plotly}
            layout={layout}
          />
        }
      </Card.Body>
    </Card>
  )
}

export default History
