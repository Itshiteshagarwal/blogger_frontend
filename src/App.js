import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AddBlog from "./components/AddBlog"
import NoteState from './context/Notes/NoteState'
import Alert from './components/Alert'
import Login from './components/Login'
import SignUp from './components/SignUp'
const App = () => {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert={alert}/>
      <div className="container">
      <Routes>
      <Route exact path ='/' element = {<Home showAlert={showAlert}/>}/>
      <Route exact path ='/addblog' element={<AddBlog/>}/>
      <Route exact path ='/login' element={<Login showAlert={showAlert}/>}/>
      <Route exact path ='/signup' element={<SignUp showAlert={showAlert}/>}/>
      </Routes>
      </div>
      </Router>
      </NoteState>
    </>
  )
}

export default App
