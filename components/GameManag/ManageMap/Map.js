import React from "react"
import MapField from "./MapField"
import cookies from "js-cookie"
import baseUrl from "../../../utils/baseUrl"
import Draggable from "react-draggable"

const Map = ({ mapRef }) => {
  const fieldsRef = React.useRef([])
  const dragRef = React.useRef(false)
  const prevPos = React.useRef(null)

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
          <MapField key={`${x}${y}`} x={x} y={y} map={mapRef.current} fieldsRef={fieldsRef} dragRef={dragRef}/>	
        )}
      </div>
    )

    const onStart = (e, { x, y }) => {
      prevPos.current = { x, y }
    }
    const onDrag = (e, { x, y }) => {
      const diffX = x - prevPos.current.x
      const diffY = y - prevPos.current.y  
      if (Math.abs(diffX) >= 5 || Math.abs(diffY) >= 5) {
        dragRef.current = true
      }
    }
    const onStop = () => {
      setTimeout(() => dragRef.current = false, 10)
    }

  return (
    <>
      <div className="manage-map">
        <Draggable
          grid={[1, 1]}
          scale={1}
          onStart={onStart}
          onDrag={onDrag}
          onStop={onStop}
        >
          <div className="map-wrapper" >
            {fieldsRef.current!==undefined && mapRef.current && mapData}
          </div>
        </Draggable>
      </div>
    </>
  )
}
 
export default Map