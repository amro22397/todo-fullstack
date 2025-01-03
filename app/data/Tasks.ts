export type Task = {
    _id: string;
    id: string;
    name: string;
    priority: "low" | "medium" | "high";
    status: "in progress" | "completed";
    userId: string;
  };

  export const allTasks: Task[] = [
    //
  ];
  