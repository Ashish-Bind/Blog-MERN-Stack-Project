import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Editor from './Editor'

function CreatePost() {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [content, setContent] = useState('')
  const [files, setFiles] = useState('')
  const [redirectHome, setRedirectHome] = useState(false)

  const handlePost = async function (e) {
    const data = new FormData()
    data.set('title', title)
    data.set('summary', summary)
    data.set('content', content)
    data.set('author', content)
    data.set('file', files[0])
    e.preventDefault()
    const res = await fetch('http://localhost:80/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    })
    if (res.ok) {
      setRedirectHome(true)
    }
  }

  if (redirectHome) return <Navigate to="/" />

  return (
    <form className="create-post login" onSubmit={handlePost}>
      <h4>Create New Post</h4>
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
      <button style={{ margin: '10px 0' }}>Create</button>
    </form>
  )
}

export default CreatePost
