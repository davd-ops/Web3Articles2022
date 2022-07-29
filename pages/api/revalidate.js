import {withIronSessionApiRoute} from "iron-session/next";
import {ironOptions} from "../../config";

export default withIronSessionApiRoute(handler,ironOptions)

async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    try {
        // this should be the actual path not a rewritten path
        // e.g. for "/blog/[slug]" this should be "/blog/post-1"
        await res.revalidate('/')
        await res.revalidate('/articles')
        await res.revalidate(`/user/${req.session.user?.meta}`)
        return res.json({ revalidated: true })
    } catch (err) {
        // If there was an error, Next.js will continue
        // to show the last successfully generated page
        return res.status(500).send('Error revalidating')
    }
}