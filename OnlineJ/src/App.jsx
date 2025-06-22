import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './login'
import Home from './home'
import ProblemDetail from './problems/prb1'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './register'

function App() {
  useEffect(()=>{console.log(import.meta.env.VITE_API_URL)},[])
   
  return (
    
      <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/problems/:id" element={<ProblemDetail />} />
      </Routes>
    </Router>
  
  )
}

export default App;
