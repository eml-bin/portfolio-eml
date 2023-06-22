/*
  Intervals.js (Form/Buttons)
    Botones para visualizar o exportar       histórico por un intervalo de tiempo.

# 14/04/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import React, { useState } from 'react'
import { ButtonGroup, Button, ButtonToolbar } from 'react-bootstrap'

import { getVariablesHistory, exportHistoryToCSV } from '../../store/actions/history'
import { intervals } from '../../configuration/dictionary'

import { connect } from 'react-redux'

const Intervals = ({ machineID, activeInterval, endDate, searchHistory }) => {

    const clickInterval = (value) => {
        searchHistory(machineID, endDate, value)
    }

    const clickExport = () => {
        exportHistoryToCSV(machineID, endDate, activeInterval)
    }

    return (
        <>
            <ButtonToolbar className="justify-content-center my-3">
                <ButtonGroup size="sm" className="mr-2">
                    {
                        intervals.map((interval, key) => (
                            <Button 
                                key={key}
                                variant="secondary"
                                className={ activeInterval === interval.value && 'active'}
                                onClick={() => clickInterval(interval.value)}
                            >
                                { interval.value }
                            </Button>        
                        ))
                    }
                   
                </ButtonGroup>

                <Button 
                    size="sm" 
                    variant="success"
                    className="my-2"
                    onClick={() => clickExport()}     
                >
                    Exportar CSV
                </Button>
            </ButtonToolbar>
        </>
    )
}

const mapStateToIntervals = (state) => {
    return {
       activeInterval: state.history.activeInterval,
       endDate: state.history.endDate
    }
  }

const mapDispatchToIntervals = (dispatch) => (
    {
      searchHistory: (machineID, endDate, interval)  => (
        dispatch(getVariablesHistory(machineID, endDate, interval))
      )
    }
  )
  
  export default connect(mapStateToIntervals, mapDispatchToIntervals)(Intervals)