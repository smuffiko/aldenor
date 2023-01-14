import React from "react"
import CreateMap from "./CreateMap"
import MapList from "./MapList"
import UpdateMap from "./UpdateMap"
import { Button, Dimmer, Loader } from "semantic-ui-react"

const ManageMap = React.memo(({ map, setMap }) => {
  const mapRef = React.useRef(map)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(()=> {
    mapRef.current = map
  },[map])

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
            color='olive'
            icon='arrow left'
            label={{ basic: true, color: 'grey', pointing: 'left', content: 'Back' }}
            onClick={()=> {
              setMap(null)
            }}
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