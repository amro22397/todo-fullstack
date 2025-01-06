
// import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import { getUser } from '../actions/getUser';

const page = async () => {
    
 // const { data: session, status } = useSession()
  //    console.log(session);

  const session = await getUser();
    console.log(session);
  return (
    <div>
        Hello

        <pre>{JSON.stringify(session, null, 2)}</pre>
        
    </div>
  )
}

export default page
