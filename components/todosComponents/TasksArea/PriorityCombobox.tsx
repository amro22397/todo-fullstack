"use client";

import * as React from "react";
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Task } from "@/app/data/Tasks";
// import { useTasksStore } from "@/app/stores/useTasksStore";
import { toast } from "@/hooks/use-toast";
import axios from "axios";

const priorities = [
  {
    value: "low",
    label: "Low",
  },
  {
    value: "medium",
    label: "Medium",
  },
  {
    value: "high",
    label: "High",
  },
];

const PriorityCombobox = ({ singleTask }: { singleTask: Task }) => {

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  // const { updateTaskFunction, isLoading } = useTasksStore();


  React.useEffect(() => {
    setValue(singleTask.priority);
  }, [singleTask]);

  const onSelectFunction = (value: string) => {
    setValue(value)

    setIsLoading(true);

    if (singleTask.priority !== value) {
      axios.put("/api/task-priority", {id: singleTask._id, priority: value})
      .then(() => {
        toast({
          title: "Priority updated successfully"
        })
      })
      .then(() => {
        setIsLoading(true);
        window.location.reload();
      })
      .catch((error) => {
        toast({
          title: `${error}`
        })
      })
      .finally(() => {
        setIsLoading(false);
      })
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[100px] justify-between"
        >
          {value
            ? priorities.find((framework) => framework.value === value)?.label
            : priorities[0].value}
          {/* <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[130px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {priorities.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={onSelectFunction}
                  disabled={isLoading}
                >
                  {value === framework.value && isLoading
                    ? "Loading..." // Show "Loading..." when the priority is being updated
                    : framework.label}

                  {!isLoading && (
                    <>
                    {/* 
                      <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                      */}
                    </>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default PriorityCombobox
