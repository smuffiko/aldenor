import React from "react"
import Map from "./Map"
import Palette from "./Palette"
import { Button } from "semantic-ui-react"
import baseUrl from "../../../utils/baseUrl"
import cookies from "js-cookie"

const UpdateMap = ({ mapRef, map, setMap, setLoading }) => {
  
  const handleSave = async () => {
    setLoading(true)
    const url = `${baseUrl}/api/map`
    const charToken = cookies.get("charId")
    const payload = {
      map
    }
    await fetch(url, {
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
      <div className="update-map">
        <div className="update-map-main">
          <div className="update-map-buttons">
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
          </div>
          <Map mapRef={mapRef} />
        </div>
        <div className="update-map-tools">
          <Palette />
        </div>
      </div>
    </>
  )
}
 
export default UpdateMap