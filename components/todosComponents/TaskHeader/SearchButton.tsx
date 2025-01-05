import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { IoSearchSharp } from "react-icons/io5";

import { Input } from "@/components/ui/input";
const SearchButton = () => {
  return (
    <Popover>
      <PopoverTrigger>
          <IoSearchSharp className="text-[20px]" />
      </PopoverTrigger>
      <PopoverContent>
        <Input id="search" placeholder="Search a task..." className="mt-2" />
      </PopoverContent>
    </Popover>
  )
}

export default SearchButton
