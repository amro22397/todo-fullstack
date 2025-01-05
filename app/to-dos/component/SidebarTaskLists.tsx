'use client'

import { TaskList } from '@/app/data/Tasks'
import { Link } from 'lucide-react'
import React from 'react'
import EditDeleteTaskList from './EditDeleteTaskList'

const SidebarTaskLists = ({ tasksList }: { tasksList: TaskList[]}) => {
  return (
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
  )
}

export default SidebarTaskLists