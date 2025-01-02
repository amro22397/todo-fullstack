"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


const UserProfile = () => {

  const [open, setOpen] = useState(false);
  // const { user } = useUserStore();
  const { theme, setTheme } = useTheme();

  const [checked, setChecked] = useState(false);


  const handleDarkModeClick = () => {

  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <FaRegUser className="text-[20px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel className="text-lg text-gray-600">
          {/* {user?.email} */}
        </DropdownMenuLabel>

        <DropdownMenuGroup>
          <DropdownMenuSeparator />
          {/* Dark Mode Item */}
          <DropdownMenuItem
            className="flex items-center justify-between mb-2"
            onClick={handleDarkModeClick}
          >
            <Label htmlFor="airplane-mode">Dark Mode</Label>
            <Switch
              checked={checked}
              onCheckedChange={(checked) => setChecked(checked)}
              id="airplane-mode"
            />
          </DropdownMenuItem>

          {/* Log out item */}
          <DropdownMenuItem>
            {/* <LogoutButton /> */}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile
