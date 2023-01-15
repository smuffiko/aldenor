import React from "react"
import CreateMap from "./CreateMap"
import MapList from "./MapList"
import UpdateMap from "./UpdateMap"
import { Button, Dimmer, Loader } from "semantic-ui-react"
import cookies from "js-cookie"
import baseUrl from "../../../utils/baseUrl"

const ManageMap = React.memo(({ map, setMap }) => {
  const mapRef = React.useRef(map)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(()=> {
    mapRef.current = map
  },[map])

  const handleSave = async () => {
    setLoading(true)
    const url = `${baseUrl}/api/map`
    const charToken = cookies.get("charId")
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "Authorization": charToken
      },
      body: JSON.stringify({map})
    }).then(async response => {
      if(!response.ok) {
        const er = await response.text()
        throw new Error(er)
      }
      return await response.json()
    }).then(data => {
      mapRef.current = data
      setMap(data)
    }).catch(error=>console.log(error.message)) 
    .finally(()=>setLoading(false))
  }
  
  const handleSaveBack = async () => {
    await handleSave()
      .then(()=>setMap(null))
  }

  return (
    <>
      {loading && (
        <Dimmer active>
          <Loader size='huge'>Rendering map ... </Loader>
        </Dimmer>
      )}
      { map && mapRef.current ? (
        <>
          <Button
            color='red'
            icon='x'
            label={{ basic: true, color: 'grey', pointing: false , content: 'Back - Discard changes' }}
            onClick={()=> {
              setMap(null)
            }}
            type="button"
          />
          <Button
            color='orange'
            icon='save'
            label={{ basic: true, color: 'grey', content: 'Save & back', pointing: false }}
            onClick={()=>handleSaveBack()}
            type="button"
          />
          <Button
            color='olive'
            icon='save'
            label={{ basic: true, color: 'grey', content: 'Save & stay', pointing: false }}
            onClick={()=>handleSave()}
            type="button"
          />
          <UpdateMap mapRef={mapRef} />
        </>
      ) : (
          <>
            <CreateMap setLoading={setLoading} setMap={setMap} />
            <MapList setLoading={setLoading} setMap={setMap} />
          </>
        )}
    </>
  )
})
 
export default ManageMap