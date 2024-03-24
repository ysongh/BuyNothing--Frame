'use client';

import { PrivyProvider as Provider } from '@privy-io/react-auth';

export default function PrivyProvider({children}: {children: React.ReactNode}) {
  return (
    <Provider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://your-logo-url',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </Provider>
  );
}