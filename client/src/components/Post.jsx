import { format } from 'date-fns'
import { Link } from 'react-router-dom'

function Post({ title, summary, content, coverImage, createdAt, author, _id }) {
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`http://localhost/${coverImage}`} alt={title} />
        </Link>
      </div>
      <div className="content">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author" href="#">
            @{author.username}
          </a>
          <time>{format(new Date(createdAt), 'MMM d, yyyy HH:mm')}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  )
}

export default Post
