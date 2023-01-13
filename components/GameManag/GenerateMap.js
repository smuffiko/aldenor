import React from "react"
import { Button } from "semantic-ui-react"
import GeneratedFields from "./GeneratedFields"
import GeneratedMap from "./GeneratedMap"
import GenerateMapInputs from "./GenerateMapInputs"
import MapList from "./MapList"

const GenerateMap = ({ generateMap, setGenerateMap, setLoading }) => {
  const [map, setMap] = React.useState([])
  
  React.useEffect(()=>{
    if(map.length!==0) setGenerateMap(true)
    else setGenerateMap(false)
  },[map])

  return (
    <>
      {!generateMap ? 
        <>
          <GenerateMapInputs
            setLoading={setLoading}
            setMap={setMap}
          />
          <MapList
            setMap={setMap}
            setLoading={setLoading}
          />
        </>
      : (
        <>
          <Button
            color='olive'
            icon='arrow left'
            label={{ basic: true, color: 'grey', pointing: 'left', content: 'Back' }}
            onClick={()=>setMap([])}
            type="button"
          />
          <GeneratedMap
            map={map}
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