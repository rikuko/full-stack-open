import { useState } from 'react'

import Button from './Button'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const [ blogDataVisible, setBlogDataVisible ] = useState(false)

  const handleDataVisible = () => {
    setBlogDataVisible(!blogDataVisible)
  }

  if (!blogDataVisible) {
    return (
      <div className='blogCont'>
        <div className='blogStyle'>
          { blog.title }, { blog.author } <button onClick={ handleDataVisible }>Show</button>
        </div >
      </div>
    )
  }

  return (
    <div className='blogCont'>
      <div className='blogStyle'>
        { blog.title }, { blog.author } <button onClick={ handleDataVisible }>Hide</button>
        <br />
        { blog.url }
        <br />
        Likes { blog.likes } <Button click={ updateBlog } text='Like' />
        <br />
        { blog.user.name }

        { user && blog.user.username === user.username && (
          <div>
            <Button
              click={ removeBlog }
              text='Remove'
            />
          </div>
        ) }

      </div >
    </div>
  )
}

export default Blog