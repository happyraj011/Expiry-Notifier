'use client';

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return setErrorMessage('All fields are required.');
    }
    try {
      setLoading(true);
      setErrorMessage('');
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setErrorMessage(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      if (res.ok) {
        router.push('/');
      }
    } catch (error: any) {
      setErrorMessage('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-5">
      <div className="max-w-md w-full bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to <span className="text-indigo-500">Expiry Notifier</span>
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <Label htmlFor="email" value="Your email" className="block text-sm font-medium text-gray-700" />
            <TextInput
              type="email"
              placeholder="name@gmail.com"
              id="email"
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <Label htmlFor="password" value="Your password" className="block text-sm font-medium text-gray-700" />
            <TextInput
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold py-2 rounded-md shadow-lg hover:shadow-xl transition-all duration-200"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              'Login'
            )}
          </Button>

          {/* Error Alert */}
          {errorMessage && (
            <Alert className="mt-4 text-red-600 text-center bg-red-50 border border-red-300 rounded-md p-2">
              {errorMessage}
            </Alert>
          )}
        </form>

        {/* Footer Links */}
        <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
          <span>Don't have an account?</span>
          <Link href="/sign-up" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
