

import TaskHeader from "../../components/todosComponents/TaskHeader/TaskHeader";
import Stats from "../../components/todosComponents/Stats/StatsStats";
import TasksArea from "../../components/todosComponents/TasksArea/TasksArea";
import TasksFooter from "../../components/todosComponents/TaskFooter/TaskFooter";
import TasksDialog from "../../components/todosComponents/Dialogs/TaskDialog/TaskDialog";
import mongoose from "mongoose";
import { Tasks } from "@/models/tasks";
import { User } from "@/models/user";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import LoginPage from "@/components/signIn/SignIn";


const page = async () => {

  async function getSession() {
    return await getServerSession(authConfig);
  }

  const session = await getSession();
  console.log(session);
  console.log(session?.user?.email)

    mongoose.connect(process.env.MONGO_URL as string)
    const tasks = await Tasks.find({userEmail: {$in: [session?.user?.email]}}, {}, {sort: {createdAt: -1}});
    

    console.log(tasks);


    if (!session?.user?.email) {
      return (
        <div className='flex justify-center items-center h-screen poppins'>
              <LoginPage />
              <div className=""></div>
            </div>
      )
    }

  return (
    <div className="min-h-screen border flex items-center w-full justify-center poppins  ">
      <div
        className="border border-gray-400 flex flex-col gap-6 bg-inherit shadow-md 
      rounded-md py-6 sm:px-8 px-4 w-[98%] sm:w-[85%] md:w-[70%] lg:w-[60%] xl:w-[55%]"
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
