// import { MongoClient } from "mongodb";

// let db;

// async function connectToDb(cb) {
//     const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@myblog.04kypwe.mongodb.net/?retryWrites=true&w=majority`)
//     await client.connect();
//     db= client.db('myBlog')
//     cb();
// }

// export {
//     db,
//     connectToDb,
// };


import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};