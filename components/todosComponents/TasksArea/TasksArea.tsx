
import { Checkbox } from "@/components/ui/checkbox";

import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import ComboboxDemo from "./PriorityCombobox";
import TasksOptions from "./TasksOptions";
// import { useTasksStore } from "@/app/stores/useTasksStore";
import { Task, TaskList } from "@/app/data/Tasks";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import CircularProgress from '@mui/joy/CircularProgress';
import { FaUmbrellaBeach } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import mongoose from "mongoose";
import { Tasks } from "@/models/tasks";
import CheckBoxComponent from "./CheckBoxComponent";


// import { useUserStore } from "@/app/stores/useUserStore";


const TasksArea = ({ tasks, tasksList }: {tasks: Task[], tasksList?: TaskList[]}) => {
 // const { tasks, fetchTasks } = useTasksStore();


  return (
    <ScrollArea className="h-72 flex flex-col gap-4">
      {tasksList?.length === 0 ? (
        <div className="  h-full w-full flex items-center justify-center  flex-col gap-6">
        <FaUmbrellaBeach className="text-[79px] text-slate-500 opacity-85" />
        <span className="text-sm text-slate-400 opacity-85 text-center">
          It looks like there are no tasks lists available. <br /> Click on the sidebar to
          add a new task list
        </span>
      </div>
      ) : tasks.length === 0 ? (
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

  console.log(id);
  

  mongoose.connect(process.env.MONGO_URL as string)
      const task = await Tasks.findOne({_id: id});

      console.log(task);
  

  const lowerOpacity = singleTask.status === "completed" && "opacity-65"

  return (
    <div
      className={`flex items-center px-0 my-5 rounded-md w-full justify-between mb-0 ${lowerOpacity}`}
    >
      <div className="flex items-center gap-4">

        <CheckBoxComponent singleTask={singleTask} />

        <div className="flex flex-row gap-[6px] items-center justify-center">
        <label
           /* onClick={() => {
              //setTaskSelected(singleTask);
              //setIsTaskDialogOpened(true);
            }} */
            htmlFor="task"
            className="md:text-md xl:text-lg font-semibold cursor-pointer hover:text-primary
            text-md"
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
