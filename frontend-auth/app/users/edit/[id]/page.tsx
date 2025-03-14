"use client";

import { useParams, useRouter } from "next/navigation";  
import { useEffect, useState } from "react";
import { getUserById, updateUser, User } from "@/services/userService"; 

export default function EditUser() {
    const { id } = useParams();  
    const [user, setUser] = useState<User | null>(null);
    const [editedData, setEditedData] = useState<Partial<User>>({});
    const router = useRouter();

    useEffect(() => {
        if (id) {
            fetchUser(id);  
        }
    }, [id]);

    const fetchUser = async (userId: string) => {
        try {
            const response = await getUserById(userId);  
            setUser(response.data);
            setEditedData(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        setEditedData(prev => {
            let updatedData = { ...prev, [name]: name === "tarif" ? Number(value) : value };
    
            if (name === "role") {
                if (value === "doctor") {
                    updatedData = { ...updatedData, telephone: "", adresse: "", specialite: "", tarif: 0 };
                } else if (value === "patient") {
                    updatedData = { ...updatedData, specialite: "", tarif: 0, telephone: "", adresse: "" };
                }
            }
    
            return updatedData;
        });
    };
    
    
    
    

    const handleSave = async () => {
        if (user && editedData) {
            try {
                await updateUser(user._id, {
                    nom: editedData.nom,
                    email: editedData.email,
                    role: editedData.role,
                    telephone: editedData.telephone,
                    specialite: editedData.specialite,
                    tarif: editedData.tarif,
                    adresse: editedData.adresse
                });
    
                
                const updatedUser = await getUserById(user._id);
                setUser(updatedUser.data);  
    
                
                router.push("/users");
            } catch (error) {
                console.error("Error updating user:", error);
            }
        }
    };
    

    if (!user) return <div className="text-center text-white">Loading...</div>;

    const isDoctor = user.role === "doctor";
    const isPatient = user.role === "patient";

    return (
        <div className="min-h-screen flex justify-center items-center py-6">
            <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit User</h1>

                <div className="space-y-6">
    
    <div>
        <label className="block text-lg font-medium text-black mb-2" htmlFor="name">
            Name
        </label>
        <input
            type="text"
            name="nom"
            value={editedData.nom || ""}
            onChange={handleChange}
            className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500"
        />
    </div>

    
    <div>
        <label className="block text-lg font-medium text-black mb-2" htmlFor="email">
            Email
        </label>
        <input
            type="email"
            name="email"
            value={editedData.email || ""}
            onChange={handleChange}
            className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500"
        />
    </div>

    
    <div>
        <label className="block text-lg font-medium text-black mb-2" htmlFor="role">
            Role
        </label>
        <select
            name="role"
            value={editedData.role || ""}
            onChange={handleChange}
            className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500"
        >
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="patient">Patient</option>
        </select>
    </div>

    
    {editedData.role === "doctor" && (
        <>
            <div>
                <label className="block text-lg font-medium text-black mb-2" htmlFor="specialite">
                    Specialty
                </label>
                <input
                    type="text"
                    name="specialite"
                    value={editedData.specialite || ""}
                    onChange={handleChange}
                    className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-lg font-medium text-black mb-2" htmlFor="tarif">
                    Rate
                </label>
                <input
                    type="number"
                    name="tarif"
                    value={editedData.tarif || ""}
                    onChange={handleChange}
                    className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </>
    )}

    
    {editedData.role === "patient" && (
        <>
            <div>
                <label className="block text-lg font-medium text-black mb-2" htmlFor="telephone">
                    Phone
                </label>
                <input
                    type="text"
                    name="telephone"
                    value={editedData.telephone || ""}
                    onChange={handleChange}
                    className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label className="block text-lg font-medium text-black mb-2" htmlFor="adresse">
                    Address
                </label>
                <input
                    type="text"
                    name="adresse"
                    value={editedData.adresse || ""}
                    onChange={handleChange}
                    className="w-full p-4 rounded-lg border-2 border-gray-300 bg-gray-50 text-black focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </>
    )}

    
    <div className="flex justify-center space-x-4 mt-6">
        <button
            onClick={handleSave}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors w-full sm:w-auto"
        >
            Save Changes
        </button>
        <button
            onClick={() => router.push("/users")}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors w-full sm:w-auto"
        >
            Cancel
        </button>
    </div>
</div>

            </div>
        </div>
    );
}
