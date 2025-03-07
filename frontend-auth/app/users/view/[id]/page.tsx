// app/users/view/[id]/page.tsx
"use client";  // Mark this as a client-side component

import { useParams, useRouter } from "next/navigation";  // Use next/navigation
import { useEffect, useState } from "react";
import { getUserById, User } from "@/services/userService";  // Adjust this import based on your service

export default function ViewUser() {
    const { id } = useParams();  // Access the route parameters using useParams
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (id) {
            fetchUser(id);  // Fetch user by ID when the component is mounted
        }
    }, [id]);

    const fetchUser = async (userId: string) => {
        try {
            const response = await getUserById(userId);  // Fetch user data by ID
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    if (!user) return <div className="text-center">Loading...</div>;  // Show loading state while fetching user

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {/* User Details Card */}
                    <div className="card shadow-lg border-light">
                        <div className="card-header bg-primary text-white text-center">
                            <h3 className="mb-0">User Details</h3>
                        </div>
                        <div className="card-body">
                            {/* Common Info: Name, Role, and Email */}
                            <div className="mb-3">
                                <h5 className="fw-bold">Name</h5>
                                <p>{user.nom}</p>
                            </div>

                            <div className="mb-3">
                                <h5 className="fw-bold">Role</h5>
                                <p>{user.role}</p>
                            </div>

                            <div className="mb-3">
                                <h5 className="fw-bold">Email</h5>
                                <p>{user.email}</p>
                            </div>

                            {/* Additional Info Based on Role */}
                            {user.role === "doctor" && (
                                <>
                                    <div className="mb-3">
                                        <h5 className="fw-bold">Specialite</h5>
                                        <p>{user.specialite}</p>
                                    </div>

                                    <div className="mb-3">
                                        <h5 className="fw-bold">Tarif</h5>
                                        <p>{user.tarif} €</p>
                                    </div>
                                </>
                            )}

                            {user.role === "patient" && (
                                <>
                                    <div className="mb-3">
                                        <h5 className="fw-bold">Telephone</h5>
                                        <p>{user.telephone}</p>
                                    </div>

                                    <div className="mb-3">
                                        <h5 className="fw-bold">Adresse</h5>
                                        <p>{user.adresse}</p>
                                    </div>
                                </>
                            )}

                            {/* Buttons */}
                            <div className="d-flex justify-content-between">
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => window.history.back()}  // Go back to the previous page
                                >
                                    Go Back
                                </button>
                                <button
                                    className="btn btn-info"
                                    onClick={() => window.location.href = `/users/edit/${user._id}`}  // Navigate to edit
                                >
                                    Edit User
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
