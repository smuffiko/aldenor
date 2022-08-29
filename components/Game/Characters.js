import styles from "../../styles/Game.Characters.module.css"
import React from "react"
import Router from "next/router"
import baseUrl from "../../utils/baseUrl"
import { Card, Icon, Header } from "semantic-ui-react"

const Characters = ({ user, setCharacter }) => {
  const [loading, setLoading] = React.useState(true)

  const play = (id) => {

  }

  const createNew = (slot) => {
    setCharacter(slot)
  }

  const mapCharacters = (characters) => (
    <div>
      <Card.Group itemsPerRow="5" stackable>
        {characters.map((character, i) => {
          i++
          return (
          character.available ? (
            <Card key={Math.random()} className={styles.card} onClick={()=>character._id ? play(character._id) : createNew(i)}>
              {character._id!== null ? (
                <>
                  <div className={styles.charTop}>-- char img --</div>
                  <div className={styles.charMid}>-- some character info --</div>
                  <div className={styles.charBottom}>-- Play! --</div>  
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

  return (
    <>
      <Header as="h2" align="left">Characters</Header>
      {mapCharacters(user.characters)}
    </>
  )
}
 
export default Characters