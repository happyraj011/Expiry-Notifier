"use client";

import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const { user, setUser, fetchUser } = useUser(); 

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      setUser(null); 
      router.push("/login");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Navbar className="border-b-2 bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg">
      <Link
        href="/"
        className="text-2xl font-extrabold text-gray-800 tracking-wide flex items-center gap-2"
      >
        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
          Expiry
        </span>
        Notifier
      </Link>

      <div className="flex gap-4 md:order-2 items-center">
        {user ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User Avatar"
                img="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp"
                rounded
                className="w-10 h-10  transition-all"
              />
            }
          >
            <div className="w-48 bg-white shadow-lg rounded-lg border border-gray-200 overflow-hidden">
              <Dropdown.Header className="bg-gradient-to-r from-purple-100 to-blue-100 p-3">
                <span className="block text-sm font-semibold">{user.username}</span>
                <span className="block text-sm text-gray-600 truncate">{user.email}</span>
              </Dropdown.Header>
              
              <Link href="/profile">
                <Dropdown.Item className="px-4 py-2 hover:bg-purple-100 hover:text-purple-800 transition-all">
                  Profile
                </Dropdown.Item>
              </Link>

              <Dropdown.Divider />

              <Dropdown.Item
                onClick={logout}
                className="px-4 py-2 text-red-600 hover:bg-red-100 transition-all"
              >
                Logout
              </Dropdown.Item>
            </div>
          </Dropdown>
        ) : (
          <Link href="/login">
            <Button gradientDuoTone="purpleToBlue" outline className="text-sm">
              Sign In
            </Button>
          </Link>
        )}

        <Navbar.Toggle />
      </div>

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
