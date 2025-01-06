
// import { getSession, useSession } from 'next-auth/react'
import React from 'react'
import { getSession, getUser } from '../actions/getUser';
import mongoose from 'mongoose';
import { Tasks } from '@/models/tasks';
import TaskHeader from '@/components/todosComponents/TaskHeader/TaskHeader';
import SideBar from '../to-dos/component/Sidebar';
import { TasksList } from '@/models/tasks-list';

const page = async () => {
    
 // const { data: session, status } = useSession()
  //    console.log(session);

  const session = await getSession();
    console.log(session);

    mongoose.connect(process.env.MONGO_URL)
      const tasksList = await TasksList.findOne({email: session?.user?.email})


   // mongoose.connect(process.env.MONGO_URL as string)
    // const tasks = await Tasks.find({userEmail: {$in: [session?._doc?.email]}}, {}, {sort: {createdAt: -1}});
  return (
    <div>
        Hello
        <TaskHeader  />

        <div className="  h-full w-full flex items-center justify-center  flex-col gap-2">
                 {/*  <FaUmbrellaBeach className="text-[79px] text-slate-500 opacity-85" /> */}

                 <span className="font-semibold tracking-wide">Welcome to Todo App</span>
                  <span className="text-sm text-slate-600 text-center">Click on or add a list on the sidebar<br /> to start adding tasks</span>
                </div>

        <pre>{JSON.stringify(session, null, 2)}</pre>

        
        
        
    </div>
  )
}

function formatDate(date = new Date()) {
  const options = {
    day: "numeric", // Should be 'numeric', not 'string'
    month: "long", // Should be 'long' (for full month name)
    year: "numeric", // Should be 'numeric', not 'string'
  };
  return date.toLocaleDateString("en-GB", options); 
}

export default page
