import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from './components/sidebar';

function AdminPage() {



    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Dashboard */}
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Finpal Admin Panel</h1>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Mock values */}
                    <div className="p-4 bg-white shadow rounded">
                        <h2 className="text-lg font-semibold">Total Users</h2>
                        <p className="text-2xl font-bold">1,234</p>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <h2 className="text-lg font-semibold">Transactions Amount</h2>
                        <p className="text-2xl font-bold">$56,789</p>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <h2 className="text-lg font-semibold">Transactions done</h2>
                        <p className="text-2xl font-bold">12</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;