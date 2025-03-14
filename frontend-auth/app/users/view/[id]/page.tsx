"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserById, User } from "@/services/userService";

export default function ViewUser() {
    const { id } = useParams(); 
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (id) {
            fetchUser(id);
        }
    }, [id]);

    const fetchUser = async (userId: string) => {
        try {
            const response = await getUserById(userId);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    if (!user) return <div className="text-center text-gray-500">Loading...</div>;

    return (
        <div className="min-h-screen flex justify-center items-center py-6">
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">User Details</h1>

                <div className="space-y-6">
                    {/* Name Display */}
                    <div>
                        <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="name">
                            Name
                        </label>
                        <p className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black">{user.nom}</p>
                    </div>

                    {/* Email Display */}
                    <div>
                        <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="email">
                            Email
                        </label>
                        <p className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black">{user.email}</p>
                    </div>

                    {/* Role Display */}
                    <div>
                        <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="role">
                            Role
                        </label>
                        <p className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black">{user.role}</p>
                    </div>

                    {/* Doctor Specific Info */}
                    {user.role === "doctor" && (
                        <>
                            <div>
                                <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="specialite">
                                    Specialty
                                </label>
                                <p className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black">{user.specialite}</p>
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="tarif">
                                    Rate
                                </label>
                                <p className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black">{user.tarif} €</p>
                            </div>
                        </>
                    )}

                    {/* Patient Specific Info */}
                    {user.role === "patient" && (
                        <>
                            <div>
                                <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="telephone">
                                    Phone
                                </label>
                                <p className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black">{user.telephone}</p>
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="adresse">
                                    Address
                                </label>
                                <p className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black">{user.adresse}</p>
                            </div>
                        </>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-center space-x-4">
                        <button
                            onClick={() => window.history.back()}
                            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors w-full sm:w-auto"
                        >
                            Go Back
                        </button>
                        <button
                            onClick={() => window.location.href = `/users/edit/${user._id}`}
                            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors w-full sm:w-auto"
                        >
                            Edit User
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
