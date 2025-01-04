import { AppLogo } from '@/components/AppLogo'
import React from 'react'
import TaskListAddDialog from '../TaskListAddDialog'
import mongoose from 'mongoose'
import { TasksList } from '@/models/tasks-list'
import { getSession } from '@/app/actions/getSession'
import { Edit, Trash } from 'lucide-react'


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


const SideBar = async () => {

  const session = await getSession();

  mongoose.connect(process.env.MONGO_URL as string)
  const tasksList = await TasksList.find({userEmail: {$in: [session?.user?.email]}})

  const taskListIconSize = 17;
  const taskListButtonClassName = "cursor-pointer active:scale-95"
  

  return (
    <div className="bg-gray-50 w-[300px] h-screen border-r border-solid
        border-gray-200 px-[11px] flex flex-col gap-4">
            <AppLogo className="mt-5"/>

            <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-between items-center">
            <h2 className="text-lg text-gray-700">Tasks List</h2>

            <TaskListAddDialog tasksList={tasksList} />
            
            </div>

            <ul className="flex flex-col mx-2 gap-3">
              {tasksList.map((tasklist, index) => (
                <div className="flex flex-row justify-between items-center">
                  <Link key={index} href={`/to-dos/${tasklist._id}`}
                  className="cursor-pointer font-semibold tracking-wider hover:text-gray-600
                  text-sm">
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
