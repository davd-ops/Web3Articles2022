import {withIronSessionApiRoute} from "iron-session/next"
import {ironOptions} from "../../../config"
import {connectToDatabase} from "../../../lib/mongodb"

export default withIronSessionApiRoute(handler,ironOptions)

async function handler(req, res) {
    if  (
        (req.body.title.length < 10 || req.body.title.length  > 100) ||
        (req.body.title.excerpt < 10 || req.body.title.excerpt  > 100) ||
        (req.body.title.body < 200 || req.body.title.body  > 20000) ||
        (req.session.user == null || typeof req.session.user == 'undefined') ||
        (req.session.user?.meta == null || typeof req.session.user?.meta == 'undefined')
    ) {
        return res.status(500).json({
            message: 'Incorrect input data',
            success: false,
        })
    }

    try {
        const {db} = await connectToDatabase()

        let newArticle = await db
            .collection('articles')
            .insertOne({
                title: req.body.title,
                excerpt: req.body.excerpt,
                body: req.body.body,
                slug: req.body.slug,
                user: req.session.user?.meta
            })

        return res.status(200).json(newArticle)
    } catch (error) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        })
    }
}