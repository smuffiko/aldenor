import React from "react"
import { Form, Button, Icon, Message } from "semantic-ui-react"
import cookie from "js-cookie"
import baseUrl from "../../utils/baseUrl"

const RACES = [
  "human",
  "elf",
  "dwarf",
  "halfling"
]

const INITIAL_CHARACTER = {
  name: "",
  race: 0,
  skin: 0
}

const CreateCharacter = ({ slot, setSlot, setChar }) => {
  const [character, setCharacter] = React.useState(INITIAL_CHARACTER)
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  React.useEffect(()=>{
    if(Boolean(character.name)) setDisabled(false)
      else setDisabled(true)
  },[character])

  const handleChange = event => {
    const { name, value } = event.target
    setCharacter(prevState => ({...prevState, [name]:value}))
  }

  const changeSkin = changeTo => {
    let newSkin = character.skin + changeTo
    if(newSkin<0) newSkin = 4
    if(newSkin>4) newSkin = 0
    setCharacter(prevState => ({...prevState, skin: newSkin}))
  }

  const changeRace = changeTo => {
    let newRace = character.race + changeTo
    if(newRace<0) newRace = 3
    if(newRace>3) newRace = 0
    setCharacter(prevState => ({...prevState, race: newRace}))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setError("")
    setLoading(true)
    setDisabled(true)

    const url = `${baseUrl}/api/character`
    const payload = { slot, skin: character.skin, name: character.name, race: RACES[character.race] }
    const token = cookie.get("token")
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()      
    }).then(data => {
      setChar(data)
    }).catch(error => {
      setError(error.message)
    }).finally(()=>{
      setLoading(false)
    })
  }

  return (
    <>
      <Button
        color='olive'
        icon='arrow left'
        label={{ basic: true, color: 'grey', pointing: 'left', content: 'Back' }}
        onClick={()=>setSlot(null)}
        type="button"
      />
      <Form error={Boolean(error)} loading={loading} onSubmit={handleSubmit}>
        <Message error icon attached >
          <Icon name="x" />
          <Message.Content>
            <Message.Header>Oops!</Message.Header>
            {error}
          </Message.Content>
        </Message>
        <Form.Input
          fluid
          icon="pencil"
          iconPosition="left"
          label="Name"
          required={true}
          name="name"
          value={character.name}
          onChange={handleChange}
        />
        <Form.Field>
          <Button icon type="button" onClick={()=>changeRace(-1)}>
            <Icon name="arrow left"/>
          </Button>
            <span>Race: {RACES[character.race]}</span>
          <Button icon type="button" onClick={()=>changeRace(1)}>
            <Icon name="arrow right"/>
          </Button>
        </Form.Field>
        <Form.Field>
          <Button icon type="button" onClick={()=>changeSkin(-1)}>
            <Icon name="arrow left"/>
          </Button>
            <span>Skin: {character.skin}</span>
          <Button icon type="button" onClick={()=>changeSkin(1)}>
            <Icon name="arrow right"/>
          </Button>
        </Form.Field>
        <Button
          disabled={disabled || loading}
          icon="game"
          type="submit"
          color="olive"
          content="Create new character!"
        />
      </Form>
    </>
  )
}
 
export default CreateCharacter