import React from 'react';
import Link from "next/link";
import navStyles from '../styles/Nav.module.css'
import { useWeb3 } from "@3rdweb/hooks"
import login from "../lib/login";
import {withIronSessionSsr} from "iron-session/next";

const Nav = () => {
    const { address, connectWallet } = useWeb3()
    const prettierAddress = address ? address.slice(0, 5).concat('...',address.slice(address.length-3, address.length)) : null

    return (
        <nav className={navStyles.nav}>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/articles'>Articles</Link>
                </li>
                <li>
                    <Link href='/publish'>Publish</Link>
                </li>
                <li>
                    <Link href='/about'>About</Link>
                </li>
                <li className={navStyles.connect}>
                    { address ? <Link href='/profile'>{prettierAddress}</Link> : <a onClick={
                        () => connectWallet("injected")
                    }>Connect Wallet</a> }
                </li>
            </ul>
        </nav>
    )
}

export default Nav
