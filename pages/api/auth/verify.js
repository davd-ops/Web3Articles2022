import {withIronSessionApiRoute} from "iron-session/next";
import crypto from "crypto";
import {ironOptions} from "../../../config";

export default withIronSessionApiRoute(userRoute,ironOptions)

async function userRoute(req, res) {

    if (req.session.user === req.body.address) {

    }
    req.session.user = {
        id: 1,
        meta: 'IDK',
    }
    await req.session.save()

    return res.json({ nonce: nonce })

    //res.send({ user: req.session.user });
}