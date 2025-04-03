"use client";

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";

interface User {
  username: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname(); 

  
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user");
      setUser(res.data.data);
    } catch (error) {
      setUser(null);
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    fetchUser(); 
  }, []);

  useEffect(() => {
    fetchUser(); 
  }, [pathname]);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
