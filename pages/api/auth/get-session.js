import {withIronSessionApiRoute} from "iron-session/next";
import {ironOptions} from "../../../config";

export default withIronSessionApiRoute(handler,ironOptions)

async function handler(req, res) {
    return res.json({ user: req.session.user })
}