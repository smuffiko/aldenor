import React from "react"
import Router from "next/router"
import cookie from "js-cookie"
import Play from "../components/Game/Play"
import baseUrl from "../utils/baseUrl"
import { unsetCharToken } from "../utils/character"
import { Container } from "semantic-ui-react"

const Game = () => {
  const [firstRound, setFirstRound] = React.useState(true)
  const [character, setCharacter] = React.useState(null)

  React.useEffect(async ()=>{
    const charToken = cookie.get("charId")
    if(charToken!==undefined) {
      const url = `${baseUrl}/api/character?charToken=${charToken}`
      const token = cookie.get("token")
      await fetch(url,{
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": token
        }
      }).then(async response => {
        if(!response.ok) {
          const er = await response.text()
          throw new Error(er)
        }
        return await response.json()      
      }).then(async data => {
        setCharacter(data.character)
      }).catch(error => {
        unsetCharToken()
        Router.push("/characters")
      })
    } else {
      Router.push("/characters")
    }
    if(firstRound) setFirstRound(!firstRound)
  },[])

  return (
    <>
    {!firstRound && character && (
      <Container>
        <Play character={character} />
      </Container>
    )}
    </>
  )
}
 
export default Game