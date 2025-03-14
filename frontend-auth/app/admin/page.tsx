"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteUser, getAllUsers, User } from "@/services/userService";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [users, setUsers] = useState<User[]>([]);
  const [userStats, setUserStats] = useState({ doctors: 0, patients: 0, admins: 0 });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.role !== "admin") {
        router.push("/Home");
      }
    } else {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (activeTab === "Users" || activeTab === "Dashboard") {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);

      const doctorCount = response.data.filter((user: User) => user.role === "doctor").length;
      const patientCount = response.data.filter((user: User) => user.role === "patient").length;
      const adminCount = response.data.filter((user: User) => user.role === "admin").length;

      setUserStats({ doctors: doctorCount, patients: patientCount, admins: adminCount });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <aside className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-center">Admin Panel</h1>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.name ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      
      <main className="flex-1 p-8">
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">{activeTab}</h2>
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>

        
        {activeTab === "Dashboard" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-700">Doctors</h3>
              <p className="text-3xl font-bold text-blue-500">{userStats.doctors}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-700">Patients</h3>
              <p className="text-3xl font-bold text-green-500">{userStats.patients}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-700">Admins</h3>
              <p className="text-3xl font-bold text-red-500">{userStats.admins}</p>
            </div>

            
            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Users Overview</h3>
              <Chart
                options={{
                  chart: { type: "donut" },
                  labels: ["Doctors", "Patients", "Admins"],
                  colors: ["#1E40AF", "#16A34A", "#DC2626"],
                }}
                series={[userStats.doctors, userStats.patients, userStats.admins]}
                type="donut"
                height={350}
              />
            </div>
          </div>
        )}

        
        {activeTab === "Users" && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-6">
              <button
                onClick={() => router.push("/users/create")}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Create New User
              </button>
            </div>

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
                          onClick={() => router.push(`/users/edit/${user._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-blue-600"
                          onClick={() => router.push(`/users/view/${user._id}`)}
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
        )}
      </main>
    </div>
  );
}
