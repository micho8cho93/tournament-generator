import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 bg-transparent pointer-events-none">
      <div className="flex items-center space-x-4">
        {/* Potentially add a logo or home link here later */}
      </div>
      <nav className="flex space-x-4 pointer-events-auto">
        <Link 
          href="/dashboard" 
          className="text-[#f0f0f0] hover:text-gray-400 cursor-pointer transition-colors"
        >
          Login
        </Link>
        <Link 
          href="/dashboard" 
          className="text-[#f0f0f0] hover:text-gray-400 cursor-pointer transition-colors"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
