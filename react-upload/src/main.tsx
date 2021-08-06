import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import { useMountUploadElement } from "./hooks/upload"


function Main() {
  const uploadNode = useMountUploadElement()
  return (
    <div>
      <App />
      {uploadNode}
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
)
