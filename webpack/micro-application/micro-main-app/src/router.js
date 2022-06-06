// router.js
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainHome from "./views/Home";



export default function Main() {

  return (
    <BrowserRouter basename="/main-container">
        <Routes>
          <Route path='/' exact element={<MainHome />} />
        </Routes>
        {/* 记录添加子应用 */}
    </BrowserRouter>
  )
}