import React from 'react'
import publishArticleStyles from '../../styles/PublishArticle.module.css'
import {server} from "../../config";
import login from "../../lib/login";
import {useRouter} from "next/router";

const PublishArticle = ({refreshState}) => {
    const router = useRouter()
    const [title, setTitle] = React.useState('')
    const [excerpt, setExcerpt] = React.useState('')
    const [body, setBody] = React.useState('')

    function slugify(text) {
        return text
            .toString()                           // Cast to string (optional)
            .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
            .toLowerCase()                  // Convert the string to lowercase letters
            .trim()                                  // Remove whitespace from both sides of a string (optional)
            .replace(/\s+/g, '-')            // Replace spaces with -
            .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
            .replace(/\-\-+/g, '-');        // Replace multiple - with single -
    }

    const publish = async () => {
        await fetch(`${server}/api/articles/publish`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: title, excerpt: excerpt, body: body, slug: slugify(title)})
        })
    }
    
    return (
        <div className={publishArticleStyles.main}>
            <h1 className={publishArticleStyles.title}>Publish article</h1>
            <form action="components/ProfileComponents/PublishArticle">
                <input
                    className='input'
                    id='title'
                    type='text'
                    name='title'
                    placeholder='Title of your article'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                    minLength={10}
                    maxLength={100}
                />
                <input
                    className='input'
                    id='excerpt'
                    type='text'
                    name='excerpt'
                    placeholder="Short overview of what's in the article"
                    value={excerpt}
                    onChange={e => setExcerpt(e.target.value)}
                    required
                    minLength={10}
                    maxLength={100}
                />
                <textarea
                    className='input'
                    id='body'
                    name='excerpt'
                    placeholder="Text of your article..."
                    value={body}
                    onChange={e => setBody(e.target.value)}
                    required
                    minLength={200}
                    maxLength={20000}
                />
                <input className={publishArticleStyles.submit} id='submit' type="submit" value="Submit" onClick={(e) => {
                    e.preventDefault()
                    publish().then(async () => {
                        await fetch(`${server}/api/revalidate`)
                        alert('Article published!')
                        await router.replace('/profile')
                        refreshState()
                    }).catch(err => {
                        alert(err.message)
                    })
                }}/>
            </form>
        </div>
    )
}

export default PublishArticle