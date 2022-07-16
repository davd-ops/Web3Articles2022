import {connectToDatabase} from "./mongodb";

export default async function loadArticlesFromUser(userAddress) {
    const {db} = await connectToDatabase()

    let user = await db
        .collection('users')
        .findOne({address: userAddress})

    let articles = []

    if (user !== null) {
        for (const articleSlug of user.articles) {
            let article = await db
                .collection('articles')
                .findOne({slug: articleSlug})

            articles.push(JSON.parse(JSON.stringify(article)))
        }
    }

    return articles
}