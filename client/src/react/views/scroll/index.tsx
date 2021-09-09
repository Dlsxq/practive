import React, { FC, useState } from 'react';
import "./index.style.less"
import AutoScroll from "./autoScroll"
import ClickScroll from "./clickScroll"


interface IProps {

}



const Scroll: FC<IProps> = (
  {

  }
) => {


  return (
    <section className="scroll-root-style">
      <AutoScroll />
      <ClickScroll />
    </section>
  )
}

export default Scroll;