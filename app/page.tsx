'use client'

import React from 'react'
import LoginPage from '@/components/signIn/SignIn'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const page = () => {

  const session = useSession();
  const router = useRouter();

  if (session.status === "authenticated") {
    return router.push("/to-dos");
  }

  return (
    <div className='flex justify-center items-center h-screen poppins'>
      <LoginPage />
    </div>
  )
}

export default page

