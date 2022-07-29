import {connectToDatabase} from "./mongodb";

export default async function getUsers() {
    const {db} = await connectToDatabase()

    let users = await db
        .collection('users')
        .find({})
        .sort( [['_id', -1]] )
        .toArray()

    return JSON.parse(JSON.stringify(users))
}