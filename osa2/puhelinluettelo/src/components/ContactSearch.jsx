
const ContactSearch = ({newContact, handleContactSearch}) => {
  console.log('Contact search props: ',newContact)
  console.log('Contact search props: ',handleContactSearch)
  return (
<form>
        <div>
          Find: <input onChange={handleContactSearch}/>
        </div>
      </form>
  )
}

export default ContactSearch