import React from "react"
import { Input } from "semantic-ui-react"

const Search = () => {
  const [text, setText] = React.useState("")
  
  const handleChangeSearch = (event)=> {
    const { value } = event.target
    setText(value)
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