import React, { Fragment } from "react"
import { Form, Button, Icon, Message, Image, Input, Header } from "semantic-ui-react"
import cookie from "js-cookie"
import baseUrl from "../../utils/baseUrl"
import { RACES, GENDER, SKIN, SKINS } from "../../utils/characters"
import AldenorBorderBox from "../_App/AldenorUIComponents/AldenorBorderBox"
import AldenorMessage from "../_App/AldenorUIComponents/AldenorMessage"
import AldenorCharacterPreview from "../_App/AldenorUIComponents/AldenorCharacterPreview"

const INITIAL_CHARACTER = {
  name: "",
  gender: 0,
  race: 0,
  skin: 0,
  hair: 0
}

const CreateCharacter = ({ slot, setSlot, setChar }) => {
  const [character, setCharacter] = React.useState(INITIAL_CHARACTER)
  const [disabled, setDisabled] = React.useState(true)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")
  const [charPreview, setCharPreview] = React.useState("/img/Characters/Human/Mountaineer/Export_male/male_1.png")
  const [info, setInfo] = React.useState("")

  React.useEffect(()=>{
    getCharactersInfo()
  },[])

  React.useEffect(()=>{
    setError("")
    if(Boolean(character.name)) setDisabled(false)
      else setDisabled(true)
    setCharPreview(`/img/Characters/${RACES[character.race]}/${SKIN[character.race][character.skin]}/Export_${GENDER[character.gender].toLowerCase()}/${GENDER[character.gender].toLowerCase()}_1.png`)
  },[character])

  const getCharactersInfo = async () => {
    setLoading(true)
    const url = `${baseUrl}/api/charactersInfo`
    await fetch(url,{
      method: "GET",
      headers: {
        "Content-type": "application/json"
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()      
    }).then(data => {
      setInfo(data)
    }).catch(error => {
      setError(error.message)
    }).finally(()=>{
      setLoading(false)
    })
  }

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

  const changeHair = changeTo => {
    setCharacter(prevState => ({ ...prevState, hair: (
      ( (prevState.hair + changeTo) % 5 ) < 0 ?
      4 :
      ( (prevState.hair + changeTo) % 5 ) 
    ) }))
  }

  const changeRace = changeTo => {
    setCharacter(prevState => ({ ...prevState, race: changeTo }))
  }

  const changeGender = gender => {
    setCharacter(prevState => ({...prevState, gender: gender }))
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setError("")
    setLoading(true)
    setDisabled(true)

    console.log(character.hair)
    const url = `${baseUrl}/api/character`
    const payload = { slot, skin: SKIN[character.race][character.skin], name: character.name, race: RACES[character.race], gender: character.gender, hair: character.hair }
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

  // todo it is only for preview, so maybe i can delete it later
  const printAll = () => 
    Object.keys(SKINS).map(race=>
      SKINS[race].map(skin=> 
        <Fragment key={Math.random()}>
          <div style={{display:"inline", width:"500px", wordWrap:"none"}} className="stst">
            <Image src={`/img/Characters/${race}/${skin}/Export_male/male_1.png`} label={`${race} ${skin} male`}/>
            <Image src={`/img/Characters/${race}/${skin}/Export_female/female_1.png`}  label={`${race} ${skin} female`}/>
          </div>
        </Fragment>
      )
    )

  return (
    <>
      <div className="body-content create-character">
        <div className="create-left">
          <div className="create-race">
            <img src="img/Characters/_Banners/Banners_Human.png" onClick={()=>changeRace(0)} />
            <img src="img/Characters/_Banners/Banners_Elf.png" onClick={()=>changeRace(1)} />
            <img src="img/Characters/_Banners/Banners_Dwarf.png" onClick={()=>changeRace(2)} />
            <img src="img/Characters/_Banners/Banners_Halfling.png" onClick={()=>changeRace(3)} />
          </div>

          <div className="create-select">
            <div>
              <Button icon="venus" type="button" onClick={()=>changeGender(1)} />
              <Button icon="mars" type="button" onClick={()=>changeGender(0)} />
            </div>
            <div>
              <Button icon onClick={()=>changeHair(-1)} >
                <Icon name="arrow left"/>
              </Button>
              <span>Hair</span>
              <Button icon type="button" onClick={()=>changeHair(1)} >
                <Icon name="arrow right"/>
              </Button>
            </div>
            <div>
              <Button icon onClick={()=>changeSkin(-1)} >
                <Icon name="arrow left"/>
              </Button>
                <span>{SKIN[character.race][character.skin]}</span>
              <Button icon type="button" onClick={()=>changeSkin(1)} >
                <Icon name="arrow right"/>
              </Button>
            </div>
          </div>
        </div>
        <div className="create-mid">
          <Button
            color='olive'
            icon='arrow left'
            label={{ basic: true, color: 'grey', pointing: 'left', content: 'Back' }}
            onClick={()=>setSlot(null)}
            type="button"
            className="create-back"
          />
          <AldenorMessage box="red" className="create-error" visible={Boolean(error)}>
            <Header><Icon name="x" />Oops!</Header>
            {error}
          </AldenorMessage>

          <AldenorCharacterPreview
            basic={charPreview}
            hair={`/img/Characters/${RACES[character.race]}/${GENDER[character.gender]}_Hair_${character.hair+1}/${GENDER[character.gender]}_Hair_${character.hair+1}_1.png`}
            size={256}
            className="create-image"
          />

          <div className="create-mid-bottom">
            <Input
              placeholder="Name"
              name="name"
              value={character.name}
              onChange={handleChange}
              className="create-name"
            />
            <button type="submit" onClick={handleSubmit} className={disabled || loading ? "basic-button-disabled disabled create-submit" : "basic-button create-submit"} >Create!</button>
          </div>
        </div>
        <div className="create-right">
          {info && (
            <>
              <AldenorBorderBox box="basic" className="create-info"><div dangerouslySetInnerHTML={{__html: info[character.race].raceInfo}}></div></AldenorBorderBox>
              <AldenorBorderBox box="basic" className="create-info"><div dangerouslySetInnerHTML={{__html: info[character.race].skins[character.skin].skinInfo}}></div></AldenorBorderBox>
            </>
          )}
        </div>
        
      </div>
    </>
  )
}
 
export default CreateCharacter