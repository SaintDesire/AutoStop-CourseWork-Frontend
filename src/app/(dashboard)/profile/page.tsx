"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/ui/dashboard/profile/sideBar";
import ProfileCard from "@/components/ui/dashboard/profile/profileCard";
import ProfileForm from "@/components/ui/dashboard/profile/profileForm";
import Layout from "@/components/ui/layout";

interface UserData {
  user_id?: number;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  avatar?: string; // Здесь будет храниться Base64 строка
}


export default function ProfilePage() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (updatedData: Partial<UserData>) => {
    if (!userData) {
      setError("User data is missing.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include', // Важно для отправки cookies
        body: JSON.stringify({
          ...updatedData,         // Добавляем другие обновленные данные
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Failed to update user data");
      }

      const data = await response.json();

      // Обновляем состояние с обновлёнными данными
      setUserData(data.user);
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "An error occurred while updating.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/auth/session", {
          method: "GET",
          credentials: 'include',
        });

        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message || "Failed to fetch user data");
        }

        const data: UserData = await response.json();
        setUserData(data);
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.message || "An error occurred while fetching user data.");
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return (
      <Layout>
        <div className="profile-page-container">
          <Sidebar />
          <div className="profile-content">
            <p style={{ color: "red" }}>Error: {error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!userData) {
    return (
      <Layout>
        <div className="profile-page-container">
          <Sidebar />
          <div className="profile-content">
            <p>Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="profile-page-container">
        <Sidebar />
        <div className="profile-content">
          <ProfileCard
            name={userData.name}
            email={userData.email}
            avatarUrl={userData.avatar || "/images/default-avatar.jpg"}
          />
          <ProfileForm userData={userData} onSubmit={handleSave} />
        </div>
      </div>
    </Layout>
  );
}
