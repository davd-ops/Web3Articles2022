import React from 'react';
import {useRouter} from "next/router"
import loadArticlesFromUser from "../../../lib/load-articles-from-user"
import getUsers from "../../../lib/get-users"
import ListOfArticlesHorizontal from "../../../components/ListOfArticlesHorizontal/ListOfArticlesHorizontal";
import articleStyles from "../../../styles/Article.module.css";

const Article = ({articles}) => {
    const router = useRouter()
    const prettyAddress = articles[0]?.user ? articles[0]?.user.slice(0, 5).concat('...',articles[0]?.user.slice(articles[0]?.user.length-3, articles[0]?.user.length)) : null

    if (articles.length === 0) return (
        <>
            <div className={articleStyles.articleBody}>
                <p>ERROR 404</p>
                <h2>This user has no published articles</h2>
                <a onClick={() => router.back()}>Go Back</a>
            </div>
        </>
    )

    return (
        <>
            <h1>Articles published by {prettyAddress}</h1>
            <ListOfArticlesHorizontal articles={articles} />
        </>
    )
}

export const getStaticProps = async (context) => {
    const articles = await loadArticlesFromUser(context.params.address.toLowerCase())

    return {
        props: {
            articles
        }
    }
}

export const getStaticPaths = async () => {
    const users = await getUsers()

    const addresses = users.map(user => user.address)

    const paths = addresses.map(address => ({params: {address: address.toString().toLowerCase()}}))

    return {
        paths,
        fallback: 'blocking'
    }
}

export default Article
