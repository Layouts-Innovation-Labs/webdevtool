"use client";

import { useState } from 'react';

export default function Payment() {
  const [amount, setAmount] = useState('');

  const handlePayment = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Handle payment logic
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Make a Payment</h1>
      <div className="bg-white p-4 rounded shadow">
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
