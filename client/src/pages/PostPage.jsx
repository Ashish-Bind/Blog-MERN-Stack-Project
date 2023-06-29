import { format } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../components/UserContext'
import { Edit } from '../components/icons/Icons'

function PostPage() {
  const [postInfo, setPostInfo] = useState(null)
  const { userInfo } = useContext(UserContext)
  const { id } = useParams()

  useEffect(() => {
    fetch(`http://localhost:80/post/${id}`)
      .then((res) => res.json())
      .then((post) => setPostInfo(post))
  }, [])

  if (!postInfo) return ''
  //   const { title, summary, content, coverImage, createdAt, author } =
  //     postInfo.postInfo?.[0]

  return (
    <div className="post-page">
      <div className="cover-image">
        <img src={`http://localhost/${postInfo.coverImage}`} alt="" />
      </div>
      <div>
        <h1>{postInfo.title}</h1>
        <div className="user-details">
          <time>
            {format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}
          </time>
          <span className="user-name">{` created by @${postInfo.author.username}`}</span>
          {userInfo.id === postInfo.author._id && (
            <button className="edit-button">
              <Link to={`/edit/${postInfo._id}`}>
                <Edit /> Edit Post
              </Link>
            </button>
          )}
        </div>
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div>
    </div>
  )
}

export default PostPage
