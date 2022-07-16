import {connectToDatabase} from "../../../lib/mongodb";
import * as sigUtil from "@metamask/eth-sig-util";
import {withIronSessionApiRoute} from "iron-session/next";
import {ironOptions} from "../../../config";


export default withIronSessionApiRoute(handler,ironOptions)

async function handler(req, res) {
    try {
        await req.session.destroy()
        
        return res.status(200).json({
            message: 'Logged out successfully',
            success: true,
        })
    } catch (error) {
        return res.status(500).json({
            message: new Error(error).message,
            success: false,
        })
    }
}