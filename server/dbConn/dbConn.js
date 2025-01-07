import mongoose from "mongoose"


export const dbConn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database is connected")
    } catch (error) {
        console.log("Connection failed")
    }
}