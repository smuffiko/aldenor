import React from "react"
import { Button, Modal } from "semantic-ui-react"
import baseUrl from "../../../utils/baseUrl"
import cookies from "js-cookie"

const PoiList = ({ poiList, getPoiList, setUpdatePoi }) => {
  const [open, setOpen] = React.useState(null)

  const closeModal = async() => {
    setOpen(null)
  }

  const deletePoi = async _id => {
    const url = `${baseUrl}/api/pois?_id=${_id}`
    const token = cookies.get("charId")
    await fetch(url,{
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "Authorization": token
      }
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.text()      
    }).then(data => {
      getPoiList()
      closeModal()
    }).catch(error => {
      console.log(error.mesage) // todo
    })
  }

  return (  
    <>
      <table>
        <thead>
        <tr>
          <th>
            MAP
          </th>
          <th>
            POI
          </th>
          <th>
            COORDS
          </th>
          <th>
            MANAGE
          </th>
        </tr>
        </thead>
        <tbody>
          {poiList.length !== 0 && poiList.map((poi, i)=>
            <tr key={poi._id}>
              <td>
                {poi.map}
              </td>
              <td>
                {poi.name}
              </td>
              <td>
                {poi.fields.map((field,j)=>
                  <span key={j}>[{field.coords.x},{field.coords.y}, {field.layer}]</span>
                )}
              </td>
              <td>
                <Button icon="pencil" circular color="orange" size="small" onClick={()=>setUpdatePoi(poi)}/>
                
                <Modal
                  onClose={() => closeModal()}
                  onOpen={() => setOpen(poi._id)}
                  open={open===poi._id}
                  trigger={<Button icon="trash alternate" circular color="red" size="small"/>}
                >
                  <Modal.Header>POI name: {poi.name}</Modal.Header>
                  <Modal.Content>
                    <Modal.Description>
                      Are you sure? Do you want to delete this POI? This changes will be lost forever.
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button
                      content="Delete it!"
                      labelPosition="left"
                      icon="trash alternate"
                      color="red"
                      onClick={() => deletePoi(poi._id)}
                    />
                    <Button
                      content="Discard"
                      labelPosition='left'
                      icon='x'
                      color="orange"
                      onClick={closeModal}
                    />
                  </Modal.Actions>
                </Modal>
              </td>
            </tr>
          )}
        </tbody>
      </table>  
    </>
  )
}
 
export default PoiList