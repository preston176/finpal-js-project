import { Link } from 'react-router-dom';
import Sidebar from './components/sidebar';
import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useEffect } from 'react';

function AdminPage() {
    const [totalUsers, setTotalUsers] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosInstance.get("http://localhost:8000/api/admin/users");
                if (data) {
                    setTotalUsers(data);
                }
            } catch (err) {
                console.error("Fetching users failed", err);
            }
        };
        fetchData();
    }, []);



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
                        <Link to="/admin/users">
                            <h2 className="text-lg font-semibold">Total Users</h2>
                            <p className="text-2xl font-bold">{totalUsers?.length}</p>
                        </Link>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <Link to="/admin/transactions">
                            <h2 className="text-lg font-semibold">Transactions Amount</h2>
                            <p className="text-2xl font-bold">Kes 56,789</p>
                        </Link>
                    </div>
                    <div className="p-4 bg-white shadow rounded">
                        <Link to="/admin/transactions">
                            <h2 className="text-lg font-semibold">Transactions done</h2>
                            <p className="text-2xl font-bold">12</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;