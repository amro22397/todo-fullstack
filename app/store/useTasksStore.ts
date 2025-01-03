import mongoose from "mongoose";
import { Task } from "../data/Tasks";
import { Tasks } from "@/models/tasks";

const sortTasksByCompleted = (tasks: Task[]) => {

    const sortedTasks = tasks.sort((a, b) => {
        if (a.status === "in progress" && b.status !== "in progress") {
            return -1;
        }
        if (a.status !== "in progress" && b.status === "in progress") {
            return 1;
        }
        return 0;
    });

    return sortedTasks;
}