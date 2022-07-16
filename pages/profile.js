import React, {useState} from 'react'
import Meta from "../components/Meta"
import SignMessageButton from "../components/SignMessageButton"
import {withIronSessionSsr} from "iron-session/next"
import {ironOptions, server} from "../config"
import ArticleList from "../components/ArticleList"
import login from "../lib/login"
import {useWeb3} from "@3rdweb/hooks"
import loadArticlesFromUser from "../lib/load-articles-from-user"
import PublishArticle from "../components/PublishArticle"
import profileStyles from '../styles/profile.module.css'
import logout from "../lib/logout"


const Profile = ({user, articles}) => {
    const { address, provider } = useWeb3()
    const signer = (typeof provider !== 'undefined') ? provider.getSigner() : undefined
    const [loggedUser, setLoggedUser] = useState(user)
    const [usersArticles, setUsersArticles] = useState(articles)
    const prettierAddress = address ? address.slice(0, 5).concat('...',address.slice(address.length-3, address.length)) : null

    const checkForUserSession = async () => {
        let {user} = await (await fetch(`${server}/api/auth/get-session`)).json()
        user = typeof user !== 'undefined' ? user : null
        setLoggedUser(user)
        console.log()
        const rawResponse = await fetch(`${server}/api/articles/by-user`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({address: address})
        })
        setUsersArticles(await rawResponse.json())
    }

    const logoutFromSession = async () => {
        await logout()
        checkForUserSession()
    }

    React.useEffect(() => {
        const loginAndCheckForTheSession = async () => {
            if (user === null) {
                await login(address, signer)
            }
            checkForUserSession()
        }
        loginAndCheckForTheSession()
    }, [])

    return (
        <div>
            <Meta title='Profile' />
            {
                loggedUser !== null ?
                    <>
                        <div className={profileStyles.upperBar}>
                            <h1>Logged as {prettierAddress}</h1>
                            <h1><a onClick={logoutFromSession}>LogOut</a></h1>
                        </div>
                        <PublishArticle />
                        <h1 className={profileStyles.articlesHeading}>Your articles</h1>
                        <ArticleList articles={usersArticles} />
                    </> :
                    <div>
                        <p>In order to open your profile, you need to Log In</p>
                        <SignMessageButton refreshState={checkForUserSession} />
                    </div>
            }

        </div>
    )
}

export const getServerSideProps = withIronSessionSsr(
    async function getServerSideProps({ req }) {

        const user = typeof req.session.user !== 'undefined' ? req.session.user : null

        const articles = Object.values(await loadArticlesFromUser(user?.meta))

        return {
            props: {
                user: user,
                articles: articles,
            },
        }
    }, ironOptions
)

export default Profile
