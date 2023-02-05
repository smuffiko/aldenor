import React from "react"
import CreateMap from "./CreateMap"
import MapList from "./MapList"
import UpdateMap from "./UpdateMap"
import { Dimmer, Loader } from "semantic-ui-react"

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
          <UpdateMap mapRef={mapRef} map={map} setMap={setMap} setLoading={setLoading}/>
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