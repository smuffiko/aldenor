import React from "react"
import { Button, Image } from "semantic-ui-react"
import GeneratedFields from "./GeneratedFields"
import GeneratedMap from "./GeneratedMap"
import GenerateMapInputs from "./GenerateMapInputs"
import MapList from "./MapList"

const GenerateMap = ({ generateMap, setGenerateMap, setLoading }) => {
  const [map, setMap] = React.useState([])
  const mapRef = React.useRef([])
  const selectedRef = React.useRef(null)

  React.useEffect(()=>{
    if(map.length!==0) setGenerateMap(true)
    else setGenerateMap(false)

    mapRef.current = []
    if(map.coords)
      for (let row = 0; row < map.coords.length; row++) {
        mapRef.current.push([])
        for (let col = 0; col < map.coords[0].length; col++) {
          mapRef.current[row].push(map.coords[row][col])
        }
      }
  },[map])

  console.log("rendering")
  return (
    <>
      {!generateMap ? 
        <>
          <GenerateMapInputs
            setLoading={setLoading}
            mapRef={mapRef}
            setMap={setMap}
          />
          <MapList
            mapRef={mapRef}
            setLoading={setLoading}
            setMap={setMap}
          />
        </>
      : (
        <>
          <Button
            color='olive'
            icon='arrow left'
            label={{ basic: true, color: 'grey', pointing: 'left', content: 'Back' }}
            onClick={()=> {
              setGenerateMap(false)
              mapRef.current = []
            }}
            type="button"
          />
          <GeneratedMap
            map={map}
            mapRef={mapRef}
            setLoading={setLoading}
          />
          <GeneratedFields
            
          />
        </>
      )}
    </>
  )
}
 
export default GenerateMap