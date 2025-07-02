
// import React, { useEffect, useState } from 'react';
// import fetchWithAuth from './fetchWithAuth';
// import Navbar from './navbar';

// const Home = () => {
//   const [username, setUsername] = useState('User');
//   const [problems, setProblems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     // Get username from localStorage or set default
//     const storedUsername = localStorage.getItem('username');
//     if (storedUsername) setUsername(storedUsername);

//     // Fetch problem data
//     const fetchProblems = async () => {
//       try {
//         const response = await fetchWithAuth('/api/problems/');

//         if (!response.ok) {
//           throw new Error('Failed to fetch problems');
//         }

//         const data = await response.json();
//         setProblems(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchProblems();
//   }, []);

//   const getDifficultyStyle = (difficulty) => {
//     switch (difficulty) {
//       case "Easy":
//         return "bg-green-200 text-green-800";
//       case "Medium":
//         return "bg-yellow-200 text-yellow-800";
//       case "Hard":
//         return "bg-red-200 text-red-800";
//       default:
//         return "bg-gray-200 text-gray-800";
//     }
//   };

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = '/login';
//   };

//   // Filter problems based on search
//   const filteredProblems = problems.filter((problem) =>
//     problem.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
    
//     <div className="min-h-screen bg-gray-50 m-0 p-0">
      
      

//       {/* Welcome and Search */}
//       <div className="p-4">
//         <h2 className="text-2xl font-semibold mb-4">Welcome, {username}</h2>
//         <input
//           type="text"
//           className="w-full p-2 border rounded mb-6"
//           placeholder="Search Problems..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />

//         {/* Problem List */}
//         <div className="grid gap-4">
//           {filteredProblems.length === 0 ? (
//             <p className="text-gray-500">No matching problems found.</p>
//           ) : (
//             filteredProblems.map((problem) => (
//               <a
//                 key={problem.id}
//                 href={`/problems/${problem.id}`}
//                 className="p-4 bg-white rounded shadow hover:bg-gray-100"
//               >
//                 <div className="flex justify-between items-center">
//                   <h3 className="text-lg font-semibold">{problem.title}</h3>
//                   <span className={`text-xs px-2 py-1 rounded ${getDifficultyStyle(problem.difficulty)}`}>
//                     {problem.difficulty}
//                   </span>
//                 </div>
//               </a>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Home;

import React, { useEffect, useState } from 'react';
import fetchWithAuth from './fetchWithAuth';
import { Filter } from 'lucide-react'; // Lucide icon

const Home = () => {
  const [username, setUsername] = useState('User');
  const [problems, setProblems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) setUsername(storedUsername);

    const fetchProblems = async () => {
      try {
        const response = await fetchWithAuth('/api/problems/');
        if (!response.ok) throw new Error('Failed to fetch problems');
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
      case 'Easy':
        return 'bg-green-100 text-green-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Hard':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredProblems = problems.filter(
    (problem) =>
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (difficultyFilter === 'All' || problem.difficulty === difficultyFilter)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Welcome Message */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Welcome, {username}</h2>
          <p className="text-gray-600 text-sm">Solve problems and improve your skills.</p>
        </div>

        {/* Search & Filter Controls */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search Input */}
          <input
            type="text"
            className="flex-1 px-4 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm transition"
            placeholder="🔍 Search Problems..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Difficulty Filter */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition"
            >
              <Filter size={18} />
              <span className="text-sm">Filter: {difficultyFilter}</span>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-blue-100 rounded-xl shadow-lg z-10">
                {['All', 'Easy', 'Medium', 'Hard'].map((level) => (
                  <button
                    key={level}
                    onClick={() => {
                      setDifficultyFilter(level);
                      setShowDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 ${
                      level === difficultyFilter ? 'bg-blue-100 font-medium text-blue-700' : ''
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Problem List */}
        <div className="grid gap-4">
          {filteredProblems.length === 0 ? (
            <p className="text-gray-500 text-center">No matching problems found.</p>
          ) : (
            filteredProblems.map((problem) => (
              <a
                key={problem.id}
                href={`/problems/${problem.id}`}
                className="block bg-white rounded-2xl border border-blue-100 shadow hover:shadow-lg transition-all duration-300 p-5 hover:-translate-y-1"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-blue-800">{problem.title}</h3>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${getDifficultyStyle(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
