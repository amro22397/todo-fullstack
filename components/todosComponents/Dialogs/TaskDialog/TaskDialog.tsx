"use client";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { IoIosCloseCircle } from "react-icons/io";
import { IoMdClose } from "react-icons/io";


import TaskForm from "./TaskForm";
import { FaPlus } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
// import { useTasksStore } from "@/app/stores/useTasksStore";
import { nanoid } from "nanoid";
import { Task } from "@/app/data/Tasks";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import axios from "axios";
// import { useUserStore } from "@/app/stores/useUserStore";

const TaskDialog = () => {

  const session = useSession();
    console.log(session);
    console.log(session.data?.user?.email)

    const [formData, setFormData] = useState({
      name: "",
      priority : "",
      status: "",
      userId: "",
    });

  const [isTaskDialogOpened, setIsTaskDialogOpened] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {

    setLoading(true);

    axios.post("/api/tasks", formData)
    .then(() => {
      toast({
        title: "Task added successfully",
      })
    })
    .then(() => {
      setIsTaskDialogOpened(false);
    })
    .catch((error) => {
      toast({
        title: `error ${error}`,
      })
    })
    .finally(() => {
      setLoading(false);
    })
  }

  return (
    <Dialog open={isTaskDialogOpened} onOpenChange={() => setIsTaskDialogOpened(true)}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1">
          <FaPlus />
          <span>New Task</span>
        </Button>
      </DialogTrigger>
      {/* Form Provider */}
      
        <DialogContent className="p-7 poppins">
        <IoMdClose onClick={() => setIsTaskDialogOpened(false)}
          className="absolute right-3 top-[11.8px] text-2xl text-gray-600 active:scale-95 z-50 cursor-pointer"/>
          <DialogHeader>
            <DialogTitle className="text-xl">
              {/* {taskSelected ? "Edit Task" : "Add Task"} */}
            </DialogTitle>
            <DialogDescription>
              {`Add a new task here. Click save when you're done.`}
            </DialogDescription>
          </DialogHeader>

          {/* start of form  */}
          <form onSubmit={handleSubmit}>
            <TaskForm isTaskDialogOpened={isTaskDialogOpened} formData={formData} setFormData={setFormData} />
            <DialogFooter className="mt-11">
              <Button type="submit" className="flex items-center gap-1">
                {loading ? (
                  <div>loading...</div>
                ) : (
                  <div className="flex items-center gap-1">
                    <span>Save task</span>
                  </div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      
    </Dialog>
  )
}

export default TaskDialog
