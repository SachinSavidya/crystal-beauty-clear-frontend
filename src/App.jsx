import { useState } from 'react'
import './App.css'
import LoginPage from '../pages/loginPage'
import AdminPage from '../pages/adminPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import RegisterPage from '../pages/client/registerPage'
import HomePage from '../pages/homePage'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

  return (
      <GoogleOAuthProvider clientId="826372718480-q3nbsuq3rbjtfc4hrekrro2cvp00ofah.apps.googleusercontent.com">  
      <BrowserRouter>
      <Toaster position='top-center'/>
          <Routes path="/*">
              <Route path="/admin/*" element={<AdminPage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/register" element={<RegisterPage/>}/>
              <Route path="/*" element={<HomePage/>}/>
               
          </Routes>      
      </BrowserRouter>
      </GoogleOAuthProvider>
   

  )
}

export default App;
