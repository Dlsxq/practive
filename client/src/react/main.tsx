import React from 'react'
import { render, } from 'react-dom'
import App from './app'

function Main() {
  return (<App />)
}

render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
)
