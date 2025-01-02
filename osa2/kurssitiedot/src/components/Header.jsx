const Header = ({ header, id }) => {
    console.log('Header name: ', header)
    console.log('Header id: ', id)
    return (
        <h1 key={id}>{header}</h1>
    )
}
export default Header
