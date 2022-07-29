import {connectToDatabase} from "./mongodb";

export default async function loadArticlesFromUser(userAddress) {
    const {db} = await connectToDatabase()

    let articles = await db
        .collection('articles')
        .find({user: userAddress?.toLowerCase()})
        .sort( [['_id', -1]] )
        .toArray()

    return JSON.parse(JSON.stringify(articles))
}