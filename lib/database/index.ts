import mongoose from "mongoose";
const MONGODBURL = process.env.MONGODB_URL;

let cached = (global as any).mongoose || {conn:null, promise : null}

export const connectTodatabase = async()=>{
    if(cached.conn) return cached.conn;

    if(!MONGODBURL) throw new Error('db url is missing')

    cached.promise = cached.promise || mongoose.connect(MONGODBURL, {
        dbName: 'Evently',
        bufferCommands: false,
    })
    cached.conn = await cached.promise;
    return cached.conn;
} 