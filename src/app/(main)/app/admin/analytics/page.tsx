"use client";
import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Fetch and display analytics data
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="bg-white p-4 rounded shadow">
        {/* Display analytics data */}
      </div>
    </div>
  );
}
