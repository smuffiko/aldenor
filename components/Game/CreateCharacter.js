import React from "react"
import { Form, Button, Icon, Message, Image } from "semantic-ui-react"
import cookie from "js-cookie"
import baseUrl from "../../utils/baseUrl"
import { RACES, GENDER, SKIN } from "../../utils/characters"

const INITIAL_CHARACTER = {
  name: "",
  gender: 0,
  race: 0,
  skin: 0
}

const CreateCharacter = ({ slot, setSlot, setChar }) => {
  const [character, setCharacter] = React.useState(INITIAL_CHARACTER)
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [charPreview, setCharPreview] = React.useState("/img/Characters/Human/Mountaineer/Export_male/male_1.png")

  React.useEffect(()=>{
    if(Boolean(character.name)) setDisabled(false)
      else setDisabled(true)
    setCharPreview(`/img/Characters/${RACES[character.race]}/${SKIN[character.race][character.skin]}/Export_${GENDER[character.gender].toLowerCase()}/${GENDER[character.gender].toLowerCase()}_1.png`)
  },[character])

  const handleChange = event => {
    const { name, value } = event.target
    setCharacter(prevState => ({...prevState, [name]:value}))
  }
  const changeSkin = changeTo => {
    setCharacter(prevState => ({ ...prevState, skin: (
      ( (prevState.skin + changeTo) % 3 ) < 0 ?
      2 :
      ( (prevState.skin + changeTo) % 3 ) 
    ) }))
  }

  const changeRace = changeTo => {
    setCharacter(prevState => {
      const newRace = ( ( (prevState.race + changeTo) % RACES.length ) < 0 ?
        RACES.length - 1 :
        ( (prevState.race + changeTo) % RACES.length ) )
      return { ...prevState, race: newRace }
    })
  }

  const changeGender = () => {
    setCharacter(prevState => ({...prevState, gender: Number(!prevState.gender)}))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setError("")
    setLoading(true)
    setDisabled(true)

    const url = `${baseUrl}/api/character`
    const payload = { slot, skin: SKIN[character.race][character.skin], name: character.name, race: RACES[character.race], gender: character.gender }
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
      setChar(data.newCharacter)
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
        <Image src={charPreview}/>
        <Form.Field>
            <span>Gender: {GENDER[character.gender]}</span>
          <Button icon type="button" onClick={()=>changeGender()}>
            <Icon name="exchange"/>
          </Button>
        </Form.Field>
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
            <span>Skin: {SKIN[character.race][character.skin]}</span>
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