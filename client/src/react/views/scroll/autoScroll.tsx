import React, { FC, useState } from 'react';
import "./index.style.less"



const maxList = new Array(500).fill(1).map((el, i) => ({ key: i, index: i }))


interface IProps {

}


const defaultItemHeight = 30;


const maxItemLen = 500 / defaultItemHeight + 3

const Index: FC<IProps> = (
  {

  }
) => {


  const [{ firstIndex, lastIndex }, setindex] = useState({ firstIndex: 0, lastIndex: maxItemLen })

  const handleRootOnScroll = (e) => {
    let offsetTop = e.target.scrollTop;
    let sum = Math.floor(offsetTop / defaultItemHeight)
    let firstIndex = sum;
    let lastIndex2 = firstIndex + maxItemLen - 1
    let obj = {
      firstIndex, lastIndex: lastIndex2
    }
    setindex(obj)
  }

  return (

    <div className="scroll-mid-root" onScroll={handleRootOnScroll} >
      <div className="scroll-wrapper" >
        {
          maxList
            .slice(firstIndex, lastIndex + 1)
            .map((el, i) => ({ ...el, pos: (firstIndex + i) * defaultItemHeight }))
            .map((el, i) => {

              return <div className="scroll-item" key={i} style={{ transform: `translateY(${el.pos}px)` }} >
                {
                  el.key
                }
              </div>
            })
        }
      </div>
    </div>

  )
}

export default Index;