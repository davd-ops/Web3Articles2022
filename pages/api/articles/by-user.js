import loadArticlesFromUser from "../../../lib/load-articles-from-user";

export default async function handler(req, res) {
    try {
        const articles = await loadArticlesFromUser(req.body.address.toLowerCase())

        return res.status(200).json(articles)
    } catch (error) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        })
    }
}