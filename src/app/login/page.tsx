'use client';

import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Force a full page reload to ensure auth state is updated everywhere
      window.location.href = '/';
      
    } catch (error: any) {
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again.');
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
          <div>
            <Label htmlFor="email" value="Your email" />
            <TextInput
              type="email"
              placeholder="name@gmail.com"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="password" value="Your password" />
            <TextInput
              type="password"
              placeholder="Password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            gradientDuoTone="purpleToPink"
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

          {errorMessage && (
            <Alert color="failure" className="mt-4">
              {errorMessage}
            </Alert>
          )}
        </form>

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