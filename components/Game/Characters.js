import styles from "../../styles/Game.Characters.module.css"
import React from "react"
import Router from "next/router"
import cookie from "js-cookie"
import { Card, Icon, Header, List } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"

const Characters = ({ setSlot, setChar }) => {
  const [characters, setCharacters] = React.useState([])
  const [error, setError] = React.useState("")
  
  React.useEffect(async()=>{
    const url = `${baseUrl}/api/character`
    const token = cookie.get("token")
    await fetch(url,{
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      }
    }).then(async response => {
      if(!response.ok) {
        throw new Error(await response.text())
      }
      return response.json()
    }).then(data => {
      setCharacters(data)
    }).catch(error => {
      setError(error.message)
    })
  },[])

  const createNew = (slot) => {
    setSlot(slot)
  }

  const mapCharacters = () => {
    console.log("cs",characters)
    return (
    <div>
        <Card.Group itemsPerRow="5" stackable>
          {characters.map((character, i) => {
            i++
            return (
            character.available ? (
              <Card key={i} className={styles.card} onClick={()=>character.character ? setChar(character) : createNew(i)}>
                {character.character!== null ? (
                  <>
                    <div className={styles.charTop}>-- char img --</div>
                    <div className={styles.charMid}>
                      <List>
                        <List.Item>Name: {character.character.name}</List.Item>
                        <List.Item>Lvl: {character.character.lvl}</List.Item>
                        <List.Item>Money: {character.character.money.gold}g {character.character.money.silver}s {character.character.money.copper}c</List.Item>
                        <List.Item>Coords: [{character.character.coords.current.x},{character.character.coords.current.y},{character.character.coords.current.z}]</List.Item>
                      </List>
                    </div>
                    <div className={styles.charBottom}><Header as="h3">Play!</Header></div>  
                  </>
                ):(
                  <>
                    <div className={styles.charTop}><Header as="h3">Empty</Header></div>
                    <div className={styles.charMid}><Icon name="plus" size="huge" /></div>   
                    <div className={styles.charBottom}><Header as="h3">Create new character!</Header></div>   
                  </>  
                )}      
              </Card>
            ) : (
              <Card key={Math.random()} className={styles.card} onClick={()=>Router.push("/shop")}>
                <div className={styles.charTop}><Header as="h3">Locked</Header></div>    
                <div className={styles.charMid}><Icon name="lock" size="huge" /></div>   
                <div className={styles.charBottom}><Header as="h3">Unlock it!</Header></div>       
              </Card>
            )
          )})}
        </Card.Group>
      </div>
    )
  }

  return (
    <>
      <Header as="h2" align="left">Characters</Header>
      {mapCharacters()}
    </>
  )
}
 
export default Characters