"use client";

import { useEffect, useState } from "react";
import { deleteUser, getAllUsers, User } from "@/services/userService";
import { useRouter } from "next/navigation";

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEdit = (user: User) => {
        router.push(`/users/edit/${user._id}`);
    };

    const handleView = (user: User) => {
        router.push(`/users/view/${user._id}`);
    };

    const handleCreateUser = () => {
        router.push("/users/create");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className="bg-blue-900 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">Cabinet Dentaire</h1>
                    <ul className="flex space-x-6">
                        <li><a href="/Home" className="text-white hover:text-yellow-400">Home</a></li>
                        <li><a href="/users" className="text-white hover:text-yellow-400">Users</a></li>
                        <li><a href="/contact" className="text-white hover:text-yellow-400">Contact</a></li>
                    </ul>
                </div>
            </nav>

            {/* Users List Section */}
            <div className="container max-w-7xl mx-auto p-6 mt-6">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Users List</h1>

                {/* Create New User Button */}
                <div className="mb-6">
                    <button
                        onClick={handleCreateUser}
                        className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                    >
                        Create New User
                    </button>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto bg-white shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full table-auto">
                        <thead className="bg-blue-800 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left">Name</th>
                                <th className="py-3 px-4 text-left">Email</th>
                                <th className="py-3 px-4 text-left">Role</th>
                                <th className="py-3 px-4 text-left">Phone</th>
                                <th className="py-3 px-4 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b hover:bg-gray-100">
                                    <td className="py-3 px-4">{user.nom}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4">{user.role}</td>
                                    <td className="py-3 px-4">{user.telephone}</td>
                                    <td className="py-3 px-4">
                                        <button
                                            className="bg-yellow-400 text-white py-2 px-4 rounded-lg mr-2 hover:bg-yellow-500"
                                            onClick={() => handleEdit(user)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600"
                                            onClick={() => handleView(user)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                            onClick={() => handleDelete(user._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
