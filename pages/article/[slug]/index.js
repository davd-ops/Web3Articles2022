import React from 'react';
import Link from "next/link";
import Meta from "../../../components/Meta";
import loadArticles from "../../../lib/load-articles";
import loadArticlesUsingSlug from "../../../lib/load-articles-using-slug";
import articleStyles from "../../../styles/Article.module.css"
import {useRouter} from "next/router";

const Article = ({article}) => {
    const router = useRouter()
    const prettyAddress = article.user ? article.user.slice(0, 5).concat('...',article.user.slice(article.user.length-3, article.user.length)) : null

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
            <div className={articleStyles.articleBody}>
                <h1>{article.title}</h1>
                <p>{article.body}</p>
                <br />
                <p>Article written by  <Link href='/'>{prettyAddress}</Link></p>
                <a onClick={() => router.back()}>Go Back</a>
            </div>
        </>
    );
};

export const getStaticProps = async (context) => {
    const article = await loadArticlesUsingSlug(context.params.slug)

    return {
        props: {
            article
        }
    }
}

export const getStaticPaths = async () => {
    const articles = await loadArticles()

    const slugs = articles.map(article => article.slug)

    const paths = slugs.map(slug => ({params: {slug: slug.toString()}}))

    return {
        paths,
        fallback: 'blocking'
    }
}

export default Article;
