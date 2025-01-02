// import { useTasksStore } from "@/app/stores/useTasksStore";
// import { useUserStore } from "@/app/stores/useUserStore";
"use client"

import { Task } from "@/app/data/Tasks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export function DeleteDialog() {
    /* const {
      openDeleteDialog,
      setOpenDeleteDialog,
      taskSelected,
      setTaskSelected,
      deleteTaskFunction,
      isLoading,
      tasks,
    } = useTasksStore(); */
}

    
  // const { user } = useUserStore();


const ClearAllDialog = ({openDeleteDialog, setOpenDeleteDialog, tasks}: {
  openDeleteDialog: boolean, setOpenDeleteDialog: any, tasks: Task[]
}) => {

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    

    const deleteFunction = async () => {
      
    }

  return (
    <AlertDialog open={openDeleteDialog} onOpenChange={() => setOpenDeleteDialog(true)}>
      <AlertDialogTrigger disabled={tasks.length === 0}>
        <Button variant="link" disabled={tasks.length === 0}>
          Clear All
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-7">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-7">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-7">
          <AlertDialogCancel
            onClick={() => {
              // setTaskSelected(null);
              setOpenDeleteDialog(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={deleteFunction}>
            {isLoading ? "Loading..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ClearAllDialog
