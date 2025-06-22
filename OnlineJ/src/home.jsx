import React, { useEffect, useState } from 'react';

const Home = () => {
  const [username, setUsername] = useState('User');
  const [problems, setProblems] = useState([
    { id: 1, title: "Two Sum", difficulty: "Easy" },
    { id: 2, title: "Longest Substring Without Repeating Characters", difficulty: "Medium" },
    { id: 3, title: "Graph Paths", difficulty: "Hard" }
  ]);

  useEffect(() => {
    // Get username from localStorage or set default
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">Online Judge</h1>
        <div className="space-x-4">
          <a href="/home" className="text-gray-700 hover:text-blue-500">Home</a>
          <a href="/submissions" className="text-gray-700 hover:text-blue-500">Submissions</a>
          <button onClick={handleLogout} className="text-red-600 hover:underline">Logout</button>
        </div>
      </div>

      {/* Welcome and Search */}
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {username}</h2>
        <input type="text" className="w-full p-2 border rounded mb-6" placeholder="Search Problems..." />

        {/* Problem List */}
        <div className="grid gap-4">
          {problems.map((problem) => (
            <a key={problem.id} href={`/problems/${problem.id}`} className="p-4 bg-white rounded shadow hover:bg-gray-100">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{problem.title}</h3>
                <span className={`text-xs px-2 py-1 rounded ${getDifficultyStyle(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
