
// import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import { getSession, getUser } from '../actions/getUser';
import mongoose from 'mongoose';
import { Tasks } from '@/models/tasks';
import TaskHeader from '@/components/todosComponents/TaskHeader/TaskHeader';

const page = async () => {
    
 // const { data: session, status } = useSession()
  //    console.log(session);

  const session = await getSession();
    console.log(session);

   // mongoose.connect(process.env.MONGO_URL as string)
    // const tasks = await Tasks.find({userEmail: {$in: [session?._doc?.email]}}, {}, {sort: {createdAt: -1}});
  return (
    <div>
        Hello
        <TaskHeader  />
        <pre>{JSON.stringify(session, null, 2)}</pre>
        
        
    </div>
  )
}

export default page
