import {connectToDatabase} from "./mongodb";

export default async function loadArticlesUsingSlug(slug) {
    const {db} = await connectToDatabase()

    let article = await db
        .collection('articles')
        .findOne({slug: slug})

    return JSON.parse(JSON.stringify(article))
}