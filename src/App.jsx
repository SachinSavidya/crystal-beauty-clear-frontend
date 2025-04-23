import { useState } from 'react'
import './App.css'
import LoginPage from '../pages/loginPage'
import AdminPage from '../pages/adminPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
      <BrowserRouter>
      <Toaster position='top-center'/>
          <Routes path="/*">
              <Route path="/admin/*" element={<AdminPage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/*" element={<h1>404 Not found</h1>}/>
               
          </Routes>      
      </BrowserRouter>
   

  )
}

export default App;
