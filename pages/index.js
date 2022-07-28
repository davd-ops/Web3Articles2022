import ListOfArticleBoxes from "../components/ListOfArticleBoxes/ListOfArticleBoxes";
import {dev, server} from "../config";
import loadArticles from '../lib/load-articles'
import Header from "../components/Header/Header";
import React from "react";


export default function Home({articles}) {
  return (
    <div>
        <Header />
        <ListOfArticleBoxes articles={articles} />
    </div>
  )
}

export const getStaticProps = async () => {
    let articles = await loadArticles()

    articles = articles.slice(0,4)

    return {
        props: {
            articles
        }
    }
}

/*export const getStaticProps = async () => {
    const res = await fetch ('https://jsonplaceholder.typicode.com/posts?_limit=6')
    const articles = await res.json()

    return {
        props: {
            articles
        }
    }
}*/
