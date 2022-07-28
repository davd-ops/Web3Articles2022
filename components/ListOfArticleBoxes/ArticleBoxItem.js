import React from 'react';
import articleStyles from '../../styles/Article.module.css'
import Link from "next/link";

const ArticleBoxItem = ({article}) => {
    return (
        <Link href='/article/[slug]' as={`/article/${article.slug}`}>
            <a className={articleStyles.card}>
                <h3>{article.title} &rarr;</h3>
                <p>{article.excerpt}</p>
            </a>
        </Link>
    );
};

export default ArticleBoxItem;
