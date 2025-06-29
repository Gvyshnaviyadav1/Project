// SubmissionsPage.jsx
import React, { useEffect, useState } from 'react';
import fetchWithAuth from './fetchWithAuth';

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchWithAuth('/api/submissions/my/');
      const data = await res.json();
      setSubmissions(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Submissions</h1>
      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Problem</th>
            <th className="p-2">Language</th>
            <th className="p-2">Status</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <tr key={sub.id} className="border-t">
              <td className="p-2">{sub.problem_title}</td>
              <td className="p-2">{sub.language}</td>
              <td className="p-2">{sub.status}</td>
              <td className="p-2">{new Date(sub.submitted_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
