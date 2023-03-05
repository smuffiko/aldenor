import React from "react"
import Router from "next/router"
import cookie from "js-cookie"
import { Icon, Header, List, Image } from "semantic-ui-react"
import baseUrl from "../../utils/baseUrl"
import AliceCarousel from 'react-alice-carousel'
import 'react-alice-carousel/lib/alice-carousel.css'
import AldenorBorderBox from "../_App/AldenorUIComponents/AldenorBorderBox"
import AldenorCharacterPreview from "../_App/AldenorUIComponents/AldenorCharacterPreview"

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
                <AldenorCharacterPreview
                  basic={`/img/Characters/${c.character.race}/${c.character.skin}/Export_${c.character.gender ? "female" : "male"}/${c.character.gender ? "female" : "male"}_1.png`}
                  hair={`/img/Characters/${c.character.race}/${c.character.gender ? "Female" : "Male"}_Hair_${c.character.hair+1}/${c.character.gender ? "Female" : "Male"}_Hair_${c.character.hair+1}_1.png`}
                  size={128}
                />          
              </div>
              <div className="char-panel-mid">
                <AldenorBorderBox box="basic">
                  <List>
                    <List.Item>Name: {c.character.name}</List.Item>
                    <List.Item>Gender: { c.character.gender ? "Female" : "Male" }</List.Item>
                    <List.Item>Race: {c.character.race}</List.Item>
                    <List.Item>Class: {c.character.class}</List.Item>
                    <List.Item>Lvl: {c.character.lvl}</List.Item>
                    <List.Item><span className="coins-container">Money: {c.character.money.gold}<img src="img/UI/Coins/Coin_G.png" className="coin"/> {c.character.money.silver}<img src="img/UI/Coins/Coin_S.png" className="coin"/> {c.character.money.copper}<img src="img/UI/Coins/Coin_B.png" className="coin"/></span></List.Item>
                    <List.Item>Location: {c.character.coords.current.map.name} [{c.character.coords.current.x},{c.character.coords.current.y}]</List.Item>
                  </List>
                </AldenorBorderBox>
              </div>
              <div className="char-panel-bottom"><button className="login-button" onClick={()=>setChar(c.character)}>Play!</button></div>  
            </>
          ):(
            <>
              <div className="char-panel-top"><Header as="h3">Empty</Header></div>
              <div className="char-panel-mid"><Icon name="plus" size="huge" /></div>   
              <div className="char-panel-bottom"><button className="login-button" onClick={()=>createNew(i+1)}>New</button></div>   
            </>  
          ) : (
          <>
            <div className="char-panel-top"><Header as="h3">Locked</Header></div>    
            <div className="char-panel-mid"><Icon name="lock" size="huge" /></div>   
            <div className="char-panel-bottom"><button className="login-button"  onClick={()=>Router.push("/shop")}>Unlock it!</button></div>   
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