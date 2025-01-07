import { Tasks } from "../../models/tasks"


export const getTasks = async () => {
    try {
        const getTasks = await Tasks.find({});
        
    } catch (error) {
        
    }
}