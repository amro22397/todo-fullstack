'use client'

import { getSession, useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
    
  const { data: session, status } = useSession()
      console.log(session);

  return (
    <div>
        Hello

        <div>{JSON.stringify(session)}</div>
    </div>
  )
}

export default page
