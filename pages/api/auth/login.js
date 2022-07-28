import {connectToDatabase} from "../../../lib/mongodb";
import * as sigUtil from "@metamask/eth-sig-util";
import {withIronSessionApiRoute} from "iron-session/next";
import {ironOptions} from "../../../config";


export default withIronSessionApiRoute(handler,ironOptions)

async function handler(req, res) {
    try {
        const { db } = await connectToDatabase()

        const recovered = sigUtil.recoverPersonalSignature({
            data: req.body.message,
            signature: req.body.signature
        })

        if (recovered.toLowerCase() !== req.body.address.toLowerCase()){
            return res.status(500).json({
                message: 'Incorrect signature',
                success: false,
            })
        }

        let user = await db
            .collection('users')
            .findOne({address: req.body.address})

        if (user === null) {
            await db
                .collection('users')
                .insertOne({
                    address: req.body.address
                })
        }

        req.session.user = {
            id: 1,
            meta: req.body.address
        }

        await req.session.save()
        
        return res.status(200).json({
            user: user,
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        })
    }
}