import "./timeStyle.less"


import React, { FC, useRef, useState } from 'react';

interface IProps {

}

const fn = (n: number) => {
  return n >= 10 ? n : `0${n}`;
};

const timeDate = [
  0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23
]
let prev = 0;
const TimeLine: FC<IProps> = (
  {

  }
) => {
  const scrollWrapperRef = useRef<any>();
  const scrollRef = useRef<any>();
  const [scrollOffet, updateScrollOffset] = useState(0);
  const [isDragging, setDragging] = useState(false)

  const startSliding = (evl: any) => {

    prev = evl.clientX - prev;
    setDragging(true)
    evl.target.setPointerCapture(evl.pointerId);
  }

  const stopSliding = (e: any) => {
    setDragging(false)
    let x = e.clientX;
    prev = x - prev;
    e.target.releasePointerCapture(e.pointerId);
    compute()
  }

  const compute = () => {
    console.log(scrollOffet)
    let containerWidth = scrollWrapperRef.current.clientWidth
    let currentWidth = scrollRef.current.clientWidth
    let itemWidth = containerWidth / 24;

    let all = currentWidth / itemWidth;


    // const h = Math.floor(currentWidth / 3600);
    const h = Math.floor(all);
    console.log(h, "------", (scrollOffet / 60))

    const m = Math.floor((currentWidth % 1440) / 60);
    const s = Math.floor(currentWidth - h * 3600 - m * 60);
    console.log(`${timeDate[h]}:${fn(m)}:${fn(s)}`);
    // console.log(parseInt(((all.slice(4) as unknown as number + 0) * s) + ""))

    // console.log(all, all)
  }

  const onMove = (e: any) => {
    if (!isDragging) {
      return
    }
    let left = e.clientX;
    let containerWidth = scrollWrapperRef.current.clientWidth + prev - 20
    let itemWidth = containerWidth / 24;
    if (left >= containerWidth - ((itemWidth / 2) - 16) || left <= prev) {
      return
    }
    let retLeft = left - prev;
    updateScrollOffset(retLeft)
  }

  const scrollStyle = {
    transform: `translateX(${scrollOffet}px)`,
  } as React.CSSProperties

  return (
    <section>
      <div className="time-wrapper" ref={scrollWrapperRef} >
        {
          timeDate.map(el => {
            return <div className="time-date-item" key={el}>
              {el}
            </div>
          })
        }
        <div
          className="bgk time-wrapper-scroll"
          ref={scrollRef}
          style={
            {
              // 减去滑块点一半
              width: scrollOffet + 10
            }
          }
        >
          <div
            style={scrollStyle}
            onPointerMove={onMove}
            onPointerDown={startSliding}
            onPointerUp={stopSliding}
            className="scroll"
          />
        </div>

      </div>
    </section>
  )
}

export default TimeLine;