import mongoose from "mongoose";

export default function connectionDB() {
    const DATABASE_URL = process.env.DATABASE_MONGO_URL ?? ""

    try {
        mongoose.connect(DATABASE_URL)
    } catch (error) {
        console.log(error);
        process.exit()
    }

    const dbConn = mongoose.connection

    dbConn.once('open', (_) => {
        console.log(`Database Connected: ${DATABASE_URL}`);
    })

    dbConn.on('error', (err) => {
        console.error(`Connection Error: ${err}`);
    })
}