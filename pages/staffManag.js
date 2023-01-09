import React from "react"
import baseUrl from "../utils/baseUrl"
import cookie from "js-cookie"
import { Accordion, Icon, Input, Button } from "semantic-ui-react"

const StaffManag = ({ user, character }) => {
  const [users, setUsers] = React.useState(null)
  const [newUsers, setNewUsers] = React.useState(users)
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const [loading, setLoading] = React.useState(true)
  const [text, setText] = React.useState("")
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
        placeholder="Search user..."
        onChange={handleChangeSearch}
        value={text}
      />
      <div className="hint">
        <Icon name="chess king"/>root
        <Icon name="chess knight"/>admin
        <Icon name="chess bishop"/>mod
        <Icon name="chess board"/>dead
        <Button icon circular color="red" size="mini"><Icon name="trash alternate outline" /></Button>Kill char
        <Button icon circular color="orange" size="mini"><Icon name="retweet" /></Button>Change slot
        <Button icon circular color="orange" size="mini"><Icon name="pencil" /></Button>Manage role
        <Button icon circular color="green" size="mini"><Icon name="plus" /></Button>Add new char
        <Button icon circular color="yellow" size="mini"><Icon name="lock" /></Button>Locked, unlock slot
        <Button icon circular color="teal" size="mini"><Icon name="unlock" /></Button>Unlocked, lock slot
      </div>
      {newUsers && (
        <>
          <Accordion>
            {newUsers.map((u,i)=> {
                const printChars = u.characters.filter(c=>c.character)
                const printDead = u.deadChars.filter(c=>c)
                return (
                  <div key={i}>
                    <Accordion.Title
                      active={activeIndex === i}
                      index={i}
                      onClick={()=>setActiveIndex(i)}
                    >
                      <Icon name="dropdown" />
                      {u.login}
                      {printChars.length > 0 && (
                        <>
                          <Icon name="caret right" />
                          { 
                            printChars.map(c=>
                              <>
                                [
                                  {c.character.name}
                                  {
                                    c.character.role==="root" ? <Icon name="chess king"/>
                                    : c.character.role==="admin" ? <Icon name="chess knight"/>
                                    : c.character.role==="mod" ? <Icon name="chess bishop"/>
                                    : ""
                                  }
                                ]
                              </>
                            )
                          }
                        </>
                      )}
                      {printDead.length > 0 && (
                        <>
                          {printDead.map(c=>
                            <>
                              [
                                <Icon name="chess board" />
                                {c.name}
                                {c.role==="root" ? <Icon name="chess king"/>
                                  : c.role==="admin" ? <Icon name="chess knight"/>
                                  : c.role==="mod" ? <Icon name="chess bishop"/>
                                  : ""
                                }
                              ]
                            </>
                          )}
                        </>
                      )}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === i}>
                      {u.characters.map((c,j)=>
                        <div key={j}>
                          Slot {j+1} <Icon name="caret right" />
                          {
                            c.character ? (
                              <>
                                {c.character.role!=="s" ? ( // todo change to root
                                  <>
                                    <Button icon circular color="red" size="mini"><Icon name="trash alternate outline" /></Button>
                                    <Button icon circular color="orange" size="mini"><Icon name="retweet" /></Button>
                                    <Button icon circular color="orange" size="mini"><Icon name="pencil" /></Button>
                                  </>
                                ) : (
                                  <>
                                    ROOT ! {" "}
                                  </>
                                )}
                                {c.character.name}
                                { 
                                  c.character.role==="root" ? <Icon name="chess king"/>
                                  : c.character.role==="admin" ? <Icon name="chess knight"/>
                                  : c.character.role==="mod" ? <Icon name="chess bishop"/>
                                  : ""
                                }
                              </>) : (
                              <>
                                <Button icon circular color="green" size="mini"><Icon name="plus" /></Button>
                                {c.available ? 
                                    <Button icon circular color="teal" size="mini"><Icon name="unlock" /></Button> : 
                                    <Button icon circular color="yellow" size="mini"><Icon name="lock" /></Button>
                                }
                              </>
                              )
                          }
                        
                        </div>
                      )}
                      {u.characters.length==5 && (
                        <>
                          Slot {u.characters.length+1} <Icon name="caret right" />
                          <Button icon circular color="green" size="mini"><Icon name="plus" /></Button>
                          <Icon name="question" />
                        </>
                      )}
                      {u.deadChars.map((dc,j)=>
                        <div key={j}>
                          Dead 
                          <Icon name="caret right" />
                            {dc.role!=="s" ? ( // todo change to root
                              <>
                                <Button icon circular color="orange" size="mini"><Icon name="retweet" /></Button>
                                <Button icon circular color="orange" size="mini"><Icon name="pencil" /></Button>
                              </>
                            ) : (
                              <>
                                ROOT ! {" "}
                              </>
                            )}
                            <Icon name="chess board" />
                            {dc.name}
                            { 
                              dc.role==="root" ? <Icon name="chess king"/>
                              : dc.role==="admin" ? <Icon name="chess knight"/>
                              : dc.role==="mod" ? <Icon name="chess bishop"/>
                              : ""
                            }
                        
                        </div>
                      )}
                    </Accordion.Content>
                  </div>
                )
              }
            )}
          </Accordion>
        </>
      )}
    </>
  )
}
 
export default StaffManag