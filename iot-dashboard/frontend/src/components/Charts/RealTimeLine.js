/*
  Line.js (Card)
    Componente Card de Bootstrap,
    muestra un gráfico de línea en tiempo real para visualizar una variable.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React from 'react'
import { Plot } from '../Charts/Plotly'
import Plotly from "plotly.js-basic-dist"

import moment from 'moment'

import { connect } from 'react-redux'

class RealTimeLine extends React.Component {

  state = {
    line: {
      x: [new Date().toLocaleTimeString([], {timeStyle: 'medium'})],
      y: [],
      fill: 'tozeroy',
      cliponaxis: true,
      line: {
        shape: 'spline',
        color: '#00bfe6'
      },
      marker: {
        size: 13,
        color: 'white',
        line: {
          color: '#00bfe6',
          width: 3
        }
      },
    },
    layout: {
      xaxis: {
        autorange: true,
        fixedrange: true,
        showgrid: false,
        nticks: 1,
        side: 'top'
      },
      yaxis: {
        visible: true,
        dtick: 50,
        nticks: 3,
        range: [0, 120],
        showspikes: true,
        spikethickness: 1,
      },
      dragmode: "pan",
      hovermode: "x",
      clickmode: "select",
      autosize: true,
      datarevision: 1,
      margin: {
        l: 30,
        t: 25,
        r: 30,
        b: 5,
        pad: 5,
        autoexpand: false,
      }
    },
    revision: 0,
    alert: false,
    value: null
  }

  setRange(min, max) {
    let ticks = parseInt(max / 2)

    this.setState({
      layout: {
        ...this.state.layout,
        yaxis: {
          ...this.state.layout.yaxis,
          dtick: ticks,
          range: [0, max]
        }
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps, prevState) {
    const { tagName, newData } = nextProps

    if (newData && newData.tagName === tagName) {
      this.graphNewValue(newData)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.range !== this.props.range) {

      const { range } = this.props

      this.setRange(range.min, range.max)
    }
  }

  componentDidMount() {
    let { range } = this.props

    range && this.setRange(range.min, range.max)
  }

  componentWillUnmount() {
    Plotly.purge('meow')
  }

  graphNewValue(newData) {
    const { line, layout, revision } = this.state

    line.x.push(moment(newData.date).format('HH:mm:ss'))
    line.y.push(newData.value)

    if (line.x.length > 15) {
      line.x.shift()
      line.y.shift()
    }

    this.setState({
      alarm: newData.alarm,
      revision: revision + 1
    })

    layout.datarevision = revision + 1

  }

  render() {
    return (
      <Plot
        divId="meow"
        className="h-100 w-100"
        data={[this.state.line]}
        layout={this.state.layout}
        revision={this.state.revision}
        graphDiv="graph"
        useResizeHandler={true}
        config={{displayModeBar: false}}
      />
    )
  }
}

const mapStateToRealTimeLine = (state) => {
  return {
     newData: state.mqtt.streamingVariables,
  }
}

export default connect(mapStateToRealTimeLine)(RealTimeLine)
