import React, { useEffect, useState } from 'react';
import fetchWithAuth from './fetchWithAuth';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, leaderboardRes] = await Promise.all([
          fetchWithAuth('/api/submissions/users/me/'),
          fetchWithAuth('/api/submissions/leaderboard/'),
        ]);

        if (!userRes.ok || !leaderboardRes.ok) {
          throw new Error('Failed to fetch leaderboard data');
        }

        const userData = await userRes.json();
        const leaderboardData = await leaderboardRes.json();

        // Sort by total_submissions descending
        leaderboardData.sort((a, b) => b.total_submissions - a.total_submissions);

        setCurrentUser(userData.username);
        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error(err);
        alert('Error loading leaderboard.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-blue-50 text-blue-700">Loading leaderboard...</div>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 border-b pb-2">Leaderboard</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-blue-200 rounded-lg">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3 text-blue-800 font-medium text-left">Rank</th>
                <th className="p-3 text-blue-800 font-medium text-left">User</th>
                <th className="p-3 text-blue-800 font-medium text-left">Total Submissions</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => {
                const isCurrentUser = user.username === currentUser;
                return (
                  <tr
                    key={user.username}
                    className={`border-t border-blue-200 ${
                      isCurrentUser
                        ? 'bg-yellow-100 font-semibold'
                        : index % 2 === 0
                        ? 'bg-white'
                        : 'bg-blue-50'
                    }`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{user.username}</td>
                    <td className="p-3">{user.total_submissions}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Highlight Current User Position */}
        <div className="mt-6 bg-blue-100 p-4 rounded-md shadow-inner">
          <h2 className="text-lg font-bold text-blue-800 mb-2">Your Position</h2>
          {(() => {
            const position = leaderboard.findIndex(u => u.username === currentUser);
            if (position === -1) {
              return <p className="text-blue-700">You are not on the leaderboard yet. Submit some solutions!</p>;
            }
            const userData = leaderboard[position];
            return (
              <div className="flex items-center justify-between text-blue-800">
                <span className="font-semibold">Rank: #{position + 1}</span>
                <span className="font-semibold">User: {userData.username}</span>
                <span className="font-semibold">Total Submissions: {userData.total_submissions}</span>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
