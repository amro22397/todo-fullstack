'use client'

import { Edit, Edit2, Trash } from 'lucide-react'
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

const EditDeleteTaskList = () => {

    const taskListIconSize = 17;
  const taskListButtonClassName = "cursor-pointer active:scale-95"

  const [openEditDialog, setEditDialog] = useState(false);

  return (
    <div className="flex flex-row items-center gap-2">
                  <Edit2 size={taskListIconSize} onClick={() => setEditDialog(true)}
                  className={`text-green-700 hover:text-green-800 ${taskListButtonClassName}`} />
                  <Trash size={taskListIconSize} className={`text-red-600 hover:text-red-700 ${taskListButtonClassName}`} />


                  <Dialog open={openEditDialog} onOpenChange={() => setEditDialog(!openEditDialog)}  >
  <DialogTrigger></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
                </div>
  )
}

export default EditDeleteTaskList
