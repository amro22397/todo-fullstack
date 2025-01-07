import { Tasks } from "../../models/tasks"
import { dbConn } from "../dbConn/dbConn"


export const getTasks = async () => {
    try {
        await dbConn();
        
        const getTasks = await Tasks.find();
        const tasks = JSON.parse(JSON.stringify(getTasks));
        if (tasks) return tasks;
    } catch (error) {
        return { error: "internal server error"}
    }
}