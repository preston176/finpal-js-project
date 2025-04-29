import React, { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Simulating fetching data from MongoDB
        const fetchData = async () => {
            const data = [
                {
                    _id: "6810ad4ee42db855b24ca78b",
                    fullName: "preston nyamweya",
                    email: "prestonmayieka@gmail.com",
                    password: "$2a$10$bWhu8fcqm/lsVEkb92lyY.whau6/CKavy2qPUlteDH8JOEQBWBbie",
                    profileImageUrl: "",
                    createdAt: "2025-04-29T10:43:26.293+00:00",
                    updatedAt: "2025-04-29T10:43:26.293+00:00",
                },
            ];
            setUsers(data);
        };

        fetchData();
    }, []);

    const deleteUser = (id) => {
        setUsers(users.filter(user => user._id !== id));
    };

    const disableUser = (id) => {
        setUsers(users.map(user => user._id === id ? { ...user, disabled: true } : user));
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">User ID</th>
                        <th className="border border-gray-300 px-4 py-2">Full Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        <th className="border border-gray-300 px-4 py-2">Profile Image URL</th>
                        <th className="border border-gray-300 px-4 py-2">Created At</th>
                        <th className="border border-gray-300 px-4 py-2">Updated At</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className={user.disabled ? "bg-gray-200" : ""}>
                            <td className="border border-gray-300 px-4 py-2">{user._id}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.fullName}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.profileImageUrl || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{new Date(user.createdAt).toLocaleString()}</td>
                            <td className="border border-gray-300 px-4 py-2">{new Date(user.updatedAt).toLocaleString()}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded mr-2 hover:bg-red-600"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Delete
                                </button>
                                <button
                                    className={`px-3 py-1 rounded ${user.disabled ? "bg-gray-400 text-white" : "bg-yellow-500 text-white hover:bg-yellow-600"}`}
                                    onClick={() => disableUser(user._id)}
                                    disabled={user.disabled}
                                >
                                    {user.disabled ? "Disabled" : "Disable"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;