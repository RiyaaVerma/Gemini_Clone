import React,{ useState } from 'react'
import Sidebar from './component/Sidebar/Sidebar'
import Main from './component/Main/main'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Sidebar/>
      <Main/>
    </>
  )
}

export default App
