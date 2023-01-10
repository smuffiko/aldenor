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
    700: { items: 2 },
    964: { items: 3 },
  }

  const handleDragStart = (e) => e.preventDefault()

  const items = characters.map((c, i) =>
  (
    <>
      <img src="/img/UI/CharPanel/charPanel_1.png" className={styles.panelCorner1} />
      <img src="/img/UI/CharPanel/charPanel_7.png" className={styles.panelCorner7} />
      <img src="/img/UI/CharPanel/charPanel_3.png" className={styles.panelCorner3} />
      <img src="/img/UI/CharPanel/charPanel_9.png" className={styles.panelCorner9} />
      {
        c.available ? (
          <div key={i} className={styles.charPanel} onDragStart={handleDragStart} >
            <div><div>
            {c.character!== null ? (
              <div className={staff.includes(c.character.role) ? styles.staffPanel : ""}>
                <div className={styles.charTop}>
                  <Image centered src={`/img/Characters/${c.character.race}/${c.character.skin}/Export_${c.character.gender ? "female" : "male"}/${c.character.gender ? "female" : "male"}_1.png`} />
                </div>
                <div className={styles.charMid}>
                  <List>
                    <List.Item className={styles.charText}>Name: {c.character.name}</List.Item>
                    <List.Item className={styles.charText}>Gender: { c.character.gender ? "Female" : "Male" }</List.Item>
                    <List.Item className={styles.charText}>Race: {c.character.race}</List.Item>
                    <List.Item className={styles.charText}>Class: {c.character.class}</List.Item>
                    <List.Item className={styles.charText}>Lvl: {c.character.lvl}</List.Item>
                    <List.Item className={styles.charText}>Money: {c.character.money.gold}g {c.character.money.silver}s {c.character.money.copper}c</List.Item>
                    <List.Item className={styles.charText}>Coords: [{c.character.coords.current.x},{c.character.coords.current.y},{c.character.coords.current.z}]</List.Item>
                  </List>
                </div>
                <div className={styles.charBottom}><Button className={styles.button} onClick={()=>setChar(c.character)}>Play!</Button></div>  
              </div>
            ):(
              <>
                <div className={styles.charTop}><Header as="h3">Empty</Header></div>
                <div className={styles.charMid}><Icon name="plus" size="huge" /></div>   
                <div className={styles.charBottom}><Button className={styles.button} onClick={()=>createNew(i+1)}>Create new character!</Button></div>   
              </>  
            )}      
            </div></div> 
          </div>
        ) : (
          <div key={Math.random()} className={styles.charPanel} onDragStart={handleDragStart}>
            <div><div>
              <div className={styles.charTop}><Header as="h3">Locked</Header></div>    
              <div className={styles.charMid}><Icon name="lock" size="huge" /></div>   
              <div className={styles.charBottom}><Button className={styles.button}  onClick={()=>Router.push("/shop")}>Unlock it!</Button></div>     
            </div></div>
          </div>
        )
      }
    </>
  ))

  const renderPrevButton = ({ isDisabled }) => {
    return <Icon name="caret left" size="big" disabled={isDisabled}/>
  }
  const renderNextButton = ({ isDisabled }) => {
    return <Icon name="caret left" size="big" disabled={isDisabled}/>
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
      paddingLeft={48}
      paddingRight={48}
      swipeDelta={20}
      swipeExtraPadding={0}
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
      <div className={styles.container}><Carousel /></div>
    </>
  )
}
 
export default Characters