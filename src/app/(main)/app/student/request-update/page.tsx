"use client";

import { useState } from 'react';

export default function RequestUpdate() {
  const [subject, setSubject] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle update request logic
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Request Result Update</h1>
      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Subject</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Reason for Update</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
