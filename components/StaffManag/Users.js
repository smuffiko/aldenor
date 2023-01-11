import React from "react"
import { Accordion, Icon, Button, Popup } from "semantic-ui-react"
import cookie from "js-cookie"
import baseUrl from "../../utils/baseUrl"

const Users = ({ newUsers, refreshData }) => {
  const [activeIndex, setActiveIndex] = React.useState(-1)

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
  )
}
 
export default Users