import React from "react"
import { Button, List, Icon, Modal } from "semantic-ui-react"
import cookies from "js-cookie"
import baseUrl from "../../utils/baseUrl"

const MapList = () => {
  const [maps, setMaps] = React.useState([])
  const [activeIndex, setActiveIndex] = React.useState(-1)
  
  React.useEffect(()=>{
    getMaps()
  },[])
  
  const getMaps = async () => {
    const url = `${baseUrl}/api/maps`
    const charToken = cookies.get("charId")
    await fetch(url,{
      method: "GET",
      headers: {
        "Content-type": "application-json",
        "Authorization": charToken
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()
    }).then(data => {
      setMaps(data)
    }).catch(error=>console.log(error.message)) // todo
  }

  const handleDelete = async id => {
    const url = `${baseUrl}/api/map?_id=${id}`
    const charToken = cookies.get("charId")
    await fetch(url,{
      method: "DELETE",
      headers: {
        "Content-type": "application-json",
        "Authorization": charToken
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.text()
    }).then(data => {
      setActiveIndex(-1)
      getMaps()
    }).catch(error=>console.log(error.message)) // todo
  }

  return (
    <>
      <List>
        {maps.map((m,i)=>
          <List.Item key={i}>
            <Modal
              onClose={() => setActiveIndex(-1)}
              onOpen={() => setActiveIndex(i)}
              open={activeIndex===i}
              trigger={
                <Button icon circular color="red" size="mini" ><Icon name="trash alternate outline" /></Button>
              }
            >
              <Modal.Header>Delete map <i>{m.name}</i></Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <p>Do you want to delete this map permanently?</p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color='black' onClick={() => setActiveIndex(-1)}>
                  No! I missclicked...
                </Button>
                <Button
                  content="Yes, delete it!"
                  labelPosition='right'
                  icon="trash alternate outline"
                  onClick={() => handleDelete(m._id)}
                  negative
                />
              </Modal.Actions>
            </Modal>
            
            <Button icon circular color="orange" size="mini" ><Icon name="retweet" /></Button>
            {m.name}
          </List.Item>
        )}
      </List>
    </>
  )
}
 
export default MapList