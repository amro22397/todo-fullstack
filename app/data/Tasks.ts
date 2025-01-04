export type Task = {
    _id: string;
    id: string;
    name: string;
    priority: "low" | "medium" | "high";
    status: "in progress" | "completed";
    userId: string;
  };

  export type TaskList = {
    _id: string;
    name: string;
    userId: string;
    userEmail: string;
  }

  export const allTasks: Task[] = [
    //
  ];
  