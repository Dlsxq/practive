import React from 'react'
import { render,unmountComponentAtNode } from 'react-dom'
import App from './app'

function Main() {
  return (<App />)
}
console.log("xx");


render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
)
