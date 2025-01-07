import { getSession } from "../../../app/actions/getUser";
import dbConnect from "../../../lib/dbConnect";
import { Tasks } from "../../../models/tasks";

export default async function handler(req, res) {

    const session = await getSession();
        console.log(session);

    const { method } = req;

    await dbConnect();

    switch (method) {
        case "GET":
            try {
                const tasks = await Tasks.find({});
                res.status(200).json({ success: true, data: tasks})
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
            default:
                res.status(400).json({ success: false })
    }
}