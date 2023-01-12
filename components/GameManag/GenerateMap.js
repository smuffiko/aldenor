import React from "react"
import { Button } from "semantic-ui-react"
import GeneratedMap from "./GeneratedMap"
import GenerateMapInputs from "./GenerateMapInputs"

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
          />
        </>
      )}
    </>
  )
}
 
export default GenerateMap