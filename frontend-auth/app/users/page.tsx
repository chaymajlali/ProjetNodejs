// app/users/page.tsx
"use client";  // Mark as client-side component

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { deleteUser, getAllUsers, User } from "@/services/userService";
import { useRouter } from "next/navigation";  // Use next/navigation

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const router = useRouter();  // Initialize useRouter from next/navigation

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
        // Navigate to the edit page for the user
        router.push(`/users/edit/${user._id}`);
    };

    const handleView = (user: User) => {
        // Navigate to the view page for the user
        router.push(`/users/view/${user._id}`);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4 text-center">Users List</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.nom}</td>
                            <td>{user.role}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(user)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-info btn-sm me-2"
                                    onClick={() => handleView(user)}
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
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
    );
}
