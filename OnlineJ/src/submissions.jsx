// // SubmissionsPage.jsx
// import React, { useEffect, useState } from 'react';
// import fetchWithAuth from './fetchWithAuth';

// export default function SubmissionsPage() {
//   const [submissions, setSubmissions] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetchWithAuth('/api/submissions/my/');
//       const data = await res.json();
//       setSubmissions(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">My Submissions</h1>
//       <table className="w-full text-left border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2">Problem</th>
//             <th className="p-2">Language</th>
//             <th className="p-2">Status</th>
//             <th className="p-2">Time</th>
//           </tr>
//         </thead>
//         <tbody>
//           {submissions.map((sub) => (
//             <tr key={sub.id} className="border-t">
//               <td className="p-2">{sub.problem_title}</td>
//               <td className="p-2">{sub.language}</td>
//               <td className="p-2">{sub.status}</td>
//               <td className="p-2">{new Date(sub.submitted_at).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
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
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">My Submissions</h1>
      <table className="w-full text-left border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Problem</th>
            <th className="p-2">Language</th>
            <th className="p-2">Status</th>
            {/* <th className="p-2">Time</th> */}
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {submissions.map((sub) => (
            <React.Fragment key={sub.id}>
              <tr className="border-t">
                <td className="p-2">{sub.problem_title}</td>
                <td className="p-2">{sub.language}</td>
                <td className="p-2">
                  <span
                    className={
                      sub.status === 'Accepted'
                        ? 'text-green-600'
                        : 'text-red-600'
                    }
                  >
                    {sub.status}
                  </span>
                </td>
                {/* <td className="p-2">
                  {new Date(sub.submitted_at).toLocaleString()}
                </td> */}
                <td className="p-2">
                  <button
                    onClick={() => toggleExpanded(sub.id)}
                    className="text-blue-600 underline"
                  >
                    {expanded[sub.id] ? 'Hide Details' : 'View Details'}
                  </button>
                </td>
              </tr>

              {expanded[sub.id] && (
                <tr className="border-t bg-gray-50">
                  <td colSpan="5" className="p-4">
                    <div className="mb-2">
                      <strong>Submitted Code:</strong>
                      <pre className="bg-white p-2 rounded border overflow-x-auto">
                        {sub.code}
                      </pre>
                    </div>

                    {sub.error_message && (
                      <div className="mb-2 text-red-700">
                        <strong>Error Message:</strong>
                        <pre className="bg-red-50 p-2 rounded border overflow-x-auto">
                          {sub.error_message}
                        </pre>
                      </div>
                    )}

                    {sub.result_output && (
                      <div className="mb-2">
                        <strong>Result Output:</strong>
                        <pre className="bg-white p-2 rounded border overflow-x-auto">
                          {sub.result_output}
                        </pre>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
