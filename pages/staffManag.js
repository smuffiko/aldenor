import React from "react"
import baseUrl from "../utils/baseUrl"
import cookie from "js-cookie"
import { Accordion, Icon, Input, Button, Segment, Popup } from "semantic-ui-react"

const StaffManag = ({ user, character }) => {
  const [users, setUsers] = React.useState(null)
  const [newUsers, setNewUsers] = React.useState(users)
  const [activeIndex, setActiveIndex] = React.useState(-1)
  const [text, setText] = React.useState("")

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

  const deleteCharacter = async (c, slot) => {
    const owner = c.character.owner
    const character = c.character._id
    const charToken = cookie.get("charId")
    const url = `${baseUrl}/api/characters?owner=${owner}&character=${character}&slot=${slot}`
    await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": charToken
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.text()      
    }).then(data => {
      refreshData()
    }).catch(error => {
      console.log(error.message) // todo 
    })
  }

  const changeSlot = async (c, newSlot, oldSlot = null) => {
    const owner = c.character ? c.character.owner : c.owner
    const character = c.character ? c.character._id : c._id
    const payload = {
      owner,
      character,
      newSlot,
      oldSlot
    }
    const charToken = cookie.get("charId")
    const url = `${baseUrl}/api/characters`
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": charToken
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.text()      
    }).then(data => {
      refreshData()
    }).catch(error => {
      console.log(error.message) // todo 
    })
  }

  const handleLock = async (char) => {
    const charToken = cookie.get("charId")
    const url = `${baseUrl}/api/characters`
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": charToken
      },
      body: JSON.stringify({char})
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.text()      
    }).then(data => {
      refreshData()
    }).catch(error => {
      console.log(error.message) // todo 
    })
  }

  const changeRole = async (char, newRole) => {
    const charToken = cookie.get("charId")
    const payload = { char: char.character ? char.character : char , newRole }
    const url = `${baseUrl}/api/characters`
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": charToken
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.text()      
    }).then(data => {
      refreshData()
    }).catch(error => {
      console.log(error.message) // todo 
    })
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
                            printChars.map((c,k)=>
                              <span key={k}>
                                [
                                  {c.character.name}
                                  {
                                    c.character.role==="root" ? <Icon name="chess king"/>
                                    : c.character.role==="admin" ? <Icon name="chess knight"/>
                                    : c.character.role==="mod" ? <Icon name="chess bishop"/>
                                    : ""
                                  }
                                ]
                              </span>
                            )
                          }
                        </>
                      )}
                      {printDead.length > 0 && (
                        <>
                          {printDead.map((c,k)=>
                            <span key={k}>
                              [
                                <Icon name="chess board" />
                                {c.name}
                                {c.role==="root" ? <Icon name="chess king"/>
                                  : c.role==="admin" ? <Icon name="chess knight"/>
                                  : c.role==="mod" ? <Icon name="chess bishop"/>
                                  : ""
                                }
                              ]
                            </span>
                          )}
                        </>
                      )}
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === i} >
                      {u.characters.map((c,j)=>
                        <div key={j}>
                          Slot {j+1} <Icon name="caret right" />
                          {
                            c.character ? (
                              <>
                                {c.character.role!=="root" ? (
                                  <>
                                    <Button icon circular color="red" size="mini" onClick={()=>deleteCharacter(c,j)}><Icon name="trash alternate outline" /></Button>
                                    <Popup content={(
                                        <>
                                          <Button icon circular onClick={()=>changeSlot(c,0,j)} disabled={u.characters[0].character !== null}>1</Button>
                                          <Button icon circular onClick={()=>changeSlot(c,1,j)} disabled={u.characters[1].character !== null}>2</Button>
                                          <Button icon circular onClick={()=>changeSlot(c,2,j)} disabled={u.characters[2].character !== null}>3</Button>
                                          <Button icon circular onClick={()=>changeSlot(c,3,j)} disabled={u.characters[3].character !== null}>4</Button>
                                          <Button icon circular onClick={()=>changeSlot(c,4,j)} disabled={u.characters[4].character !== null}>5</Button>
                                          <Button icon circular onClick={()=>changeSlot(c,5,j)} disabled={u.characters.length>5? u.characters[5].character !== null : false}>6</Button>
                                        </>
                                      )}
                                      pinned
                                      on="click"
                                      trigger={<Button icon circular color="orange" size="mini" ><Icon name="retweet" /></Button>}
                                    />
                                    <Popup content={(
                                        <>
                                          <Button icon circular onClick={()=>changeRole(c,"user")} disabled={u.characters[j].character.role === "user"}>user</Button>
                                          <Button icon circular onClick={()=>changeRole(c,"mod")} disabled={u.characters[j].character.role === "mod"}>mod</Button>
                                          <Button icon circular onClick={()=>changeRole(c,"admin")} disabled={u.characters[j].character.role === "admin"}>admin</Button>
                                        </>
                                      )}
                                      pinned
                                      on="click"
                                      trigger={<Button icon circular color="orange" size="mini"><Icon name="pencil" /></Button>}
                                    />
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
                                {c.available ? 
                                    <Button icon circular color="teal" size="mini" onClick={()=>handleLock(c)}><Icon name="unlock" /></Button> : 
                                    <Button icon circular color="yellow" size="mini" onClick={()=>handleLock(c)}><Icon name="lock" /></Button>
                                }
                              </>
                              )
                          }
                        
                        </div>
                      )}
                      {u.characters.length==5 && (
                        <>
                          Slot {u.characters.length+1} <Icon name="caret right" />
                          <Icon name="question" />
                        </>
                      )}
                      {u.deadChars.map((dc,j)=>
                        <div key={j}>
                          Dead 
                          <Icon name="caret right" />
                            {dc.role!=="root" ? ( 
                              <>
                                <Popup content={(
                                  <>
                                    <Button icon circular onClick={()=>changeSlot(dc,0)} disabled={u.characters[0].character !== null}>1</Button>
                                    <Button icon circular onClick={()=>changeSlot(dc,1)} disabled={u.characters[1].character !== null}>2</Button>
                                    <Button icon circular onClick={()=>changeSlot(dc,2)} disabled={u.characters[2].character !== null}>3</Button>
                                    <Button icon circular onClick={()=>changeSlot(dc,3)} disabled={u.characters[3].character !== null}>4</Button>
                                    <Button icon circular onClick={()=>changeSlot(dc,4)} disabled={u.characters[4].character !== null}>5</Button>
                                    <Button icon circular onClick={()=>changeSlot(dc,5)} disabled={u.characters.length>5 ? u.characters[5].character !== null : false}>6</Button>
                                  </>
                                )}
                                  pinned
                                  on="click"
                                  trigger={<Button icon circular color="orange" size="mini" ><Icon name="retweet" /></Button>}
                                />
                                <Popup content={(
                                    <>
                                      <Button icon circular onClick={()=>changeRole(dc,"user")} disabled={dc.role === "user"}>user</Button>
                                      <Button icon circular onClick={()=>changeRole(dc,"mod")} disabled={dc.role === "mod"}>mod</Button>
                                      <Button icon circular onClick={()=>changeRole(dc,"admin")} disabled={dc.role === "admin"}>admin</Button>
                                    </>
                                  )}
                                  pinned
                                  on="click"
                                  trigger={<Button icon circular color="orange" size="mini"><Icon name="pencil" /></Button>}
                                />
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