import React, { FC, useEffect, useState } from 'react';


interface IProps {

}

const RenderList: FC<IProps> = (
  {

  }
) => {
  const [dataList, setDataList] = useState([]);

  useEffect(
    () => {
      getList()
        .then(
          res => {
            setDataList(res.data ?? [])
          },
          err => {
            console.log(`error getList接口错误:->{ ${err.toString()} }<-`);
          }
        )
    },
    []
  )


  return (
    <section>
      <ul>
        {
          dataList.map(el => <li key={el}> {el}</li>)
        }
      </ul>

    </section>
  )
}


export default RenderList;