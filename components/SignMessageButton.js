import React from 'react'
import {useWeb3} from "@3rdweb/hooks"
import {server} from "../config";
import login from "../lib/login";

const SignMessageButton = ({refreshState}) => {
    const { address, provider } = useWeb3()
    const signer = (typeof provider !== 'undefined') ? provider.getSigner() : undefined

    const callLogin = () => {
        login(address, signer).then( () => {
            //refreshState()
        })
    }

    /*const login = async () => {
        const res = await fetch(`${server}/api/auth/nonce`)

        const data = await res.json()

        const message = `You're logging into Web3 Articles! \nSign this message to prove you have access to this wallet. \n\nNonce: ${data.nonce}`
        const signature = await signer.signMessage(message)

        const rawResponse = await fetch(`${server}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({address: address, message: message, signature: signature})
        })
        const content = await rawResponse.json();

        console.log(content);
    }*/

    return (
        <div>
            <button onClick={callLogin}>Sign</button>
        </div>
    )
}

export default SignMessageButton
