import {connectToDatabase} from "../../../lib/mongodb";

export default async function handler(req, res) {
    try {
        const { db } = await connectToDatabase()

        const article = await db
            .collection('articles')
            .findOne({slug: req.query.slug})

        return article !== null ?
            res.status(200).json(article) :
            res.status(404).json({
                message: `Article '${req.query.slug}' does not exist`,
                success: false
        })
    } catch (error) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        })
    }
}