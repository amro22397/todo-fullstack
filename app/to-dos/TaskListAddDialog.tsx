'use client'

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import axios from 'axios'
import { toast } from '@/hooks/use-toast'
import { useSession } from 'next-auth/react'
import { TaskList } from '../data/Tasks'
import { useRouter } from 'next/navigation'


const TaskListAddDialog = ({ tasksList }: { tasksList: TaskList[]}) => {

  const session = useSession();
  const router = useRouter();

  console.log(tasksList.length);

    const [isAddTaskListDialogOpen, setIsAddTaskListDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
      name: "",
      userEmail: session?.data?.user?.email || "",
    });


    useEffect(() => {
      setFormData({
        name: "",
      userEmail: session?.data?.user?.email || "",
      })
    }, [isAddTaskListDialogOpen]);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();

      setLoading(true);

      axios.post("/api/tasks-list", formData)
      .then(() => {
        setIsAddTaskListDialogOpen(false);
        window.location.reload();
      })
      .then(() => {
        toast({
          title: "Task Added successfully"
        })
      })
      .catch((error) => {
        toast({
          title: `${error}`
        });
      })
      .finally(() => {
        setLoading(false);
      })

    }


    useEffect(() => {
            if (tasksList.length === 0) {
              router.push('/to-dos');
            }
          }, [isAddTaskListDialogOpen]);

    console.log(formData)

  return (
    <Dialog open={isAddTaskListDialogOpen} onOpenChange={() => setIsAddTaskListDialogOpen(!isAddTaskListDialogOpen)} >

  <DialogTrigger>
  <Button variant="outline" className="py-2 bg-transparent hover:bg-transparent border-none shadow-none">
            <span className="bg-yellow-500 text-white px-1 py-1 rounded-full
            active:scale-95">
              <Plus className='' />
            </span> 
            </Button>
  </DialogTrigger>

  <DialogContent>
    <DialogHeader>
      <DialogTitle>Add Tasks List</DialogTitle>
      <DialogDescription>
      Add a new task here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>

    <form className="flex flex-col gap-6 mt-8"
    onSubmit={handleSubmit}>

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
  )
}

export default TaskListAddDialog
