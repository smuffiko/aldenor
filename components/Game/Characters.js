import styles from "../../styles/Game.Characters.module.css"
import React from "react"
import Router from "next/router"
import cookie from "js-cookie"
import { Card, Icon, Header, List, Image } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"
import { RACES, GENDER, SKIN } from "../../utils/characters"

const Characters = ({ setSlot, setChar }) => {
  const [characters, setCharacters] = React.useState([])
  const [error, setError] = React.useState("")
  
  React.useEffect(async()=>{
    const url = `${baseUrl}/api/characters`
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
    return (
    <div>
        <Card.Group itemsPerRow="5" stackable>
          {characters.map((c, i) => {
            i++
            return (
            c.available ? (
              <Card key={i} className={styles.card} onClick={()=>c.character ? setChar(c.character) : createNew(i)}>
                {c.character!== null ? (
                  <>
                    <div className={styles.charTop}>
                      <Image centered src={`/img/Characters/${c.character.race}/${c.character.skin}/Export_${c.character.gender ? "female" : "male"}/${c.character.gender ? "female" : "male"}_1.png`} />
                    </div>
                    <div className={styles.charMid}>
                      <List>
                        <List.Item>Name: {c.character.name}</List.Item>
                        <List.Item>Gender: { c.character.gender ? "Female" : "Male" }</List.Item>
                        <List.Item>Race: {c.character.race}</List.Item>
                        <List.Item>Class: {c.character.class}</List.Item>
                        <List.Item>Lvl: {c.character.lvl}</List.Item>
                        <List.Item>Money: {c.character.money.gold}g {c.character.money.silver}s {c.character.money.copper}c</List.Item>
                        <List.Item>Coords: [{c.character.coords.current.x},{c.character.coords.current.y},{c.character.coords.current.z}]</List.Item>
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