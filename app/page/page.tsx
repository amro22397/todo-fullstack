'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

const page = async () => {
    const session = useSession();

  return (
    <div>
        {session.data?.user?.email}
    </div>
  )
}

export default page
