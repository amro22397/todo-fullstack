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
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { revalidatePath } from "next/cache";
import React, { useEffect, useState } from "react";

const ClearAllDialog = ({tasks}: {
   tasks: Task[]
}) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    

    const deleteFunction = async (e: React.MouseEvent) => {

      e.preventDefault();

      setIsLoading(true)
      axios.delete("/api/tasks")
      .then(() => {
        setOpenDeleteDialog(false)
      })
      .then(() => {
        toast({
          title: "All tasks deleted successfully"
        })
        window.location.reload();
      })
      .catch((error) => {
        toast({
          title: `${error}`
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
      
    }

  return (
    <AlertDialog open={openDeleteDialog} /* onOpenChange={() => setOpenDeleteDialog(true)} */>
  <AlertDialogTrigger onClick={() => setOpenDeleteDialog(true)} 
  className="cursor-pointer">Clear All</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete all tasks?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your all tasks..
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={deleteFunction}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

  )
}

export default ClearAllDialog
