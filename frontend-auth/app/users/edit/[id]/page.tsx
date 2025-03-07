"use client";  // Mark this as a client-side component

import { useParams, useRouter } from "next/navigation";  // Use useParams from next/navigation
import { useEffect, useState } from "react";
import { getUserById, updateUser, User } from "@/services/userService"; // Adjust this import based on your service

export default function EditUser() {
    const { id } = useParams();  // Access the route parameters using useParams
    const [user, setUser] = useState<User | null>(null);
    const [editedData, setEditedData] = useState<Partial<User>>({});
    const router = useRouter();

    useEffect(() => {
        if (id) {
            fetchUser(id);  // Fetch user by ID when the component is mounted
        }
    }, [id]);

    const fetchUser = async (userId: string) => {
        try {
            const response = await getUserById(userId);  // Fetch user data by ID
            setUser(response.data);
            setEditedData(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (user && editedData) {
            try {
                await updateUser(user._id, editedData); // Update user data
                router.push("/users"); // Redirect back to users list after saving
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };

    if (!user) return <div>Loading...</div>;  // Show loading state while fetching user

    // Render different fields based on role
    const isDoctor = user.role === "doctor";
    const isPatient = user.role === "patient";

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Edit User</h1>

            <label className="form-label">Name:</label>
            <input
                type="text"
                className="form-control mb-2"
                name="nom"
                value={editedData.nom || ""}
                onChange={handleChange}
            />

            <label className="form-label">Email:</label>
            <input
                type="email"
                className="form-control mb-2"
                name="email"
                value={editedData.email || ""}
                onChange={handleChange}
            />

            <label className="form-label">Role:</label>
            <input
                type="text"
                className="form-control mb-2"
                name="role"
                value={editedData.role || ""}
                onChange={handleChange}
                disabled
            />

            {isDoctor && (
                <>
                    <label className="form-label">Specialty:</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        name="specialite"
                        value={editedData.specialite || ""}
                        onChange={handleChange}
                    />

                    <label className="form-label">Tarif:</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        name="tarif"
                        value={editedData.tarif || ""}
                        onChange={handleChange}
                    />
                </>
            )}

            {isPatient && (
                <>
                    <label className="form-label">Telephone:</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        name="telephone"
                        value={editedData.telephone || ""}
                        onChange={handleChange}
                    />

                    <label className="form-label">Adresse:</label>
                    <input
                        type="text"
                        className="form-control mb-2"
                        name="adresse"
                        value={editedData.adresse || ""}
                        onChange={handleChange}
                    />
                </>
            )}

            <button className="btn btn-success me-2" onClick={handleSave}>
                Save
            </button>
            <button
                className="btn btn-secondary"
                onClick={() => router.push("/users")}
            >
                Cancel
            </button>
        </div>
    );
}
