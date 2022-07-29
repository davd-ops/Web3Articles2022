import React from 'react';
import articleStyles from '../../styles/Article.module.css'
import Link from "next/link";

const ArticleBoxItem = ({article}) => {
    const prettyAddress = article.user ? article.user.slice(0, 5).concat('...',article.user.slice(article.user.length-3, article.user.length)) : null

    return (
        <Link href='/article/[slug]' as={`/article/${article.slug}`}>
            <a className={articleStyles.card}>
                <h3>{article.title} &rarr;</h3>
                <p>{article.excerpt}</p>
                <h5>{prettyAddress}</h5>
            </a>
        </Link>
    );
};

export default ArticleBoxItem;
