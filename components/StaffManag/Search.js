import React from "react"
import { Input } from "semantic-ui-react"

const Search = ({ users, setNewUsers }) => {
  const [text, setText] = React.useState("")

  React.useEffect(()=>{
    users && searchText()
  },[text])
  
  const handleChangeSearch = (event)=> {
    const { value } = event.target
    setText(value)
  }

  const searchText = () => {
    const nu = users.filter(user=> {
      return (
        user.characters.filter(char=> { // find text in character name
          if(char.character === null) return false
          return (char.character.name.toLowerCase().search(text.toLowerCase()) !== -1)
        }).length > 0
        || user.deadChars.filter(char=> { // find text in dead character name
          if(char === null) return false
          return (char.name.toLowerCase().search(text.toLowerCase()) !== -1)
        }).length > 0
        || user.login.toLowerCase().search(text.toLowerCase()) !== -1 // find text in login name
      )}
    )
    setNewUsers(nu)
  }

  return (
    <>
      <Input
        icon="search"
        placeholder="Search user..."
        onChange={handleChangeSearch}
        value={text}
      />
    </>
  )
}
 
export default Search