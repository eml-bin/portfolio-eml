/*
  Plotly (Library)
    Exporta el componente de la librería Plotly para
    la visualización de datos.

# 10/02/2020
@ Eduardo Muñoz López (eduardo@gestalabs.com)
*/

import Plotly from "plotly.js-basic-dist"

import createPlotlyComponent from "react-plotly.js/factory"
export const Plot = createPlotlyComponent(Plotly)
