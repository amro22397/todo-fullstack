

import TaskHeader from "../../components/todosComponents/TaskHeader/TaskHeader";
import Stats from "../../components/todosComponents/Stats/StatsStats";
import TasksArea from "../../components/todosComponents/TasksArea/TasksArea";
import TasksFooter from "../../components/todosComponents/TaskFooter/TaskFooter";
import TasksDialog from "../../components/todosComponents/Dialogs/TaskDialog/TaskDialog";
import mongoose from "mongoose";
import { Tasks } from "@/models/tasks";


const page = async () => {

    mongoose.connect(process.env.MONGO_URL as string)
    const tasks = await Tasks.find({});

    console.log(tasks);

  return (
    <div className="min-h-screen border flex items-center w-full justify-center poppins  ">
      <div
        className="w-[55%] border border-gray-400 flex flex-col gap-6 bg-inherit shadow-md 
      rounded-md p-8"
      >
        <TaskHeader  />
        <Stats tasks={tasks}/>
        <AllTasksHeader />
        <TasksArea tasks={tasks}  />
        <TasksFooter tasks={tasks} />
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
