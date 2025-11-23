'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-pink-600 bg-clip-text text-transparent">
          Nihongo Daily
        </Link>

        <div className="flex gap-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              isActive('/') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/schedule"
            className={`text-sm font-medium transition-colors ${
              isActive('/schedule') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Schedule
          </Link>
          {/* Temporary link for dev convenience, ideally dynamic based on progress */}
          <Link
            href="/chapter/1"
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith('/chapter') ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Current Chapter
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
