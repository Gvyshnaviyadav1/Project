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

//       // Redirect to submissions page on success
//       navigate('/submissions');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to submit code. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!problem) {
//     return <p className="p-6">Loading problem...</p>;
//   }
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
// const fetchAiSolution = async () => {
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

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">

//       {/* Top right Back button */}
//       <div className="flex justify-end mb-4">
//         <a href="/home" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
//           ← Back to Problems
//         </a>
//       </div>

//       {/* Two-column layout */}
//       <div className="lg:grid lg:grid-cols-2 lg:gap-6">

//         {/* Problem Info (Left side) */}
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

//           <div className="text-left bg-sky-100 p-2 rounded">
//             <strong>Constraints:</strong>
//             <pre className="whitespace-pre-wrap">{problem.constraints}</pre>
//           </div>
//         </div>

//         {/* Code Editor & Submission (Right side) */}
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

      if (!response.ok) {
        throw new Error('Submission failed');
      }

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
    return <p className="p-6">Loading problem...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-end mb-4">
        <a href="/home" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
          ← Back to Problems
        </a>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-6">
        <div className="bg-white p-6 rounded shadow mb-6 lg:mb-0">
          <h1 className="text-2xl font-bold mb-2 text-left">{problem.title}</h1>
          <p className="mb-4 text-gray-700 text-left">{problem.description}</p>

          <div className="text-left bg-gray-100 p-2 rounded mb-2">
            <strong>Sample Input:</strong>
            <pre className="whitespace-pre-wrap">{problem.sample_input}</pre>
          </div>

          <div className="text-left bg-gray-100 p-2 rounded mb-2">
            <strong>Sample Output:</strong>
            <pre className="whitespace-pre-wrap">{problem.sample_output}</pre>
          </div>

          <div className="text-left bg-sky-100 p-2 rounded mb-4">
            <strong>Constraints:</strong>
            <pre className="whitespace-pre-wrap">{problem.constraints}</pre>
          </div>

          {/* AI Hint */}
          <div className="text-left bg-yellow-50 border border-yellow-200 p-4 rounded mb-4">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-yellow-700">AI Hint</strong>
              <button
                onClick={fetchAiHint}
                disabled={loadingHint}
                className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded"
              >
                {loadingHint ? 'Generating...' : 'Get AI Hint'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-gray-800">{aiHint || "Click the button to get an AI-generated hint."}</pre>
          </div>

          {/* AI Solution */}
          <div className="text-left bg-green-50 border border-green-200 p-4 rounded">
            <div className="flex justify-between items-center mb-2">
              <strong className="text-green-700">AI Solution ({language})</strong>
              <button
                onClick={fetchAiSolution}
                disabled={loadingSolution}
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded"
              >
                {loadingSolution ? 'Generating...' : 'Get AI Solution'}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-gray-800">{aiSolution || "Click the button to get an AI-generated solution."}</pre>
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <label className="block mb-2 font-medium">Language</label>
          <select
            className="mb-4 p-2 border rounded w-full"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>Python</option>
            <option>C++</option>
            <option>Java</option>
          </select>

          <label className="block mb-2 font-medium">Your Code</label>
          <textarea
            rows={12}
            className="w-full border p-2 rounded font-mono text-sm"
            placeholder="# Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-4 py-2 px-4 rounded ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
