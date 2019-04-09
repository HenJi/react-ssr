import * as React from "react"
import * as ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider as ReduxProvider } from "react-redux"

import Layout from "./components/Layout"
import createStore from "./store"

const store = createStore( (window as any).REDUX_DATA )

const jsx = (
  <ReduxProvider store={ store }>
    <Router>
      <Layout />
    </Router>
  </ReduxProvider>
)

const app = document.getElementById( "app" )
ReactDOM.hydrate( jsx, app )
