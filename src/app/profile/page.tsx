"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { Avatar } from "flowbite-react";

// Define the User type
type User = {
  username: string;
  email: string;
};

const ProfilePage = () => {
  const [data, setData] = useState<User | null>(null);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/user");
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getUserDetails();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r bg-blue-50">
        <p className="text-white text-lg font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r bg-blue-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
    
        {/* Avatar */}
        <div className="flex justify-center mb-6">
        <Avatar img="/images/people/profile-picture-4.jpg" rounded bordered />
        </div>

        {/* User Info */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">{data.username}</h1>
          <p className="text-gray-500">{data.email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
