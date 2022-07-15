import React from 'react';
import articleStyles from '../styles/Article.module.css'
import ArticleItem from "./ArticleItem";

const ArticleList = ({articles}) => {
    return (
        <div className={articleStyles.grid}>
            {
                typeof articles !== 'undefined' ?
                    articles.map(article => (
                        <ArticleItem key={article._id} article={article}></ArticleItem>
                    )) :
                    <p>There are no articles yet</p>
            }
        </div>
    );
};

export default ArticleList;
