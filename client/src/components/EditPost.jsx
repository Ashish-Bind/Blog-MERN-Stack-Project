import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Editor from './Editor'

function EditPost() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [redirectHome, setRedirectHome] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:80/post/${id}`)
      .then((res) => res.json())
      .then((postInfo) => {
        setTitle(postInfo.title)
        setSummary(postInfo.summary)
        setContent(postInfo.content)
      })
  }, [])

  const handleUpdatePost = async function (e) {
    e.preventDefault()
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('id', id)
    if (files?.[0]) {
      data.set('file', files?.[0])
    }
    const response = await fetch('http://localhost:80/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    })
    if (response.ok) {
      setRedirectHome(true)
    }
  }

  if (redirectHome) return <Navigate to={`/post/${id}`} />

  return (
    <form className="create-post login" onSubmit={handleUpdatePost}>
      <h4>Edit Post</h4>
      <input
        type="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <Editor content={content} setContent={setContent} />
      <button style={{ margin: '10px 0' }}>Update Post</button>
    </form>
  )
}

export default EditPost
