

import TaskHeader from "../../../components/todosComponents/TaskHeader/TaskHeader";
import Stats from "../../../components/todosComponents/Stats/StatsStats";
import TasksArea from "../../../components/todosComponents/TasksArea/TasksArea";
import TasksFooter from "../../../components/todosComponents/TaskFooter/TaskFooter";
import TasksDialog from "../../../components/todosComponents/Dialogs/TaskDialog/TaskDialog";
import mongoose from "mongoose";
import { Tasks } from "@/models/tasks";
import { User } from "@/models/user";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/lib/auth";
import LoginPage from "@/components/signIn/SignIn";
import { TasksList } from "@/models/tasks-list";
import { headers } from "next/headers";
import { getSession } from "@/app/actions/getUser";

interface TaskListId {
  id: string;
}

const page = async ({ params }: { params: TaskListId}) => {

  const session = await getSession();
    console.log(session);

    mongoose.connect(process.env.MONGO_URL as string)
    const tasks = await Tasks.find({
      userEmail: {$in: [session?.user?.email]},
      taskListId: {$in: [params.id]},
    }, {}, {sort: {createdAt: 1}});

    const jTasks = JSON.parse(JSON.stringify(tasks))



      const tasksList = await TasksList.find({userEmail: {$in: [session?.user?.email]}})

      const jTasksList = JSON.parse(JSON.stringify(tasksList))


      
      const pagetaskList = await TasksList.findOne({_id: {$in: [params.id]}});

      const jpagetaskList = JSON.parse(JSON.stringify(pagetaskList))
    



    if (!session?.user?.email) {
      return (
        <div className='flex justify-center items-center h-screen poppins'>
              <LoginPage />
              <div className=""></div>
            </div>
      )
    }

  return (
    <div className="border flex items-center w-full h-full justify-center poppins md:min-h-screen max-md:my-10  ">
      <div
        className="border border-gray-400 flex flex-col gap-6 bg-inherit shadow-md 
      rounded-md py-6 sm:px-8 px-4 w-[98%] sm:w-[95%] md:w-[90%] lg:w-[85%] xl:w-[80%] 2xl:w-[60%]
      "
      >
        <TaskHeader pagetaskList={jpagetaskList} />
        <Stats tasks={jTasks}/>
        <AllTasksHeader taskListId={params.id} />
        <TasksArea tasks={jTasks} tasksList={jTasksList}  />
        <TasksFooter tasks={jTasks} />
      </div>
    </div>
  )
}

function AllTasksHeader({ taskListId }: { taskListId: string}) {

  
  return (
    <div className="flex justify-between items-center mt-4 mb-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold">{`Today's Task`}</h2>
        <p className="text-sm text-gray-400">{formatDate()}</p>
      </div>

      
      <TasksDialog taskListId={taskListId} />
      
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
