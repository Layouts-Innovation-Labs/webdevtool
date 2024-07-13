"use client";

import { useState } from 'react';

export default function Messaging() {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle sending message logic
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Messaging</h1>
      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={handleSendMessage}>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
