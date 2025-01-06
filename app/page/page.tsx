
// import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import { getUser } from '../actions/getUser';
import mongoose from 'mongoose';
import { Tasks } from '@/models/tasks';

const page = async () => {
    
 // const { data: session, status } = useSession()
  //    console.log(session);

  const session = await getUser();
    console.log(session);

    mongoose.connect(process.env.MONGO_URL as string)
        const tasks = await Tasks.find({userEmail: {$in: [session?._doc?.email]}}, {}, {sort: {createdAt: -1}});
  return (
    <div>
        Hello

        <div>{JSON.stringify(session, null, 2)}</div>
        <div className=""></div>
        <div>{JSON.stringify(tasks, null, 2)}</div>
        <div className=""></div>
        
    </div>
  )
}

export default page
