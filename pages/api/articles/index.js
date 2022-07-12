import {articles} from "../../../data"
import {connectToDatabase} from "../../../lib/mongodb"


export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase()

        let articles = await db
            .collection('articles')
            .find({})
            .toArray()

        return res.status(200).json(articles)
    } catch (error) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        })
    }
}