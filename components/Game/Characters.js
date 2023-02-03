import React from "react"
import Router from "next/router"
import cookie from "js-cookie"
import { Icon, Header, List, Image } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import AldenorBorderBox from "../_App/AldenorUIComponents/AldenorBorderBox"

const Characters = ({ setSlot, setChar }) => {
  const [characters, setCharacters] = React.useState([])
  const [error, setError] = React.useState("")
  const responsive = {
    0: { items: 1 },
    700: { items: 2 },
    964: { items: 3 },
  }

  const handleDragStart = (e) => e.preventDefault()

  const items = characters.map((c, i) =>
    <>
      <img src="/img/UI/BorderBox/double-l-t.png" className="char-panel-l-t char-panel-corner" />
      <img src="/img/UI/BorderBox/double-l-b.png" className="char-panel-l-b char-panel-corner" />
      <img src="/img/UI/BorderBox/double-r-t.png" className="char-panel-r-t char-panel-corner" />
      <img src="/img/UI/BorderBox/double-r-b.png" className="char-panel-r-b char-panel-corner" />
      <div key={i} className="char-panel" onDragStart={handleDragStart} >
        <div className="char-panel-container">
          { c.available ? c.character!== null ? (
            <>
              <div className="char-panel-top">
                <Image centered src={`/img/Characters/${c.character.race}/${c.character.skin}/Export_${c.character.gender ? "female" : "male"}/${c.character.gender ? "female" : "male"}_1.png`} />
              </div>
              <div className="char-panel-mid">
                <AldenorBorderBox box="basic">
                  <List>
                    <List.Item>Name: {c.character.name}</List.Item>
                    <List.Item>Gender: { c.character.gender ? "Female" : "Male" }</List.Item>
                    <List.Item>Race: {c.character.race}</List.Item>
                    <List.Item>Class: {c.character.class}</List.Item>
                    <List.Item>Lvl: {c.character.lvl}</List.Item>
                    <List.Item>Money: {c.character.money.gold}g {c.character.money.silver}s {c.character.money.copper}c</List.Item>
                    <List.Item>Coords: [{c.character.coords.current.x},{c.character.coords.current.y},{c.character.coords.current.z}]</List.Item>
                  </List>
                </AldenorBorderBox>
              </div>
              <div className="char-panel-bottom"><button className="basic-button" onClick={()=>setChar(c.character)}>Play!</button></div>  
            </>
          ):(
            <>
              <div className="char-panel-top"><Header as="h3">Empty</Header></div>
              <div className="char-panel-mid"><Icon name="plus" size="huge" /></div>   
              <div className="char-panel-bottom"><button className="basic-button" onClick={()=>createNew(i+1)}>New</button></div>   
            </>  
          ) : (
          <>
            <div className="char-panel-top"><Header as="h3">Locked</Header></div>    
            <div className="char-panel-mid"><Icon name="lock" size="huge" /></div>   
            <div className="char-panel-bottom"><button className="basic-button"  onClick={()=>Router.push("/shop")}>Unlock it!</button></div>   
          </>
        )}
        </div>
      </div>
    </> )

  const renderPrevButton = ({ isDisabled }) => {
    return <Icon name="caret left" size="big" disabled={isDisabled}/>
  }
  const renderNextButton = ({ isDisabled }) => {
    return <Icon name="caret left" size="big" disabled={isDisabled}/>
  }
  
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
      <div className="character-panel-container">
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
          className="carousel"
        />
      </div>
    </>
  )
}
 
export default Characters