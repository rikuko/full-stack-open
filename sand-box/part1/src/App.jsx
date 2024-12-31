const Hello = ({ name, age }) => {
  console.log({ name, age })

  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>
        So you were probably  born {bornYear()}
      </p>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 10

  return (
    <div>
      <p>
        <h1>Greetings</h1>
        <Hello name='Maya' age={26 + 10} />
        <br />
        <Hello name={nimi} age={ika} />
      </p>
    </div>
  )
}

export default App