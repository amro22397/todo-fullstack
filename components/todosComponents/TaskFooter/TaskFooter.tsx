// import { useTasksStore } from "@/app/stores/useTasksStore";
'use client'

import { useState } from "react";
import ClearAllDialog from "../Dialogs/ClearAllDialog/ClearAllDialog";
import mongoose from "mongoose";
import { Tasks } from "@/models/tasks";
import { Task } from "@/app/data/Tasks";


const TaskFooter = ({tasks} : {tasks: Task[]}) => {
  // const { tasks } = useTasksStore();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    

  return (
    <div>
      <div className="flex justify-between mt-5 items-center">
        <p className="text-gray-500 text-sm">{tasks.length} Tasks</p>
        <ClearAllDialog openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog}
        tasks={tasks} />
      </div>
    </div>
  )
}

export default TaskFooter
