'use client'

import { Edit, Edit2, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Label } from '@radix-ui/react-label'
import { Input } from '@/components/ui/input'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Task, TaskList } from '@/app/data/Tasks'
import axios from 'axios'
import { toast } from '@/hooks/use-toast'

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
import { usePathname, useRouter } from 'next/navigation'

  

const EditDeleteTaskList = ({ tasklist, tasksList }: {
  tasklist: TaskList, tasksList: TaskList[]
}) => {

    const session = useSession();
    const router = useRouter();

    const pathname = usePathname();
    console.log(pathname);
    console.log(pathname.includes(tasklist._id))

    const taskListIconSize = 17;
  const taskListButtonClassName = "cursor-pointer active:scale-95"

  const [openEditDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);


  const [formData, setFormData] = useState({
        name: tasklist.name || "",
        userEmail: session?.data?.user?.email || "",
      });
  
  
      useEffect(() => {
        setFormData({
            name: tasklist.name || "",
            userEmail: session?.data?.user?.email || "",
        })
      }, [openEditDialog]);


  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    axios.put("/api/tasks-list", { id: tasklist._id, ...formData})
    .then(() => {
        setEditDialog(false);
        toast({
            title: "Task List updated successfully"
        })
    })
    .then(() => {
        window.location.reload();
    })
    .catch((error) => {
        toast({
            title: `${error}`
        })
    })
    .finally(() => {
        setLoading(false)
    })
    
  }


  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();

    setLoading(true);

    axios.delete(`/api/tasks-list/${tasklist._id}`)
    .then(() => {
      setDeleteDialog(false);
        window.location.reload();
        if (pathname.includes(tasklist._id)) {
          const id = tasksList[0]._id;
          router.push(`/to-dos/${id}`)
        }
    })
    .then(() => {
      toast({
          title: "Task List deleted successfully"
      })
  })
    .catch((error) => {
        toast({
            title: `${error}`
        })
    })
    .finally(() => {
        setLoading(false)
    })
  }

  /* useEffect(() => {
        if (tasksList.length === 0) {
          router.push('/to-dos');
        }
      }, [deleteDialog]); */

  console.log(formData)
  return (
    <div className="flex flex-row items-center gap-2">
                  <Edit2 size={taskListIconSize} onClick={() => setEditDialog(true)}
                  className={`text-green-700 hover:text-green-800 ${taskListButtonClassName}`} />
                  <Trash size={taskListIconSize} onClick={() => setDeleteDialog(true)}
                  className={`text-red-600 hover:text-red-700 ${taskListButtonClassName}`} />




                  <Dialog open={openEditDialog} onOpenChange={() => setEditDialog(!openEditDialog)}  >
  <DialogTrigger></DialogTrigger>


  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Task List</DialogTitle>
      <DialogDescription>
      Edit this task list. Click save when you're done.
      </DialogDescription>
    </DialogHeader>

    <form className="flex flex-col gap-6 mt-8"
    onSubmit={handleEdit}>

      <div className='flex flex-col gap-2'
      >
      <Label>List Name</Label>
      <Input id="name" type="name" placeholder='Enter the name of the task list'
      defaultValue={formData.name} onChange={(e) => setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })} />
      </div>

      <DialogFooter className="mt-11">
              <Button type="submit" className="flex items-center gap-1">
                {loading ? (
                  <div>loading...</div>
                ) : (
                  <span>Save task</span>
                )}
              </Button>
            </DialogFooter>
    </form>


  </DialogContent>
</Dialog>




<AlertDialog open={deleteDialog} onOpenChange={() => setDeleteDialog(!deleteDialog)}>
  <AlertDialogTrigger></AlertDialogTrigger>

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to delete this task list?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone, This will permanently delete your task list..
      </AlertDialogDescription>
    </AlertDialogHeader>

    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => setDeleteDialog(false)}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

                </div>
  )
}

export default EditDeleteTaskList
