import styles from "../../styles/Game.Characters.module.css"
import React from "react"
import Router from "next/router"
import cookie from "js-cookie"
import { Button, Icon, Header, List, Image } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'

const Characters = ({ setSlot, setChar }) => {
  const [characters, setCharacters] = React.useState([])
  const [error, setError] = React.useState("")
  const staff = [ "admin","root","mod" ]
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  }

  const items = characters.map((c, i) =>
  (
    c.available ? (
      <div key={i} className={styles.card} >
        {c.character!== null ? (
          <div className={staff.includes(c.character.role) ? styles.staffCard : ""}>
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
            <div className={styles.charBottom}><Button onClick={()=>setChar(c.character)}>Play!</Button></div>  
          </div>
        ):(
          <>
            <div className={styles.charTop}><Header as="h3">Empty</Header></div>
            <div className={styles.charMid}><Icon name="plus" size="huge" /></div>   
            <div className={styles.charBottom}><Button onClick={()=>createNew(i+1)}>Create new character!</Button></div>   
          </>  
        )}      
      </div>
    ) : (
      <div key={Math.random()} className={styles.card}>
        <div className={styles.charTop}><Header as="h3">Locked</Header></div>    
        <div className={styles.charMid}><Icon name="lock" size="huge" /></div>   
        <div className={styles.charBottom}><Button onClick={()=>Router.push("/shop")}>Unlock it!</Button></div>       
      </div>
    )
  ))

  const renderPrevButton = ({ isDisabled }) => {
    return <Icon name="caret left" size="big" disabled={isDisabled}/>
  }
  const renderNextButton = ({ isDisabled }) => {
    return <Icon name="caret right" size="big" disabled={isDisabled}/>
  }

  const Carousel = () => (
    <AliceCarousel
      mouseTracking
      items={items}
      responsive={responsive}
      controlsStrategy="alternate"
      disableDotsControls
      keyboardNavigation
      renderPrevButton={renderPrevButton}
      renderNextButton={renderNextButton}
      paddingLeft={50}
      paddingRight={50}
    />
  )
  
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
      setCharacters(data.slice(5).concat(data.slice(0,5)))
    }).catch(error => {
      setError(error.message)
    })
  },[])

  const createNew = (slot) => {
    setSlot(slot)
  }

  return (
    <>
      <Header as="h2" align="left">Characters</Header>
        <Carousel />
    </>
  )
}
 
export default Characters