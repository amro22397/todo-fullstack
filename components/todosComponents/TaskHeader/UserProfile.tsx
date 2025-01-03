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
// import { LogoutButton } from "@/LogoutBtn";
// import { useUserStore } from "@/app/stores/useUserStore";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { signOut, useSession } from "next-auth/react";




const UserProfile = () => {

  const session = useSession();

  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const [checked, setChecked] = useState(false);


  const handleDarkModeClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (!checked) {
      setTheme("dark");
      setChecked(true);
    } else {
      setTheme("light");
      setChecked(false);
    }
  }

  useEffect(() => {
    if (theme === "dark") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, []);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <FaRegUser className="text-[20px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-gray-600 text-sm">
          {session.data?.user?.email}
        </DropdownMenuLabel>

        <DropdownMenuGroup className="hover:bg-transparent">
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
          <DropdownMenuLabel>
          <Button variant="outline" onClick={() => signOut({callbackUrl: '/'})}
          className="border-none bg-red-600 text-white hover:bg-red-500
           font-semibold hover:text-white active:scale-95">Logout</Button>
          </DropdownMenuLabel>

        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserProfile
