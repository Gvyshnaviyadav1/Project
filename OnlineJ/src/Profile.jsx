import React, { useEffect, useState } from 'react';
import fetchWithAuth from './fetchWithAuth';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetchWithAuth('/api/submissions/profile/');
      const data = await res.json();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  if (!profile) return <div className="p-6">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">My Profile</h1>

        <div className="space-y-4 text-blue-700">
          <div>
            <strong className="block text-sm text-blue-500">Username</strong>
            <p className="text-lg font-semibold">{profile.username}</p>
          </div>

          <div>
            <strong className="block text-sm text-blue-500">Email</strong>
            <p className="text-lg">{profile.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-blue-100 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{profile.problems_solved}</p>
              <p className="text-blue-800 font-medium">Problems Solved</p>
            </div>
            <div className="bg-yellow-100 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold">{profile.coins_earned}</p>
              <p className="text-yellow-800 font-medium">Coins Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
