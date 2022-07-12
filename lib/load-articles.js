import {connectToDatabase} from "./mongodb";

export default async function loadArticles() {
    const {db} = await connectToDatabase()

    let articles = await db
        .collection('articles')
        .find({})
        .toArray()

    return JSON.parse(JSON.stringify(articles))
}