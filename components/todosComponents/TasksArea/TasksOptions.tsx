"use client";
import { Task } from "@/app/data/Tasks";
// import { useTasksStore } from "@/app/stores/useTasksStore";
// import { useUserStore } from "@/app/stores/useUserStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { SlOptions } from "react-icons/sl";


const TasksOptions = ({ singleTask }: { singleTask: Task }) => {

  {/*
    const {
    setIsTaskDialogOpened,
    setTaskSelected,
    taskSelected,
    addNewTask,
    setOpenDeleteDialog,
  } = useTasksStore();
    */}

  // const { user } = useUserStore();

  const [actionClicked, setActionClicked] = useState("");


  const handleItemClick = (action: string) => {

  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">
          <SlOptions />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleItemClick("edit")}>
            Edit
            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleItemClick("copy")}>
            Copy
            <DropdownMenuShortcut>⌘C</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => handleItemClick("delete")}
          >
            Delete
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default TasksOptions
