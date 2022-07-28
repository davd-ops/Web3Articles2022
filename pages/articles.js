import Meta from "../components/Meta"
import loadArticles from "../lib/load-articles";
import ListOfArticlesHorizontal from "../components/ListOfArticlesHorizontal/ListOfArticlesHorizontal";

const Articles = ({articles}) => {
    return (
        <div>
            <Meta title='Articles' />
            <h1>Articles</h1>
            <ListOfArticlesHorizontal articles={articles} />
        </div>
    )
}

export const getStaticProps = async () => {
    const articles = await loadArticles()

    return {
        props: {
            articles
        }
    }
}

export default Articles;
