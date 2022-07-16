import {server} from "../config"

export default async function login(address, signer) {
    if (typeof signer === 'undefined') return

    const res = await fetch(`${server}/api/auth/nonce`)

    const data = await res.json()

    const message = `You're logging into Web3 Articles! \nSign this message to prove you have access to this wallet. \n\nNonce: ${data.nonce}`
    const signature = await signer.signMessage(message)

    await fetch(`${server}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({address: address, message: message, signature: signature})
    })
}