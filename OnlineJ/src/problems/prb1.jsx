import React, { useState } from 'react';

const ProblemDetail = () => {
  const [language, setLanguage] = useState('Python');
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/submit/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({
          problem_id: 1,
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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <a href="/home" className="text-blue-500 hover:underline mb-4 inline-block">← Back to Problems</a>

      {/* Problem Info */}
      <div className="bg-white p-6 rounded shadow mb-6">
        <h1 className="text-2xl font-bold mb-2">Two Sum</h1>
        <p className="mb-4 text-gray-700">
          Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
        </p>

        <div className="mb-2 text-sm">
          <strong>Constraints:</strong> 1 ≤ nums.length ≤ 10⁵, -10⁹ ≤ nums[i] ≤ 10⁹
        </div>
        <div className="text-sm">
          <strong>Sample Input:</strong> nums = [2,7,11,15], target = 9
        </div>
        <div className="text-sm mb-2">
          <strong>Sample Output:</strong> [0,1]
        </div>
      </div>

      {/* Code Editor */}
      <div className="bg-white p-6 rounded shadow mb-6">
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
      </div>

      {/* Submission Result */}
      {result && (
        <div className="bg-white p-4 rounded shadow">
          <p className={`font-semibold ${result.status === 'Accepted' ? 'text-green-600' : 'text-red-600'}`}>
            Result: {result.status} {result.execution_time ? `⏱ (${result.execution_time}s)` : ''} {result.message ? ` - ${result.message}` : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProblemDetail;
