import { useSession } from 'next-auth/react';
import React from 'react'

const page = () => {
    const session = useSession();
  return (
    <div>
      Hello
      {session.data?.user?.email}
    </div>
  )
}

export default page
