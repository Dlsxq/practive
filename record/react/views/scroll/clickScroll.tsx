import React, { FC, useState } from 'react';
import "./click.style.less"
const maxList = new Array(500).fill(1).map((el, i) => ({ key: i, index: i }))
interface IProps {

}
const defaultItemHeight = 30;
const maxItemLen = 500 / defaultItemHeight + 3
const Index: FC<IProps> = (
  {

  }
) => {
  const [offset, setOffset] = useState(0)

  const handleClickScroll = e => {
    /* 
      减去中间值
      移动差数到距离
      数据切片展示
      
    */
    let index = ~~e.target.getAttribute("data-index");
    let sum = index - 8;
    if (sum > 0) {
      setOffset(sum * 30)
    } else if (sum > -2) {
      setOffset(sum * 30)
    }
  }

  return (
    <div className="scroll-mid-root-click"   >
      <div className="scroll-wrapper" style={{ height: 800, transform: `translateY(${-offset}px)` }} >
        {
          maxList
            .slice(0, 30)
            // .map((el, i) => ({ ...el, pos: (firstIndex + i) * defaultItemHeight }))
            .map((el, i) => {
              return <div style={{ height: 30, color: i === 7 ? "red" : "blck" }} className="click-scroll-item" data-index={i} onClick={handleClickScroll} key={i} >
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