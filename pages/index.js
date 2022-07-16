import ArticleList from "../components/ArticleList";
import {dev, server} from "../config";
import loadArticles from '../lib/load-articles'
import Header from "../components/Header";
import React from "react";


export default function Home({articles}) {
  return (
    <div>
        <Header />
        <ArticleList articles={articles} />
    </div>
  )
}

export const getStaticProps = async () => {
    const articles = await loadArticles()

    /*const res = dev ? await fetch(`${server}/api/articles`) : await fetch(`${server}/api/articles`)
    const articles = await res.json()*/

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
