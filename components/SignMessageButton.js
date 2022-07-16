import React from 'react'
import {useWeb3} from "@3rdweb/hooks"
import login from "../lib/login";
import buttonStyles from '../styles/SignMessageButton.module.css'

const SignMessageButton = ({refreshState}) => {
    const { address, provider } = useWeb3()
    const signer = (typeof provider !== 'undefined') ? provider.getSigner() : undefined

    const callLogin = () => {
        login(address, signer).then( () => {
            refreshState()
        })
    }

    return (
        <div className={buttonStyles.main}>
            <button className={buttonStyles.button} onClick={callLogin}>Sign</button>
        </div>
    )
}

export default SignMessageButton
