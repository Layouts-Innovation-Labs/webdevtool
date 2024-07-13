"use client";
import { useState } from 'react';
import DefineSchema from "@/app/(main)/app/settings/DefineSchema";

type FieldState = 'none' | 'schema';

export default function StudentDashboard() {
    const [field, setField] = useState<FieldState>('none');

    const handleButtonClick = (action: FieldState) => {
        setField(action);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
            <div className="bg-white p-4 rounded shadow flex flex-col lg:flex-row gap-4">
                <button onClick={() => handleButtonClick('schema')} className="btn btn-primary px-5 py-3 rounded-5">Define Student Schema</button>
                {/*<button onClick={() => handleButtonClick('view')} className="btn btn-info text-dark px-5 py-3 rounded-5">View Student</button>*/}
                {/*<button onClick={() => handleButtonClick('update')} className="btn btn-secondary px-5 py-3 rounded-5">Update Student</button>*/}
                {/*<button onClick={() => handleButtonClick('delete')} className="btn btn-danger px-5 py-3 rounded-5">Delete Student</button>*/}
            </div>
            <div className={`${field !== 'none' ? 'animate-slideInBottom' : ''} mt-6`}>
                {field === 'schema' && <DefineSchema />}
                {/* Add components for view, update, delete operations as needed */}
            </div>
        </div>
    );
}
