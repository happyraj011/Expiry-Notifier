import React from 'react'

export default function Page() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-blue-50'>
      <div className='max-w-2xl mx-auto p-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-semibold text-gray-900 mb-6'>
            About Expiry Notifier
          </h1>
          <div className='text-md text-gray-700 space-y-6'>
            <p>
              Welcome to <strong>Expiry Notifier</strong>, your essential tool for managing product expiration dates. Our platform allows you to easily add items and receive timely email reminders before they expire, helping you stay organized and avoid unexpected surprises.
            </p>

            <p>
              Expiry Notifier simplifies your life by tracking expiration dates for you. Whether it’s food, medicine, or other products, our system ensures you’re always informed. Add items effortlessly, set their expiry dates, and let us handle the rest.
            </p>

            <p>
              We are committed to providing a reliable and secure experience. Our notifications help you avoid waste and keep your products up-to-date. With Expiry Notifier, you can trust that your critical items are managed efficiently and stress-free.
            </p>
            
            <p>
              Join Expiry Notifier today and take control of your product management. Maximize the use of your items and reduce waste, ensuring you’re always prepared. Discover the convenience and peace of mind we bring to your life.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
