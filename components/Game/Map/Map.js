import React from "react"
import MapField from "./MapField"
import baseUrl from "../../../utils/baseUrl"
import cookies from "js-cookie"
import Draggable from "react-draggable"

const Map = ({ character }) => {
  const [map, setMap] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const dragRef = React.useRef(false)
  const prevPos = React.useRef(null)

  React.useEffect(async()=> {
    setLoading(true)
    const url = `${baseUrl}/api/map?_id=${character.coords.current.map}`
    const charToken = cookies.get("charId")
    await fetch(url, {
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
      setMap(data)
    }).catch(error=>console.log(error.message)) 
    .finally(()=>setLoading(false))
  },[])

  const mapData = map ? 
    Array.from({ length: map.map.size.x }, (_, x) =>
      <div key={x}>
        {Array.from({ length: map.map.size.y }, (_, y) =>
          <MapField key={`${x}${y}`} x={x} y={y} map={map} character={character} dragRef={dragRef}/>	
        )}
      </div>
    )
  : null

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
    <div className="map">
      <Draggable
        defaultPosition={{x: character.coords.current.x*(-64), y: character.coords.current.y*(-64)}}
        position={null}
        grid={[1, 1]}
        scale={1}
        onStart={onStart}
        onDrag={onDrag}
        onStop={onStop}
      >
        <div className="map-wrapper" >
          { map && mapData }
        </div>
      </Draggable>
    </div>
    </>
  )
}
 
export default Map