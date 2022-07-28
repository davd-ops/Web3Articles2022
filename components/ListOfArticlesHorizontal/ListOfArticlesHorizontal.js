import React from 'react';
import articleStyles from '../../styles/Article.module.css'
import ArticleHorizontalItem from "./ArticleHorizontalItem";

const ListOfArticleBoxes = ({articles}) => {
    return (
        <div className={articleStyles.horizontalGrid}>
            {
                typeof articles !== 'undefined' ?
                    articles.map(article => (
                        <ArticleHorizontalItem key={article._id} article={article}></ArticleHorizontalItem>
                    )) :
                    <p>There are no articles yet</p>
            }
        </div>
    );
};

export default ListOfArticleBoxes;
