const { default: mongoose } = require("mongoose");
const { promise } = require("zod");


const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL){
    throw new Error("please define")
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((mongoose) => {
            return mongoose;
        })
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;