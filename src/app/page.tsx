import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen items-center justify-center bg-blue-50">
      {/* Background */}
      <div
        className="absolute top-0 left-0 w-full h-screen bg-cover bg-center -z-10"
        style={{
          backgroundImage: "url('/path-to-your-background-image.jpg')", // Update path
        }}
      ></div>

      {/* Main Content */}
      <div className="text-center max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-5xl font-bold text-gray-800 leading-tight">
          Expiry Notifier
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Join Expiry Notifier and take control of your product management. Our service helps you maximize the use of your items and reduces waste, ensuring you’re always prepared. Discover the convenience and peace of mind we bring to your life.
        </p>

        {/* Dynamic Explore Button */}
        <Link href="/about">
          <button className="mt-6 px-6 py-3 text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-lg">
            Explore
          </button>
        </Link>
      </div>

      {/* Quality Section */}
      <div className="mt-16 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-gray-800">Why Choose Expiry Notifier?</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Maximize Product Usage</h3>
            <p className="mt-2 text-gray-600">
              With expiry alerts, you can ensure that your items are used before they expire, reducing waste and improving efficiency.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Peace of Mind</h3>
            <p className="mt-2 text-gray-600">
              Stay prepared and never worry about missing product expiry dates. Our reminders will keep you on track.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800">Convenient Alerts</h3>
            <p className="mt-2 text-gray-600">
              Receive timely notifications directly to your email, ensuring you never forget an important expiry date.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
