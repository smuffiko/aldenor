import React from "react"
import ManageMap from "../components/GameManag/ManageMap/ManageMap"
import ManageFiles from "../components/GameManag/ManageFiles/ManageFiles"

const GameManag = () => {
  const [updatingFiles, setUpdatingFiles] = React.useState(false)
  const [map, setMap] = React.useState(null)

  return (
    <>
      <div className="manage-bg">
        { !map && <ManageFiles setUpdating={setUpdatingFiles} updating={updatingFiles} /> }
        { !updatingFiles && <ManageMap map={map} setMap={setMap} /> }
      </div>
    </>
  )
}

export default GameManag