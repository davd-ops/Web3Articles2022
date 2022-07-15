import React, {useState} from 'react'
import Meta from "../components/Meta"
import SignMessageButton from "../components/SignMessageButton"
import {withIronSessionSsr} from "iron-session/next";
import {ironOptions, server} from "../config";
import ArticleList from "../components/ArticleList";
import login from "../lib/login";
import {useWeb3} from "@3rdweb/hooks";
import loadArticlesFromUser from "../lib/load-articles-from-user";

const Profile = ({user, articles}) => {
    const { address, provider } = useWeb3()
    const signer = (typeof provider !== 'undefined') ? provider.getSigner() : undefined
    const [loggedUser, setLoggedUser] = useState(user)

    const checkForUserSession = async () => {
        let {user} = await (await fetch(`${server}/api/auth/get-session`)).json()
        user = typeof user !== 'undefined' ? user : null
        setLoggedUser(user)
    }

    React.useEffect(() => {
        const loginAndCheckForTheSession = async () => {
            console.log(user)
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
            <h1>Profile</h1>
            {
                loggedUser !== null ?
                    <ArticleList articles={articles} /> :
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

        let articles = await loadArticlesFromUser(user.meta)

        articles = Object.values(articles)

        return {
            props: {
                user: user,
                articles: articles,
            },
        };
    }, ironOptions
)

export default Profile
