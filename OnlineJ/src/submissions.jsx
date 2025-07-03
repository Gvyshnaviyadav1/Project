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
// import React, { useEffect, useState } from 'react';
// import fetchWithAuth from './fetchWithAuth';

// export default function SubmissionsPage() {
//   const [submissions, setSubmissions] = useState([]);
//   const [expanded, setExpanded] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetchWithAuth('/api/submissions/my/');
//       const data = await res.json();
//       setSubmissions(data);
//     };
//     fetchData();
//   }, []);

//   const toggleExpanded = (id) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-xl font-bold mb-4">My Submissions</h1>
//       <table className="w-full text-left border">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-2">Problem</th>
//             <th className="p-2">Language</th>
//             <th className="p-2">Status</th>
            
//             <th className="p-2">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {submissions.map((sub) => (
//             <React.Fragment key={sub.id}>
//               <tr className="border-t">
//                 <td className="p-2">{sub.problem_title}</td>
//                 <td className="p-2">{sub.language}</td>
//                 <td className="p-2">
//                   <span
//                     className={
//                       sub.status === 'Accepted'
//                         ? 'text-green-600'
//                         : 'text-red-600'
//                     }
//                   >
//                     {sub.status}
//                   </span>
//                 </td>
               
//                 <td className="p-2">
//                   <button
//                     onClick={() => toggleExpanded(sub.id)}
//                     className="text-blue-600 underline"
//                   >
//                     {expanded[sub.id] ? 'Hide Details' : 'View Details'}
//                   </button>
//                 </td>
//               </tr>

//               {expanded[sub.id] && (
//                 <tr className="border-t bg-gray-50">
//                   <td colSpan="5" className="p-4">
//                     <div className="mb-2">
//                       <strong>Submitted Code:</strong>
//                       <pre className="bg-white p-2 rounded border overflow-x-auto">
//                         {sub.code}
//                       </pre>
//                     </div>

//                     {sub.error_message && (
//                       <div className="mb-2 text-red-700">
//                         <strong>Error Message:</strong>
//                         <pre className="bg-red-50 p-2 rounded border overflow-x-auto">
//                           {sub.error_message}
//                         </pre>
//                       </div>
//                     )}

//                     {sub.result_output && (
//                       <div className="mb-2">
//                         <strong>Result Output:</strong>
//                         <pre className="bg-white p-2 rounded border overflow-x-auto">
//                           {sub.result_output}
//                         </pre>
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               )}
//             </React.Fragment>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// import React, { useEffect, useState } from 'react';
// import fetchWithAuth from './fetchWithAuth';

// export default function SubmissionsPage() {
//   const [submissions, setSubmissions] = useState([]);
//   const [expanded, setExpanded] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetchWithAuth('/api/submissions/my/');
//       const data = await res.json();
//       setSubmissions(data);
//     };
//     fetchData();
//   }, []);

//   const toggleExpanded = (id) => {
//     setExpanded((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-blue-50 p-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
//         <h1 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">My Submissions</h1>

//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-blue-200 rounded-lg">
//             <thead className="bg-blue-100">
//               <tr>
//                 <th className="p-3 text-blue-800 font-medium">Problem</th>
//                 <th className="p-3 text-blue-800 font-medium">Language</th>
//                 <th className="p-3 text-blue-800 font-medium">Status</th>
//                 <th className="p-3 text-blue-800 font-medium">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {submissions.map((sub, index) => (
//                 <React.Fragment key={sub.id}>
//                   <tr
//                     className={`${
//                       index % 2 === 0 ? 'bg-white' : 'bg-blue-50'
//                     } border-t border-blue-200`}
//                   >
//                     <td className="p-3">{sub.problem_title}</td>
//                     <td className="p-3">{sub.language}</td>
//                     <td className="p-3">
//                       <span
//                         className={
//                           sub.status === 'Accepted'
//                             ? 'text-green-600 font-semibold'
//                             : 'text-red-600 font-semibold'
//                         }
//                       >
//                         {sub.status}
//                       </span>
//                     </td>
//                     <td className="p-3">
//                       <button
//                         onClick={() => toggleExpanded(sub.id)}
//                         className="text-blue-600 hover:text-blue-800 underline transition duration-150"
//                       >
//                         {expanded[sub.id] ? 'Hide Details' : 'View Details'}
//                       </button>
//                     </td>
//                   </tr>

//                   {expanded[sub.id] && (
//                     <tr className="border-t border-blue-200 bg-blue-50">
//                       <td colSpan="4" className="p-4">
//                         <div className="mb-4">
//                           <strong className="block text-blue-700 mb-1">Submitted Code:</strong>
//                           <pre className="bg-white border border-blue-100 p-3 rounded-lg text-sm overflow-x-auto shadow-inner">
//                             {sub.code}
//                           </pre>
//                         </div>

//                         {sub.error_message && (
//                           <div className="mb-4">
//                             <strong className="block text-red-700 mb-1">Error Message:</strong>
//                             <pre className="bg-red-50 border border-red-100 p-3 rounded-lg text-sm overflow-x-auto shadow-inner">
//                               {sub.error_message}
//                             </pre>
//                           </div>
//                         )}

//                         {sub.result_output && (
//                           <div>
//                             <strong className="block text-blue-700 mb-1">Result Output:</strong>
//                             <pre className="bg-white border border-blue-100 p-3 rounded-lg text-sm overflow-x-auto shadow-inner">
//                               {sub.result_output}
//                             </pre>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }
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


