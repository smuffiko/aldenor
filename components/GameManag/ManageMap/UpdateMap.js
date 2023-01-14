import React from "react"
import Map from "./Map"
import Palette from "./Palette"

const UpdateMap = ({ mapRef }) => {
  return (
    <>
      <Map mapRef={mapRef} />
      <Palette />
    </>
  )
}
 
export default UpdateMap