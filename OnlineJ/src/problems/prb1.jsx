
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import fetchWithAuth from '../fetchWithAuth';

const ProblemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('Python');
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);

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
    try {
      const response = await fetchWithAuth('/api/submit/', {
        method: 'POST',
        body: JSON.stringify({
          problem_id: id,
          language,
          code,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({ status: 'Error', message: 'Failed to submit code.' });
    }
  };

  if (!problem) {
    return <p className="p-6">Loading problem...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Top right Back button */}
      <div className="flex justify-end mb-4">
        <a href="/home" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm">
          ← Back to Problems
        </a>
      </div>

      {/* Two-column layout */}
      <div className="lg:grid lg:grid-cols-2 lg:gap-6">

        {/* Problem Info (Left side) */}
        <div className="bg-white p-6 rounded shadow mb-6 lg:mb-0">
          <h1 className="text-2xl font-bold mb-2 text-left">{problem.title}</h1>
          <p className="mb-4 text-gray-700 text-left">{problem.description}</p>

          
          <div className="text text-left bg-gray-100">
            <strong>Sample Input:</strong> 
            <p> {problem.sample_input} </p>
            <br/>
          </div>
          <div className="text mb-2 text-left bg-gray-100">
            <strong>Sample Output:</strong>
            <p>{problem.sample_output}</p> 
          </div>
          <div className="mb-2  text-left bg-sky-100">
            <strong>Constraints:</strong> 
           <p> {problem.constraints}</p>
          </div>
        </div>

        {/* Code Editor & Submission (Right side) */}
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
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Submit
          </button>

          {/* Submission Result */}
          {result && (
            <div className="mt-4 bg-gray-50 border rounded p-4">
              <p className={`font-semibold ${result.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>
                Result: {result.status}
                {result.execution_time ? ` ⏱ ${result.execution_time}s` : ''}
                {result.message ? ` - ${result.message}` : ''}
              </p>

              {result.result_output && (
                <pre className="mt-2 p-2 bg-gray-100 rounded text-sm whitespace-pre-wrap">
                  {result.result_output}
                </pre>
              )}
              {result.error_message && (
                <pre className="mt-2 p-2 bg-red-100 rounded text-sm whitespace-pre-wrap text-red-700">
                  {result.error_message}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;

