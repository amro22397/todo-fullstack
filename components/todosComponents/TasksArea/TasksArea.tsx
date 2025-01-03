
import { Checkbox } from "@/components/ui/checkbox";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ComboboxDemo from "./PriorityCombobox";
import TasksOptions from "./TasksOptions";
// import { useTasksStore } from "@/app/stores/useTasksStore";
import { Task } from "@/app/data/Tasks";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import CircularProgress from '@mui/joy/CircularProgress';
import { FaUmbrellaBeach } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import mongoose from "mongoose";
import { Tasks } from "@/models/tasks";
// import { useUserStore } from "@/app/stores/useUserStore";


const TasksArea = ({ tasks }: {tasks: Task[]}) => {
 // const { tasks, fetchTasks } = useTasksStore();


  return (
    <ScrollArea className="h-60 flex flex-col gap-4">
      {tasks.length === 0 ? (
        <div className="  h-full w-full flex items-center justify-center  flex-col gap-6">
          <FaUmbrellaBeach className="text-[79px] text-slate-500 opacity-85" />
          <span className="text-sm text-slate-400 opacity-85 text-center">
            It looks like there are no tasks available. <br /> Click above to
            add a new task
          </span>
        </div>
      ) : (
        <>
          {tasks.map((singleTask) => (
            <SingleTask key={singleTask.id} singleTask={singleTask} id={singleTask._id} />
          ))}
        </>
      )}
    </ScrollArea>
  )
}


export async function SingleTask({ singleTask, id }: { singleTask: Task, id: string }) {

//  const { updateTaskFunction, setTaskSelected, setIsTaskDialogOpened } = useTasksStore();
  console.log(id);
  const handleCheckboxChange = () => {

    const updateTaskObject: Task = {
      ...singleTask,
      status: singleTask.status === "completed" ? "in progress" : "completed"
    }
  }

  mongoose.connect(process.env.MONGO_URL as string)
      const task = await Tasks.findOne({_id: id});

      console.log(task);
  

  const lowerOpacity = singleTask.status === "completed" && "opacity-65"

  return (
    <div
      className={`border flex items-center p-3 rounded-md w-full justify-between mb-3 ${lowerOpacity}`}
    >
      <div className="flex items-center gap-2">
        {/*
        {loading ? (
          <CircularProgress size="sm" color="primary" />
        ) : (
          <>
          <Checkbox
            id={`task-${singleTask.id}`}
            className="w-5 h-5"
            checked={singleTask.status === "completed"}
            onCheckedChange={handleCheckboxChange}
          />
          </>
        )}
        */}

        <div className="flex flex-col gap-1">
        <label
           /* onClick={() => {
              //setTaskSelected(singleTask);
              //setIsTaskDialogOpened(true);
            }} */
            htmlFor="task"
            className="text-lg font-semibold cursor-pointer hover:text-primary"
          >
            {singleTask.name}
          </label>

          <Badge variant="outline" className="text-[10px] opacity-55">
            {singleTask.status}
          </Badge>

        </div>
      </div>
      <div className="flex gap-3 items-center ">
      <ComboboxDemo singleTask={singleTask} />
      <TasksOptions singleTask={singleTask} id={id} />
      </div>
    </div>
  )
}

export default TasksArea
