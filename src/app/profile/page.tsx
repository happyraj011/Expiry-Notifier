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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/user");
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg max-w-md w-full mx-4">
          <p className="text-gray-700 text-lg font-medium mb-4">
            Failed to load profile data.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity shadow-md font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md transition-all hover:shadow-3xl hover:-translate-y-1">
      
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-center relative">
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/pattern.svg')" }}></div>
          <div className="flex justify-center mb-4 relative z-10">
            <Avatar
              img="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
              rounded
              bordered
              color="light"
              size="xl"
              className="  transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1 relative z-10">{data.username}</h1>
          <p className="text-blue-100 font-medium relative z-10">{data.email}</p>
          
         
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
        </div>

      
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Personal Information
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Username</p>
                <p className="text-gray-800 font-semibold">{data.username}</p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-indigo-600 font-medium">Email</p>
                <p className="text-gray-800 font-semibold">{data.email}</p>
              </div>
            </div>
          </div>

         
        </div>

        
      </div>
    </div>
  );
};

export default ProfilePage;