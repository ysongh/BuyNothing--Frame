"use client"

import { usePrivy } from '@privy-io/react-auth';

function Navbar() {
  const { login, ready, authenticated, user  } = usePrivy();

  return (
    <div className='container'>
      {ready && !authenticated && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline"
          onClick={login}
        >
          Log In
        </button>
      )}
      {ready && authenticated && <p>User {user?.id} is logged in.</p>}
    </div>
  );
};

export default Navbar;