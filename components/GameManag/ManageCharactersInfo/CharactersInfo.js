import React from "react"
import baseUrl from "../../../utils/baseUrl"
import { Modal, Icon, List, Button, TextArea, Accordion } from "semantic-ui-react"
import cookies from "js-cookie"
import RichTextEditor from "../../_App/AldenorUIComponents/RTE"
import AldenorBorderBox from "../../_App/AldenorUIComponents/AldenorBorderBox"

const CharactersInfo = () => {
  const [infos, setInfos] = React.useState([])
  const [open, setOpen] = React.useState(null)
  const [newInfo, setNewInfo] = React.useState("")
  const [activeIndex, setActiveIndex] = React.useState(null)

  React.useEffect(()=>{
    getInfos()
  },[])

  const getInfos = async ()=> {
    const url = `${baseUrl}/api/charactersInfo`
    await fetch(url, {
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
    }).then(async data => {
      setInfos(data)
    }).catch(error => {
      console.log(error.message) // todo
    })
  }

  const closeModal = async() => {
    setOpen(null)
    setNewInfo("")
  }
  const handleChangeTextArea = async (e) => {
    setNewInfo(e.editor.getHTML())
  }

  const saveRace = async (_id) => {
    const url = `${baseUrl}/api/charactersInfo`
    const charToken = cookies.get("charId")
    const payload = {
      _id,
      info: newInfo
    }
    await fetch(url,{
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": charToken
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
    }).then(() => {
      closeModal()
      getInfos()
    }).catch(error=>console.log(error.message))
  }

  const saveSkin = async (race, skin) => {
    const url = `${baseUrl}/api/charactersInfo`
    const charToken = cookies.get("charId")
    const payload = {
      _id: race,
      skin: skin,
      info: newInfo
    }
    await fetch(url,{
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": charToken
      },
      body: JSON.stringify(payload)
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
    }).then(() => {
      closeModal()
      getInfos()
    }).catch(error=>console.log(error.message))
  }
  
  const mapCharInfos = () => infos.map((race,i)=>{
    return (
      <List.Item key={i}>
        <Modal
          onClose={() => closeModal()}
          onOpen={() => setOpen(race._id)}
          open={open===race._id}
          trigger={<Button icon="pencil" circular color="teal" style={{float:"left"}}/>}
        >
          <Modal.Header>{race.race}</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <RichTextEditor
                value={newInfo ? newInfo : race.raceInfo}
                key={race._id}
                handleChangeEditor={handleChangeTextArea}
              />
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button
              content="Discard"
              labelPosition="left"
              icon="trash alternate"
              color="red"
              onClick={() => closeModal()}
            />
            <Button
              content="Save"
              labelPosition='right'
              icon='checkmark'
              color="green"
              onClick={() => Boolean(newInfo) ? saveRace(race._id) : closeModal()}
            />
          </Modal.Actions>
        </Modal>
        <Accordion.Title
          active={activeIndex === race._id}
          index={race._id}
          onClick={()=>setActiveIndex(race._id)}
        ><Icon name='dropdown' />{race.race}</Accordion.Title>
        <Accordion.Content active={activeIndex === race._id}><AldenorBorderBox box="basic" className="race-info"><div dangerouslySetInnerHTML={{__html: race.raceInfo}} ></div></AldenorBorderBox> </Accordion.Content> 
        <List>
          {race.skins.map((skin,j)=>{
            return (
              <List.Item key={j}>
                <Modal
                  onClose={() => closeModal()}
                  onOpen={() => setOpen(skin._id)}
                  open={open===skin._id}
                  trigger={<Button icon="pencil" circular color="olive" style={{float:"left"}}/>}
                >
                  <Modal.Header>{skin.skin}</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      <RichTextEditor
                        value={newInfo ? newInfo : skin.skinInfo}
                        key={skin._id}
                        handleChangeEditor={handleChangeTextArea}
                      />
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      content="Discard"
                      labelPosition="left"
                      icon="trash alternate"
                      color="red"
                      onClick={() => closeModal()}
                    />
                    <Button
                      content="Save"
                      labelPosition='right'
                      icon='checkmark'
                      color="green"
                      onClick={() => Boolean(newInfo) ? saveSkin(race._id, skin._id) : closeModal()}
                    />
                  </Modal.Actions>
                </Modal>
                <Accordion.Title
                  active={activeIndex === skin._id}
                  index={skin._id}
                  onClick={()=>setActiveIndex(skin._id)}
                ><Icon name='dropdown' />{skin.skin}</Accordion.Title>
                <Accordion.Content active={activeIndex === skin._id}><AldenorBorderBox box="basic" className="race-info"><div dangerouslySetInnerHTML={{__html: skin.skinInfo}} ></div></AldenorBorderBox> </Accordion.Content> 
              </List.Item>
            )
          })}
        </List>
      </List.Item>
    )
  })

  return (
    <>
      <List>
        <Accordion> {mapCharInfos()} </Accordion>
      </List>
    </>
  )
}
 
export default CharactersInfo