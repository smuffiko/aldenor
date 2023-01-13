import React from "react"
import { Button, Image } from "semantic-ui-react"
import GeneratedFields from "./GeneratedFields"
import GeneratedMap from "./GeneratedMap"
import GenerateMapInputs from "./GenerateMapInputs"
import MapList from "./MapList"

const GenerateMap = ({ generateMap, setGenerateMap, setLoading }) => {
  const [map, setMap] = React.useState([])
  const mapRef = React.useRef([])
  const [selected, setSelected] = React.useState({})

  React.useEffect(()=>{
    if(map.length!==0) setGenerateMap(true)
    else setGenerateMap(false)

    mapRef.current = []
    if(map.coords)
      mapRef.current = map
  },[map])

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
            mapRef={mapRef}
            setLoading={setLoading}
            newField={selected}
          />
          <GeneratedFields
            selected={selected}
            setSelected={setSelected}
          />
        </>
      )}
    </>
  )
}
 
export default GenerateMap