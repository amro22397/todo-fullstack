import UserProfile from "./UserProfile";

import SearchButton from "./SearchButton";
import { FaCheckDouble } from "react-icons/fa6";
import { TaskList } from "@/app/data/Tasks";

const TaskHeader = ({ pagetaskList }: {pagetaskList?: TaskList}) => {
  return (
    <div className="flex justify-between  items-center mb-6">
      <AppLogo />
      <div className="flex items-center ">
      <div className="flex flex-col gap-0 mr-3">
          <span className="font-semibold">{pagetaskList?.name}</span>
        </div>
        <SearchButton />
        <UserProfile />
      </div>
    </div>
  )
}

function AppLogo() {
    return (
      <div className="flex gap-2 items-center justify-center    ">
        <div className="bg-primary p-2 text-white rounded-sm text-xl hidden">
          <FaCheckDouble />
        </div>
  
        <div className="font-bold  text-3xl flex gap-1 justify-center items-center">
          <span className="text-primary">Todo</span>
          <span>App</span>
        </div>
      </div>
    );
  }
  

export default TaskHeader
