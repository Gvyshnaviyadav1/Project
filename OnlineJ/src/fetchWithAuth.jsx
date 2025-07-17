// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
//  // update to your backend URL

// const fetchWithAuth = async (url, options = {}) => {
//   let access = localStorage.getItem('access_token');
//   const refresh = localStorage.getItem('refresh_token');

//   // Add access token to headers
//   options.headers = {
//     ...options.headers,
//     'Authorization': `Bearer ${access}`,
//     'Content-Type': 'application/json',
//   };

//   let response = await fetch(`${API_BASE}${url}`, options);

//   // Handle expired access token
//   if (response.status === 401 && refresh) {
//     const refreshRes = await fetch(`${API_BASE}/api/token/refresh/`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ refresh }),
//     });

//     if (refreshRes.ok) {
//       const data = await refreshRes.json();
//       localStorage.setItem('access_token', data.access);
//       access = data.access;

//       // Retry original request
//       options.headers.Authorization = `Bearer ${access}`;
//       response = await fetch(`${API_BASE}${url}`, options);
//     } else {
//       // Refresh failed — log out
//       localStorage.clear();
//       window.location.href = '/login';
//     }
//   }

//   return response;
// };

// export default fetchWithAuth;
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const fetchWithAuth = async (url, options = {}) => {
  let access = localStorage.getItem('access_token');
  const refresh = localStorage.getItem('refresh_token');

  // Clone headers if not provided
  let headers = {
    ...(options.headers || {}),
    'Authorization': `Bearer ${access}`,
    'Content-Type': 'application/json',
  };

  let config = {
    ...options,
    headers,
  };

  let response = await fetch(`${API_BASE}${url}`, config);

  if (response.status === 401 && refresh) {
    // Try refreshing token
    const refreshRes = await fetch(`${API_BASE}/api/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh }),
    });

    if (refreshRes.ok) {
      const data = await refreshRes.json();
      localStorage.setItem('access_token', data.access);
      access = data.access;

      // Retry with new token
      config.headers.Authorization = `Bearer ${access}`;
      response = await fetch(`${API_BASE}${url}`, config);
    } else {
      // Refresh failed — logout
      localStorage.clear();
      window.location.href = '/login';
    }
  }

  return response;
};

export default fetchWithAuth;
