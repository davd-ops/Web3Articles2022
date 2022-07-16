import React from 'react'
import publishArticleStyles from '../styles/PublishArticle.module.css'

const PublishArticle = () => {
    const [title, setTitle] = React.useState('')
    const [excerpt, setExcerpt] = React.useState('')
    const [body, setBody] = React.useState('')
    
    return (
        <div className={publishArticleStyles.main}>
            <h1 className={publishArticleStyles.title}>Publish article</h1>
            <form action="">
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
                <input className={publishArticleStyles.submit} id='submit' type="submit" value="Submit" onClick={(event) => {event.preventDefault()}}/>
            </form>
        </div>
    )
}

export default PublishArticle