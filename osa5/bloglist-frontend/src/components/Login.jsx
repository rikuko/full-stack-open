const Login = ({
  handleSubmit,
  handleUsername,
  handlePassword,
  username,
  password
}) => {
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit = { handleSubmit }>
        <div>
          Username
          <input
            value = { username }
            onChange = { handleUsername }
            placeholder = 'username'
          />
        </div>
        <div>
          Password
          <input
            type = 'password'
            value = { password }
            onChange = { handlePassword }
            placeholder = 'password'
          />
        </div>
        <div>
          <button type = 'submit'>Login</button>
        </div>
      </form>
    </div>
  )
}

export default Login