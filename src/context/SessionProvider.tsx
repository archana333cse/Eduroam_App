'use client';

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

// Define the component props
interface Props {
  children: ReactNode;
}

/**
 * Wraps the application to provide NextAuth session context to all client components.
 */
const SessionProvider = ({ children }: Props) => {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  );
};

export default SessionProvider;
