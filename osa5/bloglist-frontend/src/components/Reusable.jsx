import { useState } from 'react'

const Reusable = (props) => {
  const [ visible, setVisible ] = useState(false)

  const hide = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  const changeVisibility = () => {
    setVisible(!visible)
  }
  return (
    <div>
      <div style = { hide }>
        <button onClick = { changeVisibility }>{ props.buttonLabel }</button>
      </div>
      <div style = { show }>
        { props.children }
        <button onClick = { changeVisibility }>Cancel</button>
      </div>
    </div>
  )
}

export default Reusable