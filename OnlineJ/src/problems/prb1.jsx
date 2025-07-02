

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import fetchWithAuth from '../fetchWithAuth';

// const ProblemDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [problem, setProblem] = useState(null);
//   const [language, setLanguage] = useState('Python');
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [aiHint, setAiHint] = useState('');
//   const [aiSolution, setAiSolution] = useState('');
//   const [loadingHint, setLoadingHint] = useState(false);
//   const [loadingSolution, setLoadingSolution] = useState(false);

//   useEffect(() => {
//     const fetchProblem = async () => {
//       try {
//         const res = await fetchWithAuth(`/api/problems/${id}/`);
//         if (!res.ok) throw new Error('Problem not found');
//         const data = await res.json();
//         setProblem(data);
//       } catch (err) {
//         console.error(err);
//         alert('Could not load problem.');
//         navigate('/home');
//       }
//     };

//     fetchProblem();
//   }, [id, navigate]);

//   const handleSubmit = async () => {
//     if (!code.trim()) {
//       alert('Please write some code before submitting!');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetchWithAuth('/api/submissions/submit/', {
//         method: 'POST',
//         body: JSON.stringify({
//           problem_id: id,
//           language,
//           code,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Submission failed');
//       }

//       navigate('/submissions');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to submit code. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAiHint = async () => {
//     setLoadingHint(true);
//     try {
//       const res = await fetchWithAuth(`/api/problems/${id}/ai_hint/`);
//       if (!res.ok) throw new Error('Failed to get AI hint');
//       const data = await res.json();
//       setAiHint(data.hint);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to get AI hint');
//     } finally {
//       setLoadingHint(false);
//     }
//   };

//   const fetchAiSolution = async () => {
//     setLoadingSolution(true);
//     try {
//       const res = await fetchWithAuth(`/api/problems/${id}/ai_solution/?language=${encodeURIComponent(language)}`);
//       if (!res.ok) throw new Error('Failed to get AI solution');
//       const data = await res.json();
//       setAiSolution(data.solution);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to get AI solution');
//     } finally {
//       setLoadingSolution(false);
//     }
//   };

//   if (!problem) {
//     return <p className="p-6">Loading problem...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="flex justify-end mb-4">
//         <a href="/home" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
//           ← Back to Problems
//         </a>
//       </div>

//       <div className="lg:grid lg:grid-cols-2 lg:gap-6">
//         <div className="bg-white p-6 rounded shadow mb-6 lg:mb-0">
//           <h1 className="text-2xl font-bold mb-2 text-left">{problem.title}</h1>
//           <p className="mb-4 text-gray-700 text-left">{problem.description}</p>

//           <div className="text-left bg-gray-100 p-2 rounded mb-2">
//             <strong>Sample Input:</strong>
//             <pre className="whitespace-pre-wrap">{problem.sample_input}</pre>
//           </div>

//           <div className="text-left bg-gray-100 p-2 rounded mb-2">
//             <strong>Sample Output:</strong>
//             <pre className="whitespace-pre-wrap">{problem.sample_output}</pre>
//           </div>

//           <div className="text-left bg-sky-100 p-2 rounded mb-4">
//             <strong>Constraints:</strong>
//             <pre className="whitespace-pre-wrap">{problem.constraints}</pre>
//           </div>

//           {/* AI Hint */}
//           <div className="text-left bg-yellow-50 border border-yellow-200 p-4 rounded mb-4">
//             <div className="flex justify-between items-center mb-2">
//               <strong className="text-yellow-700">AI Hint</strong>
//               <button
//                 onClick={fetchAiHint}
//                 disabled={loadingHint}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
//               >
//                 {loadingHint ? 'Generating...' : 'Get AI Hint'}
//               </button>
//             </div>
//             <pre className="whitespace-pre-wrap text-gray-800">{aiHint || "Click the button to get an AI-generated hint."}</pre>
//           </div>

//           {/* AI Solution */}
//           <div className="text-left bg-green-50 border border-green-200 p-4 rounded">
//             <div className="flex justify-between items-center mb-2">
//               <strong className="text-green-700">AI Solution ({language})</strong>
//               <button
//                 onClick={fetchAiSolution}
//                 disabled={loadingSolution}
//                 className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
//               >
//                 {loadingSolution ? 'Generating...' : 'Get AI Solution'}
//               </button>
//             </div>
//             <pre className="whitespace-pre-wrap text-gray-800">{aiSolution || "Click the button to get an AI-generated solution."}</pre>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded shadow">
//           <label className="block mb-2 font-medium">Language</label>
//           <select
//             className="mb-4 p-2 border rounded w-full"
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//           >
//             <option>Python</option>
//             <option>C++</option>
//             <option>Java</option>
//           </select>

//           <label className="block mb-2 font-medium">Your Code</label>
//           <textarea
//             rows={12}
//             className="w-full border p-2 rounded font-mono text-sm"
//             placeholder="# Write your code here..."
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//           ></textarea>

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`mt-4 py-2 px-4 rounded ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
//           >
//             {loading ? 'Submitting...' : 'Submit'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemDetail;
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import fetchWithAuth from '../fetchWithAuth';

// const ProblemDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [problem, setProblem] = useState(null);
//   const [language, setLanguage] = useState('Python');
//   const [code, setCode] = useState('');
//   const [loading, setLoading] = useState(false);

//   const [aiHint, setAiHint] = useState('');
//   const [aiSolution, setAiSolution] = useState('');
//   const [loadingHint, setLoadingHint] = useState(false);
//   const [loadingSolution, setLoadingSolution] = useState(false);

//   useEffect(() => {
//     const fetchProblem = async () => {
//       try {
//         const res = await fetchWithAuth(`/api/problems/${id}/`);
//         if (!res.ok) throw new Error('Problem not found');
//         const data = await res.json();
//         setProblem(data);
//       } catch (err) {
//         console.error(err);
//         alert('Could not load problem.');
//         navigate('/home');
//       }
//     };

//     fetchProblem();
//   }, [id, navigate]);

//   const handleSubmit = async () => {
//     if (!code.trim()) {
//       alert('Please write some code before submitting!');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetchWithAuth('/api/submissions/submit/', {
//         method: 'POST',
//         body: JSON.stringify({
//           problem_id: id,
//           language,
//           code,
//         }),
//       });

//       if (!response.ok) throw new Error('Submission failed');

//       navigate('/submissions');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to submit code. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAiHint = async () => {
//     setLoadingHint(true);
//     try {
//       const res = await fetchWithAuth(`/api/problems/${id}/ai_hint/`);
//       if (!res.ok) throw new Error('Failed to get AI hint');
//       const data = await res.json();
//       setAiHint(data.hint);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to get AI hint');
//     } finally {
//       setLoadingHint(false);
//     }
//   };

//   const fetchAiSolution = async () => {
//     setLoadingSolution(true);
//     try {
//       const res = await fetchWithAuth(`/api/problems/${id}/ai_solution/?language=${encodeURIComponent(language)}`);
//       if (!res.ok) throw new Error('Failed to get AI solution');
//       const data = await res.json();
//       setAiSolution(data.solution);
//     } catch (err) {
//       console.error(err);
//       alert('Failed to get AI solution');
//     } finally {
//       setLoadingSolution(false);
//     }
//   };

//   if (!problem) {
//     return <p className="p-6 text-blue-800">Loading problem...</p>;
//   }

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="flex justify-end mb-6">
//         <a
//           href="/home"
//           className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition duration-200"
//         >
//           ← Back to Problems
//         </a>
//       </div>

//       <div className="lg:grid lg:grid-cols-2 lg:gap-8">
//         <div className="bg-white p-6 rounded-2xl shadow-lg mb-8 lg:mb-0 border border-blue-100">
//           <h1 className="text-3xl font-bold mb-4 text-blue-700">{problem.title}</h1>
//           <p className="mb-6 text-gray-800">{problem.description}</p>

//           <div className="bg-blue-100 p-3 rounded-lg mb-3">
//             <strong className="text-blue-800">Sample Input:</strong>
//             <pre className="whitespace-pre-wrap mt-1 text-gray-700">{problem.sample_input}</pre>
//           </div>

//           <div className="bg-blue-100 p-3 rounded-lg mb-3">
//             <strong className="text-blue-800">Sample Output:</strong>
//             <pre className="whitespace-pre-wrap mt-1 text-gray-700">{problem.sample_output}</pre>
//           </div>

//           <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-6">
//             <strong className="text-blue-800">Constraints:</strong>
//             <pre className="whitespace-pre-wrap mt-1 text-gray-700">{problem.constraints}</pre>
//           </div>

//           {/* AI Hint */}
//           <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6 shadow-sm">
//             <div className="flex justify-between items-center mb-3">
//               <strong className="text-yellow-700 text-lg">AI Hint</strong>
//               <button
//                 onClick={fetchAiHint}
//                 disabled={loadingHint}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-full transition duration-200"
//               >
//                 {loadingHint ? 'Generating...' : 'Get AI Hint'}
//               </button>
//             </div>
//             <pre className="whitespace-pre-wrap text-gray-800">{aiHint || "Click to get an AI-generated hint."}</pre>
//           </div>

//           {/* AI Solution */}
//           <div className="bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm">
//             <div className="flex justify-between items-center mb-3">
//               <strong className="text-green-700 text-lg">AI Solution ({language})</strong>
//               <button
//                 onClick={fetchAiSolution}
//                 disabled={loadingSolution}
//                 className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full transition duration-200"
//               >
//                 {loadingSolution ? 'Generating...' : 'Get AI Solution'}
//               </button>
//             </div>
//             <pre className="whitespace-pre-wrap text-gray-800">{aiSolution || "Click to get an AI-generated solution."}</pre>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
//           <label className="block mb-2 text-blue-800 font-medium">Language</label>
//           <select
//             className="mb-6 p-2 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
//             value={language}
//             onChange={(e) => setLanguage(e.target.value)}
//           >
//             <option>Python</option>
//             <option>C++</option>
//             <option>Java</option>
//           </select>

//           <label className="block mb-2 text-blue-800 font-medium">Your Code</label>
//           <textarea
//             rows={12}
//             className="w-full border border-blue-300 p-3 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
//             placeholder="# Write your code here..."
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//           ></textarea>

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`mt-6 w-full py-3 rounded-full text-white font-semibold transition duration-200 ${
//               loading
//                 ? 'bg-blue-300 cursor-not-allowed'
//                 : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {loading ? 'Submitting...' : 'Submit'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemDetail;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fetchWithAuth from '../fetchWithAuth';

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('Python');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const [aiHint, setAiHint] = useState('');
  const [aiSolution, setAiSolution] = useState('');
  const [loadingHint, setLoadingHint] = useState(false);
  const [loadingSolution, setLoadingSolution] = useState(false);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetchWithAuth(`/api/problems/${id}/`);
        if (!res.ok) throw new Error('Problem not found');
        const data = await res.json();
        setProblem(data);
      } catch (err) {
        console.error(err);
        alert('Could not load problem.');
        navigate('/home');
      }
    };

    fetchProblem();
  }, [id, navigate]);

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert('Please write some code before submitting!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth('/api/submissions/submit/', {
        method: 'POST',
        body: JSON.stringify({
          problem_id: id,
          language,
          code,
        }),
      });

      if (!response.ok) throw new Error('Submission failed');

      navigate('/submissions');
    } catch (err) {
      console.error(err);
      alert('Failed to submit code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchAiHint = async () => {
    setLoadingHint(true);
    try {
      const res = await fetchWithAuth(`/api/problems/${id}/ai_hint/`);
      if (!res.ok) throw new Error('Failed to get AI hint');
      const data = await res.json();
      setAiHint(data.hint);
    } catch (err) {
      console.error(err);
      alert('Failed to get AI hint');
    } finally {
      setLoadingHint(false);
    }
  };

  const fetchAiSolution = async () => {
    setLoadingSolution(true);
    try {
      const res = await fetchWithAuth(`/api/problems/${id}/ai_solution/?language=${encodeURIComponent(language)}`);
      if (!res.ok) throw new Error('Failed to get AI solution');
      const data = await res.json();
      setAiSolution(data.solution);
    } catch (err) {
      console.error(err);
      alert('Failed to get AI solution');
    } finally {
      setLoadingSolution(false);
    }
  };

  if (!problem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <p className="text-blue-800 text-xl">Loading problem...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="flex justify-end mb-6">
        <a
          href="/home"
          className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
        >
          ← Back to Problems
        </a>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Problem Details Section */}
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-blue-100 transition-all duration-300">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">{problem.title}</h1>
          <p className="mb-6 text-gray-800 leading-relaxed">{problem.description}</p>

          <div className="space-y-4">
            <div className="bg-blue-100 p-4 rounded-xl">
              <h2 className="text-blue-800 font-semibold mb-1">Sample Input</h2>
              <pre className="whitespace-pre-wrap text-gray-700">{problem.sample_input}</pre>
            </div>

            <div className="bg-blue-100 p-4 rounded-xl">
              <h2 className="text-blue-800 font-semibold mb-1">Sample Output</h2>
              <pre className="whitespace-pre-wrap text-gray-700">{problem.sample_output}</pre>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
              <h2 className="text-blue-800 font-semibold mb-1">Constraints</h2>
              <pre className="whitespace-pre-wrap text-gray-700">{problem.constraints}</pre>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl shadow-sm transition-all">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-yellow-700 text-lg font-semibold">AI Hint</h3>
                <button
                  onClick={fetchAiHint}
                  disabled={loadingHint}
                  className={`bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-full shadow transition-transform duration-200 hover:scale-105 ${
                    loadingHint ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loadingHint ? (
                    <span className="flex items-center">
                      <svg className="animate-spin mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    'Get AI Hint'
                  )}
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-gray-800">{aiHint || "Click to get an AI-generated hint."}</pre>
            </div>

            <div className="bg-green-50 border border-green-200 p-5 rounded-2xl shadow-sm transition-all">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-green-700 text-lg font-semibold">AI Solution ({language})</h3>
                <button
                  onClick={fetchAiSolution}
                  disabled={loadingSolution}
                  className={`bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow transition-transform duration-200 hover:scale-105 ${
                    loadingSolution ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loadingSolution ? (
                    <span className="flex items-center">
                      <svg className="animate-spin mr-2 h-4 w-4 text-white" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                      Generating...
                    </span>
                  ) : (
                    'Get AI Solution'
                  )}
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-gray-800">{aiSolution || "Click to get an AI-generated solution."}</pre>
            </div>
          </div>
        </div>

        {/* Code Editor Section */}
        <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-blue-100 transition-all duration-300 mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Your Solution</h2>
          <label className="block mb-2 text-blue-800 font-medium">Language</label>
          <select
            className="mb-6 p-3 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>Python</option>
            <option>C++</option>
            <option>Java</option>
          </select>

          <label className="block mb-2 text-blue-800 font-medium">Your Code</label>
          <textarea
            rows={14}
            className="w-full bg-gray-900 text-green-100 border border-gray-700 p-4 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
            placeholder="# Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-6 w-full py-3 rounded-full text-white font-semibold shadow-lg transition-transform duration-300 ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin mr-2 h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;

