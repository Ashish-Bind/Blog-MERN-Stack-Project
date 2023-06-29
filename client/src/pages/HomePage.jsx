import { useEffect, useState } from 'react'
import Post from '../components/Post'

function HomePage() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetch('http://localhost:80/post')
      .then((res) => res.json())
      .then((posts) => setPosts(posts))
  }, [])

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => {
          return <Post key={post._id} {...post} />
        })}
    </>
  )
}

export default HomePage
