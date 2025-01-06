

import TaskHeader from "../../components/todosComponents/TaskHeader/TaskHeader";
import Stats from "../../components/todosComponents/Stats/StatsStats";
import TasksArea from "../../components/todosComponents/TasksArea/TasksArea";
import TasksFooter from "../../components/todosComponents/TaskFooter/TaskFooter";
import TasksDialog from "../../components/todosComponents/Dialogs/TaskDialog/TaskDialog";
import mongoose from "mongoose";
import { Tasks } from "@/models/tasks";
import { User } from "@/models/user";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/lib/auth";
import LoginPage from "@/components/signIn/SignIn";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { FaUmbrellaBeach } from "react-icons/fa";
import { getProviders } from "next-auth/react";
import { getSession, getUser } from "../actions/getUser";



const page = async () => {

  const session = await getSession();
  console.log(session);

    /* mongoose.connect(process.env.MONGO_URL as string)
    const tasks = await Tasks.find({userEmail: {$in: [session?.user?.email]}}, {}, {sort: {createdAt: -1}});

    const jTasks = JSON.parse(JSON.stringify(tasks))


    if (!session?.user?.email) {
    
    redirect('/')
    
    }
      */

  return (
    <div className="border flex items-center w-full justify-center poppins md:min-h-screen max-md:my-20  ">
      <div
        className="border border-gray-400 flex flex-col gap-6 bg-inherit shadow-md 
      rounded-md py-6 sm:px-8 px-4 w-[98%] sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[60%]"
      >

        <TaskHeader  />
        
        
        <div className="  h-full w-full flex items-center justify-center  flex-col gap-2">
                 {/*  <FaUmbrellaBeach className="text-[79px] text-slate-500 opacity-85" /> */}

                 <span className="font-semibold tracking-wide">Welcome to Todo App</span>
                  <span className="text-sm text-slate-600 text-center">Click on or add a list on the sidebar<br /> to start adding tasks</span>
                </div>

        {/*
        <Stats tasks={tasks}/>
        <AllTasksHeader />
        <TasksArea tasks={tasks}  />
        <TasksFooter tasks={tasks} />
        */}
      </div>
    </div>
  )
}

function AllTasksHeader() {

  
  return (
    <div className="flex justify-between items-center mt-4 mb-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{`Today's Task`}</h2>
        <p className="text-sm text-gray-400">{formatDate()}</p>
      </div>

      
      <TasksDialog />
      
    </div>
  );
}

function formatDate(date: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric", // Should be 'numeric', not 'string'
    month: "long", // Should be 'long' (for full month name)
    year: "numeric", // Should be 'numeric', not 'string'
  };
  return date.toLocaleDateString("en-GB", options);
}



export default page
