import { Tasks } from "../../models/tasks"


export const getTasks = async () => {
    try {
        const getTasks = await Tasks.find();
        const tasks = JSON.parse(JSON.stringify(getTasks));
        if (tasks) return tasks;
    } catch (error) {
        return { error: "internal server error"}
    }
}