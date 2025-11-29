import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-transparent">
      <div className="flex items-center space-x-4">
        {/* Potentially add a logo or home link here later */}
      </div>
      <nav className="flex space-x-4">
        <Link href="/login" className="text-[#f0f0f0] hover:text-gray-400">
          Login
        </Link>
        <Link href="/signup" className="text-[#f0f0f0] hover:text-gray-400">
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
