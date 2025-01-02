import React from 'react'
import LoginPage from '@/components/signIn/SignIn'
import { useSession } from 'next-auth/react';

const page = () => {

  return (
    <div className='flex justify-center items-center h-screen poppins'>
      <LoginPage />
      <div className=""></div>
    </div>
  )
}

export default page

