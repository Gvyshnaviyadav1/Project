import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import fetchWithAuth from './fetchWithAuth';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchWithAuth('/api/submissions/my/');
      const data = await res.json();
      setSubmissions(data);
    };
    fetchData();
  }, []);

  const toggleExpanded = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-8 border-b-2 border-blue-200 pb-3">
          My Submissions
        </h1>

        <div className="overflow-x-auto rounded-lg border border-blue-200 shadow-sm">
          <table className="min-w-full text-sm text-blue-900">
            <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
              <tr>
                <th className="p-4 text-left font-semibold">Problem</th>
                <th className="p-4 text-left font-semibold">Language</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, index) => (
                <React.Fragment key={sub.id}>
                  <tr
                    className={`${
                      index % 2 === 0 ? 'bg-white' : 'bg-blue-50'
                    } border-t border-blue-200 hover:bg-blue-100 transition-colors`}
                  >
                    <td className="p-4">{sub.problem_title}</td>
                    <td className="p-4">{sub.language}</td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-bold ${
                          sub.status === 'Accepted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleExpanded(sub.id)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
                      >
                        {expanded[sub.id] ? (
                          <>
                            Hide Details <ChevronUpIcon className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            View Details <ChevronDownIcon className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </td>
                  </tr>

                  {expanded[sub.id] && (
                    <tr className="border-t border-blue-200 bg-blue-50 transition-all">
                      <td colSpan="4" className="p-6">
                        <div className="bg-white rounded-xl shadow-md p-5 border border-blue-100 space-y-5">
                          <div>
                            <strong className="block text-blue-700 mb-2">Submitted Code:</strong>
                            <pre className="bg-gray-50 border border-blue-100 p-3 rounded-lg text-sm overflow-x-auto shadow-inner">
                              {sub.code}
                            </pre>
                          </div>

                          {sub.error_message && (
                            <div>
                              <strong className="block text-red-700 mb-2">Error Message:</strong>
                              <pre className="bg-red-50 border border-red-200 p-3 rounded-lg text-sm overflow-x-auto shadow-inner">
                                {sub.error_message}
                              </pre>
                            </div>
                          )}

                          {sub.result_output && (
                            <div>
                              <strong className="block text-blue-700 mb-2">Result Output:</strong>
                              <pre className="bg-gray-50 border border-blue-100 p-3 rounded-lg text-sm overflow-x-auto shadow-inner">
                                {sub.result_output}
                              </pre>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


