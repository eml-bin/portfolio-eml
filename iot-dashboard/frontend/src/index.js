import React from "react"
import ReactDOM from "react-dom"
import { createBrowserHistory } from "history"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducer from './store/reducers/index'
import { ThemeProvider } from './assets/ThemeContext'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import PrivateRoute from "./components/Routes/Private"
import Dashboard from "./views/Dashboard"
import Login from "./views/Login"
import NoMatch from './components/Routes/NoMatch'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/css/bootstrap/custom.css'
import './assets/css/index.css'
import 'animate.css'

const hist = createBrowserHistory()
library.add(fas)
library.add(far)

const store = createStore(reducer, applyMiddleware(thunk))

console.log('env: ', process.env.NODE_ENV)

ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider>
        <Router history={hist}>
          <Switch>
            <PrivateRoute path={"/platform"}>
              <Dashboard/>
            </PrivateRoute>
            <Route path="/login" component={Login} />
            <Redirect exact from="/" to="/login" />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>,
  document.getElementById("root")
)
