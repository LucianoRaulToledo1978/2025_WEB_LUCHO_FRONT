import React from 'react'
import { Route, Routes, Navigate} from 'react-router'
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen'
import { LoginScreen } from './Screens/LoginScreen/LoginScreen'
import AuthMiddleware from './Middlewares/AuthMiddleware'

function App() {

  return (

    <Routes>
      
       <Route path='/' element={<LoginScreen/>} />
       <Route path='/login' element={<LoginScreen/>} />
     <Route path="/" element={<Navigate to="/register" />} /> {/* esto lo saque chatgtp*/ }
      <Route path='/register' element={<RegisterScreen/>} />
      <Route element={<AuthMiddleware/>}></Route>
       <Route path='/home' element={<h1>Home</h1>}/>
      <Route />
    </Routes>

  )
}

export default App
