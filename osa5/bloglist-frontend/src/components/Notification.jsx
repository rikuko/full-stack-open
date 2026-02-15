const Notification = ({ message, errorMessage }) => {
  if (errorMessage) {
    return (
      <div>
        <div className = 'error'>
          { errorMessage }
        </div>
      </div>
    )
  } if (message) {
    return (
      <div>
        <div className = 'message'>
          { message }
        </div>
      </div>
    )
  } else {
    return null
  }
}
export default Notification