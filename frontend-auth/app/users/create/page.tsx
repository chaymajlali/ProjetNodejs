"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addUser } from "@/services/userService";

export default function CreateUser() {
    const [userData, setUserData] = useState({
        nom: "",
        email: "",
        password: "",
        role: "patient",
        image: "",
        telephone: "",
        specialite: "",
        tarif: 0,
        adresse: "",
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            
            await addUser(userData);
            router.push("/users");
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create New User</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={userData.nom}
                            onChange={handleChange}
                            className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                            className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                            className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="role">
                            Role
                        </label>
                        <select
                            name="role"
                            value={userData.role}
                            onChange={handleChange}
                            className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50"
                            required
                        >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    
                    {userData.role === "patient" && (
                        <>
                            <div>
                                <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="telephone">
                                    Phone
                                </label>
                                <input
                                    type="text"
                                    id="telephone"
                                    name="telephone"
                                    value={userData.telephone}
                                    onChange={handleChange}
                                    className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="adresse">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="adresse"
                                    name="adresse"
                                    value={userData.adresse}
                                    onChange={handleChange}
                                    className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50"
                                    required
                                />
                            </div>
                        </>
                    )}

                    
                    {userData.role === "doctor" && (
                        <>
                            <div>
                                <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="specialite">
                                    Specialty
                                </label>
                                <input
                                    type="text"
                                    id="specialite"
                                    name="specialite"
                                    value={userData.specialite}
                                    onChange={handleChange}
                                    className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50"
                                />
                            </div>

                            <div>
                                <label className="block text-lg font-medium text-blue-500 mb-2" htmlFor="tarif">
                                    Rate
                                </label>
                                <input
                                    type="number"
                                    id="tarif"
                                    name="tarif"
                                    value={userData.tarif}
                                    onChange={handleChange}
                                    className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50"
                                />
                            </div>
                        </>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
                    >
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
}
