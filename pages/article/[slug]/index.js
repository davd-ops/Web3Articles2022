import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";
import {dev, server} from "../../../config";
import Meta from "../../../components/Meta";
import loadArticles from "../../../lib/load-articles";
import loadArticlesUsingSlug from "../../../lib/load-articles-using-slug";

const Article = ({article}) => {
    //const router = useRouter()
    ///const {id} = router.query

    if (article.success === false) {
        return (
            <>
                <p>ERROR 404</p>
                <h2>{article.message}</h2>
            </>
        )
    }

    return (
        <>
            <Meta title={article.title} description={article.excerpt} />
            <h1>{article.title}</h1>
            <p>{article.body}</p>
            <br />
            <Link href='/articles'>Go Back</Link>
        </>
    );
};

export const getStaticProps = async (context) => {
    /*const res = await fetch(`${server}/api/articles/${context.params.slug}`)

    const article = await res.json()*/

    const article = await loadArticlesUsingSlug(context.params.slug)

    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async () => {
    const articles = await loadArticles()

    //const res = dev ? await fetch(`${server}/api/articles`) : await fetch(`${server}/api/articles`)
    //const articles = await res.json()

    const slugs = articles.map(article => article.slug)

    const paths = slugs.map(slug => ({params: {slug: slug.toString()}}))

    return {
        paths,
        fallback: 'blocking'
    }
}

/*export const getStaticProps = async (context) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${context.params.id}`)

    const article = await res.json()

    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`)

    const articles = await res.json()

    const ids = articles.map(article => article.id)
    const paths = ids.map(id => ({params: {id: id.toString()}}))

    return {
        paths,
        fallback: false
    }
}*/

export default Article;
