import React from "react"
import baseUrl from "../utils/baseUrl"
import cookie from "js-cookie"
import { Accordion, Icon, Input } from "semantic-ui-react"

const StaffManag = ({ user, character }) => {
  const [users, setUsers] = React.useState(null)
  const [newUsers, setNewUsers] = React.useState(users)
  const [loading, setLoading] = React.useState(true)
  const [text, setText] = React.useState("ersi")
  const charToken = cookie.get("charId")

  React.useEffect(async()=>{
    const url = `${baseUrl}/api/accounts`
    await fetch(url,{
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": charToken
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()      
    }).then(data => {
      const nu = data.users.map(u=> {
        return ({ ...u, deadChars: data.deadChars.filter(dc=>dc.owner===u._id)})
      })
      setUsers(nu)
    }).catch(error => {
      console.log(error.message) // todo 
    })
  },[])

  React.useEffect(()=>{
    users && searchText(text)
  },[text])

  const searchText = text => {
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

  const handleChangeSearch = (event)=> {
    const { value } = event.target
    setText(value)
  }
  return (
    <>
      <Input
        icon="search"
        fluid
        onChange={handleChangeSearch}
        value={text}
      />
      {newUsers && (
        <>
          {newUsers.map(u=><div>{u.login}</div>)}
        </>
      )}
    </>
  )
}
 
export default StaffManag