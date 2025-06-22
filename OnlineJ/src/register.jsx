import React, { useState } from 'react';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg('Registration successful! Redirecting to login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      } else {
        setErrorMsg(data.detail || 'Registration failed');
      }
    } catch (err) {
      setErrorMsg('Server error. Try again later.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create Account</h2>
        <form onSubmit={handleRegister}>
          <label className="block mb-2 text-sm font-semibold">Username</label>
          <input
            type="text"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-2 text-sm font-semibold">Password</label>
          <input
            type="password"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-green-700">
            Register
          </button>
        </form>

        {errorMsg && <p className="text-red-500 text-sm text-center mt-4">{errorMsg}</p>}
        {successMsg && <p className="text-blue-500 text-sm text-center mt-4">{successMsg}</p>}

        <p className="text-sm text-center mt-4">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline ml-1">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
