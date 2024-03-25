"use client"

import Link from 'next/link';
import { usePrivy } from '@privy-io/react-auth';

function Navbar() {
  const { login, ready, authenticated, user  } = usePrivy();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-white font-bold text-lg">Buy Nothing Frame</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/">
            <p className="text-white hover:text-gray-300">Home</p>
          </Link>
          <Link href="/buynothing/create">
            <p className="text-white hover:text-gray-300">Create</p>
          </Link>
          {ready && !authenticated && (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline"
              onClick={login}
            >
              Log In
            </button>
          )}
          {ready && authenticated && <p className='text-white'>User {user?.id} is logged in.</p>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;