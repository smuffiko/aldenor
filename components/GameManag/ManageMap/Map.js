import React from "react"
import MapField from "./MapField"
import cookies from "js-cookie"
import baseUrl from "../../../utils/baseUrl"
import Draggable from "react-draggable"

const Map = ({ mapRef }) => {
  const fieldsRef = React.useRef([])

  React.useEffect(()=>{
    const getFields = async() => {
      const url = `${baseUrl}/api/fields?map=true`
      const charToken = cookies.get("charId")
      await fetch(url,{
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "Authorization": charToken
        }
      }).then(async response => {
        if(!response.ok) {
          const er = await response.text()
          throw new Error(er)
        }
        return await response.json()      
      }).then(data => {
        fieldsRef.current = data
      }).catch(error => {
        console.log(error.message) // todo
      })
    }
    getFields()
  },[])

  const mapData = 
    Array.from({ length: mapRef.current.map.size.x }, (_, x) =>
      <div key={x}>
        {Array.from({ length: mapRef.current.map.size.y }, (_, y) =>
          <MapField key={`${x}${y}`} x={x} y={y} map={mapRef.current} fieldsRef={fieldsRef} />	
        )}
      </div>
    )

  return (
    <>
      <div className="manage-map">
        <Draggable >
          <div className="map-wrapper" >
            {fieldsRef.current!==undefined && mapRef.current && mapData}
          </div>
        </Draggable>
      </div>
    </>
  )
}
 
export default Map