"use client";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import BarcodeScanner from "@/components/BarcodeScanner";

export default function AddProductPage() {
  const router = useRouter();
  const [formData, setFormData] = React.useState({
    productName: "",
    quantity: "",
    category: "",
    expiryDate: "",
    barcode: "",
    brand: "",
    imageUrl: "",
    source: "manual" as "manual" | "barcode",
  });
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [showScanner, setShowScanner] = React.useState(false);
  const [scannerLoading, setScannerLoading] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleBarcodeScanned = async (barcode: string) => {
    try {
      setScannerLoading(true);
      setErrorMessage("");

      // Lookup barcode from OpenFoodFacts
      const res = await fetch(`/api/lookupBarcode?barcode=${barcode}`);
      const data = await res.json();

      if (data.found) {
        // Auto-populate form with product data
        setFormData({
          ...formData,
          productName: data.productName,
          category: data.category,
          barcode: data.barcode,
          brand: data.brand || "",
          imageUrl: data.imageUrl || "",
          source: "barcode",
        });
        setShowScanner(false);
        // Show success message
        setErrorMessage("✅ Product found! Details auto-filled. Please add quantity and dates.");
      } else {
        // Product not in database - user can enter manually
        setFormData({ ...formData, barcode: barcode, source: "manual" });
        setShowScanner(false);
        setErrorMessage(
          `ℹ️ Barcode ${barcode} scanned successfully! This product isn't in our database yet. Please enter the details manually below.`
        );
      }
    } catch (error: any) {
      setErrorMessage("❌ Failed to lookup barcode. Please try again.");
      console.error('Barcode lookup error:', error);
    } finally {
      setScannerLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName || !formData.quantity || !formData.category || !formData.expiryDate) {
      return setErrorMessage("All fields are required");
    }

    try {
      setLoading(true);
      setErrorMessage("");
      const res = await fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return setErrorMessage(data.message);
      }

      setLoading(false);
      if (res.ok) {
        router.push("/");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 text-gray-300 flex items-center justify-center">
      <div className="max-w-3xl w-full p-6 md:p-10 bg-gray-500 rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center gap-5">
          <div className="flex-1">
            <Link href="/" className="font-bold text-4xl">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
                Expiry
              </span>
              Notifier
            </Link>
            <p className="text-sm mt-5">Add Your Product</p>
          </div>
          {/* Form */}
          <div className="flex-1">
            {/* Barcode Scanner Button */}
            <div className="mb-4">
              <Button
                onClick={() => setShowScanner(!showScanner)}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white"
                type="button"
              >
                {showScanner ? "❌ Close Scanner" : "📷 Scan Barcode"}
              </Button>
            </div>

            {/* Barcode Scanner Modal */}
            {showScanner && (
              <div className="mb-6 p-4 bg-white rounded-lg">
                {scannerLoading ? (
                  <div className="flex justify-center items-center py-10">
                    <Spinner size="xl" />
                    <span className="ml-3 text-gray-700">Looking up product...</span>
                  </div>
                ) : (
                  <BarcodeScanner
                    onScanSuccess={handleBarcodeScanned}
                    onScanError={(error) => setErrorMessage(error)}
                  />
                )}
              </div>
            )}
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
                <Label value="Expiry Date" className="text-white" />
                <TextInput type="date" id="expiryDate" onChange={handleChange} className="bg-gray-700 text-white" />
              </div>
              <Button
                className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Loading...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
            {errorMessage && (
              <Alert
                className="mt-5"
                color={
                  errorMessage.includes("✅") ? "success" :
                    errorMessage.includes("ℹ️") ? "info" :
                      "failure"
                }
              >
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
