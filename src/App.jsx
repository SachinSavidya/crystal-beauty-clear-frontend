import { useState } from 'react'
import './App.css'
import LoginPage from '../pages/loginPage'
import AdminPage from '../pages/adminPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import RegisterPage from '../pages/client/registerPage'
import HomePage from '../pages/homePage'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ForgotPasssword from '../pages/client/forgotPassword'

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
              <Route path="/forgot" element={<ForgotPasssword/>} />
               
          </Routes>      
      </BrowserRouter>
      </GoogleOAuthProvider>
   

  )
}

export default App;
