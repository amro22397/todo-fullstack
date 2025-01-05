import { AppLogo } from '@/components/AppLogo'
import React from 'react'
import TaskListAddDialog from '../TaskListAddDialog'
import mongoose from 'mongoose'
import { TasksList } from '@/models/tasks-list'
import { getSession } from '@/app/actions/getSession'
import { Edit, Trash, X } from 'lucide-react'


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EditDeleteTaskList from './EditDeleteTaskList'
import Link from 'next/link'
import CloseSidebar from './CloseSidebar'


const SideBar = async () => {

  const session = await getSession();

  mongoose.connect(process.env.MONGO_URL as string)
  const tasksList = await TasksList.find({userEmail: {$in: [session?.user?.email]}})

  const taskListIconSize = 17;
  const taskListButtonClassName = "cursor-pointer active:scale-95"
  

  return (
    <div className="bg-gray-50 max-md:z-50
    md:w-[400px] md:h-screen border-r border-solid px-3 sm:px-14
    
        border-gray-200 md:px-[11px] flex flex-col gap-4">


            <AppLogo className="mt-5"/>

            <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
            <h2 className="text-lg text-gray-700">Tasks List</h2>

            <TaskListAddDialog tasksList={tasksList} />
            
            </div>

            <ul className="flex flex-col mx-2 gap-3 max-md:mb-4">
              {tasksList.map((tasklist, index) => (
                <div key={index} className="flex flex-row justify-between items-center">
                  <Link href={`/to-dos/${tasklist._id}`}
                  className="cursor-pointer font-semibold tracking-wider hover:text-gray-600
                  text-md">
                  {tasklist.name}
                </Link>

                <EditDeleteTaskList tasklist={tasklist} tasksList={tasksList} />
                
                </div>
              ))}
            </ul>
            </div>


        </div>
  )
}

export default SideBar
