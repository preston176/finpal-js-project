import React, { useEffect, useState } from 'react';
import Sidebar from './components/sidebar';

function Users() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    useEffect(() => {
        // Simulating fetching data from MongoDB
        const fetchData = async () => {
            const data = [
                {
                    _id: "6810ad4ee42db855b24ca78b",
                    fullName: "Preston Nyamweya",
                    email: "prestonmayieka@gmail.com",
                    password: "hidden",
                    profileImageUrl: "",
                    createdAt: "2025-04-29T10:43:26.293+00:00",
                    updatedAt: "2025-04-29T10:43:26.293+00:00",
                },
            ];
            setUsers(data);
            setFilteredUsers(data);
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

    const deleteUser = (id) => {
        const updated = users.filter(user => user._id !== id);
        setUsers(updated);
    };

    const disableUser = (id) => {
        const updated = users.map(user =>
            user._id === id ? { ...user, disabled: true } : user
        );
        setUsers(updated);
    };

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            {/* Sidebar */}
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
                                                    ? 'bg-gray-400 text-white cursor-not-allowed'
                                                    : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                                    }`}
                                                onClick={() => disableUser(user._id)}
                                                disabled={user.disabled}
                                            >
                                                {user.disabled ? 'Disabled' : 'Disable'}
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
