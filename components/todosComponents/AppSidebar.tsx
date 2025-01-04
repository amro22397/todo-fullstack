"use client"

import { Calendar, Home, Inbox, Plus, Search, Settings } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import { AppLogo } from "@/components/AppLogo"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import TaskListAddDialog from "../../app/to-dos/TaskListAddDialog"

  const items = [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]
  
  
  export function AppSidebar() {


    const [loading, setLoading] = useState(false);

    const handleAddTaskList = (e: React.MouseEvent) => {
        e.preventDefault();

        setLoading(true);


    }
    return (
        <>
        <Sidebar>
        <SidebarHeader>
            <AppLogo className="my-3" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg">Tasks List 22</SidebarGroupLabel>

            <SidebarGroupContent>

            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar><Sidebar>
        <SidebarHeader>
            <AppLogo className="my-3" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg">Tasks List</SidebarGroupLabel>

            <SidebarGroupAction>
                <Button variant="outline" className="w-full"
                onClick={handleAddTaskList} >
                    <Plus />
                </Button>
            </SidebarGroupAction>

            <SidebarGroupContent>

            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
        </>
    )
  }
  