import Image from 'next/image'
import styles from '../styles/Layout.module.css'
import ArticleList from "../components/ArticleList";
import {dev, server} from "../config";

export default function Home({articles}) {
  return (
    <div>
        <ArticleList articles={articles} />
    </div>
  )
}

export const getStaticProps = async () => {

    const res = dev ? await fetch(`${server}/api/articles`) : await fetch(`${server}/posts`)
    const articles = await res.json()

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
