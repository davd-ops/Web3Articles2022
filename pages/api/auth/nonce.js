import crypto from 'crypto'

export default async function handler(req, res) {
    const nonce = crypto.randomInt(111111, 999999)

    return res.json({ nonce: nonce })
}