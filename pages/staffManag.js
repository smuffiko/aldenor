import React from "react"
import baseUrl from "../utils/baseUrl"
import cookie from "js-cookie"
import { Icon,  Button } from "semantic-ui-react"
import Search from "../components/StaffManag/Search"
import Users from "../components/StaffManag/Users"

const StaffManag = ({ user, character }) => {
  const [users, setUsers] = React.useState(null)
  const [newUsers, setNewUsers] = React.useState(users)

  React.useEffect(()=>{
    refreshData()
  },[])

  const refreshData = async()=> {
    const url = `${baseUrl}/api/accounts`
    const charToken = cookie.get("charId")
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
      setNewUsers(nu)
    }).catch(error => {
      console.log(error.message) // todo 
    })
  }

  return (
    <>
      <Search users={users} setNewUsers={setNewUsers} />
      <div className="hint">
        <Icon name="chess king"/>root
        <Icon name="chess knight"/>admin
        <Icon name="chess bishop"/>mod
        <Icon name="chess board"/>dead
        <Button icon circular color="red" size="mini"><Icon name="trash alternate outline" /></Button>Kill char
        <Button icon circular color="orange" size="mini"><Icon name="retweet" /></Button>Change slot
        <Button icon circular color="orange" size="mini"><Icon name="pencil" /></Button>Manage role
        <Button icon circular color="yellow" size="mini"><Icon name="lock" /></Button>Locked, unlock slot
        <Button icon circular color="teal" size="mini"><Icon name="unlock" /></Button>Unlocked, lock slot
      </div>      
      {newUsers && <Users
        newUsers={newUsers}
        refreshData={refreshData}
      />}
    </>
  )
}
 
export default StaffManag