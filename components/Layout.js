import React from 'react';
import styles from '../styles/Layout.module.css'
import Nav from "./Nav/Nav";
import Meta from "./Meta";
import logout from "../lib/logout";
import {server} from "../config";
import {useWeb3} from "@3rdweb/hooks";
import {useRouter} from "next/router";

const Layout = ({children}) => {
    const { address } = useWeb3()
    const router = useRouter()

    if  (typeof window !== "undefined") {
        window.ethereum.on('accountsChanged', async (accounts) => {
            await logout()
            const pathname = window?.location.href.substring(window?.location.href.lastIndexOf('/') + 1)
            pathname === 'profile' ? await router.reload() : await router.push('/profile')
        })
    }
    React.useEffect(() => {
        const getSession = async () => {
            const res = await fetch(`${server}/api/auth/get-session`)

            const {user} = await res.json()

            if ((user?.meta.toLowerCase() !== address?.toLowerCase()) && typeof address !== 'undefined') {
                await logout()
                const pathname = window?.location.href.substring(window?.location.href.lastIndexOf('/') + 1)
                if (pathname === 'profile') {
                    if (typeof user !== 'undefined') await router.reload()
                } else {
                    await router.push('/profile')
                }
            }
        }
        getSession()
    }, [address])

    return (
        <>
            <Meta />
            <Nav />
            <div className={styles.container}>
                <main className={styles.main}>
                    {children}
                </main>
            </div> :

        </>
    );
};

export default Layout;
