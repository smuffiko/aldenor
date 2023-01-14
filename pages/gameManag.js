import React from "react"
import ManageMap from "../components/GameManag/ManageMap/ManageMap"
import ManageFiles from "../components/GameManag/ManageFiles/ManageFiles"

const GameManag = () => {
  const [updatingFiles, setUpdatingFiles] = React.useState(false)
  const [map, setMap] = React.useState(null)

  return (
    <>
      { !map && <ManageFiles setUpdatingFiles={setUpdatingFiles} updatingFiles={updatingFiles} /> }
      { !updatingFiles && <ManageMap map={map} setMap={setMap} /> }
    </>
  )
}

export default GameManag