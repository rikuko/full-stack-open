import { useState } from "react"

import Button from "./Button"

const Blog = ({ blog, user }) => {
  const [blogDataVisible, setBlogDataVisible] = useState(true)

  const handleDataVisible = () => {
    setBlogDataVisible(!blogDataVisible)
  }

  if (blogDataVisible) {
    return (
      <div className='blogCont'>
        <div className='blogStyle'>
          {blog.title}, {blog.author} <button onClick={handleDataVisible}>Show</button>
        </div >
      </div>
    )
  }

  return (
    <div className='blogCont'>
      <div className='blogStyle'>
        {blog.title}, {blog.author} <button onClick={handleDataVisible}>Hide</button>
        <br />
        {blog.url}
        <br />
        Likes {blog.likes} <Button text='Like' />
        <br />
        {user}
      </div >
    </div>
  )

}

export default Blog