"use client"
import { Alert, Button, Checkbox, Label, Spinner, TextInput } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React from 'react'

export default function page() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    productName: "",
    quantity: "",
    category: "",
    manufacturedDate: "",
    expiryDate: ""
  });
  const [errorMessage, setErrorMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.productName || !formData.quantity || !formData.category || !formData.manufacturedDate || !formData.expiryDate) {
      return setErrorMessage('All fields are required');
    }

    try {
      setLoading(true);
      setErrorMessage('');
      const res = await fetch('/api/addProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        router.push('/');
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 text-gray-300 flex items-center justify-center">
      <div className="max-w-3xl w-full p-6 md:p-10 bg-gray-500 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="flex-1">
            <Link href="/" className="font-bold text-4xl">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Expiry</span>
              Notifier
            </Link>
            <p className="text-sm mt-5">Add Your Product</p>
          </div>
          {/* Form */}
          <div className="flex-1">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label value="Product Name" className="text-white" />
                <TextInput type="text" id="productName" onChange={handleChange} className="bg-gray-700 text-white" />
              </div>
              <div>
                <Label value="Quantity" className="text-white" />
                <TextInput type="number" id="quantity" onChange={handleChange} className="bg-gray-700 text-white" />
              </div>
              <div>
                <Label value="Category" className="text-white" />
                <TextInput type="text" id="category" onChange={handleChange} className="bg-gray-700 text-white" />
              </div>
              <div>
                <Label value="Manufactured Date" className="text-white" />
                <TextInput type="date" id="manufacturedDate" onChange={handleChange} className="bg-gray-700 text-white" />
              </div>
              <div>
                <Label value="Expiry Date" className="text-white" />
                <TextInput type="date" id="expiryDate" onChange={handleChange} className="bg-gray-700 text-white" />
              </div>
              <Button
                className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
                type="submit"
                disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : 'Submit'}
              </Button>
            </form>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
