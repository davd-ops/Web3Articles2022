import React from 'react';
import articleStyles from '../../styles/Article.module.css'
import ArticleBoxItem from "./ArticleBoxItem";

const ListOfArticleBoxes = ({articles}) => {
    return (
        <div className={articleStyles.grid}>
            {
                typeof articles !== 'undefined' ?
                    articles.map(article => (
                        <ArticleBoxItem key={article._id} article={article}></ArticleBoxItem>
                    )) :
                    <p>There are no articles yet</p>
            }
        </div>
    );
};

export default ListOfArticleBoxes;
