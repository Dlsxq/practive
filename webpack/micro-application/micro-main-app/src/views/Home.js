/** @jsxRuntime classic */
/** @jsx jsxCustomEvent */
import jsxCustomEvent from '@micro-zoe/micro-app/polyfill/jsx-custom-event'
import { useState } from 'react'
import React from "react";

export default function Home() {
  const [microAppData, changeMicroAppData] = useState({ msg: '来自基座的数据' })

  function handleCreate() {
    console.log('child-react17 创建了')
  }

  function handleBeforeMount() {
    console.log('child-react17 即将被渲染')
  }

  function handleMount() {
    console.log('child-react17 已经渲染完成')

    setTimeout(() => {
      changeMicroAppData({ msg: '来自基座的新数据' })
    }, 2000)
  }

  function handleUnmount() {
    console.log('child-react17 卸载了')
  }

  function handleError() {
    console.log('child-react17 加载出错了')
  }

  function handleDataChange(e) {
    console.log('来自子应用 child-react17 的数据:', e.detail.data)
  }

  return (
    <>
      <h1>Main Home</h1>
      <micro-app
        name='app-root'
        url={`http://localhost:3000/child/react17`}
        // url={`http://localhost:3001/`}
        data={microAppData}
        onCreated={handleCreate}
        onBeforemount={handleBeforeMount}
        onMounted={handleMount}
        onUnmount={handleUnmount}
        onError={handleError}
        onDataChange={handleDataChange}
      ></micro-app>
    </>
  )
}