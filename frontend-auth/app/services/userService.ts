import axios from 'axios';

const API_URL = 'http://localhost:7000/api/user';

export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'doctor' | 'patient' | 'admin';
    specialite?: string;
    tarif?: number;
}

export const addUser = async (userData: Partial<User>) => {
    return await axios.post<User>(`${API_URL}/add`, userData);
};

export const getAllUsers = async () => {
    return await axios.get<User[]>(`${API_URL}/getAllUsers`);
};

export const getUserById = async (id: string) => {
    return await axios.get<User>(`${API_URL}/getById/${id}`);
};

export const updateUser = async (id: string, userData: Partial<User>) => {
    return await axios.put<User>(`${API_URL}/update/${id}`, userData);
};

export const deleteUser = async (id: string) => {
    return await axios.delete(`${API_URL}/delete/${id}`);
};
