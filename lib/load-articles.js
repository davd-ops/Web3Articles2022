import {connectToDatabase} from "./mongodb";

export default async function loadArticles() {
    const {db} = await connectToDatabase()

    let articles = await db
        .collection('articles')
        .find({})
        .sort( [['_id', -1]] )
        .toArray()

    return JSON.parse(JSON.stringify(articles))
}