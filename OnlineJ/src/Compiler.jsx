import React, { useState } from 'react';
import fetchWithAuth from './fetchWithAuth'; // adjust path as needed

const Compiler = () => {
  const [language, setLanguage] = useState('py');
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setStatus('');
    setOutput('');

    try {
      const response = await fetchWithAuth('/api/compiler/compile/', {
        method: 'POST',
        body: JSON.stringify({
          language,
          code,
          input,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === 'Success') {
        setOutput(data.output.output);
        setStatus('✅ Success');
      } else {
        setOutput(data.error || 'Unknown Error');
        setStatus('❌ Error');
      }
    } catch (err) {
      console.error(err);
      setOutput('Something went wrong. Try again later.');
      setStatus('❌ Error');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 space-y-6 border border-blue-200">
        <h1 className="text-3xl font-bold text-blue-700 text-center">🌐 Online Code Compiler</h1>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <select
            className="p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="py">Python</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>

          <button
            onClick={handleRun}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            {loading ? 'Running...' : 'Run Code'}
          </button>
        </div>

        <div>
          <label className="block text-blue-600 font-semibold mb-2">💻 Code</label>
          <textarea
            rows="12"
            className="w-full p-3 border border-blue-300 rounded bg-blue-50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block text-blue-600 font-semibold mb-2">🧾 Input (stdin)</label>
          <textarea
            rows="3"
            className="w-full p-2 border border-blue-200 rounded bg-blue-50 font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Input for your program (optional)..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block text-blue-600 font-semibold mb-2">📤 Output</label>
          <textarea
            rows="6"
            readOnly
            className={`w-full p-3 rounded font-mono text-sm ${
              status.includes('Success')
                ? 'bg-green-100 border border-green-400 text-green-700'
                : 'bg-red-100 border border-red-400 text-red-700'
            }`}
            value={output || (loading ? 'Running...' : '')}
          ></textarea>
        </div>

        {status && (
          <div
            className={`text-center font-bold text-lg ${
              status.includes('Success') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default Compiler;
