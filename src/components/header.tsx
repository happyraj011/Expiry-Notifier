"use client";

import axios from "axios";
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
}

export default function Header() {
  const router = useRouter();
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

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      router.push("/login");
      setData(null);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Navbar className="border-b-2 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-extrabold text-gray-800 tracking-wide flex items-center gap-2"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Expiry
        </span>
        Notifier
      </Link>

      {/* Right Section */}
      <div className="flex gap-4 md:order-2 items-center">
        {/* User Dropdown or Sign-In Button */}
        {data ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User Avatar"
                img="/path-to-user-avatar.jpg" 
                rounded
                className="w-10 h-10"
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-semibold">{data.username}</span>
              <span className="block text-sm text-gray-500 truncate">{data.email}</span>
            </Dropdown.Header>
            <Link href="/profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link href="/login">
            <Button gradientDuoTone="purpleToBlue" outline className="text-sm">
              Sign In
            </Button>
          </Link>
        )}

        {/* Navbar Toggle (Mobile) */}
        <Navbar.Toggle />
      </div>

      {/* Navbar Links */}
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/addProduct">
          Add Product
        </Navbar.Link>
        <Navbar.Link as={Link} href="/expiryItems">
          Expiry Items
        </Navbar.Link>
        <Navbar.Link as={Link} href="/about">
          About
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
