import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import Home from './home';
import Register from './register';
import ProblemDetail from './problems/prb1';
import Layout from './layout';
import SubmissionsPage from './submissions';
import Kome from './h1';
import LeaderboardPage from './Leaderboard';
import ProfilePage from './Profile';
import Compiler from './Compiler'; //
function App() {
  useEffect(() => {
    console.log(import.meta.env.VITE_API_URL);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Layout with navbar wrapping all these nested routes */}
        <Route element={<Layout handleLogout={handleLogout} />}>
          <Route path="/home" element={<Home />} />
           <Route path="/welcome" element={<Kome />} />
            <Route path="/compiler" element={<Compiler />} /> 

           <Route path="/profile" element={<ProfilePage />} />
           <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/problems/:id" element={<ProblemDetail />} />
           <Route path="/submissions" element={<SubmissionsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
