// import { useState,useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import Login from './login'
// import Home from './home'
// import ProblemDetail from './problems/prb1'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from './register'
// import Layout from './layout';

// function App() {
//   useEffect(()=>{console.log(import.meta.env.VITE_API_URL)},[])
   
//   return (
    
//       <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/register" element={<Register/>}/>
//         <Route path="/problems/:id" element={<ProblemDetail />} />
//       </Routes>
//     </Router>
  
//   )
// }

// export default App;
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Register from './register';
import ProblemDetail from './problems/prb1';
import Layout from './layout';

function App() {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout with navbar wrapping all these nested routes */}
        <Route element={<Layout handleLogout={handleLogout} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
