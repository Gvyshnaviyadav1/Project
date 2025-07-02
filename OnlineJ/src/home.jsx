
import React, { useEffect, useState } from 'react';
import fetchWithAuth from './fetchWithAuth';
import Navbar from './navbar';

const Home = () => {
  const [username, setUsername] = useState('User');
  const [problems, setProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Get username from localStorage or set default
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);

    // Fetch problem data
    const fetchProblems = async () => {
      try {
        const response = await fetchWithAuth('/api/problems/');

        if (!response.ok) {
          throw new Error('Failed to fetch problems');
        }

        const data = await response.json();
        setProblems(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProblems();
  }, []);

  const getDifficultyStyle = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-200 text-green-800";
      case "Medium":
        return "bg-yellow-200 text-yellow-800";
      case "Hard":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  // Filter problems based on search
  const filteredProblems = problems.filter((problem) =>
    problem.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    
    <div className="min-h-screen bg-gray-50 m-0 p-0">
      
      

      {/* Welcome and Search */}
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {username}</h2>
        <input
          type="text"
          className="w-full p-2 border rounded mb-6"
          placeholder="Search Problems..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Problem List */}
        <div className="grid gap-4">
          {filteredProblems.length === 0 ? (
            <p className="text-gray-500">No matching problems found.</p>
          ) : (
            filteredProblems.map((problem) => (
              <a
                key={problem.id}
                href={`/problems/${problem.id}`}
                className="p-4 bg-white rounded shadow hover:bg-gray-100"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{problem.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${getDifficultyStyle(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;

