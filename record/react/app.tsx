import React, { FC } from 'react';
import Route from "./routes"
import { useMountUploadElement } from "./hooks/upload"
import "./app.style.less"


interface IProps {

}

const App: FC<IProps> = (
  {

  }
) => {
  const uplodaNode = useMountUploadElement()


  return (
    <section id="root-app">
      <Route />
      {
        uplodaNode
      }
    </section>
  )
}

export default App;
