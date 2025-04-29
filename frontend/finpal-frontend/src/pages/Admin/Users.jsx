import { useEffect, useState } from 'react';
import Sidebar from './components/sidebar';
import axiosInstance from '../../utils/axiosInstance';

function Users() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosInstance.get("http://localhost:8000/api/admin/users");
                if (data) {
                    setUsers(data);
                    setFilteredUsers(data);
                }
            } catch (err) {
                console.error("Fetching users failed", err);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const lowerSearch = search.toLowerCase();
        const filtered = users.filter(user => {
            const matchesSearch =
                user.fullName.toLowerCase().includes(lowerSearch) ||
                user.email.toLowerCase().includes(lowerSearch);
            const matchesStatus =
                filterStatus === 'all' ||
                (filterStatus === 'active' && !user.disabled) ||
                (filterStatus === 'disabled' && user.disabled);

            return matchesSearch && matchesStatus;
        });
        setFilteredUsers(filtered);
    }, [search, filterStatus, users]);

    const deleteUser = async (id) => {
        try {
            await axiosInstance.delete(`/api/admin/users/${id}`);
            setUsers(prev => prev.filter(user => user._id !== id));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    const toggleUserDisabled = async (id, disabled) => {
        try {
            await axiosInstance.patch(`/api/admin/users/${id}/disable`, { disabled });
            setUsers(prev =>
                prev.map(user =>
                    user._id === id ? { ...user, disabled } : user
                )
            );
        } catch (err) {
            console.error(`${disabled ? 'Disable' : 'Enable'} failed`, err);
        }
    };

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <Sidebar />
            <div className="max-w-7xl ml-10 mt-20 w-full container">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-semibold text-gray-800">User Management</h1>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Users</option>
                        <option value="active">Active Users</option>
                        <option value="disabled">Disabled Users</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">User ID</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Full Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Profile Image</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Created</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Updated</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map(user => (
                                    <tr key={user._id} className={user.disabled ? 'bg-gray-100 text-gray-500' : ''}>
                                        <td className="px-6 py-4 text-sm font-mono">{user._id.slice(0, 6)}...</td>
                                        <td className="px-6 py-4">{user.fullName}</td>
                                        <td className="px-6 py-4">{user.email}</td>
                                        <td className="px-6 py-4">
                                            {user.profileImageUrl ? (
                                                <img
                                                    src={user.profileImageUrl}
                                                    alt="profile"
                                                    className="h-10 w-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-400">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm">{new Date(user.createdAt).toLocaleString()}</td>
                                        <td className="px-6 py-4 text-sm">{new Date(user.updatedAt).toLocaleString()}</td>
                                        <td className="px-6 py-4 space-x-2 flex flex-col md:flex-row">
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                                onClick={() => deleteUser(user._id)}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                className={`px-3 py-1 rounded ${user.disabled
                                                    ? 'bg-green-500 hover:bg-green-600'
                                                    : 'bg-yellow-500 hover:bg-yellow-600'
                                                    } text-white`}
                                                onClick={() => toggleUserDisabled(user._id, !user.disabled)}
                                            >
                                                {user.disabled ? 'Enable' : 'Disable'}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center px-6 py-4 text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users;
