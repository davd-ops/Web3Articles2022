import crypto from 'crypto'

import { withIronSessionApiRoute } from "iron-session/next";
import {connectToDatabase} from "../../../lib/mongodb";
import * as sigUtil from "@metamask/eth-sig-util";

export default async function handler(req, res) {
    const nonce = crypto.randomInt(111111, 999999)

    return res.json({ nonce: nonce })
}