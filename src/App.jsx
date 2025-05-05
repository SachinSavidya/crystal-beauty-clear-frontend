import { useState } from 'react'
import './App.css'
import LoginPage from '../pages/loginPage'
import AdminPage from '../pages/adminPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import RegisterPage from '../pages/client/registerPage'
import HomePage from '../pages/homePage'

function App() {

  return (
      <BrowserRouter>
      <Toaster position='top-center'/>
          <Routes path="/*">
              <Route path="/admin/*" element={<AdminPage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/*" element={<HomePage/>}/>
               
          </Routes>      
      </BrowserRouter>
   

  )
}

export default App;
