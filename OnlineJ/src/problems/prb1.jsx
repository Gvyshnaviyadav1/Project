

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import fetchWithAuth from '../fetchWithAuth';

// const DEFAULT_JAVA_TEMPLATE = `import java.util.Scanner;

// public class Main {
//     public static void main(String[] args) {
//         Scanner scanner = new Scanner(System.in);

//         // Write your logic here

//         scanner.close();
//     }
// }`;

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

//   const [verdict, setVerdict] = useState(''); // 👈 NEW
//   const [verdictDetails, setVerdictDetails] = useState('');
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

//   const handleLanguageChange = (e) => {
//     const selectedLanguage = e.target.value;
//     setLanguage(selectedLanguage);
//     if (selectedLanguage === 'Java') {
//       setCode(DEFAULT_JAVA_TEMPLATE);
//     } else {
//       setCode('');
//     }
//   };

// const handleSubmit = async () => {
//   if (!code.trim()) {
//     alert('Please write some code before submitting!');
//     return;
//   }

//   setLoading(true);
//   try {
//     const response = await fetchWithAuth('/api/submissions/submit/', {
//       method: 'POST',
//       body: JSON.stringify({
//         problem_id: id,
//         language,
//         code,
//       }),
//     });

//     if (!response.ok) throw new Error('Submission failed');

//     const data = await response.json();
//     setVerdict(data.status || 'Submission Result');
//     if(data.status=='Accepted'){
//     setVerdictDetails(data.result_output || '');}
//     else{
//       setVerdictDetails(data.error_message || '');
//     }
    
//     // Scroll to verdict automatically
//     setTimeout(() => {
//       const verdictElement = document.getElementById('verdict-box');
//       if (verdictElement) {
//         verdictElement.scrollIntoView({ behavior: 'smooth' });
//       }
//     }, 100);

//   } catch (err) {
//     console.error(err);
//     setVerdict('Error');
//     setVerdictDetails('Failed to submit code. Please try again.');
//   } finally {
//     setLoading(false);
//   }
// };


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
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
//         <p className="text-blue-800 text-xl">Loading problem...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
//       <div className="flex justify-end mb-6">
//         <a
//           href="/home"
//           className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
//         >
//           ← Back to Problems
//         </a>
//       </div>

//       <div className="lg:grid lg:grid-cols-2 lg:gap-8">
//         {/* Problem Details */}
//         <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-blue-100 transition-all duration-300">
//           <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">{problem.title}</h1>
//           <p className="mb-6 text-gray-800 leading-relaxed">{problem.description}</p>

//           <div className="space-y-4">
//             <div className="bg-blue-100 p-4 rounded-xl">
//               <h2 className="text-blue-800 font-semibold mb-1">Sample Input</h2>
//               <pre className="whitespace-pre-wrap text-gray-700">{problem.sample_input}</pre>
//             </div>

//             <div className="bg-blue-100 p-4 rounded-xl">
//               <h2 className="text-blue-800 font-semibold mb-1">Sample Output</h2>
//               <pre className="whitespace-pre-wrap text-gray-700">{problem.sample_output}</pre>
//             </div>

//             <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl">
//               <h2 className="text-blue-800 font-semibold mb-1">Constraints</h2>
//               <pre className="whitespace-pre-wrap text-gray-700">{problem.constraints}</pre>
//             </div>
//           </div>

//           {/* AI Hint and Solution */}
//           <div className="mt-8 space-y-6">
//             <div className="bg-yellow-50 border border-yellow-200 p-5 rounded-2xl shadow-sm transition-all">
//               <div className="flex justify-between items-center mb-3">
//                 <h3 className="text-yellow-700 text-lg font-semibold">AI Hint</h3>
//                 <button
//                   onClick={fetchAiHint}
//                   disabled={loadingHint}
//                   className={`bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-full shadow transition-transform duration-200 hover:scale-105 ${loadingHint ? 'opacity-70 cursor-not-allowed' : ''}`}
//                 >
//                   {loadingHint ? 'Generating...' : 'Get AI Hint'}
//                 </button>
//               </div>
//               <pre className="whitespace-pre-wrap text-gray-800">{aiHint || "Click to get an AI-generated hint."}</pre>
//             </div>

//             <div className="bg-green-50 border border-green-200 p-5 rounded-2xl shadow-sm transition-all">
//               <div className="flex justify-between items-center mb-3">
//                 <h3 className="text-green-700 text-lg font-semibold">AI Solution ({language})</h3>
//                 <button
//                   onClick={fetchAiSolution}
//                   disabled={loadingSolution}
//                   className={`bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow transition-transform duration-200 hover:scale-105 ${loadingSolution ? 'opacity-70 cursor-not-allowed' : ''}`}
//                 >
//                   {loadingSolution ? 'Generating...' : 'Get AI Solution'}
//                 </button>
//               </div>
//               <pre className="whitespace-pre-wrap text-gray-800">{aiSolution || "Click to get an AI-generated solution."}</pre>
//             </div>
//           </div>
//         </div>

//         {/* Code Editor & Verdict */}
//         <div className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl border border-blue-100 transition-all duration-300 mt-8 lg:mt-0">
//           <h2 className="text-2xl font-bold text-blue-700 mb-4">Your Solution</h2>
//           <label className="block mb-2 text-blue-800 font-medium">Language</label>
//           <select
//             className="mb-6 p-3 border border-blue-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
//             value={language}
//             onChange={handleLanguageChange}
//           >
//             <option>Python</option>
//             <option>C++</option>
//             <option>Java</option>
//           </select>

//           <label className="block mb-2 text-blue-800 font-medium">Your Code</label>
//           <textarea
//             rows={14}
//             className="w-full bg-gray-900 text-green-100 border border-gray-700 p-4 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200"
//             placeholder="# Write your code here..."
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//           ></textarea>

//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className={`mt-6 w-full py-3 rounded-full text-white font-semibold shadow-lg transition-transform duration-300 ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'}`}
//           >
//             {loading ? 'Submitting...' : 'Submit'}
//           </button>

//           {/* ✅ Verdict Output Box */}
//           {verdict && (
//   <div
//     id="verdict-box"
//     className={`mt-4 p-4 rounded-lg shadow border ${
//       verdict === 'Accepted'
//         ? 'bg-green-50 border-green-300 text-green-800'
//         : verdict === 'Compilation Error'
//         ? 'bg-yellow-50 border-yellow-300 text-yellow-800'
//         : 'bg-red-50 border-red-300 text-red-800'
//     }`}
//   >
//     <strong>Verdict:</strong> {verdict}
//     {verdictDetails && (
//       <pre className="mt-2 whitespace-pre-wrap text-sm">{verdictDetails}</pre>
//     )}
//   </div>
// )}


//           {/* Optional link to full submission history */}
//           <a
//             href="/submissions"
//             className="mt-4 inline-block text-sm text-blue-600 hover:underline"
//           >
//             View all submissions
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProblemDetail;
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fetchWithAuth from '../fetchWithAuth';

const DEFAULT_JAVA_TEMPLATE = `import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Write your logic here

        scanner.close();
    }
}`;

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('Python');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [correctedCode, setCorrectedCode] = useState('');
const [loadingCorrection, setLoadingCorrection] = useState(false);
  const [aiHint, setAiHint] = useState('');
  const [aiSolution, setAiSolution] = useState('');
  const [loadingHint, setLoadingHint] = useState(false);
  const [loadingSolution, setLoadingSolution] = useState(false);
  const [loadComplexity,setLoadComplexity] = useState(false);
  const [complexityAnalysis, setComplexityAnalysis] = useState('');

  const [verdict, setVerdict] = useState('');
  const [verdictDetails, setVerdictDetails] = useState('');

  const [selectedTab, setSelectedTab] = useState('Hint');

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
  const fetchAiCorrection = async () => {
  if (!code.trim()) {
    alert('Please write some code first!');
    return;
  }

  setLoadingCorrection(true);
  try {
    const res = await fetchWithAuth(`/api/problems/${id}/ai_correct_code/`, {
      method: 'POST',
      body: JSON.stringify({ code, language }),
    });

    if (!res.ok) throw new Error('Failed to get AI correction');
    const data = await res.json();
    setCorrectedCode(data.corrected_code || '');
  } catch (err) {
    console.error(err);
    alert('Failed to get AI code correction');
  } finally {
    setLoadingCorrection(false);
  }
};
const fetchTimeAndSpaceComplexity = async () => {
  if (!code.trim()) {
    alert('Please write some code first!');
    return;
  }

  setLoadComplexity(true);
  try {
    const res = await fetchWithAuth(`/api/problems/${id}/time_space/`, {
      method: 'POST',
      body: JSON.stringify({ code, language }),
    });

    if (!res.ok) throw new Error('Failed to get complexity analysis');
    const data = await res.json();
    setComplexityAnalysis(data['Time and Space'] || '');
  } catch (err) {
    console.error(err);
    alert('Failed to get time and space complexity');
  } finally {
    setLoadComplexity(false);
  }
};

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    if (selectedLanguage === 'Java') {
      setCode(DEFAULT_JAVA_TEMPLATE);
    } else {
      setCode('');
    }
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      alert('Please write some code before submitting!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetchWithAuth('/api/submissions/submit/', {
        method: 'POST',
        body: JSON.stringify({ problem_id: id, language, code }),
      });

      if (!response.ok) throw new Error('Submission failed');

      const data = await response.json();
      setVerdict(data.status || 'Submission Result');
      if (data.status === 'Accepted') {
        setVerdictDetails(data.result_output || '');
      } else {
        setVerdictDetails(data.error_message || '');
      }

      setTimeout(() => {
        const verdictElement = document.getElementById('verdict-box');
        if (verdictElement) {
          verdictElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      console.error(err);
      setVerdict('Error');
      setVerdictDetails('Failed to submit code. Please try again.');
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
        <a href="/home" className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow-lg transition-transform duration-300 hover:scale-105">← Back to Problems</a>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Problem + Tabs */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100">
          <h1 className="text-3xl font-bold text-blue-700 mb-4">{problem.title}</h1>
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

          {/* Tab Switcher */}
          <div className="mt-8">
            <div className="flex space-x-2 border-b border-blue-200 mb-4">
              {['Hint', 'Solution', 'Modify Code', 'Analysis'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-4 py-2 border-b-2 transition-all ${
                    selectedTab === tab ? 'border-blue-600 text-blue-700 font-semibold' : 'border-transparent text-blue-500 hover:text-blue-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white p-4 rounded-xl shadow border border-blue-100 overflow-y-auto max-h-[500px]">
              {selectedTab === 'Hint' && (
                <div>
                  <button onClick={fetchAiHint} disabled={loadingHint} className={`mb-3 bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-full shadow ${loadingHint ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {loadingHint ? 'Generating...' : 'Get AI Hint'}
                  </button>
                  <pre className="whitespace-pre-wrap text-gray-800">{aiHint || 'Click to get an AI-generated hint.'}</pre>
                </div>
              )}
              {selectedTab === 'Solution' && (
                <div>
                  <button onClick={fetchAiSolution} disabled={loadingSolution} className={`mb-3 bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-full shadow ${loadingSolution ? 'opacity-70 cursor-not-allowed' : ''}`}>
                    {loadingSolution ? 'Generating...' : 'Get AI Solution'}
                  </button>
                  <pre className="whitespace-pre-wrap text-gray-800">{aiSolution || 'Click to get an AI-generated solution.'}</pre>
                </div>
              )}
              {selectedTab === 'Modify Code' && (
                <div>
    <button
      onClick={fetchAiCorrection}
      disabled={loadingCorrection}
      className="mb-3 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full shadow transition-transform duration-200 hover:scale-105"
    >
      {loadingCorrection ? 'Fixing...' : 'Fix My Code'}
    </button>

    {correctedCode && (
      <div className="mt-2">
        <label className="block mb-2 text-blue-800 font-medium">Corrected Code:</label>
        <textarea
          rows={10}
          value={correctedCode}
          readOnly
          className="w-full bg-gray-100 text-gray-800 border border-gray-300 p-3 rounded-lg font-mono text-sm"
        />
        <button
          onClick={() => setCode(correctedCode)}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full shadow transition-transform duration-200 hover:scale-105"
        >
          Use This Code
        </button>
      </div>
    )}
  </div>
              )}
              {selectedTab === 'Analysis' && (
                <div>
    <button
      onClick={fetchTimeAndSpaceComplexity}
      disabled={loadComplexity}
      className="mb-3 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full shadow transition-transform duration-200 hover:scale-105"
    >
      {loadComplexity ? 'Analyzing...' : 'Get Time & Space Complexity'}
    </button>

    {complexityAnalysis && (
      <div className="mt-2">
        <label className="block mb-2 text-blue-800 font-medium">Analysis Result:</label>
        <pre className="bg-gray-100 border border-gray-300 p-3 rounded-lg text-sm whitespace-pre-wrap overflow-auto max-h-64">
          {complexityAnalysis}
        </pre>
      </div>
    )}
  </div>
              )}
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 mt-8 lg:mt-0">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Your Solution</h2>
          <label className="block mb-2 text-blue-800 font-medium">Language</label>
          <select
            className="mb-6 p-3 border border-blue-300 rounded-lg w-full"
            value={language}
            onChange={handleLanguageChange}
          >
            <option>Python</option>
            <option>C++</option>
            <option>Java</option>
          </select>

          <label className="block mb-2 text-blue-800 font-medium">Your Code</label>
          <textarea
            rows={14}
            className="w-full bg-gray-900 text-green-100 border border-gray-700 p-4 rounded-lg font-mono text-sm"
            placeholder="# Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-6 w-full py-3 rounded-full text-white font-semibold shadow-lg ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'}`}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>

          {verdict && (
            <div
              id="verdict-box"
              className={`mt-4 p-4 rounded-lg shadow border ${
                verdict === 'Accepted'
                  ? 'bg-green-50 border-green-300 text-green-800'
                  : verdict === 'Compilation Error'
                  ? 'bg-yellow-50 border-yellow-300 text-yellow-800'
                  : 'bg-red-50 border-red-300 text-red-800'
              }`}
            >
              <strong>Verdict:</strong> {verdict}
              {verdictDetails && (
                <pre className="mt-2 whitespace-pre-wrap text-sm">{verdictDetails}</pre>
              )}
            </div>
          )}

          <a href="/submissions" className="mt-4 inline-block text-sm text-blue-600 hover:underline">
            View all submissions
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;

